import React, { Component } from 'react'
import LocationOnList from './LocationOnList'
import './css/ListLocations.css'

class ListLocations extends Component {
  render(){
    return(
      <div id="list-locations" ref="list">
        <header id="restaurant-list" className={this.props.check? "open": "close"}>
          <h2>List of Restaurants</h2>
        </header>
        <ul tabIndex={0} aria-live="assertive" aria-labelledby="restaurant-list" id="locations-list" className={this.props.check? "locations-list open": "locations-list close"}>
          {this.props.showingLocations.map((location) => (
              <LocationOnList
                key={location.id}
                location={location}
                updateInfoMarker={this.props.updateInfoMarker}
                updateLocationStyle={this.props.updateLocationStyle}
                currentActive={this.props.currentActive}
                updateClick={this.props.updateClick}
              />
          ))}
        </ul>
      </div>
    )
  }
}

export default ListLocations
