import { DB } from 'sqlite'
import { Disposer } from './Disposer.ts'

const initDatabase = () => {
  const db = new DB('database.db')

  db.execute(`
  CREATE TABLE IF NOT EXISTS keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    key TEXT,
    signature TEXT UNIQUE,
    createdAt TEXT -- ISO Date
  )
`)

  const count = db.query('SELECT count(id) FROM keys')

  console.log('Loaded', count.at(0)?.at(0), 'keys')

  const onExitDatabase = new Disposer()

  onExitDatabase.add(() => db.close())

  return { db, onExitDatabase }
}

export const { db, onExitDatabase } = initDatabase()
