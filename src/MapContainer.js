import React from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs, InfoWindow, Animation } from "react-google-maps"
import { compose } from 'recompose'
import MarkersShow from './MarkersShow'

/*
* code followed documentation for react-google-maps https://tomchentw.github.io/react-google-maps/
*/
const MapContainer = compose(
  withScriptjs,
  withGoogleMap
)((props) => {
    return (
        <GoogleMap
          defaultZoom={12}
          defaultCenter={{ lat: 53.0793, lng: 8.8017}}
        >
        {props.showingMarkers.map((marker) => (
          <MarkersShow
            key={marker.id}
            showInfoToggle={props.showInfoToggle}
            showingMarkers={props.showingMarkers}
            markers={props.markers}
            marker={marker}
            updateInfoMarker={props.updateInfoMarker}
            updateLocationStyle={props.updateLocationStyle}
          />
          ))
        }
        </GoogleMap>
    )
  }
)


export default MapContainer
