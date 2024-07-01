import { OpenID4VCIClient } from '@sphereon/oid4vci-client';
import { debug } from "debug";
import * as jose from 'jose';
import { DIDDocument } from 'did-resolver';
import {
  Alg,
  ProofOfPossessionCallbacks,
} from '@sphereon/oid4vci-common'
import { KeyLike } from 'jose';
import { generateSignCallback } from '../utils/utils';
import { W3CVerifiableCredential } from '@sphereon/ssi-types';

const debugLog = debug("Wallet Titulaciones Digitales:debug ");
const errorLog = debug("Wallet Titulaciones Digitales:error ");

/**
 * Represents a simplified wallet for demo purposes. It only holds one pair of public/private keys and it's 
 * DID.
 */
export class WalletTitulacionesDigitalesUVa {
  private client: OpenID4VCIClient|undefined;
  private keys: Array<KeyLike>;
  private privateKeysToDids: Map<KeyLike, string>;
  private keyInUse: KeyLike;
  private credentialToIssueDefinition: string;

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


  public async initiateIssuance(oidcURI: string) {
    debugLog("Initiating Issuance");
    debugLog("OIDC URI: " + oidcURI);
    debugLog("DID selected: ");

    this.client = await OpenID4VCIClient.fromURI({
      uri: oidcURI,
      kid: process.env.USER_DID + "#key-1",
      alg: Alg.ES256, // The signing Algorithm we will use. You can defer this also to when the acquireCredential method is called
      clientId: 'test-clientId', // The clientId if the Authrozation Service requires it.  If a clientId is needed you can defer this also to when the acquireAccessToken method is called
      retrieveServerMetadata: true, // Already retrieve the server metadata. Can also be done afterwards by invoking a method yourself.
    });
    
    let credentialDefinition = decodeURIComponent(oidcURI).split('"credential_definition":')[1];
    credentialDefinition = JSON.parse('{"credential_definition":' + credentialDefinition)["credential_definition"];
    this.credentialToIssueDefinition = credentialDefinition;

    debugLog("Issuer is " + this.client.getIssuer()); // https://issuer.research.identiproof.io
    debugLog("Credential endpoint is" + this.client.getCredentialEndpoint()); // https://issuer.research.identiproof.io/credential
    debugLog("Token endpoint is " + this.client.getAccessTokenEndpoint()); // https://auth.research.identiproof.io/oauth2/token
  }

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

  public async credentialRequest() {
    debugLog("Credential request initiated");

    let signCallback = generateSignCallback(this.keyInUse);
    const callbacks: ProofOfPossessionCallbacks<DIDDocument> = {
      signCallback, 
    };

    const credentialResponse = await this.client!.acquireCredentials({
      credentialTypes: ['TitulacionDigital'],
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