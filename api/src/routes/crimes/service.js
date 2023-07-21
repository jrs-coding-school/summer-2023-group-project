const knex = require('../../knex.js')

exports.findAllCrimes = async (id) => {
  const results = await knex('crimes').select("*")
  return results
}
exports.findCrimeById = async (id) => {
  const results = await knex('crimes').select("*").where('id', id)
  return results
}
