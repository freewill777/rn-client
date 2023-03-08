import React from "react";
import { View, SafeAreaView, StatusBar, Text } from "react-native";

import FeedScreen from "../screens/home/feedScreen";
import NotificationScreen from "../screens/notification/notificationScreen";
import MessageScreen from "../screens/message/messageScreen";
import ProfileScreen from "../screens/profile/profileScreen";
import CompetitorsScreen from "../screens/competitors/competitorsScreen";
import GroupsScreen from "../screens/groups/groupsScreen";
import EventsScreen from "../screens/events/eventsScreen";
import BlogScreen from "../screens/blog/blogScreen";
import ConfidentialityScreen from "../screens/confidentiality/confidentialityScreen";
import AboutScreen from "../screens/about/aboutScreen";
import HelpScreen from "../screens/help/helpScreen"

import { Colors } from "../constants/styles";
import BottomTabBarMenu from "./bottomTabBarMenu";
import { BottomBarIndexContext } from "./botomTabBarIndexContext";

const BottomTabBarScreen = ({ navigation }) => {
    // navigation.push('Signin')
    const { index, changeIndex } = React.useContext(BottomBarIndexContext);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {index === 1 && <FeedScreen navigation={navigation} />}
                {index === 2 && <MessageScreen navigation={navigation} />}
                {index === 3 && <NotificationScreen navigation={navigation} />}
                {index === 4 && <></>}
                {index === 5 && <ProfileScreen navigation={navigation} />}
                {index === 6 && <GroupsScreen navigation={navigation} />}
                {index === 7 && <EventsScreen navigation={navigation} />}
                {index === 8 && <CompetitorsScreen navigation={navigation} />}
                {index === 9 && <BlogScreen navigation={navigation} />}
                {index === 10 && <ConfidentialityScreen navigation={navigation} />}
                {index === 11 && <AboutScreen navigation={navigation} />}
                {index === 12 && <HelpScreen navigation={navigation} />}
                <BottomTabBarMenu index={index} changeIndex={changeIndex} navigation={navigation} />
            </View>
        </SafeAreaView>
    )

}

export default BottomTabBarScreen;
