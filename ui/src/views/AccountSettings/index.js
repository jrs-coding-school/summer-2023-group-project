import { Button, Grid, Stack, Typography } from "@mui/material";
import { updateUserById, deleteMe, getMe } from "../../utility/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../../utility/utils";

function AccountSettings(props) {
  const [userData, setUserdata] = useState({
   
  });
  const [validationErrorArray, setValidationErrorArray] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUserdata({ ...userData, [event.target.name]: event.target.value });
  };

  const validateInput = () => {
    //check email is valid using regex
    const validationArray = []
    const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (userData.username === true && userData.username.length > 0 && userData.username.length < 3) {
      const errorMsg = "Please enter a username with more than 3 characters";
      validationArray.push(errorMsg)
    }
    
    //check if zipcode is valid
     if (userData.zipcode === true && userData.zipcode.length > 0 && userData.zipcode.length < 5) {
      const errorMsg = "Please enter valid zipcode";
      validationArray.push(errorMsg)
    }
    //check password meets requirments
     if (userData.password === true && userData.password.length > 0 && userData.password.length < 8) {
      const errorMsg = "Password must contain at least 8 Characters";
      validationArray.push(errorMsg)
    }
    //check email is valid using regex
    if (userData.email === true && userData.email > 0 && !userData.email.match(validEmailRegex)) {
      const errorMsg = "Please enter valid email";
      validationArray.push(errorMsg)
    } 
    if(validationArray.length > 0){
      setValidationErrorArray(validationArray)
      return false
    } else {
      return true
    }
  };

  const deleteAccount = async () =>{
    const me = await getMe()
    deleteMe(me.id)
    clearToken(getToken())
    navigate('/')
  }

  const handleSubmit = async (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    setValidationErrorArray([]);
    let validatedInput = validateInput();
    if (validatedInput === true) {
      try {
        await updateUserById(userData);
      } catch (error) {
        console.log(error);
      }
      //if api post works, redirect to success page
     navigate("/");
    }
  };

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        padding={"20px"}
        sx={{ border: "solid black 2px" }}
      >
        <form onSubmit={handleSubmit}>
          <Grid item xs={8}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
              />
            </label>
          </Grid>
          <Grid item xs={8}>
            <label>
              First Name:
              <input
                type="text"
                name="firstname"
                value={userData.firstname}
                onChange={handleChange}
              />
            </label>
          </Grid>
          <Grid item xs={8}>
            <label>
              Last Name:
              <input
                type="text"
                name="lastname"
                value={userData.lastname}
                onChange={handleChange}
              />
            </label>
          </Grid>
          <Grid item xs={8}>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </label>
          </Grid>
          <Grid item xs={8}>
            <label>
              Bio:
              <input
                type="text"
                name="bio"
                value={userData.bio}
                onChange={handleChange}
              />
            </label>
          </Grid>
          <Grid item xs={8}>
            <label>
              Zip Code:
              <input
                type="text"
                name="zipcode"
                value={userData.zipcode}
                onChange={handleChange}
              />
            </label>
          </Grid>
          <Grid item xs={8}>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </label>
          </Grid>
          <Stack>
          <Button type="submit" value="Update Account">Update Account</Button>
          <Button onClick={deleteAccount}>Delete Account</Button>
          </Stack>
        </form>
        <Grid item xs={8}>
          {validationErrorArray.map((e) => {
            return <Typography color={"red"}>{e}</Typography>;
          })}
        </Grid>
      </Grid>
    </div>
  );
}

export default AccountSettings;
