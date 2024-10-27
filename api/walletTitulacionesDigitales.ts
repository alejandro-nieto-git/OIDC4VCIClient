import { OpenID4VCIClient } from '@sphereon/oid4vci-client';
import { debug } from "debug";
import * as jose from 'jose';
import { DIDDocument } from 'did-resolver';
import {
  Alg,
  JsonLdIssuerCredentialDefinition,
  ProofOfPossessionCallbacks,
} from '@sphereon/oid4vci-common'
import { KeyLike } from 'jose';
import { generateSignCallback } from '../utils/utils';
import { W3CVerifiableCredential } from '@sphereon/ssi-types';
import { URI, VPTokenLocation } from '@sphereon/did-auth-siop/';
import { OP, PassBy, PresentationSignCallback, PresentationVerificationCallback, ResponseIss, ResponseType, Scope, SigningAlgo, SubjectType, SupportedVersion } from '@sphereon/did-auth-siop'

import { IVerifyCallbackArgs, IVerifyCredentialResult, VerifyCallback, WDCErrors } from '@sphereon/wellknown-dids-client';
import { CredentialMapper, IPresentation, IProofType, IVerifiableCredential, W3CVerifiablePresentation } from '@sphereon/ssi-types';
import {PresentationExchange} from "@sphereon/did-auth-siop";

const debugLog = debug("Wallet Titulaciones Digitales:debug ");
const errorLog = debug("Wallet Titulaciones Digitales:error ");

console.log("This is the walletTitulacionesDigitales.ts file:" + process.env.DEBUG);

/**
 * Represents a simplified wallet for demo purposes for managing digital credentials for Titulaciones Digitales UVa.
 */
export class WalletTitulacionesDigitalesUVa {
  private client: OpenID4VCIClient|undefined;
  private keys: Array<KeyLike>;
  private privateKeysToDids: Map<KeyLike, string>;
  private keyInUse: KeyLike;
  private credentialToIssueDefinition: string;
  private credentials: any[];
  private op: OP;
  private presentationSignCallback: PresentationSignCallback;

  /**
   * Initializes a WalletTitulacionesDigitales object.
   * 
   * @param {Array<KeyLike>} keys - An array of private keys.
   * @param {Map<KeyLike, string>} privateKeysToDids - A map of private keys to Ethereum DIDs of those keys.
   */
  constructor(keys: Array<KeyLike>, privateKeysToDids: Map<KeyLike, string>)  {
    this.keys = keys;
    this.privateKeysToDids = privateKeysToDids;
    this.client = undefined; 
    this.keyInUse = this.keys[0];
    this.credentialToIssueDefinition = "";
    this.credentials = [];

    const verifyCallback: VerifyCallback = async (_args) => ({ verified: true });
    this.presentationSignCallback = async (_args) => ({
        ...(_args.presentation as IPresentation),
        proof: {
          type: 'RsaSignature2018',
          created: '2018-09-14T21:19:10Z',
          proofPurpose: 'authentication',
          verificationMethod: 'did:example:ebfeb1f712ebc6f1c276e12ec21#keys-1',
          challenge: '1f44d55f-f161-4938-a659-f8026467f126',
          domain: '4jt78h47fh47',
          jws: 'eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..kTCYt5XsITJX1CxPCT8yAV-TVIw5WEuts01mq-pQy7UJiN5mgREEMGlv50aqzpqh4Qq_PbChOMqsLfRoPsnsgxD-WUcX16dUOqV0G_zS245-kronKb78cPktb3rk-BuQy72IFLN25DYuNzVBAh4vGHSrQyHUGlcTwLtjPAnKb78',
        },
      });

      let privateKey = process.env.USER_PRIVATE_KEY!.split("0x")[1];

      this.op = OP.builder()
        .withPresentationSignCallback(this.presentationSignCallback)
        .withExpiresIn(1000)
        .withWellknownDIDVerifyCallback(verifyCallback)
        .withIssuer(ResponseIss.SELF_ISSUED_V2)
        .withInternalSignature(process.env.USER_PRIVATE_KEY!.split("0x")[1], process.env.USER_DID!, `${process.env.USER_DID}#controller`, SigningAlgo.ES256K)
        .withSupportedVersions(SupportedVersion.SIOPv2_ID1)
        .withRegistration({
          authorizationEndpoint: 'www.myauthorizationendpoint.com',
          idTokenSigningAlgValuesSupported: [SigningAlgo.EDDSA],
          issuer: ResponseIss.SELF_ISSUED_V2,
          requestObjectSigningAlgValuesSupported: [SigningAlgo.EDDSA, SigningAlgo.ES256],
          responseTypesSupported: [ResponseType.VP_TOKEN],
          vpFormats: { jwt_vc: { alg: [SigningAlgo.EDDSA] } },
          scopesSupported: [Scope.OPENID_DIDAUTHN, Scope.OPENID],
          subjectTypesSupported: [SubjectType.PAIRWISE],
          subject_syntax_types_supported: ['did:ethr'],
          passBy: PassBy.VALUE
        })
        .withSupportedVersions(SupportedVersion.SIOPv2_ID1)
        .build();
  }

