//Imports
const {getAllCrimes, getById} = require('./service')

//Logic
exports.index = async (req, res) => {
    //Get all crimes from the service
  const allCrimes = await getAllCrimes()
    //Return all Crimes as a response to the client  
    return res.json(allCrimes)
}


exports.showById = (req, res) => {
// console.log('crime id', req.params.id)
  const id = req.params.id
    //Get crime by ID
  const foundCrime = getById(id)
  //take in client input of ID
  return res.json(foundCrime)
  }
  