import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class ListSites extends Component {
  static propTypes = {
    venues: PropTypes.array.isRequired,
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
  //for accessibility of the search
  focusQuery() {
    this.query.current.focus();
  }
  render() {
    const { venues, venue, searchResults, input } = this.props;   
    return (
      <div>
        {this.props.showMenu &&
      <div className="sidebar">     
        <div className="search-venues-bar">
          <div className="search-venues-input-wrapper">
            <input 
              type="text" 
              placeholder="Find a Sculpture"
              labelledby="placeholder"
              ref={input => this.search = input}
              onChange={e=> this.state.handleInputChange(
                e.target.value,
                this.focusQuery
                )}
            />
            </div>
          </div>
          <ul className="venues-list" aria-label="List of sculptures">
            {
              input ? searchResults :
              venues.map(venue => (
                <li key={venue.id}
                role="menuitem"
                tabIndex="0"
                aria-label={venue.name}
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