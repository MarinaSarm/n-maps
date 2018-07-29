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
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ListLocations
