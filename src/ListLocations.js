import React, { Component } from 'react'
import LocationOnList from './LocationOnList'

class ListLocations extends Component {
  render(){
    return(
      <div id="list-locations">
        <header>
          <h2>Restaurants</h2>
        </header>
        <ul className='locations-list'>
          {this.props.showingLocations.map((location) => (
            <li
              key={location.id}
            >
              <LocationOnList
                location={location}
                passId={this.props.passId}
                updateInfoMarker={this.props.updateInfoMarker}
                currentLocation={this.props.currentLocation}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ListLocations
