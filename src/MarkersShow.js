import React, { Component } from 'react'
import { Marker, InfoWindow } from "react-google-maps"
import './MarkersShow.css'
import ShowInfo from './ShowInfo'

class MarkersShow extends Component {
  state = {
    show: false,
    animation: 2,
    click: this.props.marker.click
  }
  /* function to indicate selected item in list and on map*/
  toggleInfo = () => {
    if (this.state.show === true) {
      this.props.updateInfoMarker(this.props.marker.id, false, null)
      this.setState({show: false, animation: null, click: false})
      this.props.updateLocationStyle(this.props.marker.id, {backgroundColor: 'red'}, false)
    } else {
      this.props.updateInfoMarker(this.props.marker.id, true, 1)
      this.setState({show: true, animation: 1, click: true})
      this.props.updateLocationStyle(this.props.marker.id, {backgroundColor: 'yellow'}, true)
    }
  }
  closeInfo = () => {
      this.props.updateInfoMarker(this.props.marker.id, false, null)
      this.setState({show: false, animation: null, click: false})
      this.props.updateLocationStyle(this.props.marker.id, {backgroundColor: 'red'}, false)
  }
  render() {
    return(
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
                foursquare={this.props.foursquare}
                onCloseClick={this.closeInfo}
              >
                <ShowInfo
                  showingLocations={this.props.showingLocations}
                  marker={this.props.marker}
                  keysAPI={this.props.keysAPI}
                  foursquare={this.props.foursquare}
                  closeInfo={this.closeInfo}
                  focusedElement={this.props.focusedElement}
                  click={this.state.click}
                />
              </InfoWindow>
            }
          </Marker>
    )
  }
}

export default MarkersShow
