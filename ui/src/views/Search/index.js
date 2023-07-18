import { useEffect , useState } from 'react'
import { getReports } from '../../utility/api';
import { Paper } from '@mui/material';
import { Map, Marker } from 'pigeon-maps';





function Search(props) {

    const [report, setReport] = useState(null)
//get all reports 
    useEffect(() => { 

        const fetchReports = async () => {
            const allReports = await getReports()
            console.log("allReports: ", allReports)
            setReport(allReports)
          }

        fetchReports()
        
      }, [])
      
	//get list of reports by county
    //get coords for each report
    // display a marker for each individual report at the specified coords

  return (
    
		<Paper>	
            <Map height={600} center={[32.793511, -79.940295]}>
                <Marker 
                    width={50}
                    anchor={[32.793511, -79.940295]} 
                    />
            </Map>
        </Paper>
			
            
	);
}

export default Search