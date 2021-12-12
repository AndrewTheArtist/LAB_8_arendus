import React from "react";
import './App.css';
import {name} from './interfaces'

function App() {

    //Get User Position Basically
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);

        let lat = position.coords.latitude
        let lon = position.coords.longitude
        let key = '4346a37bbdbf2e62faf141451f8b3459'
        let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
            })
            .catch(console.error)

    });
    return(
      <div>
        <h1>test</h1>
      </div>
    );


}
export default App;