  public setActiveKey(privateKey: KeyLike) {
    this.keyInUse = privateKey;
  }


  /**
   * Initiates the issuance process for a digital credential.
   * 
   * @param oidcURI - The OIDC URI for the credential issuance.
   * @returns A Promise that resolves when the issuance process is initiated.
   */
  public async initiateIssuance(oidcURI: string) {
    debugLog("Initiating Issuance");
    debugLog("OIDC URI: " + oidcURI);
    debugLog("DID selected: ");

    this.client = await OpenID4VCIClient.fromURI({
      uri: oidcURI,
      kid: process.env.USER_DID + "#key-1",
      alg: Alg.ES256,
      clientId: 'test-clientId',
      retrieveServerMetadata: true,
    });
    
    let credentialDefinition = decodeURIComponent(oidcURI).split('"credential_definition":')[1];
    credentialDefinition = JSON.parse('{"credential_definition":' + credentialDefinition)["credential_definition"];
    this.credentialToIssueDefinition = credentialDefinition;

    debugLog("Issuer is " + this.client.getIssuer()); 
    debugLog("Credential endpoint is" + this.client.getCredentialEndpoint()); 
    debugLog("Token endpoint is " + this.client.getAccessTokenEndpoint()); 
  }

  /**
   * Initiates a token request using the provided PIN.
   * @param pin - The PIN used for authentication.
   * @returns A Promise that resolves when the access token is retrieved.
   * @throws If an error occurs during the token request.
   */
  public async tokenRequest(pin: string) {
    try {
      debugLog("Token request initiated");

      const accessToken = await this.client!.acquireAccessToken({ pin: pin });
      debugLog("Access Token acquired: " + accessToken);

      debugLog("Initiating Credential Request");
      let signCallback = generateSignCallback(this.keyInUse);
      const callbacks: ProofOfPossessionCallbacks<DIDDocument> = {
        signCallback, 
      };

      
    } catch (error) {
      throw error;
    }
  }

  /**
   * Initiates a credential request.
   * 
   * @returns A promise that resolves to the credential response.
   */
  public async credentialRequest() {
    debugLog("Credential request initiated");

    let signCallback = generateSignCallback(this.keyInUse);
    const callbacks: ProofOfPossessionCallbacks<DIDDocument> = {
      signCallback, 
    };

    const credentialResponse = await this.client!.acquireCredentials({
      credentialDefinition: this.credentialToIssueDefinition as unknown as JsonLdIssuerCredentialDefinition,
      credentialTypes: ['VerifiableCredential', 'TitulacionDigital'],
      proofCallbacks: callbacks ,
      format: 'jwt_vc_json',
      alg: Alg.ES256K,
      kid: process.env.USER_DID + '#key-1',
    });

    delete (credentialResponse.credential! as any).proof;
    delete (credentialResponse.credential! as any)._id;
    debugLog("Credential acquired: " + JSON.stringify(credentialResponse));
    this.credentials.push(credentialResponse.credential);

    return credentialResponse;
  }

  public async generateSIOPResponse(authRequestURI: URI){
    console.log(this.credentials);
    const verifiedRequest = await this.op.verifyAuthorizationRequest(authRequestURI);
    let pex = new PresentationExchange({
      allDIDs: [process.env.USER_DID!],
      allVerifiableCredentials: [this.credentials[this.credentials.length - 1] ]
    });
    const verifiablePresentationResult = await pex.createVerifiablePresentation(verifiedRequest.payload!.claims.vp_token.presentation_definition, [this.credentials[this.credentials.length - 1]], this.presentationSignCallback, {});
    const authenticationResponseWithJWT = await this.op.createAuthorizationResponse(verifiedRequest, {
      presentationExchange: {
        verifiablePresentations: [verifiablePresentationResult.verifiablePresentation],
        vpTokenLocation: VPTokenLocation.AUTHORIZATION_RESPONSE,
        presentationSubmission: verifiablePresentationResult.presentationSubmission,
      },
    });
    const response = await this.op.submitAuthorizationResponse(authenticationResponseWithJWT);
    return authenticationResponseWithJWT;





  }
}