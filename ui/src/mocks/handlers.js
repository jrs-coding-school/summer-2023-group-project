import { rest } from 'msw'
import mockUserData from '../mocks/data/mockUserData.json'

export const handlers = [
  rest.get('http://localhost:9000/users/', (req, res, ctx) => { // capture "GET /greeting" requests
    return res(ctx.json(mockUserData)) // respond using a mocked JSON body
  }),
  // rest.get('/farewell', (req, res, ctx) => { // capture "GET /greeting" requests
  //   return res(ctx.json({farewell: 'goodbye there'})) // respond using a mocked JSON body
  // }),
]