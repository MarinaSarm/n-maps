import React, { Component } from 'react'
// import PlacesAutocomplete from 'react-places-autocomplete'
// import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'
import escapeRegExp from 'escape-string-regexp'
import ListLocations from './ListLocations'

class SearchPlace extends Component {
  state = {
    query: ''
  }
  updateQuery = (query) => {
    /* hold the value of input field in state
    */
    this.setState({ query: query })
    let showingLocations = this.props.locations
    if (query.length > 0) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingLocations = this.props.locations.filter((location) =>
        match.test(location.location.name)
      )
    } else {
      /* if no search, then show all
      */
      showingLocations = this.props.locations
    }
    /* choose markers with the same id
    */
    let showingMarkers = showingLocations.map((location) => {
      return this.props.markers.filter((marker) =>
        marker.id === location.id
      )[0]
    })
    /* update state of app component
    */
    this.props.updateShowingLocations(showingLocations, showingMarkers)
  }
  render(){
    return(
      <div id="search">
        <input
          type="search"
          placeholder="Search restaurant by name"
          value={this.state.query}
          onChange={(event) => this.updateQuery(event.target.value)}
          id="search-input"
        />
        <label htmlFor="search-input" className="search-input">
          Search
        </label>
        <ListLocations
          showingLocations={this.props.showingLocations}
          updateInfoMarker={this.props.updateInfoMarker}
          updateLocationStyle={this.props.updateLocationStyle}
          resultFoursquare={this.props.resultFoursquare}
          markers={this.props.markers}
          currentActive={this.props.currentActive}
          updateClick={this.props.updateClick}
        />
      </div>
    )
  }
}

export default SearchPlace
