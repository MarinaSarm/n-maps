import React, { Component } from 'react'

class ShowInfo extends Component {
  render(){
    return(
      <div>
        {this.props.showingLocations.filter((location) =>
          location.id === this.props.marker.id
        ).map((location) => (
          <div key={location.id}>
            <h3>{location.location.name}</h3>
            <p>{location.location.formatted_address}</p>
            {(location.location.rating) &&
            <p>Rating: location.location.rating</p>}
          </div>
        ))}
      </div>
    )
  }
}

export default ShowInfo
