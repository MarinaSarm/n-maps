import React, { Component } from 'react'
import { Marker, InfoWindow } from "react-google-maps"
import './css/MarkersShow.css'
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
      this.props.updateLocationStyle(this.props.marker.id, {backgroundColor: '#FFFF40'}, false)
    } else {
      this.props.updateInfoMarker(this.props.marker.id, true, 1)
      this.setState({show: true, animation: 1, click: true})
      this.props.updateLocationStyle(this.props.marker.id, {backgroundColor: '#FFFF73'}, true)
    }
  }
  closeInfo = () => {
      this.props.updateInfoMarker(this.props.marker.id, false, null)
      this.setState({show: false, animation: null, click: false})
      this.props.updateLocationStyle(this.props.marker.id, {backgroundColor: '#FFFF40'}, false)
  }
  componentDidMount(){

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
                options={{
                  padding: 0
                }}
                className="info-opened"
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
