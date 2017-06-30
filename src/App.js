import React, {Component} from 'react';
import './App.css';
import {Provider} from 'react-redux';

class App extends Component {
    componentDidMount() {
        fetch("http://ip-api.com/json").then(response => response.json())
            .then(json => console.log(json))
    }

    render() {
        return (
            <div
                className="flex"
                style={{
                    backgroundImage: 'url(http://img00.deviantart.net/d3f6/i/2010/138/3/1/misty_mountain_weather_14_by_sveltephoto.jpg)',
                    backgroundSize: 'cover'
                }}
            >
                <div
                    className="text-center"
                >
                    <h2 id='city'>
                        Darrington
                    </h2>
                    <div className="rounded">
                        <h1 className="font-size" id='fTemp'>
                            73.4 <span className='color-blue'>&#8457;</span>
                        </h1>
                        <h3 id='weatherType'>
                            mist
                        </h3>
                        <h4 className="border" id='windSpeed'>
                            6 m/s
                        </h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
