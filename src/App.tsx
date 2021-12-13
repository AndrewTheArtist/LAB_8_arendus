import React, {useState} from 'react';
import './App.css';

const App = () => {

    let [weatherData, setWeatherData]: any = useState([]);
    let [CityData, setCityData]: any = useState([]);

    function bigWeatherInfo() {
        //Get User Position Basically
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);

            let lat = position.coords.latitude
            let lon = position.coords.longitude
            let key = process.env.REACT_APP_KEY
            let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`


            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json();
                })
                .then(data => {
                    setWeatherData(data)
                    //console.log(weatherData)
                    console.log(data)
                })
                .catch(console.error)
        }, () => {
            alert("In order to use this app you must share your location")
        });

    }


    function bigCityInfo() {
        //Get User Position Basically
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);

            let lat = position.coords.latitude
            let lon = position.coords.longitude
            let key = process.env.REACT_APP_KEY
            let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`


            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json();
                })
                .then(data => {
                    setCityData(data)
                })
                .catch(console.error)
        });

    }


    let fetchCityName = function () {
        if (CityData.name !== undefined && CityData.name.length > 0) {
            console.log(CityData.name)
            return CityData.name;
        }
    }


    let fetchDescription = function (index: number) {
        if (weatherData.daily !== undefined && weatherData.daily.length > 0) {
            return weatherData.daily[index].weather[0].description;
        }
    }

    let fetchDayTemp = function (index: number) {
        if (weatherData.daily !== undefined && weatherData.daily.length > 0) {
            return Math.round((weatherData.daily[index].temp.day - 273.15) * 100) / 100 + ' C°';
        }
    }

    let fetchNightTemp = function (index: number) {
        if (weatherData.daily !== undefined && weatherData.daily.length > 0) {
            return Math.round((weatherData.daily[index].temp.night - 273.15) * 100) / 100 + ' C°';
        }
    }
    return (
        <div>

            <div>
                <h1>This is My app I sell it for 500 Uero</h1>
                <button onClick={() => {
                    bigWeatherInfo();
                    bigCityInfo();
                }}>watch clout
                </button>
                <table className="title">
                    <h3>{fetchCityName()}</h3>
                    <tbody>
                    <tr>
                        <th>Day</th>
                        <th>Description</th>
                        <th>day Temp</th>
                        <th>night Temp</th>
                    </tr>
                    <tr>
                        <td>Day 1</td>
                        <td>{fetchDescription(0)}</td>
                        <td>{fetchDayTemp(0)}</td>
                        <td>{fetchNightTemp(0)}</td>

                    </tr>
                    <tr>
                        <td>Day 2</td>
                        <td>{fetchDescription(1)}</td>
                        <td>{fetchDayTemp(1)}</td>
                        <td>{fetchNightTemp(1)}</td>
                    </tr>
                    <tr>
                        <td>Day 3</td>
                        <td>{fetchDescription(2)}</td>
                        <td>{fetchDayTemp(2)}</td>
                        <td>{fetchNightTemp(2)}</td>
                    </tr>
                    <tr>
                        <td>Day 4</td>
                        <td>{fetchDescription(3)}</td>
                        <td>{fetchDayTemp(3)}</td>
                        <td>{fetchNightTemp(3)}</td>
                    </tr>
                    <tr>
                        <td>Day 5</td>
                        <td>{fetchDescription(4)}</td>
                        <td>{fetchDayTemp(4)}</td>
                        <td>{fetchNightTemp(4)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <h2>This is an noew hets</h2>
        </div>
    )
}
export default App;