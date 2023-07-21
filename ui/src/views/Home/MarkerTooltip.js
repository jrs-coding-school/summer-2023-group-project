
import { Fragment, useState, useEffect } from "react"
import { Marker, Overlay } from "pigeon-maps"
import { Stack, Typography} from "@mui/material"

const height = 150
const width = 300
const markerSize = 25

const Tooltip = ({ left, top, style, children }) => (
  <div style={{
    position: 'absolute',
    left: left-(width/2),
    top: top-(height+markerSize),
    ...(style || {})
  }}>{children}</div>
)


const MarkerTooltip = (props) => {
  const {
    anchor,
    open,
    setOpen,
    report
  } = props
  console.log(report)

  console.log(anchor )
  return (
    <Fragment>
      {open !== report.id ? null : 
        <Tooltip {...props}       style={{
          width: width,
          height: height,
          background: 'white',
          borderRadius: "20px"
        }}>
          <Stack direction="column" spacing={2} sx={{textAlign: "center"}}>
            <Typography>{report.subtype}</Typography>
            <Typography>{report.address}</Typography>
            <Typography>{report.datetime}</Typography>
          </Stack>

        </Tooltip>
      }
      <Marker {...props} width={markerSize} onClick={() => setOpen(report.id)}/>
      </Fragment>
  
  )
}

export default MarkerTooltip