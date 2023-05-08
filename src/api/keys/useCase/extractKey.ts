import { PassphraseInput } from '$types/Passphrase.ts'
import { KeyDatabaseInput } from '$types/Key.ts'
import { hash } from 'argon2'
import { bufferToB64 } from '@tools/bufferToB64.ts'

const KEY_SALT = 'keySaltBrew'
const SIGN_SALT = 'signSaltBwer'

export const extractKey = (payload: PassphraseInput): KeyDatabaseInput => {
  const encoder = new TextEncoder()

  console.log(payload)

  const key = hash(
    encoder.encode(payload.phrase),
    encoder.encode(KEY_SALT),
    {
      outputLength: 48,
      t: 10,
    },
  )

  const signature = hash(
    key,
    encoder.encode(SIGN_SALT),
  )

  const decoder = new TextDecoder()

  const res = {
    key: decoder.decode(key),
    signature: bufferToB64(signature).slice(0, 16),
    name: payload.name,
    createdAt: (new Date()).toISOString(),
  }
  console.log(res)

  return res
}
