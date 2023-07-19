require('dotenv').config()

const { findAllReports, findReportsByCounty } = require('./service')

exports.showAllReports = async (req, res) => {
    try {
      const allReports = await findAllReports(req.params)
      console.log('allReports: ', allReports)
      return res.json(allReports)
  
    } catch (error) {
      console.log(error)
      return res.status(500).json()
    }
  }
  
  exports.showCountyReports = async (req, res) => {
    console.log(req.params.county)
    try {
      const countyReports = await findReportsByCounty(req.params.county)
      console.log('countyReports: ', countyReports)
      return res.json(countyReports)
  
    } catch (error) {
      console.log(error)
      return res.status(500).json()
    }
  }
  