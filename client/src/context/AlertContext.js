import { createContext, useState } from 'react';

export const AlertContext = createContext();


export const AlertProvider = (props) => {

    const [alertMessage, setAlertMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    return (
        <AlertContext.Provider value={{ alertMessage, setAlertMessage, isLoading, setIsLoading }}>
            {props.children}
        </AlertContext.Provider>
    )
}