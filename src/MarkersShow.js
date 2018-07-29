import React, { Component } from 'react'
import { Marker, InfoWindow } from "react-google-maps"

class MarkersShow extends Component {
  state = {
    show: false
  }
  showInfo = () => {
    this.props.updateInfoMarker(this.props.marker.id, true)
    this.setState({show: true})
    this.props.updateLocationStyle(this.props.marker.id, {backgroundColor: 'yellow'})
  }
  closeInfo = () => {
    this.props.updateInfoMarker(this.props.marker.id, false)
    this.setState({show: false})
    this.props.updateLocationStyle(this.props.marker.id, {backgroundColor: 'red'})
  }
  render() {
    return(
      <div>
          <Marker
            position={this.props.marker.position}
            onMouseOver={this.showInfo}
            onMouseOut={this.closeInfo}
          >
            {this.props.marker.info === true &&
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
