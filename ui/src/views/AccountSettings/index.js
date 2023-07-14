import { Grid, Typography } from "@mui/material";
import { updateUserById, deleteUserById } from "../../utility/api";
import { getToken } from "../../utility/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AccountSettings(props) {
  const [userData, setUserdata] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    bio: "",
    zipcode: "",
    password: "",
  });
  const [validationErrorArray, setValidationErrorArray] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUserdata({ ...userData, [event.target.name]: event.target.value });
  };

  const validateInput = () => {
    //check email is valid using regex
    const validationArray = [];
    const validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (userData.username.length > 0 || userData.username.length < 3) {
      const errorMsg = "Please enter a username with more than 3 characters";
      validationArray.push(errorMsg);
    }

    //check if zipcode is valid
    if (userData.zipcode.length > 0 || userData.zipcode.length < 5) {
      const errorMsg = "Please enter valid zipcode";
      validationArray.push(errorMsg);
    }
    //check password meets requirments
    if (userData.password.length > 0 || userData.password.length < 8) {
      const errorMsg = "Password must contain at least 8 Characters";
      validationArray.push(errorMsg);
    }
    //check email is valid using regex
    if (!userData.email.match(validEmailRegex)) {
      const errorMsg = "Please enter valid email";
      validationArray.push(errorMsg);
    }
    if (validationArray.length > 0) {
      setValidationErrorArray(validationArray);
      return false;
    } else {
      return true;
    }
  };

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  const deleteAccount = async (event) => {
    try {
      const token = parseJwt(getToken());
      const id = token.id;
      const response = await deleteUserById(id);
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    setValidationErrorArray([]);
    let validatedInput = validateInput();
    if (validatedInput === true) {
      try {
        const token = parseJwt(getToken());
        const id = token.id;
        console.log(id);
        await updateUserById(userData, id);
      } catch (error) {
        console.log(error);
      }
      //if api post works, redirect to success page
      // navigate("/register/success");
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
          <input type="submit" value="Update Account" />
        </form>
        <button onClick={deleteAccount}>Delete Account</button>
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
