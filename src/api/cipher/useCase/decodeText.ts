import { CipheredMessage, Message } from '$types/Message.ts'
import { findKeyBySignature } from '@tools/common/findKeyBySignature.ts'
import { Aes256Cfb } from 'aes'
import * as re from '@tools/regex.ts'
import { b64ToBuffer } from '@tools/b64ToBuffer.ts'
import { kdf } from '@tools/kdf.ts'

const parser = re.sequence(
  re.WORD_BOUNDARY,
  re.escape('CYDE'),
  re.capturingGroup(re.times(re.BASE64, 16, 16)), // signature
  re.capturingGroup(re.oneOrMore(re.ANYTHING)), // content
  re.escape('_'),
  re.capturingGroup(re.oneOrMore(re.BASE64)), // nonce
  re.escape('CC'),
  re.WORD_BOUNDARY,
).toRegExp('g')

const parseCipheredText = (cipheredText: string) => {
  console.log(parser.source)
  const matches = [...cipheredText.matchAll(parser)][0]
  console.log('sex', matches)
  return {
    signature: matches[1],
    text: matches[2],
    nonce: matches[3],
  }
}

export const decodeText = (payload: CipheredMessage) => {
  const { signature, text, nonce } = parseCipheredText(payload.cipherText)

  const result = findKeyBySignature(signature)
  if (result.length !== 1) {
    throw new Error('No key found')
  }
  const [key, name, createdAt] = result[0]
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()

  const _nonce = b64ToBuffer(nonce)

  const { sessionKey, iv } = kdf(key as string, _nonce)

  const decipher = new Aes256Cfb(sessionKey, iv)

  const data = b64ToBuffer(text)

  decipher.decrypt(data)

  const resultText = decoder.decode(data)

  return { text: resultText, name } as Message
}
