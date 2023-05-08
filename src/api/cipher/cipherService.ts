import { Router, RouterContext } from 'oak'
import { CipheredMessage, Message } from '$types/Message.ts'
import { encodeText } from './useCase/encodeText.ts'
import { decodeText } from './useCase/decodeText.ts'

export const cipherRouter = new Router()
  .get('/', (ctx) => {
    ctx.response.body = cipherService(ctx)
  })
  .post('/try', async (ctx) => {
    const payload = await ctx.request.body().value as CipheredMessage
    const decodedPayload = decodeText(payload)
    ctx.response.body = decodedPayload
  })
  .post('/encode', async (ctx) => {
    const payload = await ctx.request.body().value as Message
    const encodedPayload = encodeText(payload)
    ctx.response.body = encodedPayload
  })

export const cipherService = (context: RouterContext<'/'>) => {
  return 'ok'
}
