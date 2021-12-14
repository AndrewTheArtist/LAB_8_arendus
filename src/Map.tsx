import React, {useState} from "react";
import ReactMapGL from "react-map-gl";

function MapGL() {
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    });


    return (
        <div>
            <ReactMapGL{...viewport}
                       mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                       onViewportChange={(viewport: React.SetStateAction<{ width: number; height: number; latitude: number; longitude: number; zoom: number; }>) => {
                           setViewport(viewport);
                       }}>This should work</ReactMapGL>
        </div>


    );
}

export default MapGL;