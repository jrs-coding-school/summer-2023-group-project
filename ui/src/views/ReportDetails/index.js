import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { getReportById } from "../../utility/api";
import { useParams } from "react-router-dom";

function ReportDetails(props) {
  const [reportDetails, setReportDetails] = useState();
  console.log(reportDetails);
  // hardcoding id to 1, should get id from map tooltip
  const params = useParams();
  const reportId = params.id;

  useEffect(() => {
    const getReportDetails = async () => {
      try {
        const reportData = await getReportById(reportId);
        console.log("details", reportData);
        setReportDetails(reportData);
      } catch (error) {
        console.log(error);
      }
    };
    getReportDetails();
  }, [params]);

  if (!reportDetails) {
    return <div>Loading...</div>;
  }
  // type of crime, location, date and time, severity and description of crime from the witness report
  return (
    <Paper>
      <div>{reportDetails[0].address}</div>
      <div>{reportDetails[0].city}</div>
      <div>{reportDetails[0].zipcode}</div>
      <div>{reportDetails[0].state}</div>
      <div>{reportDetails[0].description}</div>
      <div>{reportDetails[0].isGoing}</div>
      <div>{reportDetails[0].datetime}</div>
    </Paper>
  );
}

export default ReportDetails;
