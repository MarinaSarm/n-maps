import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer'
import SearchPlace from './SearchPlace'
import ListLocations from './ListLocations'
/* import my initial set of restaurants, got with request for restaurants in Bremen
*/
import Restaurants from './restaurants'

class App extends Component {
  state = {
    locations: [],
    markers: [],
    showingLocations: [],
    showingMarkers: [],
    currentLocation: '',
    keysAPI: {
      'GoogleMaps': 'AIzaSyAbAAsS7Hhe1k-bnddQpHAVoJ7rBJOzE_w',
      'YelpReviews': 'JqyqCkdIzkAOtbIdzpjj4_e127n38Y99fWz4N8XeaomfEr-SAgRwfEjxfdQZYAWvHqWPK72omnhUFl_zX0orvNrDBqLxPQByMhV1IkEPbhZlXm2Vj-Z28PmgJNBcW3Yx'
    }
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
      locationState.push({location: location, id: markerId})
      /* here store also info about infowindow setState
      */
      markerState.push({position: markerLocation, title: markerTitle, id: markerId, info: false})
    })
    this.setState({locations: locationState, markers: markerState, showingLocations: locationState, showingMarkers: markerState})
  }
  updateShowingLocations = (showingLocations, showingMarkers) => {
    this.setState({showingLocations: showingLocations, showingMarkers: showingMarkers})
  }
  passId = (id) => {
    this.setState({currentLocation: id})
  }
  render() {
    return (
      <div className="App">
        <MapContainer
          GoogleKey={this.state.keysAPI['GoogleMaps']}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${this.state.keysAPI['GoogleMaps']}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `80vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          showingMarkers={this.state.showingMarkers}
          showInfoToggle={this.showInfoToggle}
          markers={this.state.markers}
          passId={this.passId}
        />
        <SearchPlace
          locations={this.state.locations}
          markers={this.state.markers}
          updateShowingLocations={this.updateShowingLocations}
        />
        <ListLocations
          showingLocations={this.state.showingLocations}
          passId={this.passId}
        />
      </div>
    );
  }
}

export default App;
