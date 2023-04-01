import { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [userStats, setUserStats] = useState({})

    useEffect(() => {
        if (userId.length > 0) {
            setLoggedIn(true)
        }
        if (userId.length === 0) {
            setLoggedIn(false)
        }
    }, [userId])

    useEffect(() => {
        const getId = async () => {
            try {
                const value = await AsyncStorage.getItem('@userId')
            } catch (e) {
                alert(e)
            }
        }
        getId()
        if (getId) {
            setUserId(getId);
            setLoggedIn(true);
        } else {
            setUserId('');
            setLoggedIn(false);
        }
    }, [])


    return (
        <UserContext.Provider
            value={{
                loggedIn,
                setLoggedIn,
                name,
                setName,
                userStats,
                attemptLogin,
                setUserId,
                userId,
                setUserStats
            }}
        >
            {children}
        </UserContext.Provider>
    )

    async function attemptLogin({ user, pass }) {
        const resp = await fetch(`http://localhost:3000/login?name=${user}&password=${pass}`)
        const data = await resp.json()
        return data
    }
}

export default UserProvider