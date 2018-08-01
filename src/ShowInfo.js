import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

class ShowInfo extends Component {
  state = {
    photo: {}
  }
  /*function to get photos for restaurants from foursquare*/
  fetchImages = (id) => {
    const url = `https://api.foursquare.com/v2/venues/${id}/photos?limit=2&client_id=${this.props.keysAPI('FoursquareClient')}&client_secret=${this.props.keysAPI('FoursquareSecret')}&v=20180729`;
    return new Promise((resolve, reject) => {
        fetch(url).then(response => {if (response.ok) {return response.json()}
            reject('Your request for restaurant to Foursquare is not excepted. Probably, API quota is exceeded')})
        .then(data => {if (data) resolve(data)})
        .catch(e => reject(e, 'Error when getting the restaurants photo details'))
    })
  }
  componentDidMount(){
    this.fetchImages(this.props.marker.id)
    .then(resp => {
      const results = resp.response.photos.items[0]
      const photoData = {'imgSrc': '', 'user': {}, 'source': {}}
      photoData['imgSrc'] = `${results['prefix']}${results['height']}x${results['width']}${results['suffix']}`
      photoData['user'] = results['user']
      photoData['source'] = results['source']
      this.setState({photo: photoData})
    })
    .catch(err => requestError(err, 'with getting restaurant photo'))
    function requestError(e, part) {
      console.log(e);
      alert(`There was an error ${part}. For more detailes see logs.`)
      // document.querySelector('#Error').insertAdjacentHTML('beforeend', `<p class="network-warning">There was an error ${part}. For more detailes see logs.</p>`);
    }
  }
  render(){
    return(
        <div>
          {this.props.showingLocations.filter((location) =>
            location.id === this.props.marker.id
          ).map((location) => (
            /* Show detailed info if available */
              <div key={location.id}>
                <h3>{location.location.name}</h3>
                <p tabIndex={0} id={`${location.location.name}-onmap`}>{location.location.formatted_address}</p>
                {(location.location.rating) &&
                <p>Rating: {location.location.rating}</p>}
                {(this.props.foursquare) &&
                <figure>
                  <img src={this.state.photo.imgSrc} alt={`${location.location.name} restaurant`} />
                  {(this.state.photo.user) && (this.state.photo.user.firstName) && (this.state.photo.user.lastName) &&  (this.state.photo.source) && (this.state.photo.source.name) &&
                  <figcaption>{location.location.name} taken by {this.state.photo.user.firstName} {this.state.photo.user.lastName}. Got from {this.state.photo.source.name}</figcaption> }
                </figure>
                }
                <a href="#locations-list">
                  Go to the list
                </a>
              </div>
          ))}
        </div>
    )
  }
}

export default ShowInfo
