import { hash } from 'argon2'

export const kdf = (masterKey: string, nonce: Uint8Array) => {
  const encoder = new TextEncoder()

  const sessionKey = hash(
    encoder.encode(masterKey),
    nonce,
    {
      outputLength: 32,
      t: 10,
    },
  )

  const secret = sessionKey
  console.log('KDF key length', secret.byteLength)
  const iv = sessionKey.slice(0, 16).toReversed()

  console.log(sessionKey, iv)

  return { sessionKey, iv }
}
