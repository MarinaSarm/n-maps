import React, { Component } from 'react'
import { Marker, InfoWindow } from "react-google-maps"

class MarkersShow extends Component {
  state = {
    info: this.props.marker.info
  }
  toggleMarkers = () => {
    let infoState = this.state.info
    infoState = infoState === true ? false : true
    this.setState({info: infoState})
  }
  showInfo = () => {
    this.setState({info: true})
    this.props.passId(this.props.marker.id)
    this.props.updateInfoMarker(this.props.marker.id, this.state.info)
  }
  closeInfo = () => {
    this.setState({info: false})
    this.props.passId('')
    this.props.updateInfoMarker(this.props.marker.id, this.state.info)
  }
  render() {
    return(
      <div>
          <Marker
            position={this.props.marker.position}
            onClick={this.toggleMarkers}
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
