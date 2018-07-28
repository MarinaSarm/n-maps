import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from './MapContainer'
import SearchPlace from './SearchPlace'
import Geocode from 'react-geocode'
// import my initial set of restaurants, got with request for restaurants in Bremen
import Restaurants from './restaurants'

class App extends Component {
  state = {
    locations: [],
    markers: [],
    keysAPI: {
      'GoogleMaps': 'AIzaSyAbAAsS7Hhe1k-bnddQpHAVoJ7rBJOzE_w'
    }
  }

  componentDidMount() {
    // place initial set of restaurants locations and markers to state
    const locations = Restaurants
    const locationState = []
    const markerState = []
    locations.map((location) => {
      let markerLocation = location.geometry.location
      let markerTitle = location.name
      let markerId = location.id
      locationState.push({location: location, id: markerId})
      markerState.push({position: markerLocation, title: markerTitle, id: markerId})
    })
    this.setState({locations: locationState, markers: markerState})
  }

  addLocationsOnMap = (locations) => {

  }
  render() {
    return (
      <div className="App">
        <MapContainer
          addLocationsOnMap={this.addLocationsOnMap}
          GoogleKey={this.state.keysAPI['GoogleMaps']}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${this.state.keysAPI['GoogleMaps']}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          locations={this.state.locations}
        />
        <SearchPlace />
      </div>
    );
  }
}

export default App;
