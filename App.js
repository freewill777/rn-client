import 'react-native-gesture-handler';
import { LogBox } from 'react-native';

import { AppShell } from './Appshell';

import { BottomBarIndexProvider } from './components/botomTabBarIndexContext';
import { UserProvider } from './UserProvider';
import { SocketProvider } from './SocketProvider';

LogBox.ignoreAllLogs();

const App = () => {
    return (
        <SocketProvider>
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