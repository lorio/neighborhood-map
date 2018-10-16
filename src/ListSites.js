import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import './App.css';

class ListSites extends Component {
  static propTypes = {
    venues: PropTypes.array.isRequired,
    venue: PropTypes.object.isRequired,
    getVenues: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
      this.search = React.createRef();
      this.focusQuery = this.focusQuery.bind(this);
    this.state = {
      query: '',
      searchResults: this.props.searchResults,
      venues: this.props.venues,
      venue: this.props.venue,
      markers: this.props.markers,
      marker: this.props.marker,
      showMenu: true,
      handleInputChange: this.props.handleInputChange,
      input: this.props.input,
      map: this.props.map,
      infowindows: this.props.infowindows,
      infowindow: this.props.infowindow
    };
  }
  focusQuery() {
    this.search.current.focus();
  }

  render() {
    const { venues, venue, markers,searchResults, input } = this.props;
    
    return (
      <div>
        {this.props.showMenu &&
      <div className="sidebar">     
        <div className="search-venues-bar">
          <div className="search-venues-input-wrapper">
            <input 
              type="text" 
              placeholder="Find a Sculpture"
              ref={input => this.search = input}
              onChange={e=> this.state.handleInputChange(
                e.target.value)}
            />
            </div>
          </div>
          <ul className="venues-list">
            {
              input ? searchResults.venues :
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
         }
        </div>   
      )
  }
}

export default ListSites