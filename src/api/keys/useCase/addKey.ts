import { db } from '@tools/initDatabase.ts'
import { Query } from 'sqlb'
import { KeyDatabaseInput } from '$types/Key.ts'
import { findKeyByName } from '@tools/common/findKeyByName.ts'

export const addKey = (payload: KeyDatabaseInput) => {
  const exists = findKeyByName(payload.name)
  if (exists.length > 0) throw new Error('Key name duplication')
  return db.query(
    'INSERT INTO keys (name, key, signature, createdAt) VALUES (?, ?, ?, ?)',
    [payload.name, payload.key, payload.signature, payload.createdAt],
  )
}
