import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer'
import SearchPlace from './SearchPlace'
import ListLocations from './ListLocations'
/* import my initial set of restaurants, got with request for restaurants in Bremen
*/
import Restaurants from './restaurants'

// const keysAPI = {
//   'GoogleMaps': 'AIzaSyAbAAsS7Hhe1k-bnddQpHAVoJ7rBJOzE_w',
//   'FoursquareSecret': '3FKKEP3MTVOMBDKZ0UBHNXRFPIDUOOH30410MJQJS0KOKARL',
//   'FoursquareClient': 'VLUO0QACM520F2BVXSGEW5GETCB42VF2Q3IDCTZGRNINB3Z0'
// }

class App extends Component {
  state = {
    locations: [],
    markers: [],
    showingLocations: [],
    showingMarkers: []
  }
/*function to store keys*/
  keysAPI = (name) => {
    if (name === 'GoogleMaps') return 'AIzaSyAbAAsS7Hhe1k-bnddQpHAVoJ7rBJOzE_w'
    if (name === 'FoursquareSecret') return '3FKKEP3MTVOMBDKZ0UBHNXRFPIDUOOH30410MJQJS0KOKARL'
    if (name === 'FoursquareClient') return 'VLUO0QACM520F2BVXSGEW5GETCB42VF2Q3IDCTZGRNINB3Z0'
  }
/*function to get restaurants in bremen*/
  fetchRestaurants = (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
         .then(response => {if (response.ok) {return response.json()} reject('Your request for restaurant to Foursquare is not excepted. Probably, API quota is exceeded or authentification fails')})
         .then((data) => {if (data) resolve(data)})
         .catch(e => reject(e, 'Error when getting the restaurants details'))
    })
  }
  componentDidMount() {
    /* place initial set of restaurants locations and markers to state
    */
    const locations = Restaurants
    const locationState = []
    const markerState = []
    locations.map((location) => {
      let markerLocation = location.geometry.location
      let markerTitle = location.name
      let markerId = location.id
      locationState.push({location: location, id: markerId, locationStyle: {
        backgroundColor: 'red'
      }})
      /* here store also info about infowindow setState
      */
      markerState.push({position: markerLocation, title: markerTitle, id: markerId, info: false, animation: 2})
    })
    this.setState({locations: locationState, markers: markerState, showingLocations: locationState, showingMarkers: markerState})

    /*fetch results for 20 restaurants in Bremen from Foursquare in radius 3km
    */
    const urlArray = `https://api.foursquare.com/v2/venues/search?ll=53.0793,8.8017&intent=ckeckin&categoryId=4d4b7105d754a06374d81259&client_id=${this.keysAPI('FoursquareClient')}&client_secret=${this.keysAPI('FoursquareSecret')}&v=20180729&radius=3000&limit=20`

    this.fetchRestaurants(urlArray)
        .then(resp => {
          const results = resp.response.venues
          console.log(results)
          let details = results.map((restaurant) => {
            let info = {}
            info['location'] = {'geometry': {'location': {'lat': '', 'lng': ''}}}
            info['location']['geometry']['location']['lat'] = restaurant['location']['lat']
            info['location']['geometry']['location']['lng'] = restaurant['location']['lng']
            info['id'] = restaurant['id']
            info['location']['formatted_address'] = restaurant['location']['formattedAddress'].join(', ')
            info['location']['name'] = restaurant['name']
            info['locationStyle'] = {backgroundColor: 'red'}
            return info
          })
          const newMarkerState = []
          details.map((location) => {
            let markerLocation = location.location.geometry.location
            let markerTitle = location.location.name
            let markerId = location.id
            newMarkerState.push({position: markerLocation, title: markerTitle, id: markerId, info: false, animation: 2})
          })
          this.setState({showingLocations: details, locations: details, markers: newMarkerState, showingMarkers: newMarkerState})
        })
        .catch(err => requestError(err, 'with getting restaurants info'))

    function requestError(e, part) {
      console.log(e);
      document.querySelector('#Error').insertAdjacentHTML('beforeend', `<p class="network-warning">There was an error ${part}. For more detailes see logs. You can check some preloaded restaurants!</p>`);
    }
  }
  updateShowingLocations = (showingLocations, showingMarkers) => {
    this.setState({showingLocations: showingLocations, showingMarkers: showingMarkers})
  }
  updateInfoMarker = (id, info, animation) => {
    let newMarkers = this.state.showingMarkers.map((marker) => {
       if (marker.id === id) {
         marker.info = info
         marker.animation = animation
       }
       return marker
    })
    this.setState({showingMarkers: newMarkers})
  }
  updateLocationStyle = (id, locationStyle) => {
    let newLocations = this.state.showingLocations.map((location) => {
      if (location.id === id) {
        location.locationStyle = locationStyle
      }
      return location
    })
    this.setState({showingLocations: newLocations})
  }
  render() {
    return (
      <div className="App">
        <div id="Error" />
        <MapContainer
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${this.keysAPI('GoogleMaps')}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `80vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          showingMarkers={this.state.showingMarkers}
          showingLocations={this.state.showingLocations}
          showInfoToggle={this.showInfoToggle}
          markers={this.state.markers}
          updateInfoMarker={this.updateInfoMarker}
          updateLocationStyle={this.updateLocationStyle}
          keysAPI={this.keysAPI}
        />
        <SearchPlace
          locations={this.state.locations}
          markers={this.state.markers}
          updateShowingLocations={this.updateShowingLocations}
        />
        <ListLocations
          showingLocations={this.state.showingLocations}
          updateInfoMarker={this.updateInfoMarker}
          updateLocationStyle={this.updateLocationStyle}
          resultFoursquare={this.state.resultFoursquare}
        />
      </div>
    );
  }
}

export default App;
