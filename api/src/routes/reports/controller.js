require('dotenv').config()

const { findAllReports, findReportsByCounty, findReportById, addNewReport, findReportByUserId, modifyUserReports, destroyUserReport} = require('./service')

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

exports.showReportByUserId = async (req, res) => {
  try {

    // Only allow admins and account owners to access the user data
    const foundReport = await findReportByUserId(req.params.userId)

    if (!foundReport) {
      return res.status(404).json('No User Found')
    }
    
    return res.json(foundReport)
exports.createNewReport = async (req, res) => {
  try {

    const newReport = req.body
    // Only allow admins and account owners to access the user data
    const report = await addNewReport(newReport)
    return res.json(report)
  } catch (error) {
    console.log(error)
    return res.status(500).json()
  }

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

  exports.updateUserReports = async (req, res) => {
    const reportId = req.params.id
    const newReportData = req.body
    console.log("user", req.user)
    try {

      const reportData = await findReportById(reportId)

      // Only allow users to edit their own reports unless the user is an admin
      if (req.user.id !== reportData.userId && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'You do not have permission to access this resource' })
      }
  
      const updatedUserReport =  await modifyUserReports(newReportData, reportId)
      return res.json(updatedUserReport)
  
    } catch (error) {
      console.log(error)
      return res.status(500).json()
    }
  }

  exports.deleteUserReport = async (req, res) => {
    const reportId = req.params.id
    try {
      console.log("reportId:", reportId)
      const reportData = await findReportById(reportId)
      console.log("reportData:", reportData)
      // Only allow admins to access the user list
      if (req.user.id !== reportData.userId && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'You do not have permission to access this resource' })
      }
  
      const deletedUserReport = await destroyUserReport(reportId)
      return res.json(deletedUserReport)
  
    } catch (error) {
      console.log(error)
      return res.status(500).json()
    }
  }
