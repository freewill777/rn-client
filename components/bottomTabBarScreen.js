import React, { useState, useCallback, useContext } from "react";
import { View, TouchableOpacity, StyleSheet, BackHandler, SafeAreaView, StatusBar, Text, Image } from "react-native";
// import HomeScreen from "../screens/home/homeScreen";
import FeedScreen from "../screens/home/feedScreen";
import { Colors, Fonts, Sizes } from "../constants/styles";
import { useFocusEffect } from "@react-navigation/native";
import NotificationScreen from "../screens/notification/notificationScreen";
import MessageScreen from "../screens/message/messageScreen";
import ProfileScreen from "../screens/profile/profileScreen";
import { MaterialIcons } from '@expo/vector-icons';
import { BottomBarIndexContext } from "./botomTabBarIndexContext";
import CompetitorsScreen from "../screens/competitors/competitorsScreen";

const BottomTabBarScreen = ({ navigation }) => {

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

    const [state, setState] = useState({
        backClickCount: 0,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { backClickCount } = state;
    const { index, changeIndex } = useContext(BottomBarIndexContext);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {index == 1 ?
                    <FeedScreen navigation={navigation} />
                    :
                    index == 2 ?
                        <NotificationScreen navigation={navigation} />
                        :
                        index == 4 ?
                            <MessageScreen navigation={navigation} />
                            :
                            index == 6 ?
                                <CompetitorsScreen navigation={navigation} />
                                :
                                <ProfileScreen navigation={navigation} />

                }
                <View style={styles.bottomTabBarStyle}>
                    {bottomTabBarItem({
                        tabIndex: 1,
                        iconName: 'home',
                    })}
                                        {bottomTabBarItem({
                        tabIndex: 4,
                        iconName: 'message',
                    })}
                    {/* {bottomTabBarItem({
                        tabIndex: 6,
                        iconName: require('../assets/images/icons/selfi.png'),
                    })} */}
                    {bottomTabBarItem({
                        tabIndex: 2,
                        iconName: 'notifications',
                    })}
                    {bottomTabBarItem({
                        // tab no 3 is the special + button
                        tabIndex: 3,
                    })}

                    {bottomTabBarItem({
                        tabIndex: 5,
                        iconName: 'person',
                    })}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.push('SearchDetail')}
                    >
                        <MaterialIcons name="search" size={28} color={Colors.grayColor} />

                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.openDrawer()}
                    >
                        <MaterialIcons name="menu" size={28} color={Colors.grayColor} />

                    </TouchableOpacity>
                </View>
                {exitInfo()}
            </View>
        </SafeAreaView>
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

    function bottomTabBarItem({ tabIndex, iconName }) {
        return (
            tabIndex == 3
                ?
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.push('Post') }}
                    style={styles.uploadIconWrapStyle}
                >
                    <MaterialIcons name='add' size={28} color={Colors.whiteColor} />
                </TouchableOpacity>
                :
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => { tabIndex == index ? null : changeIndex(tabIndex) }}
                >
                    {/* <Image
                        source={iconName}
                        style={{ ...styles.iconStyle, tintColor: index == tabIndex ? Colors.blackColor : Colors.lightGrayColor }}
                    /> */}
                    <MaterialIcons name={iconName} size={28} color={Colors.grayColor} />
                </TouchableOpacity>
        )
    }

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }
}

export default BottomTabBarScreen;

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 60.0,
        zIndex: 100,
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderTopColor: 'rgba(128, 128, 128, 0.1)',
        borderTopWidth: 1.0,
        elevation: 2.0
    },
    iconStyle: {
        width: 24.0,
        height: 24.0,
        resizeMode: 'contain',
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
        zIndex: 100,
    },
    uploadIconWrapStyle: {
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
        borderColor: Colors.whiteColor,
        borderWidth: 4.0,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3.0,
        // bottom: 25.0,
        backgroundColor: Colors.primaryColor
    }
})