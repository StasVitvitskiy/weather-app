import React, {Component} from 'react';
import './App.css';
import {Provider} from 'react-redux';
//import './weather.js';

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
                    backgroundColor:'#004A7D',
                    backgroundSize: 'cover'
                }}
            >
                <div
                    className="text-center"
                >
                    <div>
                        <h1 className="text-align">
                            Weather Forecast for
                            <a href="#" id='city'>
                                 Darrington
                            </a>
                        </h1>
                    </div>
                    <div className="text-align">
                        <img className="img"
                            src="http://www.pngmart.com/files/3/Weather-PNG-Pic.png"
                            alt=""/>
                    </div>
                    <div className="display">
                        <ul className="ul">
                            <li className="font-size-one" id='localTime'>
                                01:53 <span className="font-one" id="am_pm">PM</span>
                            </li>
                        <li className="font-size-one" id='fTemp'>80
                             <span className='color-blue'>&#8457;</span>
                        </li>
                        <li className="font-size-one" id='weatherType'>
                            mist
                        </li>
                        </ul>
                    </div>
                    <form action="">
                        <div className="text-align form">
                            <h2 className="content">Find a Forecast</h2>
                            <div className="baseline flex content margin-bottom">
                                <input className="width"
                                       placeholder="Search for location or keyword"
                                       type="text"/>
                                <button className="button">SEARCH</button>
                            </div>
                        </div>
                    </form>
                    <footer>
                        <div className="footer">
                        Designed and coded by
                        <a className="margin-left" target="_blank" href="https://stasvitvitskiy.github.io/Portfolio/">
                            Stanislav Vitvitskiy
                        </a>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

export default App;
