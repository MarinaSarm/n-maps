import React, { Component } from 'react'
import { Marker, InfoWindow, Animation } from "react-google-maps"
import './MarkersShow.css'

class MarkersShow extends Component {
  state = {
    show: false,
    animation: 2
  }
  showInfo = () => {
    this.props.updateInfoMarker(this.props.marker.id, true, 1)
    this.setState({show: true, animation: 1})
    this.props.updateLocationStyle(this.props.marker.id, {backgroundColor: 'yellow'})
  }
  closeInfo = () => {
    this.props.updateInfoMarker(this.props.marker.id, false, null)
    this.setState({show: false, animation: null})
    this.props.updateLocationStyle(this.props.marker.id, {backgroundColor: 'red'})
  }
  render() {
    return(
      <div>
          <Marker
            position={this.props.marker.position}
            onMouseOver={this.showInfo}
            onMouseOut={this.closeInfo}
            animation={this.props.marker.animation}
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
