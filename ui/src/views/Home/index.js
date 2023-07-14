import { Paper } from '@mui/material'
import { Map, Marker } from "pigeon-maps"
import {getToken, isUserLoggedIn, setToken, clearToken} from '../../utility/utils'
import { Link} from 'react-router-dom'
import Button from '@mui/material/Button';
function Home (props) {
  return (
    <Paper>
      {isUserLoggedIn() ? <Map
       height={600} defaultCenter={[32.7765, -79.9311]} defaultZoom={13}>
      <Marker width={50} anchor={[32.7765, -79.9311]} />
    </Map>:<Link to='/login'><Button sx={{
										// display: { xs: 'none', md: 'flex' },
										mr: 1,
										textDecoration: 'none',
										color: 'white',
										flex: 'row-reverse',
									}}>Must Login to View Map</Button></Link> }
      
    </Paper>
  )
}

export default Home
