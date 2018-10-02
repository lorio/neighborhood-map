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
      venues: this.props.venues
    };
  }
  /*onInputChange(event) {
    console.log(event.target.value);
  }*/

  render() {
    const { venues } = this.props;
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
          <ul className="venues-list">
            {
             venues.map(venue => (
                <li key={
                  venue.id}>{
                  venue.name}
                  </li>
              ))                  
            }
          </ul>
         </div>   
      )
  }
}

export default ListSites