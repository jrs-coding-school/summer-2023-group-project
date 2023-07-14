require('dotenv').config()

const { findReportById } = require('./service')


exports.showReportById = async (req, res) => {
  try {

    // Only allow admins and account owners to access the user data
    const foundReport = await findReportById(req.params.id)

    if (!foundReport) {
      return res.status(404).json('No User Found')
    }
    
    return res.json(foundReport)
  } catch (error) {
    console.log(error)
    return res.status(500).json()
  }

}


