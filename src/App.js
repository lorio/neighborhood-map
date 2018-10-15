import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import ListSites from './ListSites';

class App extends Component {
  state = {
    venues: [],
    markers: [],
    showMenu: true,
    searchResults: []
   
  }
  componentDidMount() {
    this.getVenues();
  }
  clearMarkers = () => {
    this.setState({ markers: []})
  }
  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu })
  }
  updateMarkers = (venue) => {
    let map = this.props.map
    let marker = this.props.markers.filter(marker => {
     marker.id === venue.id
     ? marker.setVisible = true 
     : marker.setVisible = false
    })
  }

  handleInputChange = (input,venues, id) => {
    let searchResults = input.toLowerCase() !== ""
      ? this.state.venues.filter(venue => venue.id &&
        venue.name.toLowerCase().includes(input))
      : this.state.venues; 
      this.setState({ venues: searchResults })
  }

  clearSearch = (input, venues) => {
    input === ""
    ? console.log(input)
    /*this.state.venues.getVenues()*/
    : this.setState({ venues: venues })  
  }
 

  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCaPkvbdf1BBoa6KSHQY3GWqcPGdEaa_TE&callback=initMap")
      window.initMap = this.initMap;
  }

 
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

        }
    })
  })
  
 
   getVenues = (venues) => {
    const endPoint = "https://api.foursquare.com/v2/venues/search?"
    let parameters = {
      client_id: "GLHT2IK1VEODEMEQP1CQPZ2KOYHH3EJKWMKBC0IFLRPWLXY5",
      client_secret: "LNQXGGOTY4JOOLIETW3CHG0SPJN3HBIVZYCE0AS54WFRG3FH",
      categoryId: "52e81612bcbc57f1066b79ed",
      query: "",    
      ll: "40.6,-74.2",
      v: "20182809"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.venues,
          searchResults: response.data.response.venues   
        }, this.loadMap())
      })
    .catch(error => {
      console.log("Error loading data!" + error)
    })
  }
  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat: 40.6971494, lng: -74.2598655}
    });
    var markers = []
    var infowindow = new window.google.maps.InfoWindow()
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
        map.setZoom(10)
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
    this.setState({markers})
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
          <button id="menu" 
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
            <div id="map"></div>
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
    script.onerror = function() { alert("Error loading the map! Check URL!"); };
  }

export default App;
