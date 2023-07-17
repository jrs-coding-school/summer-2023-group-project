import { getToken } from "./utils";
//The base url of the API, can be changed in the .env file
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:9000";

/**
 * Sends a login request to the api for a user with the provided username and password.
 *
 * @async
 * @function
 * @param {Object} data - An object containing the user's login credentials.
 * @param {string} data.username - The user's username.
 * @param {string} data.password - The user's password.
 * @returns {Promise<Object>} - A promise that resolves with the user's data.
 * @throws {Error} - Throws an error if there was an issue with the login request.
 */
export const login = async (data) => {
  const { username, password } = data;

  const response = await fetch(`${baseUrl}/users/login`, {
    method: "POST",
    headers: new Headers({
      Authorization: `Basic ${btoa(`${username}:${password}`)}`, //btoa is only deprecated in Node.js not in browser environments!
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      `Status Code: ${response?.status} - ${responseData?.message}`
    );
  }

  return responseData;
};

/**
 * Sends a registration request to the api for a user with the provided data.
 *
 * @async
 * @function
 * @param {Object} data - An object containing the user's data require to create an account.
 * @param {string} data.username - The user's username
 * @param {string} data.password - The user's password
 * @param {*} data.[...] - Any additional user data required for account creation
 * @returns {Promise<Object>} - A promise that resolves with the user's data.
 * @throws {Error} - Throws an error if there was an issue with the login request.
 */
export const register = async (data) => {
  console.log(data);
  const response = await fetch(`${baseUrl}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      `Status Code: ${response?.status} - ${responseData?.message}`
    );
  }

  return responseData;
};

export const getAllUsers = async (data) => {
  const token = getToken();
  if (!token) {
    throw new Error(`Missing User Token`);
  }

  const response = await fetch(`${baseUrl}/users/`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`, //Token is required for protected Routes
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      `Status Code: ${response?.status} - ${responseData?.message}`
    );
  }

  return responseData;
};

export const getReportById = async (id) => {
  const response = await fetch(`${baseUrl}/reports/${id}`, {
    method: "GET",
  });

  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(
      `Status Code: ${response?.status} - ${responseData?.message}`
    );
  }

  return responseData;
};

export const createNewReport = async (reportData) => {
  const response = await fetch(`${baseUrl}/reports/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reportData),
  });

  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(
      `Status Code: ${response?.status} - ${responseData?.message}`
    );
  }
};

//Get Lat and Lon from Address
export const getCoordsByAddress = async (address,zip) => {
  const baseUrl = "https://geocode.maps.co/search?q=";
  const response = await fetch(`${baseUrl}${address}+${zip}`, {
    method: "GET",
  });
  const responseData = await response.json()
  const coords = {
    lat: responseData[0].lat,
    lon: responseData[0].lon,
  };
  console.log(coords)
  return coords;
};
//Get county from lat and lon
export const getCountyByCoords = async (lat, lon) => {
  const baseUrl = `https://geocode.maps.co/reverse?`;
  const response = await fetch(`${baseUrl}lat=${lat}&lon=${lon}`, {
    method: "GET",
  });
  const responseData = await response.json()
  return responseData.address.county;
};

export const getAllCrimes = async () => {
  const response = await fetch(`${baseUrl}/crimes/`)
  const responseData = await response.json()
  return responseData
}

export const getMe = async() => {

  const token = getToken()
  if (!token) {
    throw new Error(`Missing User Token`)
  }

  const response = await fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: new Headers({
      "Authorization": `Bearer ${token}` //Token is required for protected Routes
    }),
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(`Status Code: ${response?.status} - ${responseData?.message}`)
  }

  return responseData
}

export const getCoords = async (zipcode) => {

  const response = await fetch(`https://geocode.maps.co/search?postalcode=${zipcode}&country=USA`)

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(`failed to get coords`)
  }

  return responseData
}
