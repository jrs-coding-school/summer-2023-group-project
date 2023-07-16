import { Paper } from '@mui/material'
import {useState} from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'


//Create Text fields to Report Crime within
function About (props) {

  //Hold the users input data
  const [formData, setFormData] = useState({
    // address: '',
    // city: '',
    // state: '',
    // zip: '',
    // details: '',
    // personalInformation: '',
    // additionalInformation: ''
})
const [addressData, setAddressData] = useState('')
const [cityData, setCityData] = useState('')
const [stateData, setStateData] = useState('')
const [zipData, setZipData] = useState('')
const [details, setDetails] = useState('')
const [personalInformation, setPersonalInformation] = useState('')
const [additionalInformation, setAdditionalInformation] = useState('')
  
//Update the state of the form when the user types in an input
    
    
//Parses the user id from their given token
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
//Function Logic
const handleSubmit = (event) => {
  console.log(addressData, cityData, stateData, zipData, details, personalInformation, additionalInformation)
  // Process login logic
  setAddressData(addressData)
  setCityData(cityData)
  setStateData(stateData)
  setZipData (zipData)
  setDetails(details)
  //do this ^ all data
  const token = parseJwt(getToken())
  const userId = token.id
  const reportData = {
    "userId": userId,
    "address": addressData,
    "city": cityData,
    "state": stateData,
    "zipcode": zipData,
    "description": details
    //county
    //crimeId
    //lat
    //lon
    //isOngoing
    //datetime
  }
  createNewReport(reportData)
};
    return (
        <Box sx={{width:'500' , height:'300' }}>
        
         <div>
            <h1> Submit a Crime Tip </h1>
            <TextField
              label="Address or Location"
              onChange={(e) => setAddressData(e.target.value)}
              value={addressData}
              id="outlined-start-adornment"
              name="additionalInformation"
              fullWidth sx={{ m: 1}}/>
            <br></br>
            <br></br>
            <TextField
              label="City"
              onChange={(e) => setCityData(e.target.value)}
              value={cityData}
              id="outlined-start-adornment"
              name="additionalInformation"
              fullWidth sx={{ m: 1}}/>
            <br></br><br></br>
            <TextField
              label="State"
              onChange={(e) => setStateData(e.target.value)}
              value={stateData}
              id="outlined-start-adornment"
              name="additionalInformation"
              fullWidth sx={{ m: 1}}/>
            <br></br><br></br>
            <TextField
              label="Zipcode"
              onChange={(e) => setZipData(e.target.value)}
              value={zipData}
              id="outlined-start-adornment"
              name="additionalInformation"
              fullWidth sx={{ m: 1}}/>

            <br></br>
            <br></br>
            <Button variant="contained">Use My Current Location</Button>
            <br></br>
            <br></br>
            <TextField
              name='details'
              onChange={(e) => setDetails(e.target.value)}
              value={details} 
              label="Please include details like location, date, time, and descriptions of people involved"
              id="outlined-start-adornment"
              fullWidth sx={{ m: 1}}
              InputProps={{
                startAdornment: <InputAdornment position="start">
                    
                </InputAdornment>,
              }}
            />
             <br></br>
             <br></br>
            <TextField
              name="personalInformation"
              onChange={(e) => setPersonalInformation(e.target.value)}
              value={personalInformation}
              label="Would You Like to Provide Personal Information?"
              id="outlined-start-adornment"
              fullWidth sx={{ m: 1 }}
              InputProps={{
                startAdornment: <InputAdornment position="start">  
                </InputAdornment>,
              }}
            />
          <br></br>
          <br></br>
            <TextField
              label="Any Additional Information?"
              onChange={(e) => setAdditionalInformation(e.target.value)}
              value={additionalInformation}
              id="outlined-start-adornment"
              name="additionalInformation"
              fullWidth sx={{ m: 1}}
            />
          </div>
          <br></br>
          <Button
           variant="contained" type='submit'onClick={() => handleSubmit()}>Submit</Button>
        </Box>
      );
    }

export default About