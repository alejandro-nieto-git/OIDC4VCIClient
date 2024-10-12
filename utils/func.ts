import { importJWK, JWK, KeyLike} from 'jose';
import { ec as EC } from 'elliptic';

export async function privateKeyToKeyLike(hexStringPrivateKey: string): Promise<KeyLike>{
    const privateKeyBuffer = Buffer.from(hexStringPrivateKey.slice(2), 'hex');

    const ec = new EC('secp256k1');
    const key = ec.keyFromPrivate(privateKeyBuffer);

    const pubPoint = key.getPublic();
    const x = pubPoint.getX().toArrayLike(Buffer, 'be', 32);
    const y = pubPoint.getY().toArrayLike(Buffer, 'be', 32);

    const privateKeyJWK: JWK = {
        kty: 'EC',
        crv: 'secp256k1',
        x: Buffer.from(x).toString('base64url'),
        y: Buffer.from(y).toString('base64url'),
        d: privateKeyBuffer.toString('base64url')
    };
    
    return await importJWK(privateKeyJWK, 'ES256K') as KeyLike;

}