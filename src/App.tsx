import React, {useState} from 'react';
import {Icon} from "leaflet";
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import './App.css';
import './index.css'


export default function App() {

    function AnotherOne() {
       useMapEvents({
            click: (e) => {
                console.log(e.latlng.lat)
                console.log(e.latlng.lng)
                let lat = e.latlng.lat
                let lng = e.latlng.lng
                let key = process.env.REACT_APP_KEY
                let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${key}`
                let urlBigger =  `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`

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


                fetch(urlBigger)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json();
                    })
                    .then(data => {
                        setCityData(data)
                        //console.log(weatherData)
                        console.log(data)
                    })
                    .catch(console.error)

            }
        })
        return null
    }

    function ChungHomeMap() {
        new Icon({
            iconUrl: "/skateboarding.svg",
            iconSize: [25, 25]
        });

        return (
            <MapContainer center={[58.370850, 26.714720]}
                          zoom={3}
                          scrollWheelZoom={true}
                          id={"map"}
            >

                <AnotherOne/>

                <Marker position={[58.377983, 26.729038]}>
                </Marker>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
        );
    }


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
        //Get City name and Country Code
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
                    console.log(data)
                })
                .catch(console.error)
        });

    }

    let fetchCityName = function () {
        if (CityData.name) {
            return CityData.name;
        }
    }

    let fetchCountryCode = function () {
        if (CityData.sys !== undefined) {
            return CityData.sys.country;
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
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@500&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
            </style>

            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                crossOrigin=""
            />


            <div>
                <h1 className="Header-title">Weather Boy 5000 ™</h1>


                <ChungHomeMap/>


                <div className="button-wrapper">
                    <button onClick={() => {
                        bigWeatherInfo();
                        bigCityInfo();
                    }}>Watch Clout
                    </button>
                </div>

                <div className="weather-data-box">

                    <h3 className="city-name">{fetchCountryCode() + ', ' + fetchCityName()}</h3>

                    <table className="data-table">
                        <tbody>
                        <tr>
                            <th>Day</th>
                            <th>Description</th>
                            <th>day Temp</th>
                            <th>night Temp</th>
                        </tr>
                        <tr>
                            <td>Today</td>
                            <td>{fetchDescription(0)}</td>
                            <td>{fetchDayTemp(0)}</td>
                            <td>{fetchNightTemp(0)}</td>

                        </tr>
                        <tr>
                            <td>Tomorrow</td>
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

            </div>
        </div>


    )
}

