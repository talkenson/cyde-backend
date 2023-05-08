import { db } from '@tools/initDatabase.ts'

export const listKeys = () => {
  return db.query('SELECT id, name, signature, createdAt FROM keys')
}
