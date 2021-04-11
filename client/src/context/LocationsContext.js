import { createContext, useState } from 'react';

export const LocationsContext = createContext();


export const LocationProvider = (props) => {

    const [userLocation, setUserLocation] = useState([48.051776, 8.206841]);
    const [locations, setLocations] = useState([]);

    return (
        <LocationsContext.Provider value={{ userLocation, setUserLocation, locations, setLocations }}>
            {props.children}
        </LocationsContext.Provider>
    )
}