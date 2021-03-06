import React, { Component } from 'react'
import './css/ShowInfo.css'

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
    if (this.props.foursquare) {
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
    }
    function requestError(e, part) {
      console.log(e);
      alert(`There was an error ${part}. For more detailes see logs.`)
    }
    //this is a hack to get focus to opened infowindow for keyboard users
    document.getElementById('list').className = 'close'
    setTimeout(() => {this.nameInput.focus()}, 100)
  }
  componentWillUnmount(){
    document.getElementById('list').className = 'open'
    if (this.props.focusedElement[1]) {
      this.props.focusedElement[1].focus()
    }
  }
  /* handle tab trap */
  handleTab = (event, ref) => {
    if (event.keyCode === 9) {
      event.preventDefault()
      if (document.activeElement === this.refs.back) {
        this.refs.address.focus()
      }
    }
    if (event.keyCode === 13) {
      event.preventDefault()
      if (document.activeElement === this.refs.back) {
        this.props.closeInfo()
      }
    }
  }
  render(){
    return(
        <div tabIndex={0} ref={(input) => { this.nameInput = input; }} className="info-window">
          {this.props.showingLocations.filter((location) =>
            location.id === this.props.marker.id
          ).map((location) => (
            /* Show detailed info if available */
              <div key={location.id} role="dialog" aria-labelledby={`${location.location.name}-for-map`} className="info">
                <h3 id={`${location.id}-for-map`}>{location.location.name}</h3>
                <p id={`${location.location.name}-onmap`}>{location.location.formatted_address}</p>
                {(location.location.rating) &&
                <p>Rating: {location.location.rating}</p>}
                {(this.props.foursquare) &&
                  <div>
                    <p>Details from Foursquare.com</p>
                    <figure>
                      <img src={this.state.photo.imgSrc} alt={`${location.location.name} restaurant`} width="200px" height="300px"/>
                      {(this.state.photo.user) && (this.state.photo.user.firstName) && (this.state.photo.user.lastName) &&  (this.state.photo.source) && (this.state.photo.source.name) &&
                      <figcaption>{location.location.name} taken by {this.state.photo.user.firstName} {this.state.photo.user.lastName}. Got from {this.state.photo.source.name}</figcaption> }
                    </figure>
                  </div>
                }
                  <a onKeyDown={this.handleTab} onClick={this.props.closeInfo} href="#locations-list" ref="back">
                    back to list
                  </a>
              </div>
          ))}
        </div>
    )
  }
}

export default ShowInfo
