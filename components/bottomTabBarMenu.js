import { View, TouchableOpacity, StyleSheet } from "react-native";

import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Sizes } from "../constants/styles";

function BottomTabBarMenu({ tabIndex, iconName, index, changeIndex, navigation }) {
    return (
        <View style={styles.bottomTabBarStyle}>
            {bottomTabBarItem({
                tabIndex: 1,
                iconName: 'home',
                index,
                changeIndex,
                navigation
            })}
            {bottomTabBarItem({
                tabIndex: 2,
                iconName: 'message',
                index,
                changeIndex,
                navigation
            })}
            {bottomTabBarItem({
                tabIndex: 3,
                iconName: 'notifications',
                index,
                changeIndex,
                navigation
            })}
            {bottomTabBarItemAccent({
                tabIndex: 4,
                index,
                changeIndex,
                navigation
            })}

            {bottomTabBarItem({
                tabIndex: 5,
                iconName: 'person',
                index,
                changeIndex,
                navigation
            })}
            {bottomTabBarItem({
                tabIndex: 6,
                iconName: 'groups',
                index,
                changeIndex,
                navigation
            })}
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.openDrawer()}
            >
                <MaterialIcons name="menu" size={28} color={Colors.grayColor} />

            </TouchableOpacity>
        </View>
    )
}

function bottomTabBarItem({ tabIndex, iconName, index, changeIndex, navigation }) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => { tabIndex == index ? null : changeIndex(tabIndex) }}
        >
            <MaterialIcons name={iconName} size={28} color={tabIndex === index ? Colors.primaryColor : Colors.grayColor} />
        </TouchableOpacity>
    )
}

function bottomTabBarItemAccent({ tabIndex, iconName, index, changeIndex, navigation }) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => { tabIndex == index ? null : changeIndex(tabIndex) }}
            style={styles.uploadIconWrapStyle}
        >
            <MaterialIcons name='add' size={28} color={Colors.whiteColor} />
        </TouchableOpacity>
    )
}



export default BottomTabBarMenu

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