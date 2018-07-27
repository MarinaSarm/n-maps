import React, { Component } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'

class SearchPlace extends Component {
  render(){
    return(
      <div id="search">
        <input
          type="text"
          placeholder="Search interesting places"
        />
      </div>
    )
  }
}

export default SearchPlace
