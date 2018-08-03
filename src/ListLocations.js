import React, { Component } from 'react'
import LocationOnList from './LocationOnList'
import './css/ListLocations.css'

class ListLocations extends Component {
  render(){
    return(
      <div id="list-locations" ref="list" className={this.props.check? "list-locations open": "list-locations close"}>
        <label htmlFor="locations-list" className="restaurant-list">List of Restaurants</label>
        <ul tabIndex={0} id="locations-list">
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
