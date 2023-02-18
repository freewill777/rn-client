import React from 'react'
import { Text, View, SafeAreaView, StatusBar, Image } from 'react-native'
import { Colors, Fonts, Sizes } from '../constants/styles'

const SplashScreen = ({ navigation }) => {

    setTimeout(() => {
        navigation.push('Onboarding');
    }, 3000);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.secondaryColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                {appLogo()}
                {appName()}
            </View>
        </SafeAreaView>
    )

    function appLogo() {
        return (
            <Image
                source={require('../assets/images/appLogo.png')}
                style={{ resizeMode: 'contain' }}
            />
        )
    }

    function appName() {
        return (
            <Text style={{ marginTop: Sizes.fixPadding - 5.0, }}>
                <Text style={{ ...Fonts.primaryColor20ExtraBold }}>
                    Harmonie { }
                </Text>
                <Text style={{ ...Fonts.whiteColor20ExtraBold }}>
                    Title
                </Text>
            </Text>
        )
    }
}

export default SplashScreen