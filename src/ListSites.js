import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class ListSites extends Component {
  static propTypes = {
    sites: PropTypes.array.isRequired
  }
  state = {
    query: ''
    /*venues: this.props*/
  }

  render() {
    console.log(this.props)
    return (
      <div className="sidebar">
        <div className="search-venues-bar">
          <div className="search-venues-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Find a Sculpture"
                  value={undefined}
                  /*onChange={(event) => this.updateQuery(
                    event.target.value)}*/
                />
                </div>
              </div>
              <ul className="venues-list"></ul>
                {
                 this.props.sites.map(site => (
                    <li key={
                      this.site.venue.id}>{
                      this.site.venue.name}
                      </li>
                  ))
                  
                }
            </div>

      )
  }
}

export default ListSites