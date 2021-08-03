/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-08-02 16:00:49
 * @LastEditTime: 2021-08-03 18:48:22
 * @LastEditors: Kenzi
 */
import nacl from "tweet-nacl-react-native-expo";

export const generateShareKey = (publicKeyFromOther, myPrivateKey) => {
  const decodedPublicKeyFromOther = nacl.util.decodeBase64(publicKeyFromOther);
  const decodedMyPrivateKey = nacl.util.decodeBase64(myPrivateKey);

  return nacl.box.before(decodedPublicKeyFromOther, decodedMyPrivateKey);
};

export const encodeMessage = async (message, sharedKey) => {
  const messageUtf8Decoded = new Uint8Array(nacl.util.decodeUTF8(message));
  const nonce = await nacl.randomBytes(24);
  const encryptedMessage = nacl.box.after(messageUtf8Decoded, nonce, sharedKey);
  const encodedBase64Message = nacl.util.encodeBase64(encryptedMessage);
  const encodeBase64Nonce = nacl.util.encodeBase64(nonce);
  return { encodedMessage: encodedBase64Message, withNonce: encodeBase64Nonce };
};

export const decodeMessage = (encodedMessageInfo, sharedKey) => {
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
