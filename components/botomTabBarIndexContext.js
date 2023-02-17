import React, { useState, createContext, useEffect } from 'react'

export const BottomBarIndexContext = createContext();

export const BottomBarIndexProvider = ({ children }) => {

    const [index, setIndex] = useState(1);
    useEffect(() => {
        console.log({ index })
    }, [index])
    return (
        <BottomBarIndexContext.Provider value={{ index, changeIndex }}>
            {children}
        </BottomBarIndexContext.Provider>
    )

    function changeIndex(index) {
        setIndex(index);
    }
}