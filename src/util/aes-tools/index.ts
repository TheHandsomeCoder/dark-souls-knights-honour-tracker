export const AES_CBC_Decrypter =
  (key: Uint8Array, blocklength: number) => async (buf: ArrayBuffer): Promise<ArrayBuffer> => {
    const iv = new Uint8Array(buf.slice(0, blocklength));
    const algo = { name: "AES-CBC", iv: iv };
    const cryptoKey = await crypto.subtle.importKey("raw", key, algo, false, [
      "decrypt",
    ]);
    return await crypto.subtle.decrypt(algo, cryptoKey, buf.slice(blocklength));
  };
