import React, { createContext } from 'react'

import io from "socket.io-client";
import {HOST} from "./settings";

export const SocketContext = createContext();

export const socket = io(HOST);

export const SocketProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}
