import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';

class App extends Component {
  render() {
    return (
        <div class="text-center">
          <h2 id='city'></h2>
          <div class = "rounded">
            <h1 class="font-size" id='fTemp'></h1>
            <h3 id='weatherType'></h3>
            <h4 class="border" id='windSpeed'></h4>
          </div>
        </div>
    );
  }
}

export default App;
