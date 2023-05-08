import { db } from '@tools/initDatabase.ts'

export const findKeyByName = (name: string) => {
  return db.query('SELECT key, signature, createdAt FROM keys WHERE name = ?', [
    name,
  ])
}
