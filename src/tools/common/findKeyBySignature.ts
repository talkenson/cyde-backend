import { db } from '@tools/initDatabase.ts'

export const findKeyBySignature = (signature: string) => {
  return db.query('SELECT key, name, createdAt FROM keys WHERE signature = ?', [
    signature,
  ])
}
