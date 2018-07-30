import React, { Component } from 'react'

class LocationOnList extends Component {
  /* function to indicate selected item in list and on map*/
  toggleHihglight = () => {
    if (this.props.location.locationStyle.backgroundColor === 'yellow') {
      this.props.updateInfoMarker(this.props.location.id, false, null)
      this.props.updateLocationStyle(this.props.location.id, {backgroundColor: 'red'})
    } else {
      this.props.updateInfoMarker(this.props.location.id, true, 1)
      this.props.updateLocationStyle(this.props.location.id, {backgroundColor: 'yellow'})
    }
  }
  render(){
    return(
        <div
          className='restaurant-list-item'
          style={this.props.location.locationStyle}
          onClick={this.toggleHihglight}
        >
          {this.props.location.location.name}
        </div>
    )
  }
}

export default LocationOnList
