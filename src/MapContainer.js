import React from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs, InfoWindow } from "react-google-maps"
import { compose } from 'recompose'

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
        {/*
        *  show markers on map
        */}
          {props.showingMarkers.map((marker) =>
            <Marker key={marker.id} position={marker.position}>
              <InfoWindow>
                <h3>Info</h3>
              </InfoWindow>
            </Marker>
          )}
        </GoogleMap>

    )
  }
)


export default MapContainer
