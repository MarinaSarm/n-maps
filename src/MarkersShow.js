import React, { Component } from 'react'
import { Marker, InfoWindow } from "react-google-maps"
import './MarkersShow.css'
import ShowInfo from './ShowInfo'

class MarkersShow extends Component {
  state = {
    show: false,
    animation: 2
  }
  toggleInfo = () => {
    if (this.state.show === true) {
      this.props.updateInfoMarker(this.props.marker.id, false, null)
      this.setState({show: false, animation: null})
      this.props.updateLocationStyle(this.props.marker.id, {backgroundColor: 'red'})
    } else {
      this.props.updateInfoMarker(this.props.marker.id, true, 1)
      this.setState({show: true, animation: 1})
      this.props.updateLocationStyle(this.props.marker.id, {backgroundColor: 'yellow'})
    }
  }
  render() {
    return(
      <div>
          <Marker
            position={this.props.marker.position}
            onClick={this.toggleInfo}
            animation={this.props.marker.animation}
          >
            {this.props.marker.info === true &&
              <InfoWindow
                showingLocations={this.props.showingLocations}
                marker={this.props.marker}
                keysAPI={this.props.keysAPI}
              >
                <ShowInfo
                  showingLocations={this.props.showingLocations}
                  marker={this.props.marker}
                  keysAPI={this.props.keysAPI}
                />
              </InfoWindow>
            }
          </Marker>
      </div>
    )
  }
}

export default MarkersShow
