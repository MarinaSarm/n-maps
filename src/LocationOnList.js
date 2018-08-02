import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'

class LocationOnList extends Component {
  /* function to indicate selected item in list and on map*/
  toggleHihglight = () => {
    if (this.props.location.locationStyle.backgroundColor === 'yellow') {
      this.props.updateInfoMarker(this.props.location.id, false, null)
      this.props.updateLocationStyle(this.props.location.id, {backgroundColor: 'red'}, false)
    } else {
      this.props.updateInfoMarker(this.props.location.id, true, 1)
      this.props.updateLocationStyle(this.props.location.id, {backgroundColor: 'yellow'}, true)
    }
  }
  toggleHihglightByEnter = (event) => {
    if (event.key === 'Enter') {
      this.props.currentActive(event.target, this.refs.current)
      this.toggleHihglight()
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
