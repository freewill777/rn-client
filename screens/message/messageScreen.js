import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons';
import { useLayoutEffect } from 'react';
import { SocketContext } from '../../SocketProvider';

import userList from './users';
import channelList from './channelList';


const MessageScreen = ({ navigation }) => {

    const [onlineUsers, setOnlineUsers] = useState(userList)
    const [availableChannels, setAvailableChannels] = useState(channelList)
    const { socket } = useContext(SocketContext)

    useLayoutEffect(() => {
        socket.emit("getRoomsList");
        socket.on("roomsList", (roomsList) => {
            setAvailableChannels(roomsList);
        });
        socket.on("usersList", (usersList) => {
            setOnlineUsers(usersList);
        });
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.whiteColor
            }}
        >
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            <View style={{ flex: 1 }}>
                {header()}
                {ChatsInfo()}
            </View>
        </SafeAreaView>
    )

    function activeUsers() {
        return (
            <View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={onlineUsers}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({ item }) => (
                        <View style={{ alignItems: 'center', marginHorizontal: Sizes.fixPadding - 5.0, }}>
                            <View>
                                <Image
                                    source={item.userProfilePic}
                                    style={{ width: 40.0, height: 40.0, borderRadius: 20.0 }}
                                />
                                <View style={styles.activeSmallIndicatorStyle} />
                            </View>
                            <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.blackColor12Regular }}>
                                {item.userProfileName} pula
                            </Text>
                        </View>
                    )}
                    contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding + 5.0, paddingVertical: Sizes.fixPadding * 2.0, }}
                />
            </View>
        )
    }



    function ChatsInfo() {
        return (
            <View style={{ flex: 1 }}>
                {activeUsers()}
                <FlatList
                    // data coming from local file
                    data={availableChannels}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({ item }) => {
                        const { name, id } = item
                        return (
                            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        navigation.push('Chat', { room: id })
                                    }}
                                    style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, }}>
                                        <View>
                                            <Image
                                                source={require('../../assets/images/sports/football.jpg')}
                                                style={{ width: 50.0, height: 50.0, borderRadius: 25.0, }}
                                            />
                                        </View>
                                        <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding, }}>
                                            <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                                                {item.name}
                                            </Text>
                                            <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
                                                {item.id}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={{ ...Fonts.blackColor12SemiBold }}>
                                        {item.time}
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ backgroundColor: Colors.extraLightGrayColor, height: 1.0, marginVertical: Sizes.fixPadding }} />
                            </View>
                        )
                    }}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0 }}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor20SemiBold }}>
                    Chat groups
                </Text>
                <MaterialIcons name="search" size={22} color={Colors.blackColor} onPress={() => { navigation.push('SearchChat') }} />
            </View>
        )
    }
}

export default MessageScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        padding: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding - 8.0
    },
    activeBigIndicatorStyle: {
        width: 10.0,
        height: 10.0,
        borderRadius: 5.0,
        bottom: 0.0,
        right: 5.0,
        backgroundColor: Colors.greenColor,
        position: 'absolute',
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
    },
    activeSmallIndicatorStyle: {
        width: 8.0,
        height: 8.0,
        borderRadius: 4.0,
        backgroundColor: Colors.greenColor,
        position: 'absolute',
        bottom: 0.0,
        right: 5.0,
    },
    callingButtonStyle: {
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabBarStyle: {
        elevation: 0.0,
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderBottomColor: Colors.lightGrayColor,
        borderBottomWidth: 1.5,
    }
})