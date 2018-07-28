import React, { Component } from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import { compose, withProps } from 'recompose'

//code followed documentation for react-google-maps https://tomchentw.github.io/react-google-maps/
const MapContainer = compose(
  withScriptjs,
  withGoogleMap
)((props) => {
    return (
        <GoogleMap
          defaultZoom={11}
          defaultCenter={{ lat: 53.0793, lng: 8.8017}}
        >
          {props.isMarkerShown && props.markers.map((marker) => <Marker key={marker.id} position={marker.position} />)}

        </GoogleMap>

    )
  }
)


export default MapContainer
