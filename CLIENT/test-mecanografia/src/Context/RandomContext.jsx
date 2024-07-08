import { createContext, useContext, useState } from "react";

const RandomContext = createContext()
export const useRandomContext = () => useContext(RandomContext)

export const RandomContextProvider = ({children}) => {
    const [words, setWords] = useState(10)
    const [time, setTime] = useState(15)

    return(
        <RandomContext.Provider 
        value={{
            setWords,
            words,
            setTime,
            time
        }}>
            {children}
        </RandomContext.Provider>
    )
}