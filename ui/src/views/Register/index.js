import { Grid } from "@mui/material";
import { register } from "../../utility/api";
import { setToken } from "../../utility/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const [userData, setUserdata] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    zipcode: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    setUserdata({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    //check all fields filled
    //check email is valid using regex
    //check password meets requirments
    //check both passwords match
    //check username and email have not been used
    //if already used tell user
    if ((userData.username.length = 0 || userData.username.length < 3)) {
      console.log("Please enter a username with more than 3 characters");
    }
    if ((userData.firstname.length = 0)) {
      console.log("Please enter firstname");
    }
    if ((userData.lastname.length = 0)) {
      console.log("Please enter lastname");
    }
    if ((userData.email.length = 0)) {
      console.log("Please enter email");
    }
    if (userData.zipcode.length < 5) {
      console.log("Please enter zipcode");
    }
    if ((userData.password.length = 0)) {
      console.log("Please enter password");
    }
    //check email is valid using regex

    //check password meets requirments
    if ((userData.password.length = 0 || userData.password.length < 8)) {
      console.log("Password must contain at least 8 Characters");
    }
    try {
      const token = await register(userData);
      //submit users token to jwt utility
      setToken(token);
      //redirect user to success page
      // 👇 Redirects to about page, note the `replace: true`
    } catch (error) {
      console.log(error);
    }
    //if api post works, redirect to success page
    navigate("/register/success", { replace: true });
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
