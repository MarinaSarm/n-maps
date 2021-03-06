import React, { Component } from 'react'
import './css/LocationOnList.css'

class LocationOnList extends Component {
  /* function to indicate selected item in list and on map*/
  toggleHihglight = () => {
    if (this.props.location.locationStyle.backgroundColor === '#FFFF73') {
      this.props.updateInfoMarker(this.props.location.id, false, null)
      this.props.updateLocationStyle(this.props.location.id, {backgroundColor: '#FFFF40'}, false)
      this.props.updateClick(this.props.location.id, false)
    } else {
      this.props.updateInfoMarker(this.props.location.id, true, 1)
      this.props.updateLocationStyle(this.props.location.id, {backgroundColor: '#FFFF73'}, true)
      this.props.updateClick(this.props.location.id, true)
    }
  }
  toggleHihglightByEnter = (event) => {
    if (event.key === 'Enter') {
      this.props.currentActive(event.target, this.refs.current)
      if (this.props.location.locationStyle.backgroundColor === '#FFFF73') {
        this.props.updateInfoMarker(this.props.location.id, false, null, true)
        this.props.updateLocationStyle(this.props.location.id, {backgroundColor: '#FFFF40'}, false)
      } else {
        this.props.updateInfoMarker(this.props.location.id, true, 1)
        this.props.updateLocationStyle(this.props.location.id, {backgroundColor: '#FFFF73'}, true)
      }
    }
  }
  render(){
    return(
        <li
          aria-label={`${this.props.location.location.name} restaurant check on map`}
          className='restaurant-list-item'
          style={this.props.location.locationStyle}
          id={`${this.props.location.location.name}-list`}
          tabIndex={0}
          onClick={this.toggleHihglight}
          onKeyDown={this.toggleHihglightByEnter}
          ref="current"
        >
          {this.props.location.location.name}
        </li>
    )
  }
}

export default LocationOnList
