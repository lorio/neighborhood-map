import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import ListSites from './ListSites';
import escapeRegExp from 'escape-string-regexp';

class App extends Component {
  state = {
    venues: [],
    markers: [],
    showMenu: true,
    searchResults: [],
    query: '',
    map: null,
    items: [],
    allVenues: []
   
  }
  componentDidMount() {
    this.getVenues();
  }

  //opens and closes sidebar with hamburger menu button for map visibility
  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu })
  }
  //sets unqueried venues markers to hidden
  hideMarkers = (anArray, aBoolean) => {
      return anArray.forEach(marker => marker.setVisible(aBoolean))
  }
//when user inputs search text, matching sidebar item(s), markers filter
  handleInputChange = (query ,venues) => {
    let trimmedQuery = query.replace(/^\s+/, '')
      this.setState({
        query: trimmedQuery
      })
    let searchResults
    let hiddenMarkers
    this.state.markers.map(marker => marker.setVisible(true))
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i")
      searchResults = this.state.allVenues.filter(venue =>
        match.test(venue.name)
      )
      this.setState({ venues: searchResults })
      hiddenMarkers = this.state.markers.filter(marker =>
        searchResults.every(venue => venue.name !== marker.title)
      )
      this.hideMarkers(hiddenMarkers, false)
      this.setState({ hiddenMarkers })
    } else {
      this.setState({ venues: this.state.allVenues })
      this.hideMarkers(this.state.markers, true)
    }
  }

//loads the script which is outside the root element. Error handling on lines 193-196 is tested and functioning.
  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?v=3&key=xxxxxxx")
      window.initMap = this.initMap;
  }
//when the sidebar items are clicked, selected map marker is isolated
  onClickedVenue = ((e, id, markers) => {
    const list = document.querySelector('.venues-list')
    const items = Array.from(list.children)
    
    let marker = Object.assign({
      id: id, marker: marker },  item);
    const item = { id: id, marker: marker }

    markers.forEach(marker => {
      let id = marker.id
      if(e.match(id)) {
        marker.setAnimation(window.google.maps.Animation.BOUNCE); 
        setTimeout (function(){
              marker.setAnimation(null);
            }, 1000);
        let contentString =  `${marker.title} at ${marker.position}` 
        this.state.infowindow.open(this.state.map, marker)
        this.state.infowindow.setContent(contentString)
        }
    })
  })
  //foursquare and map fetching
   getVenues = (venues) => {
    const endPoint = "https://api.foursquare.com/v2/venues/search?"
    let parameters = {
      client_id: "GLHT2IK1VEODEMEQP1CQPZ2KOYHH3EJKWMKBC0IFLRPWLXY5",
      client_secret: "xxxxxxxxxx",
      categoryId: "52e81612bcbc57f1066b79ed",
      query: "",    
      ll: "40.6,-74.2",
      v: "20182809"
    }
    //axios to fetch data
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.venues,
          searchResults: response.data.response.venues,
          allVenues: response.data.response.venues  
        }, this.loadMap())
      })
    .catch(error => {
      alert("Error loading data!" + error)
    })
  }
  //google map code
  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 40.7454474, lng: -73.9711897}
    });
    var markers = []
    var infowindow = new window.google.maps.InfoWindow()
    this.setState({ map: map, infowindow: infowindow });
    this.state.venues.forEach((venue) => {
      var contentString = `${venue.name}`
      var marker = new window.google.maps.Marker({
        position: {lat: venue.location.lat, 
          lng: venue.location.lng},
        id: venue.id,
        map: map,
        title: venue.name,
        animation: window.google.maps.Animation.DROP
      });
      marker.addListener('click', function() {
        map.setCenter(marker.position)
        infowindow.setContent(contentString)
        infowindow.open(map, marker)
        toggleBounce(this)
      });
      function toggleBounce(marker) {
        console.log(marker)
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout (function(){
            marker.setAnimation(null);
          }, 1000);
        } 
      }
      markers.push(marker)
    })
    this.setState({ markers })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
          <button id="menu"
            aria-label="hide sidebar"
            aria-expanded="true" 
            onClick={this.toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 20 20">
              <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
            </svg>
          </button>
          <h1 className="App-title">NYC Outdoor Sculptures</h1>
          </nav>
        </header>
        <div className="container">
          <ListSites
            showMenu={this.state.showMenu} 
            venues={this.state.venues}
            getVenues={this.getVenues}
            venue={this.state.venue}
            markers={this.state.markers}
            marker={this.state.marker}
            map={this.state.map}
            onClickedVenue={this.onClickedVenue}
            handleInputChange={this.handleInputChange}
            query={this.state.query}
            input={this.state.input}      
          />
          <main className="main-content">
            <div id="map" role="application" tabIndex="-1" area-label="Map of sculpture locations"></div>
          </main>
        </div>
        <footer className="site-footer">
          <cite> App by Lorio. Data by foursquare.</cite>
        </footer>
      </div>
    );
  }
}
  function loadScript(url) {
    const index = window.document.getElementsByTagName('script')[0];
    const script = window.document.createElement('script');
    script.src = url;
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
    script.onerror = function() { alert("Error loading the map! Please check the URL and network connection."); };
  }

export default App;
