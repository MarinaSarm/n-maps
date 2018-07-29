import React, { Component } from 'react'

class LocationOnList extends Component {
  highlightLocation = () => {
    this.props.updateInfoMarker(this.props.location.id, true)
    this.props.updateLocationStyle(this.props.location.id, {backgroundColor: 'yellow'})
  }
  returnStyleLocation = () => {
    this.props.updateInfoMarker(this.props.location.id, false)
    this.props.updateLocationStyle(this.props.location.id, {backgroundColor: 'red'})
  }
  render(){
    return(
        <div
          className='restaurant-list-item'
          style={this.props.location.locationStyle}
          onMouseOver={this.highlightLocation}
          onMouseOut={this.returnStyleLocation}
        >
          {this.props.location.location.name}
        </div>
    )
  }
}

export default LocationOnList
