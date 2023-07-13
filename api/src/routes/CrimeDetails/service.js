//Imports
const knex = require('../../knex.js')


//Logic
exports.getAllCrimes = async () => {
    //Get the Crimes from the database
const results = await knex('crimes').select('*')
    //Return all Crimes 
    return results
}

//Get by ID
exports.getCrimeById = async (id) => {
    //Get all crimes
const crime = await knex('crimes')
    .where('id', id)
    .first('*')
return crime
   }