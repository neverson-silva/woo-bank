import '@/infra/config/database'

import { createSchema, createYoga } from 'graphql-yoga'
import Koa from 'koa'
import { schema } from '@/schema'
import { useJWT } from '@graphql-yoga/plugin-jwt'

const app = new Koa()

const yoga = createYoga<Koa.ParameterizedContext>({
  schema: createSchema(schema),
  landingPage: false,
  plugins: [
    useJWT({
      issuer: 'https://woovi.com.br',
      signingKey: process.env.JWT_SECRET_KEY!.trim(),
      algorithms: ['HS256'],
    }),
  ],
})

app.use(async (ctx) => {
  const response = await yoga.handleNodeRequestAndResponse(ctx.req, ctx.res, ctx)
  ctx.status = response.status
  response.headers.forEach((value, key) => {
    ctx.append(key, value)
  })
  ctx.body = response.body
})

app.listen(process.env.port || 4000, () => {
  console.log(`Running a GraphQL API server at http://localhost:4000/${yoga.graphqlEndpoint}`)
})
