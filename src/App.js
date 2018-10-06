import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import ListSites from './ListSites';

class App extends Component {
  state = {
    venues: [],
    markers: []
  }
  componentDidMount() {
    this.getVenues();
  }
  clearMarkers = () => {
    this.setState({ markers: []})
  }

  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCaPkvbdf1BBoa6KSHQY3GWqcPGdEaa_TE&callback=initMap")
      window.initMap = this.initMap;
  }

  onClickedVenue = (id) => {
    /*let i = markers.indexOf(this.venue)*/console.log('hi')
   /* const list = document.querySelector('.venues-list')
    const item = list.children
    markers.find(item && item.id[ e.target])
   
    if (venue && venue.id === this.item && item.id)
      console.log('match!')
      toggleBounce = window.google.maps.setAnimation
        this.marker.addListener('click', toggleBounce) */     
      };
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
          venues: response.data.response.venues    
        }, this.loadMap())
      })
    .catch(error => {
      console.log("Error!" + error)
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
   /* marker.addListener('click', function(e) {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
        toggleBounce(e.target);
      });

      function toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        } 
      }*/
      markers.push(marker)
    }) 
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
          <h1 className="App-title">NYC Outdoor Sculptures</h1>
          </nav>
        </header>
        <div className="container">
          <ListSites 
            venues={this.state.venues}
            getVenues={this.getVenues}
            venue={this.state.venue}
            markers={this.state.markers}
            marker={this.state.marker}
            map={this.state.map}
            onClickedVenue={this.onClickedVenue}
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
  }

export default App;
