import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getReportById, getCrimeById } from "../../utility/api";
import { useParams } from "react-router-dom";

function ReportDetails(props) {
  const [reportDetails, setReportDetails] = useState();
  const params = useParams();
  const reportId = params.id;
  console.log("reportId: ", reportId)

  useEffect(() => {
    const getReportDetails = async () => {
      try {
        const reportData = await getReportById(reportId);
        console.log("reportData ", reportData)
        setReportDetails(reportData);
      } catch (error) {
        console.log(error);
      }
    };
    getReportDetails();
  }, []);

  const convertDate = (datetime) => {
    const convertedDatetime = new Date(datetime).toLocaleString();
    return convertedDatetime;
  };

  if (!reportDetails) {
    return <div>Loading...</div>;
  }
  // type of crime, location, date and time, severity and description of crime from the witness report
  return (
    <Paper
      sx={{
        textAlign: "center",
        border: "1px black solid",
        margin: "30px",
        marginBottom: "30px",
        padding: "10px",
        backgroundColor: 'whitesmoke'
      }}
    >
      <Typography sx={{fontSize: '20px'}}>There was a <i><b><div style={{'color': 'red'}}>{reportDetails.subtype}</div></b></i> on <i><b>{convertDate(reportDetails.datetime)}</b></i></Typography>
      <div>at <i><b>{reportDetails.address}, {reportDetails.city}, {reportDetails.zipcode}, {reportDetails.state}</b></i></div>
      <Typography sx={{fontSize: '18px', fontWeight: 'bold', textDecoration: 'underline', marginTop: '15px'}}>Description of Crime:</Typography>
      <Typography>{reportDetails.description}</Typography>
      {reportDetails.isOngoing ? <div style={{'color': 'red'}}>This Crime is in Progress</div> : <div style={{'color': 'green'}}>This Crime is No Longer in Progress</div>}
    </Paper>
  );
}

export default ReportDetails;
