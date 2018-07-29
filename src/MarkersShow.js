import React, { Component } from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs, InfoWindow } from "react-google-maps"

class MarkersShow extends Component {
  state = {
    info: false
  }
  toggleMarkers = () => {
    let infoState = this.state.info
    infoState = infoState == true ? false : true
    this.setState({info: infoState})
  }
  render() {
    return(
      <div>

          <Marker
            position={this.props.marker.position}
            onClick={this.toggleMarkers}
          >
            {this.state.info === true &&
              <InfoWindow>
                <h3>Info</h3>
              </InfoWindow>
            }
          </Marker>

      </div>
    )
  }
}

export default MarkersShow
