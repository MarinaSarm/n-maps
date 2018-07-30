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
      <div id="list-locations">
        <input type="checkbox" id="hamburger_open" onChange={this.toggleChange}/>
          <label for="hamburger_open" className="list-toggle">
            <span className="entypo-menu"></span>
          </label>
        <header className={this.state.check? "open": "close"}>
          <h2>List of Restaurants</h2>
        </header>
        <ul className={this.state.check? "locations-list open": "locations-list close"}>
          {this.props.showingLocations.map((location) => (
            <li
              key={location.id}
            >
              <LocationOnList
                location={location}
                updateInfoMarker={this.props.updateInfoMarker}
                updateLocationStyle={this.props.updateLocationStyle}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ListLocations
