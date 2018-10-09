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
      markers: this.props.markers,
      marker: this.props.marker
    };
  }

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
                id={venue.id}
                onClick={(e)=>this.props.onClickedVenue(
                  e.target.id,
                  this.props.marker,
                  this.props.markers
                  )}
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