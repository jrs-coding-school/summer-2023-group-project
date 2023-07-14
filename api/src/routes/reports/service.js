const knex = require('../../knex.js')

exports.findReportById = async (id) => {
  const results = await knex('reports').select("*").where('id', id)
  return results
}
