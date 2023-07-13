import { Grid } from "@mui/material";
import { register } from "../../utility/api";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function Register(props) {
  const [userData, setUserdata] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    zipcode: "",
    password: "",
  });

  const handleChange = (event) => {
    setUserdata({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    try {
      await register(userData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    <Grid container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    padding={"20px"}
    sx={{ border: 'solid black 2px'}}>
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
        <input type="submit" value="Submit" />
      </form>
    </Grid>
    </div>
  );
}

export default Register;
