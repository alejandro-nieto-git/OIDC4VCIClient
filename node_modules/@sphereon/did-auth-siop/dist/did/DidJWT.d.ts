import { JWTHeader, JWTOptions, JWTPayload, JWTVerifyOptions } from 'did-jwt';
import { JWTDecoded } from 'did-jwt/lib/JWT';
import { Resolvable } from 'did-resolver';
import { ClaimPayloadCommonOpts } from '../authorization-request';
import { AuthorizationResponseOpts } from '../authorization-response';
import { RequestObjectOpts } from '../request-object';
import { IDTokenPayload, RequestObjectPayload, VerifiedJWT } from '../types';
/**
 *  Verifies given JWT. If the JWT is valid, the promise returns an object including the JWT, the payload of the JWT,
 *  and the did doc of the issuer of the JWT.
 *
 *  @example
 *  verifyDidJWT('did:key:example', resolver, {audience: '5A8bRWU3F7j3REx3vkJ...', callbackUrl: 'https://...'}).then(obj => {
 *      const did = obj.did                 // DIDres of signer
 *      const payload = obj.payload
 *      const doc = obj.doc                 // DIDres Document of signer
 *      const JWT = obj.JWT                 // JWT
 *      const signerKeyId = obj.signerKeyId // ID of key in DIDres document that signed JWT
 *      ...
 *  })
 *
 *  @param    {String}            jwt                   a JSON Web Token to verify
 *  @param    {Resolvable}        resolver
 *  @param    {JWTVerifyOptions}  [options]             Options
 *  @param    {String}            options.audience      DID of the recipient of the JWT
 *  @param    {String}            options.callbackUrl   callback url in JWT
 *  @return   {Promise<Object, Error>}                  a promise which resolves with a response object or rejects with an error
 */
export declare function verifyDidJWT(jwt: string, resolver: Resolvable, options: JWTVerifyOptions): Promise<VerifiedJWT>;
/**
 *  Creates a signed JWT given an address which becomes the issuer, a signer function, and a payload for which the withSignature is over.
 *
 *  @example
 *  const signer = ES256KSigner(process.env.PRIVATE_KEY)
 *  createJWT({address: '5A8bRWU3F7j3REx3vkJ...', signer}, {key1: 'value', key2: ..., ... }).then(JWT => {
 *      ...
 *  })
 *
 *  @param    {Object}            payload               payload object
 *  @param    {Object}            [options]             an unsigned credential object
 *  @param    {String}            options.issuer        The DID of the issuer (signer) of JWT
 *  @param    {Signer}            options.signer        a `Signer` function, Please see `ES256KSigner` or `EdDSASigner`
 *  @param    {boolean}           options.canonicalize  optional flag to canonicalize header and payload before signing
 *  @param    {Object}            header                optional object to specify or customize the JWT header
 *  @return   {Promise<Object, Error>}                  a promise which resolves with a signed JSON Web Token or rejects with an error
 */
export declare function createDidJWT(payload: Partial<JWTPayload>, { issuer, signer, expiresIn, canonicalize }: JWTOptions, header: Partial<JWTHeader>): Promise<string>;
export declare function signIDTokenPayload(payload: IDTokenPayload, opts: AuthorizationResponseOpts): Promise<string>;
export declare function signRequestObjectPayload(payload: RequestObjectPayload, opts: RequestObjectOpts<ClaimPayloadCommonOpts>): Promise<string>;
export declare function getAudience(jwt: string): string;
export declare function getSubDidFromPayload(payload: JWTPayload, header?: JWTHeader): string;
export declare function isIssSelfIssued(payload: JWTPayload): boolean;
export declare function getIssuerDidFromJWT(jwt: string): string;
export declare function parseJWT(jwt: string): JWTDecoded;
export declare function getMethodFromDid(did: string): string;
export declare function getNetworkFromDid(did: string): string;
/**
 * Since the OIDC SIOP spec incorrectly uses 'did:<method>:' and calls that a method, we have to fix it
 * @param didOrMethod
 */
export declare function toSIOPRegistrationDidMethod(didOrMethod: string): string;
