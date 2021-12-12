import React from 'react';
import './App.css';

const App: React.FC = () => {

    //Get User Position Basically
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        // @ts-ignore
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        let key = '4346a37bbdbf2e62faf141451f8b3459'
        let url = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
        fetch(url)
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText)
                }
                return response.json();
            })
            .then(data =>{
                console.log(data);
            })
            .catch(console.error)
    });
    return(
        <div>
            <h1>Test this out</h1>
        </div>
    )

}

export default App;

