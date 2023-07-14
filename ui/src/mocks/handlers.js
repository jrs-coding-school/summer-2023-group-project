import { rest } from 'msw'
import mockUserData from '../mocks/data/mockUserData.json'
import mockSingleUserData from '../mocks/data/mockSingleUserData.json'

export const handlers = [
  rest.get('http://localhost:9000/users/', (req, res, ctx) => { // capture "GET /greeting" requests
    return res(ctx.json(mockUserData)) // respond using a mocked JSON body
  }),
  rest.get('http://localhost:9000/users/id/1', (req, res, ctx) => { // capture "GET /greeting" requests
    return res(ctx.json(mockSingleUserData)) // respond using a mocked JSON body
  }),
]