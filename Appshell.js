import { useContext } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

// screens disconnected from the main tree of screens
import LoadingScreen from "./components/loadingScreen";
import SplashScreen from './screens/splashScreen';
import OnboardingScreen from './screens/onboarding/onboardingScreen';
import SigninScreen from './screens/auth/signinScreen';
import SignupScreen from './screens/auth/signupScreen';
import VerificationScreen from './screens/auth/verificationScreen';

// main tree of screens 
import NavigationTree from './components/navigationTree';



const Stack = createStackNavigator();


import { UserContext } from './UserProvider';

export const AppShell = () => {
    const { loggedIn } = useContext(UserContext)

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
                initialRouteName={loggedIn ? "BottomTabBar" : 'Loading'}
            >
                <Stack.Screen name="Loading" component={LoadingScreen} />
                <Stack.Screen name="Splash" component={SplashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Signin" component={SigninScreen} options={{ ...TransitionPresets.DefaultTransition }} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Verification" component={VerificationScreen} />
                <Stack.Screen name="BottomTabBar" component={NavigationTree} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

