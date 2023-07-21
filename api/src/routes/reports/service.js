const knex = require('../../knex.js')

exports.findReportById = async (id) => {
  const results = await knex('reports')
  .where('reports.id', id)
  .first('reports.id', 
  'reports.userId', 
  'reports.address', 
  'reports.zipcode', 
  'reports.city', 
  'reports.county', 
  'reports.state', 
  'reports.lat',
  'reports.lon',
  'reports.description',
  'reports.isOngoing',
  'reports.datetime',
  'crimes.subtype',
  'crimes.type',
  'crimes.points'
)
.innerJoin('crimes', 'crimes.id', '=', 'reports.crimeId')
 
  return results
}

exports.findReportByUserId = async (userId) => {
  const results = await knex('reports').select("*").where('userId', userId)
  return results
}

exports.addNewReport = async (newReport) => {
  const createdReport = await knex('reports').insert(newReport)
  return createdReport
}

//selects all reports from the reports table
exports.findAllReports = async () => {
    const reports = await knex('reports').select("*")
    console.log('reports: ', reports)
  
    return reports
  }
  //selects reports where input "county", from reports table
  exports.findReportsByCounty = async (county) => {
    console.log("county:", county)
    const countyReports = await knex('reports')
      .select('reports.id', 
        'reports.userId', 
        'reports.address', 
        'reports.zipcode', 
        'reports.city', 
        'reports.county', 
        'reports.state', 
        'reports.lat',
        'reports.lon',
        'reports.description',
        'reports.isOngoing',
        'reports.datetime',
        'crimes.subtype',
        'crimes.type',
        'crimes.points'
      )
      .where('county', county.trimStart())
      .innerJoin('crimes', 'crimes.id', '=', 'reports.crimeId')
    
    console.log('countyReports: ', countyReports)
  
    return countyReports
  }

  exports.modifyUserReports = async (reportData, id) => {
    // Insert the user into the database and return
    console.log(reportData)
    return await knex('reports').update(reportData).where('id', id) // return the data you need 
  }

  exports.destroyUserReport = async (id) => {
    const deletedUserReport = await knex("reports").delete().where("id", id);
    return deletedUserReport;
  };