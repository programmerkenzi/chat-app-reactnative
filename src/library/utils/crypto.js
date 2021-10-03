/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-08-02 16:00:49
 * @LastEditTime: 2021-08-07 17:59:52
 * @LastEditors: Kenzi
 */
import nacl from "tweet-nacl-react-native-expo";
import { store } from "./../../redux/store";

export const generateShareKey = (publicKeyFromOther, myPrivateKey) => {
  const decodedPublicKeyFromOther = nacl.util.decodeBase64(publicKeyFromOther);
  const decodedMyPrivateKey = nacl.util.decodeBase64(myPrivateKey);

  return nacl.box.before(decodedPublicKeyFromOther, decodedMyPrivateKey);
};

export const encodeMessage = async (message, publicKeyFromOther) => {
  const state = store.getState();
  const privateKey = state.secure.auth.privateKey;
  const sharedKey = generateShareKey(publicKeyFromOther, privateKey);
  const messageUtf8Decoded = new Uint8Array(nacl.util.decodeUTF8(message));
  const nonce = await nacl.randomBytes(24);
  const encryptedMessage = nacl.box.after(messageUtf8Decoded, nonce, sharedKey);
  const encodedBase64Message = nacl.util.encodeBase64(encryptedMessage);
  const encodeBase64Nonce = nacl.util.encodeBase64(nonce);
  return { encodedMessage: encodedBase64Message, withNonce: encodeBase64Nonce };
};

export const decodeMessage = (encodedMessageInfo, publicKeyFromOther) => {
  //获取私钥
  const state = store.getState();
  const privateKey = state.secure.auth.privateKey;
  const sharedKey = generateShareKey(publicKeyFromOther, privateKey);
  const { encodedMessage, withNonce } = encodedMessageInfo;
  const nonceDecoded = nacl.util.decodeBase64(withNonce);
  const messageUtf8Decoded = nacl.util.decodeBase64(encodedMessage); // same as bobEncryptedStr
  const messageDecrypted = nacl.box.open.after(
    messageUtf8Decoded,
    nonceDecoded,
    sharedKey
  ); // same as strDecoded
  const messageEncoded = nacl.util.encodeUTF8(messageDecrypted);
  return messageEncoded;
};

export const encodeGroupMessage = async (message, keyPairForGroup) => {
  const privateKey = nacl.util.decodeBase64(keyPairForGroup.key2);
  const decodedUtf8Message = new Uint8Array(nacl.util.decodeUTF8(message));
  const signature = nacl.sign(decodedUtf8Message, privateKey);
  const signatureB64 = nacl.util.encodeBase64(signature);

  return { encodedMessage: signatureB64 };
};

export const decodeGroupMessage = (encodedMessageInfo, keyPairForGroup) => {
  const publicKey = nacl.util.decodeBase64(keyPairForGroup.key1);
  const { encodedMessage } = encodedMessageInfo;
  const decodedSignature = nacl.util.decodeBase64(encodedMessage);
  const verifiedMsg = nacl.sign.open(decodedSignature, publicKey);
  const messageEncoded = nacl.util.encodeUTF8(verifiedMsg);
  return messageEncoded;
};
