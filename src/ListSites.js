import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class ListSites extends Component {
  static propTypes = {
    venues: PropTypes.array.isRequired,
    venue: PropTypes.object.isRequired,
    getVenues: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      venues: this.props.venues,
      venue: this.props.venue,
      markers: [],
      marker: this.props.marker,
      
    };
    /*this.props.getVenues()*/
    /*this.onClickedVenue = this.onClickedVenue.bind(this);*/
  }
 /* onClickedVenue = (e, venue, marker, id) => {*/
    
  
    /*const map = new window.google.Map*/
    /*const newMap = this.setState(prevState =>)*/
    /*function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
      }*/
    /*query = this.venue*/
    /*let marker = this.query*/
    /*if(this.venue !== e.target.value) {
      console.log('mapped!')*/
      /*marker.addListener('click', toggleBounce);*/
   /* } */
  /*  marker.props !== this.props ?
      marker.setMap(null) : marker.setMap(map)*/
  /*let query = this.props.markers.find(marker => marker.id === id)*/
/*}*/
  /*onInputChange(event) {
    console.log(event.target.value);
  }*/

  render() {
    const { venues, venue, markers } = this.props;
    
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