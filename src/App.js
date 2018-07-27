import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from './MapContainer'
import SearchPlace from './SearchPlace'
import Geocode from "react-geocode"

class App extends Component {
  state = {
    locations: [],
    markers: [],
    keysAPI: {
      'GoogleMaps': 'AIzaSyAbAAsS7Hhe1k-bnddQpHAVoJ7rBJOzE_w'
    }
  }

  componentDidMount() {

  }
  addLocationsOnMap = (locations) => {

  }
  render() {
    return (
      <div className="App">
        <MapContainer
          isMarkerShown
          addLocationsOnMap={this.addLocationsOnMap}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${this.state.keysAPI['GoogleMaps']}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <SearchPlace />
      </div>
    );
  }
}

export default App;
