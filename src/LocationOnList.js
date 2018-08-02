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
      this.props.currentActive(event.target)
      this.toggleHihglight()
    }
  }
  render(){
    return(
        <li
          id="list-item"
          role="option"
          aria-selected="false"
          aria-label={`${this.props.location.location.name} restaurant`}
          className='restaurant-list-item'
          style={this.props.location.locationStyle}
        >
          <p
            id={`${this.props.location.location.name}-list`}
            tabIndex={0}
            onClick={this.toggleHihglight}
            onKeyDown={this.toggleHihglightByEnter}
          >
            {this.props.location.location.name}
          </p>
        </li>
    )
  }
}

export default LocationOnList
