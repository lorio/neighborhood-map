import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.loadMap()
  }
  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCaPkvbdf1BBoa6KSHQY3GWqcPGdEaa_TE&callback=initMap")
      window.initMap = this.initMap;
  }
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {lat: 30.0326996, lng: -90.162753}
    });
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
