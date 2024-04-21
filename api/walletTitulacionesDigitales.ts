import { OpenID4VCIClient } from '@sphereon/oid4vci-client';
import { debug } from "debug";
import * as jose from 'jose';
import { DIDDocument } from 'did-resolver';
import {
  Alg,
  // CNonceState,
  // CredentialSupported,
  // IssuerCredentialSubjectDisplay,
  // IssueStatus,
  // Jwt,
  // JwtVerifyResult,
  // OpenId4VCIVersion,
  // ProofOfPossession,
} from '@sphereon/oid4vci-common'

const debugLog = debug("Wallet Titulaciones Digitales:debug ");
const errorLog = debug("Wallet Titulaciones Digitales:error ");

export class WalletTitulacionesDigitalesUVa {
  private client: OpenID4VCIClient;
  private dids: string[];
  private keys: {};

  constructor(keys: {}, dids: string[]) {
    this.dids = dids;
    this.keys = keys;
  }

  public async initiateIssuance(oidcURI: string) {
    debugLog("Initiating Issuance");
    debugLog("OIDC URI: " + oidcURI);
    debugLog("DID selected: " + this.dids[0]);

    this.client = await OpenID4VCIClient.fromURI({
      uri: oidcURI,
      kid: this.dids[0] + "#key-1",
      alg: Alg.ES256, // The signing Algorithm we will use. You can defer this also to when the acquireCredential method is called
      clientId: 'test-clientId', // The clientId if the Authrozation Service requires it.  If a clientId is needed you can defer this also to when the acquireAccessToken method is called
      retrieveServerMetadata: true, // Already retrieve the server metadata. Can also be done afterwards by invoking a method yourself.
    });

    debugLog("Issuer is " + this.client.getIssuer()); // https://issuer.research.identiproof.io
    debugLog("Credential endpoint is" + this.client.getCredentialEndpoint()); // https://issuer.research.identiproof.io/credential
    debugLog("Token endpoint is " + this.client.getAccessTokenEndpoint()); // https://auth.research.identiproof.io/oauth2/token
  }

  public async tokenRequest(pin: string) {
    debugLog("Token request initiated");

    const accessToken = await this.client.acquireAccessToken({ pin: pin});
    debugLog("Access Token acquired: " + accessToken); 
  }

  // //Now we can use the acquired access token to initiate a credential request
  // public async initiateCredentialRequest() {
  //   debugLog("Initiating Credential Request");

  //   const credentialRequest = await this.client.acquireCredential({
  //     credentialType: 'VerifiableCredential',
  //     credentialSubject: {
  //       id: 'did:uva:0x123456789abcdefghi',
  //       name: 'John Doe',
  //       age:

}