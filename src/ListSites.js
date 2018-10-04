import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class ListSites extends Component {
  static propTypes = {
    venues: PropTypes.array.isRequired,
    venue: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      venues: this.props.venues,
      venue: this.props.venue,
      markers: []
    };
  }
  onClickedVenue = (query) => {
  console.log('mapping!');
    /*const newMap = this.setState(prevState =>)*/
    query = this.venue
    this.props.getVenues()
    this.props.initMap()
    let marker = this.query
  /*  marker.props !== this.props ?
      marker.setMap(null) : marker.setMap(map)*/
  /*let query = this.props.markers.find(marker => marker.id === id)*/
}
  /*onInputChange(event) {
    console.log(event.target.value);
  }*/

  render() {

    const { venues, venue } = this.props;
    /*console.log(this.props)*/
    return (
      <div className="sidebar">     
        <div className="search-venues-bar">
          <div className="search-venues-input-wrapper">
            <input 
              type="text" 
              placeholder="Find a Sculpture"
              value={this.state.query}
              onChange={event => this.setState({
                query: event.target.value})}
            />
            </div>
          </div>
          <ul className="venues-list">
            {
             venues.map(venue => (
                <li key={venue.id}
                onClick={this.onClickedVenue}
                >{venue.name}
                  </li>
              ))                  
            }
          </ul>
         </div>   
      )
  }
}

export default ListSites