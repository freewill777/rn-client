import { useContext } from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TransitionPresets } from '@react-navigation/stack';

import BottomTabBarScreen from './bottomTabBarScreen';
import { BottomBarIndexContext } from './botomTabBarIndexContext';
import CustomDrawer from './customDrawerScreen';

const Drawer = createDrawerNavigator();
const { width } = Dimensions.get('window');

function NavigationTree() {
    const { index } = useContext(BottomBarIndexContext);
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerPosition: 'right',
                drawerStyle: { width: width - 90.0, },
                swipeEnabled: index == 5 ? true : false,
            }}
        >
            <Drawer.Screen
                name="DrawerMain"
                component={BottomTabBarScreen}
                options={{ ...TransitionPresets.DefaultTransition, }}
            />
        </Drawer.Navigator>
    )
}

export default NavigationTree