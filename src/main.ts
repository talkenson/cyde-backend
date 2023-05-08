import { Application, Router } from 'oak'
import { keysRouter } from '@api/keys/keyService.ts'
import { onExitDatabase } from '@tools/initDatabase.ts'
import { cipherRouter } from '@api/cipher/cipherService.ts'

const PORT = 4343
const app = new Application()

// Logger
app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.headers.get('X-Response-Time')
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`)
})

// Timing
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.response.headers.set('X-Response-Time', `${ms}ms`)
})

const router = new Router()

router
  .get('/', (context) => {
    context.response.body = 'Welcome to Bwer'
  })
  .all('/keys', keysRouter.routes(), keysRouter.allowedMethods())
  .all('/cipher', cipherRouter.routes(), cipherRouter.allowedMethods())

app.use(router.routes())
app.use(router.allowedMethods())

const abortController = new AbortController()

console.log('Listening on port', PORT)
app.listen({ port: PORT, signal: abortController.signal })

globalThis.addEventListener('unload', () => abortController.abort())
globalThis.addEventListener('unload', () => onExitDatabase.dispose())
