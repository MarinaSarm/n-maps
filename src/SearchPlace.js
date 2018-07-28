import React, { Component } from 'react'
// import PlacesAutocomplete from 'react-places-autocomplete'
// import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'
import escapeRegExp from 'escape-string-regexp'

class SearchPlace extends Component {
  state = {
    query: ''
  }
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    let showingLocations = this.props.locations
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i');
      showingLocations = this.props.locations.filter((location) => match.test(location.location.name))
    }
    this.props.updateShowingLocations(showingLocations)
  }
  render(){
    return(
      <div id="search">
        <input
          type="text"
          placeholder="Search interesting places"
          value={this.state.query}
          onChange={(event) => this.updateQuery(event.target.value)}
        />
      </div>
    )
  }
}

export default SearchPlace
