import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class ListSites extends Component {
  static propTypes = {
    venues: PropTypes.array.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      venues: {getVenues, venues}
    }
  }
  /*onInputChange(event) {
    console.log(event.target.value);
  }*/

  render() {
    console.log(this.props)
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
              <ul className="venues-list"></ul>
                {
                 this.props.venues.map((venue) => (
                    <li key={
                      this.props.venue.id}>{
                      this.props.venue.name}
                      </li>
                  ))
                  
                }
            </div>

      )
  }
}

export default ListSites