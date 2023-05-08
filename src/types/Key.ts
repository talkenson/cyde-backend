export type KeyDatabaseInput = {
  key: string
  signature: string
  name: string
  createdAt: string
}

export type KeyDatabase = {
  id: number
} & KeyDatabaseInput
