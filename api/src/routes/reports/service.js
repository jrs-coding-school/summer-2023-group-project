const knex = require('../../knex.js')

exports.findReportById = async (id) => {
  const results = await knex('reports').select("*").where('id', id)
  return results
}
exports.addNewReport = async (newReport) => {
  const createdReport = await knex('reports').insert(newReport)
  return createdReport
}