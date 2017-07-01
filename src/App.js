import React, {Component} from 'react'
import './App.css';
import {getJSON} from './util'
import {connect} from 'react-redux'
import {loadData, toggleTempType, setTime} from './reducer'
import snowIcon from './snowing.svg'
import rainIcon from './rain.svg'
import mistIcon from './mist.svg'
import cloudyIcon from './cloudy.svg'
import overcastIcon from './wind.svg'
import brokenCloudsIcon from './broken-clouds.svg'
import sunnyIcon from './sunny-day.svg'
import nightIcon from './night-with-stars.svg'

class App extends Component {
    componentDidMount() {
        getJSON("http://ip-api.com/json")
            .then(data => {
                const lat = data.lat;
                const long = data.lon;
                this.getTime(lat, long);
                const api = 'http://api.openweathermap.org/data/2.5/weather?&lat='+lat+'&lon='+long+'&id=5809844&appid=8de948601c0463fbc6ecf328a7d1b6b6';
                return getJSON(api)
            })
            .then(data => {
                const weatherType = data.weather[0].description;
                const kTemp = data.main.temp;
                const windSpeed = data.wind.speed;
                const city = data.name + ', ' + data.sys.country;
                const fTemp = Math.round(((kTemp) * (9 / 5) - 459.67).toFixed(1));
                const cTemp = Math.round((kTemp - 273).toFixed(1));
                this.props.loadData({
                    weatherType,
                    windSpeed,
                    city,
                    cTemp,
                    fTemp
                })
            })
    }

    getTime(lat, long) {
        const loc = lat + ', '+long;
        const targetDate = new Date();
        const timestamp = targetDate.getTime()/1000 + targetDate.getTimezoneOffset() * 60;
        const apikey = 'AIzaSyDuziSpvaIaz_Xv81OXImn5fqALenciGSI';
         
        const apicall = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + loc + '&timestamp=' + timestamp + '&key=' + apikey;
        getJSON(apicall).then(response => {
            const offsets = response.dstOffset * 1000 + response.rawOffset * 1000;
            const localdate = new Date(timestamp * 1000 + offsets);
            this.props.setTime(localdate);
        })
    }

    toggleTempType = () => {
        this.props.toggleTempType()
    };

    renderIcon() {
        const weatherType = this.props.weather.weatherType;
        if(weatherType === 'light shower snow'|| weatherType === 'snow') {
            return <img
                        className="img"
                        src={snowIcon}
                        alt=""
                    />
        } else if (weatherType === "mist") {
            return <img
                className="img"
                src={mistIcon}
                alt=""
            />
        } else if (weatherType === "light rain" || weatherType === "rain") {
            return <img
                className="img"
                src={rainIcon}
                alt=""
            />
        } else if (weatherType === "clouds") {
            return <img
                className="img"
                src={cloudyIcon}
                alt=""
            />
        } else if(weatherType === "overcast clouds") {
            return <img
                className="img"
                src={overcastIcon}
                alt=""
            />
        } else if (weatherType === "clear sky") {
            const timeObj = this.props.weather.timeObj;
            const hours = timeObj.getHours();
            if(hours < 22 && hours > 6) {
                return <img
                    className="img"
                    src={sunnyIcon}
                    alt=""
                />
            } else {
                return <img
                    className="img"
                    src={nightIcon}
                    alt=""
                />
            }
        } else if(weatherType === "broken clouds") {
            return <img
                className="img"
                src={brokenCloudsIcon}
                alt=""
            />
        }
    }

    render() {
        const weather = this.props.weather;
        return (
            <div
                className="flex"
                style={{
                    backgroundColor:'#004A7D',
                    backgroundSize: 'cover',
                    height: '100%'
                }}
            >
                <div
                    className="text-center"
                >
                    <div>
                        <h1 className="text-align">
                            Weather Forecast for
                            <a href="#" id='city'>
                                {weather.city}
                            </a>
                        </h1>
                    </div>
                    <div className="text-align">
                        {this.renderIcon()}
                    </div>
                    <div className="display">
                        <ul className="ul">
                            <li className="font-size-one" id='localTime'>
                                {weather.time.slice(0, -6)}&nbsp;
                                <span className="font-one" id="am_pm">
                                    {weather.time.slice(-2)}
                                </span>
                            </li>
                        <li className="font-size-one" id='fTemp'>
                            {weather.temp}
                            <span className='color-blue' onClick={this.toggleTempType}>
                                {weather.tempIn == 'C' &&
                                    <i>&#8451;</i>
                                }
                                {weather.tempIn == 'F' &&
                                    <i>&#8457;</i>
                                }
                            </span>
                        </li>
                        <li className="font-size-one" id='weatherType'>
                            {weather.weatherType}
                        </li>
                        </ul>
                    </div>
                    <form action="">
                        <div className="text-align form">
                            <h2 className="content">Find a Forecast</h2>
                            <div className="align-items-center flex content margin-bottom">
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

export default connect(state => ({
    weather: state
}), {loadData, toggleTempType, setTime})(App);
