import { Paper } from "@mui/material";
import { Map, ZoomControl } from "pigeon-maps";
import {
  isUserLoggedIn,
} from "../../utility/utils";
import { useEffect , useState } from 'react'
import { getMe, getCoords } from "../../utility/api";

function Home(props) {

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [coords, setCoords] = useState(null)
  const [zoom, setZoom] = useState(4)

  useEffect(() => {
    if (isUserLoggedIn()) {
      const fetchData = async () => {
        const user = await getMe()
        const coords = await getCoords(user.zipcode)
        const lat = ((parseFloat(coords[0].boundingbox[0])+parseFloat(coords[0].boundingbox[1]))/2)
        const lon = ((parseFloat(coords[0].boundingbox[2])+parseFloat(coords[0].boundingbox[3]))/2)
        setCoords([lat, lon])
        setZoom(11)
        const county = coords[0].display_name.split(',')[1]
        // const reports = await getReportsByCounty(county)
      }
      fetchData()
    
    }
  }, [])


  const handleBoundsChanged = (e) => {
    setCoords(e.center)
    setZoom(e.zoom)
  }

  return (
    <Paper>
      <Map height={600} center={!coords ? [39.50, -98.35] : coords} zoom={zoom} onBoundsChanged={(e) => handleBoundsChanged(e)}>
        {/* <Marker width={50} anchor={[32.7765, -79.9311]} /> */}
        <ZoomControl/>
      </Map>
    </Paper>
  );
}

export default Home;
