const knex = require('../../knex.js')


//selects all reports from the reports table
exports.findAllReports = async () => {
    const reports = await knex('reports').select("*")
    console.log('reports: ', reports)
  
    return reports
  }
  //selects reports where input "county", from reports table
  exports.findReportsByCounty = async (county) => {
    const countyReports = await knex('reports')
    .where('county: ', county)
    .first('*')
    console.log('countyReports: ', countyReports)
  
    return countyReports
  }
  