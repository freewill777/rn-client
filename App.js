import { useEffect, useLayoutEffect } from "react";
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import * as Font from "expo-font";
import { AppShell } from './Appshell';
import { StatusBar } from 'expo-status-bar';

import { BottomBarIndexProvider } from './components/botomTabBarIndexContext';
import { UserProvider } from './UserProvider';
import { SocketProvider } from './SocketProvider';

LogBox.ignoreAllLogs();

const App = () => {
    useLayoutEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                Roboto_Light: require("./assets/fonts/Roboto-Light.ttf"),
                Roboto_Regular: require("./assets/fonts/Roboto-Regular.ttf"),
                Roboto_Medium: require("./assets/fonts/Roboto-Medium.ttf"),
                Roboto_Bold: require("./assets/fonts/Roboto-Bold.ttf"),
                Lato_Light: require("./assets/fonts/Lato-Light.ttf"),
                Oswald_Bold: require("./assets/fonts/Oswald-Bold.ttf"),
                Lato_Regular: require("./assets/fonts/Lato-Regular.ttf"),
                Lato_Medium: require("./assets/fonts/Lato-Regular.ttf"),
                Lato_Bold: require("./assets/fonts/Lato-Bold.ttf"),
                OpenSans_Regular: require("./assets/fonts/OpenSans-Regular.ttf"),
                OpenSans_Medium: require("./assets/fonts/OpenSans-Medium.ttf"),
                OpenSans_SemiBold: require("./assets/fonts/OpenSans-SemiBold.ttf"),
                OpenSans_Bold: require("./assets/fonts/OpenSans-Bold.ttf"),
                OpenSans_ExtraBold: require("./assets/fonts/OpenSans-ExtraBold.ttf"),
            });
        }
        loadFont();
    })
    return (
        <SocketProvider>
            <StatusBar style="dark" />
            <BottomBarIndexProvider>
                <UserProvider>
                    <AppShell>
                    </AppShell>
                </UserProvider>
            </BottomBarIndexProvider>
        </SocketProvider>
    );
}

export default App;