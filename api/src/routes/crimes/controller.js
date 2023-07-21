require("dotenv").config()
const { findAllCrimes, findReportById, findCrimeById } = require("./service")

exports.getAllCrimes = async (req, res) => {
  try {
    // Only allow admins and account owners to access the user data
    const foundCrimes = await findAllCrimes()

    if (!foundCrimes) {
      return res.status(404).json("No User Found")
    }

    return res.json(foundCrimes)
  } catch (error) {
    console.log(error)
    return res.status(500).json()
  }
}
exports.showCrimeById = async (req, res) => {
  try {
    // Only allow admins and account owners to access the user data
    const foundCrime = await findCrimeById(req.params.id)

    if (!foundCrime) {
      return res.status(404).json("No User Found")
    }

    return res.json(foundCrime)
  } catch (error) {
    console.log(error)
    return res.status(500).json()
  }
}
