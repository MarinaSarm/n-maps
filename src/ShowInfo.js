import React, { Component } from 'react'
import ReactDOM from 'react-dom'
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
      // document.querySelector('#Error').insertAdjacentHTML('beforeend', `<p class="network-warning">There was an error ${part}. For more detailes see logs.</p>`);
    }
  }
  handleTab = (event, ref) => {
    if (event.keyCode === 9) {
      event.preventDefault()
      if (document.activeElement === ReactDOM.findDOMNode(this.refs.back)) {
        ReactDOM.findDOMNode(this.refs.address).focus()
      }
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
                <p tabIndex={0} id={`${location.location.name}-onmap`} ref="address">{location.location.formatted_address}</p>
                {(location.location.rating) &&
                <p>Rating: {location.location.rating}</p>}
                {(this.props.foursquare) &&
                  <div>
                    <p>Details from Foursquare.com</p>
                    <figure>
                      <img src={this.state.photo.imgSrc} alt={`${location.location.name} restaurant`} />
                      {(this.state.photo.user) && (this.state.photo.user.firstName) && (this.state.photo.user.lastName) &&  (this.state.photo.source) && (this.state.photo.source.name) &&
                      <figcaption>{location.location.name} taken by {this.state.photo.user.firstName} {this.state.photo.user.lastName}. Got from {this.state.photo.source.name}</figcaption> }
                    </figure>
                  </div>
                }
                <a onKeyDown={this.handleTab} href="#locations-list" ref="back">
                  Go to the list
                </a>

                {/*}<form action="#locations-list">
                  <input type="submit" value="return to list" />
                </form>
                */}
              </div>
          ))}
        </div>
    )
  }
}

export default ShowInfo
