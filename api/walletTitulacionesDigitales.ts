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

  /**
   * Initializes a WalletTitulacionesDigitales object.

   * @param {Array<KeyLike>} keys - An array of private keys.
   * @param {Map<KeyLike, string>} privateKeysToDids - A map of private keys to Ethereum DIDs of those keys.
   */
  constructor(keys: Array<KeyLike>, privateKeysToDids: Map<KeyLike, string>)  {
    this.keys = keys;
    this.privateKeysToDids = privateKeysToDids;
    this.client = undefined; 
    this.keyInUse = this.keys[0];
    this.credentialToIssueDefinition = "";
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
      kid: 'did:ethr:DE19d461d3E3Fc360D392B512fa09aBcB6A3cba3#key-1',
    });

    delete (credentialResponse.credential! as any).proof;
    debugLog("Credential acquired: " + JSON.stringify(credentialResponse));

    return credentialResponse;
  }
}