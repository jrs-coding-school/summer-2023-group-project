import { Paper } from "@mui/material";
import { Map, Marker } from "pigeon-maps";
import {
  getToken,
  isUserLoggedIn,
  setToken,
  clearToken,
} from "../../utility/utils";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useParams } from 'react-router-dom'
import { useEffect , useState } from 'react'


function Home(props) {

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)
  const { userId } = useParams()

  useEffect(() => {
    fetch(`http://localhost:9000/users/id/1`)
      .then((response) => {
        if(!response.ok) {
          throw new Error('failed to fetch data')
        }
        return response.json() // parse the response data
      })
      .then((result) => {
        setData(result)
    })
    
   // set state when the data received
      .catch((err) => err) // return the error
    
    }, [])
    
    if (!data) { // guard clause to prevent runtime errors
      return ( 
        <div>
          <div>Loading...</div>
        </div>
        )
    }
console.log(data)
console.log(data[0].zipcode)

fetch(`https://geocode.maps.co/search?postalcode=${data[0].zipcode}`)
      .then((response) => {
        if(!response.ok) {
          setError({status: response.status, statusText: response.statusText})
        }
        console.log(response)
        return response.json() // parse the response data
      })
      .then((result) => {
          setLat(result[1].lat)
          setLong(result[1].lon)
          console.log(result)
      }) 

  return (
    <Paper>
      {isUserLoggedIn() ? (
        <Map height={600} defaultCenter={[32.7765, -79.9311]} defaultZoom={13}>
          <Marker width={50} anchor={[32.7765, -79.9311]} />
        </Map>
      ) : (
        <Link to="/login">
          <Button
            sx={{
              // display: { xs: 'none', md: 'flex' },
              mr: 1,
              textDecoration: "none",
              color: "white",
              flex: "row-reverse",
            }}
          >
            Must Login to View Map
          </Button>
        </Link>
      )}
    </Paper>
  );
}

export default Home;
