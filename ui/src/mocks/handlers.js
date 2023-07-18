import { rest } from 'msw'
import mockReportData from '../mocks/data/mockReportData.json'


export const handlers = [
  rest.get(`http://localhost:9000/reports/:id`, (req, res, ctx) => { // capture "GET /greeting" requests
    return res(ctx.json(mockReportData)) // respond using a mocked JSON body
  }),
  // rest.get('/farewell', (req, res, ctx) => { // capture "GET /greeting" requests
  //   return res(ctx.json({farewell: 'goodbye there'})) // respond using a mocked JSON body
  // }),
]