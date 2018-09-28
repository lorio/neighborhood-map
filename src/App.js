import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    venues: []
  }
  componentDidMount() {
    this.loadMap()
    this.getVenues()
  }
  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCaPkvbdf1BBoa6KSHQY3GWqcPGdEaa_TE&callback=initMap")
      window.initMap = this.initMap;
  }
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {lat: 40.6971494, lng: -74.2598655}
    });
  }
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/search?"
    const parameters = {
      client_id: "GLHT2IK1VEODEMEQP1CQPZ2KOYHH3EJKWMKBC0IFLRPWLXY5",
      client_secret: "LNQXGGOTY4JOOLIETW3CHG0SPJN3HBIVZYCE0AS54WFRG3FH",
      categoryId: "52e81612bcbc57f1066b79ed",
      query: "louise",
      ll: "40.6,-74.2",
      v: "20182809"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      console.log(response)
      /*this.setState({
        venues: response.data.response.groups[0].items
      })*/
    })
    .catch(error => {
      console.log("Error!" + error)
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
          <h1 className="App-title">Neighborhood Map</h1>
          </nav>
        </header>
        <main>
          <div id="map"></div>
        </main>
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
