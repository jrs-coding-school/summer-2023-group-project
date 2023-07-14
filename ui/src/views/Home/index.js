import { Paper } from '@mui/material'
import { Map, Marker } from "pigeon-maps"
function Home (props) {
  return (
    <Paper>
      Home
      <Map
       height={300} defaultCenter={[32.7765, -79.9311]} defaultZoom={11}>
      <Marker width={50} anchor={[32.7765, -79.9311]} />
    </Map>
    </Paper>
  )
}

export default Home
