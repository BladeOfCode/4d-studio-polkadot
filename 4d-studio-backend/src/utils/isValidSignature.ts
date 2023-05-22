import { cryptoWaitReady, decodeAddress, signatureVerify } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';

const isValidSignature = (signedMessage: string | Uint8Array, signature: string | Uint8Array, address: string | Uint8Array | null | undefined) => {
  const publicKey = decodeAddress(address);
  const hexPublicKey = u8aToHex(publicKey);

  return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
};

export {
    isValidSignature
}