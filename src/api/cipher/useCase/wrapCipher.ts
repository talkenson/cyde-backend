export const wrapCipher = (
  cipherText: string,
  signature: string,
  nonce: string,
) => {
  return `CYDE${signature}${cipherText}_${nonce}CC`
}
