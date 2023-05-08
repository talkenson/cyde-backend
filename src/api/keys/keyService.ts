import { Router, RouterContext } from 'oak'
import { PassphraseInput } from '../../types/Passphrase.ts'
import { addKey } from './useCase/addKey.ts'
import { extractKey } from './useCase/extractKey.ts'
import { listKeys } from './useCase/listKeys.ts'

export const keysRouter = new Router()
  .get('/', (ctx) => {
    ctx.response.body = keyService(ctx)
  })
  .get('/list', (ctx) => {
    ctx.response.body = listKeys()
  })
  .post('/add', async (ctx) => {
    const payload = await ctx.request.body().value as PassphraseInput
    const keyPayload = extractKey(payload)
    ctx.response.body = addKey(keyPayload)
  })

export const keyService = (context: RouterContext<'/'>) => {
  return 'ok'
}
