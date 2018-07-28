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
          isMarkerShown
          defaultZoom={11}
          defaultCenter={{ lat: 53.0793, lng: 8.8017}}
        >
          {props.isMarkerShown && <Marker position={{ lat: 53.0793, lng: 8.8017 }} />}

        </GoogleMap>

    )
  }
)


export default MapContainer
