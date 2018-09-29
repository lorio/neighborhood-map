import React, { Component } from 'react';
import './App.css';

class VenuesList extends Component {
  state = {
    query: '',
    venues: venues
  }

  render() {
    return (
      <div className="sidebar">
        <div className="search-venues-bar">
          <div className="search-venues-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Find a Sculpture"
                  value={undefined}
                  onChange={(event) => this.updateQuery(
                    event.target.value)}
                />
                </div>
              </div>
              <ul className="venues-list"></ul>
                {
                  this.state.venues.map(venue => {
                    return <li key={venue.id}>{props.venue.name}</li>
                  })
                  
                }
            </div>

      )
  }
}

export default VenuesList