import React, { Component } from 'react'

class LocationOnList extends Component {
  state ={
    locationStyle: {
      backgroundColor: 'red'
    }
  }
  highlightLocation = () => {
    this.setState({locationStyle: {backgroundColor: 'yellow'}})
  }
  returnStyleLocation = () => {
    this.setState({locationStyle: {backgroundColor: 'red'}})
  }
  render(){
    return(
      <div
        className='restaurant-list-item'
        style={this.state.locationStyle}
        onMouseOver={this.highlightLocation}
        onMouseOut={this.returnStyleLocation}
      >
        {this.props.location.location.name}
      </div>
    )
  }
}

export default LocationOnList