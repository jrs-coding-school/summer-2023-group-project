import { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  getCoordsByAddress,
  getCountyByCoords,
  createNewReport,
} from "../../utility/api";
import { getToken } from "../../utility/utils";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { getAllCrimes, getMe } from "../../utility/api";
import {isUserLoggedIn} from "../../utility/utils";

//Create Text fields to Report Crime within
function ReportCrime(props) {
  //Hold the users input data
  const [crimeById, setCrimeById] = useState({});
  const [addressData, setAddressData] = useState("");
  const [cityData, setCityData] = useState("");
  const [stateData, setStateData] = useState("");
  const [zipData, setZipData] = useState("");
  const [countyData, setCountyData] = useState("");
  const [details, setDetails] = useState("");
  const [ongoing, setOngoing] = useState();
  const [crimes, setCrimes] = useState();
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [dateTime, setDateTime] = useState();


  //Get all crimes
  useEffect(() => {
    if (isUserLoggedIn()) {
      const fetchData = async () => {
        const user = await getMe()
        console.log("USER:", user)
        }
      fetchData()
    }
  }, [])

  useEffect(() => {
    const getCrimes = async () => {
      const crimes = await getAllCrimes();
      setCrimes(crimes);
          return crimes;
        };
        getCrimes();
  }, [])
  //   const getCrimes = async () => {
  //     const crimes = await getAllCrimes();
  //     setCrimes(crimes);
  //     return crimes;
  //   };
  //   fetchData()
  //   getCrimes();
   
  // }


  //Function Logic
  const handleSubmit = async (event) => {
    //console.log(addressData, cityData, stateData, zipData, details, personalInformation, additionalInformation)

    setAddressData(addressData);
    setCityData(cityData);
    setStateData(stateData);
    setZipData(zipData);
    setDetails(details);
    const coords = await getCoordsByAddress(addressData, zipData);
    setLat(coords.lat);
    setLon(coords.lon);
    const county = await getCountyByCoords(lat, lon);
    setCountyData(county);

    const userId = user.id;
    const reportData = {
      userId: userId,
      address: addressData,
      zipcode: zipData,
      city: cityData,
      county: countyData,
      state: stateData,
      lat: lat,
      lon: lon,
      description: details,
      isOngoing: ongoing,
      crimeId: crimeById,
      datetime: dateTime,
    };
    console.log(reportData);
    createNewReport(reportData);
  };
  if (!crimes) {
    return <>Loading Crimes...</>;
  }
  return (
    <Box sx={{ width: "500", height: "300", padding: "20px" }}>
      <div>
        <h1> Submit a Crime Tip </h1>
        <TextField
          label="Address or Location"
          onChange={(e) => setAddressData(e.target.value)}
          value={addressData}
          id="outlined-start-adornment"
          name="additionalInformation"
          fullWidth
          sx={{ m: 1 }}
        />
        <br></br>
        <br></br>
        <TextField
          label="City"
          onChange={(e) => setCityData(e.target.value)}
          value={cityData}
          id="outlined-start-adornment"
          name="additionalInformation"
          fullWidth
          sx={{ m: 1 }}
        />
        <br></br>
        <br></br>
        <TextField
          label="State"
          onChange={(e) => setStateData(e.target.value)}
          value={stateData}
          id="outlined-start-adornment"
          name="additionalInformation"
          fullWidth
          sx={{ m: 1 }}
        />
        <br></br>
        <br></br>
        <TextField
          label="Zipcode"
          onChange={(e) => setZipData(e.target.value)}
          value={zipData}
          id="outlined-start-adornment"
          name="additionalInformation"
          fullWidth
          sx={{ m: 1 }}
        />
        <TextField
          label="Description of Crime"
          onChange={(e) => setDetails(e.target.value)}
          value={details}
          id="outlined-start-adornment"
          name="additionalInformation"
          fullWidth
          sx={{ m: 1 }}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Is this crime ongoing?
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="ongoing"
            onChange={(e) => setOngoing(e.target.value)}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
        <br></br>
        <br></br>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            What type of crime?
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="ongoing"
            onChange={(e) => setCrimeById(e.target.value)}
          >
            {crimes.map((crime) => {
              return <MenuItem value={crime.id}>{crime.subtype}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <br></br>
        <br></br>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              label="Basic date time picker"
              onChange={(event) => setDateTime(event)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <br></br>
      <Button variant="contained" type="submit" onClick={() => handleSubmit()}>
        Submit
      </Button>
    </Box>
  );
}

export default ReportCrime;
