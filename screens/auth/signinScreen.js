import React, { useState, useCallback, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView, BackHandler, StatusBar, Dimensions, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserContext } from '../../UserProvider';

const { width } = Dimensions.get('window');

const SigninScreen = ({ navigation }) => {

    const { loggedIn, setLoggedIn, name, setName, attemptLogin, setUserId } = useContext(UserContext)
    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        setBackClickCount(1)
        setTimeout(() => {
            setBackClickCount(0)
        }, 1000)
    }

    const [backClickCount, setBackClickCount] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const login = async () => {
        try {
            console.log(email, password)
            const response = await fetch(`https://eb5e-89-137-216-219.eu.ngrok.io/login?name=${email}&password=${password}`);
            const json = await response.json();
            const { id } = json
            console.log('id', id)
            if (id !== undefined) {
                setUserId(String(id))
                await AsyncStorage.setItem('@userId', String(id))
                navigation.push('BottomTabBar')
            }
            if (id === undefined) {
                alert('eroare')
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.secondaryColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {emailInfo()}
                    {passwordInfo()}
                    {forgetPasswordText()}
                    {<TouchableOpacity
                        activeOpacity={0.8}
                        onPress={login}
                        style={styles.buttonStyle}
                    >
                        <Text style={{ ...Fonts.whiteColor22Bold, paddingVertical: Sizes.fixPadding + 5.0 }}>
                            Sign In
                        </Text>
                    </TouchableOpacity>}
                    {orText()}
                    {socialMediaOIptions()}
                    {dontAccountInfo()}
                </ScrollView>
            </View>
            {exitInfo()}
        </SafeAreaView >
    )

    function exitInfo() {
        return (
            backClickCount == 1
                ?
                <View style={styles.exitInfoWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor12Regular }}>
                        Press Back Once Again to Exit
                    </Text>
                </View>
                :
                null
        )
    }

    function dontAccountInfo() {
        return (
            <Text style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center', marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.lightGrayColor16Regular }}>
                    Don’t have an account? { }
                </Text>
                <Text
                    onPress={() => { navigation.push('Signup') }}
                    style={{ ...Fonts.primaryColor16Bold }}
                >
                    Sign Up
                </Text>
            </Text>
        )
    }

    function socialMediaOIptions() {
        return (
            <View style={styles.socialMediaOptionsWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { }}
                    style={styles.socialMediaIconWrapStyle}
                >
                    <Image
                        source={require('../../assets/images/icons/facebook.png')}
                        style={styles.socialMediaIconStyle}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { }}
                    style={{ ...styles.socialMediaIconWrapStyle, marginHorizontal: Sizes.fixPadding * 3.0 }}
                >
                    <Image
                        source={require('../../assets/images/icons/google.png')}
                        style={styles.socialMediaIconStyle}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { }}
                    style={styles.socialMediaIconWrapStyle}
                >
                    <Image
                        source={require('../../assets/images/icons/twitter.png')}
                        style={styles.socialMediaIconStyle}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function orText() {
        return (
            <Text style={{ ...Fonts.lightGrayColor16Regular, marginHorizontal: Sizes.fixPadding * 2.0, textAlign: 'center' }}>
                OR
            </Text>
        )
    }

    function forgetPasswordText() {
        return (
            <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, textAlign: 'right', ...Fonts.lightGrayColor14Regular }}>
                Forget password?
            </Text>
        )
    }

    function passwordInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.lightGrayColor16Regular }}>
                    Password
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextInput
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        style={{ ...Fonts.whiteColor18Regular, flex: 1 }}
                        placeholder="Enter Your Password"
                        placeholderTextColor={Colors.whiteColor}
                        cursorColor={Colors.whiteColor}
                        secureTextEntry={!passwordVisible}
                    />
                    <MaterialCommunityIcons
                        name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                        size={16}
                        color={Colors.whiteColor}
                        onPress={() => { setPasswordVisible(!passwordVisible) }}
                    />
                </View>
                {divider()}
            </View>
        )
    }

    function emailInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.lightGrayColor16Regular }}>
                    Email Address
                </Text>
                <TextInput
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    style={{ ...Fonts.whiteColor18Regular }}
                    placeholder="Enter Your Email"
                    placeholderTextColor={Colors.whiteColor}
                    keyboardType="email-address"
                    cursorColor={Colors.whiteColor}
                />
                {divider()}
            </View>
        )
    }

    function divider() {
        return (
            <View style={{ backgroundColor: Colors.lightGrayColor, height: 1.0, marginTop: Sizes.fixPadding - 5.0 }} />
        )
    }

    function header() {
        return (
            <Text style={{ marginVertical: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.whiteColor20SemiBold }}>
                Sign In
            </Text>
        )
    }

}

export default SigninScreen

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        margin: Sizes.fixPadding * 2.0,
    },
    socialMediaIconWrapStyle: {
        width: width / 8.0,
        height: width / 8.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor
    },
    socialMediaIconStyle: {
        width: width / 18.0,
        height: width / 18.0,
        resizeMode: 'contain'
    },
    socialMediaOptionsWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: Sizes.fixPadding * 2.0
    },
    exitInfoWrapStyle: {
        backgroundColor: Colors.blackColor,
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
})