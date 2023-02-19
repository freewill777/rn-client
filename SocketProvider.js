import React, { createContext } from 'react'

import io from "socket.io-client";

export const SocketContext = createContext();

export const socket = io("http://192.168.0.17:3000");

export const SocketProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}
