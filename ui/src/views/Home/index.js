import { Map, Marker, ZoomControl, Overlay } from "pigeon-maps"
import { isUserLoggedIn } from "../../utility/utils"
import { Fragment, useEffect, useState } from "react"
import {
  getMe,
  getCoords,
  getReportsByCounty,
  getLocationByAddress,
} from "../../utility/api"
import { TextField, Button, Paper } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import MarkerTooltip from "./MarkerTooltip"

function Home(props) {
  const [coords, setCoords] = useState(null)
  const [zoom, setZoom] = useState(4)
  const [reports, setReports] = useState(null)
  const [address, setAddress] = useState("")
  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (isUserLoggedIn()) {
      const fetchData = async () => {
        const user = await getMe()
        console.log(user.zipcode)
        const coords = await getCoords(user.zipcode)
        console.log("coords: ", coords)
        console.log(((parseFloat(coords[0].boundingbox[0]) + parseFloat(coords[0].boundingbox[1]))) / 2)
        console.log(coords[0].boundingbox)
        const lat = ((parseFloat(coords[0].boundingbox[0]) + parseFloat(coords[0].boundingbox[1])) / 2)
        const lon = ((parseFloat(coords[0].boundingbox[2]) + parseFloat(coords[0].boundingbox[3])) / 2)
        setCoords([lat, lon])
        setZoom(13)
        const county = coords[0].display_name.split(",")[1]
        console.log("county: ", county)
        const foundReports = await getReportsByCounty(county)
        console.log("foundReports: ", foundReports)
        setReports(foundReports)
      }
      fetchData()
    }
  }, [])

  const handleBoundsChanged = (e) => {
    setCoords(e.center)
    setZoom(e.zoom)
  }
  const handleSearch = async () => {
    const location = await getLocationByAddress(address)
    console.log("location:", location)
    const getCounty = (locationArray, index = 0) => {
      if (locationArray[index] === undefined) {
        console.error("No County found")
        return ""
      }
      // check if the location is in format city, county, state, country
      if (locationArray[index].display_name.split(",").length !== 4) {
        return getCounty(locationArray, index + 1)
      }
      // set new map coords
      setCoords([locationArray[index].lat, locationArray[index].lon])
      // return the county
      return locationArray[index].display_name.split(",")[1]
    }

    const county = getCounty(location)
    console.log(county)
    const foundReports = await getReportsByCounty(county)
    console.log("foundReports: ", foundReports)
    setReports(foundReports)
  }

  console.log("coords state:", coords)

  return (
    <Paper>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button
        variant="contained"
        endIcon={<SearchIcon />}
        onClick={handleSearch}
      />
      <Map
        height={600}
        center={!coords ? [39.5, -98.35] : coords}
        zoom={zoom}
        onBoundsChanged={(e) => handleBoundsChanged(e)}
        onClick={({event, latLng, pixel}) => {
          console.log(event)
          // prevent closing marker if the map is not clicked
          if (event.target.className === "pigeon-overlays") {
            setOpen(null)
          }
        }}
      >
        {!reports
          ? null
          : reports.map((report) => {
              console.log("report: ", report)
              return (
                <MarkerTooltip
                  open={open}
                  setOpen={setOpen}
                  anchor={[parseFloat(report.lat), parseFloat(report.lon)]}
                  report={report}
                />
              )
            })}
        <ZoomControl />
      </Map>
    </Paper>
  )
}

export default Home
