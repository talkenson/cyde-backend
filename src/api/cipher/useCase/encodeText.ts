import { CipheredMessage, Message } from '$types/Message.ts'
import { findKeyByName } from '@tools/common/findKeyByName.ts'
import { Aes256Cfb } from 'aes'
import { bufferToB64 } from '@tools/bufferToB64.ts'
import { wrapCipher } from './wrapCipher.ts'
import { kdf } from '@tools/kdf.ts'

export const encodeText = (payload: Message) => {
  const result = findKeyByName(payload.name)
  if (result.length !== 1) {
    throw new Error('No key found')
  }
  const [key, signature, createdAt] = result[0]
  const encoder = new TextEncoder()

  const nonce = new Uint8Array(32)

  crypto.getRandomValues(nonce)

  console.log('nonce generated')

  const { sessionKey, iv } = kdf(key as string, nonce)

  console.log('kdf generated')

  const cipher = new Aes256Cfb(sessionKey, iv)

  console.log('cipher generated')

  const data = encoder.encode(payload.text)
  console.log('income data', data)

  cipher.encrypt(data)
  console.log(data)
  const rawText = bufferToB64(data)

  const cipherText = wrapCipher(
    rawText,
    signature as string,
    bufferToB64(nonce),
  )

  console.log('CIPHER', rawText)

  return { cipherText } as CipheredMessage
}
