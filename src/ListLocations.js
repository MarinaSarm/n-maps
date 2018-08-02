import React, { Component } from 'react'
import LocationOnList from './LocationOnList'
import './css/ListLocations.css'

class ListLocations extends Component {
  state = {
    check: false
  }
  toggleChange = () => {
    if (this.state.check) {
      this.setState({check: false})

    } else {
      this.setState({check: true})
    }
  }
  render(){
    return(
      <div id="list-locations" ref="list">
        <input type="checkbox" id="hamburger_open" onChange={this.toggleChange}/>
          <label htmlFor="hamburger_open" className="list-toggle">
            <span className="entypo-menu"></span>
          </label>
        <header id="restaurant-list" className={this.state.check? "open": "close"}>
          <h2>List of Restaurants</h2>
        </header>
        <ul tabIndex={0} role="listbox" aria-labelledby="restaurant-list" id="locations-list" className={this.state.check? "locations-list open": "locations-list close"}>
          {this.props.showingLocations.map((location) => (
              <LocationOnList
                key={location.id}
                location={location}
                updateInfoMarker={this.props.updateInfoMarker}
                updateLocationStyle={this.props.updateLocationStyle}
                currentActive={this.props.currentActive}
              />
          ))}
        </ul>
      </div>
    )
  }
}

export default ListLocations
