import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'

import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';

const followRequestsList = [
    {
        "id": "1",
        "userProfilePic": require('../../assets/images/users/user27.png'),
        "userProfileName": "Ana Popescu",
        "userFullName": "Tenis",
        "isFollow": false,
        "acceptRequest": false
    },
    {
        "id": "2",
        "userProfilePic": require('../../assets/images/users/user32.png'),
        "userProfileName": "Andrei Ionescu",
        "userFullName": "Fotbal",
        "isFollow": true,
        "acceptRequest": false
    },
    {
        "id": "3",
        "userProfilePic": require('../../assets/images/users/user21.png'),
        "userProfileName": "Ionut Petrescu",
        "userFullName": "Baschet",
        "isFollow": true,
        "acceptRequest": true
    },
    {
        "id": "4",
        "userProfilePic": require('../../assets/images/users/user45.png'),
        "userProfileName": "Maria Vasilescu",
        "userFullName": "Inot",
        "isFollow": false,
        "acceptRequest": false
    },
    {
        "id": "5",
        "userProfilePic": require('../../assets/images/users/user11.png'),
        "userProfileName": "Vlad Iorga",
        "userFullName": "Atletism",
        "isFollow": true,
        "acceptRequest": true
    },
    {
        "id": "6",
        "userProfilePic": require('../../assets/images/users/user8.png'),
        "userProfileName": "Catalin Popescu",
        "userFullName": "Volei",
        "isFollow": false,
        "acceptRequest": false
    },
    {
        "id": "7",
        "userProfilePic": require('../../assets/images/users/user19.png'),
        "userProfileName": "Laura Marinescu",
        "userFullName": "Gimnastica",
        "isFollow": true,
        "acceptRequest": false
    },
    {
        "id": "8",
        "userProfilePic": require('../../assets/images/users/user7.png'),
        "userProfileName": "George Popa",
        "userFullName": "Box",
        "isFollow": false,
        "acceptRequest": false
    },
    {
        "id": "9",
        "userProfilePic": require('../../assets/images/users/user15.png'),
        "userProfileName": "Ioana Stoica",
        "userFullName": "Karate",
        "isFollow": true,
        "acceptRequest": true
    },
    {
        "id": "10",
        "userProfilePic": require('../../assets/images/users/user23.png'),
        "userProfileName": "Alexandru Tudorache",
        "userFullName": "Ciclism",
        "isFollow": false,
        "acceptRequest": true
    },
    {
        "id": "11",
        "userProfilePic": require('../../assets/images/users/user24.png'),
        "userProfileName": "Andrei Popescu",
        "userFullName": "Ciclism",
        "isFollow": false,
        "acceptRequest": true
    },
    {
        "id": "12",
        "userProfilePic": require('../../assets/images/users/user27.png'),
        "userProfileName": "Stefan Vasilescu",
        "userFullName": "Karate",
        "isFollow": false,
        "acceptRequest": true
    },
    {
        "id": "12",
        "userProfilePic": require('../../assets/images/users/user17.png'),
        "userProfileName": "Ana Maria Dumitrescu",
        "userFullName": "Box",
        "isFollow": false,
        "acceptRequest": true
    },

]


const CompetitorsScreen = ({ navigation }) => {
    const [followRequests, setFollowRequests] = useState(followRequestsList);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <View style={{ flex: 1, }}>
                <Header />
                <View style={{ backgroundColor: Colors.extraLightGrayColor, height: 2 }} />
                {requestsInfo()}
            </View>
        </SafeAreaView>
    )

    function requestsInfo() {
        const renderItem = ({ item }) => (
            <View>
                <TouchableOpacity onPress={() => {
                    navigation.push("UserProfile", { item });
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: Sizes.fixPadding, marginEnd: Sizes.fixPadding / 15 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} >
                            <Image
                                source={item.userProfilePic}
                                style={{ width: 40.0, height: 40.0, borderRadius: 20.0 }}
                            />
                            <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
                                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                                    {item.userProfileName}
                                </Text>
                                <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
                                    {item.userFullName}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => { console.log({ id: item.id }) }}
                            style={{ backgroundColor: item.isFollow ? Colors.whiteColor : Colors.primaryColor, ...styles.buttonStyle, marginRight: Sizes.fixPadding }}
                        >
                            <Text style={item.isFollow ? { ...Fonts.primaryColor14Bold } : { ...Fonts.whiteColor14Bold }}>
                                {item.isFollow ? 'Abonat' : 'Abonare'}
                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => { console.log({ id: item.id }) }}
                            style={{ backgroundColor: Colors.primaryColor, ...styles.buttonStyle, marginRight: Sizes.fixPadding }}
                        >
                            <Text style={{ color: Colors.whiteColor, paddingStart: 3 }}>
                                Donare
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <View style={{ backgroundColor: Colors.extraLightGrayColor, height: 1.0, marginVertical: Sizes.fixPadding / 3 }} />
            </View>
        )
        return (
            <FlatList
                data={followRequests}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding, paddingBottom: Sizes.fixPadding }}
            />
        )
    }

    function Header() {
        return (
            <View style={styles.headerWrapStyle}>
                {/* <MaterialIcons name="arrow-back-ios" size={22} color={Colors.blackColor} onPress={() => navigation.pop()} /> */}
                <Text style={{ flex: 1, marginHorizontal: Sizes.fixPadding - 5.0, ...Fonts.blackColor20SemiBold }}>
                    Competitori
                </Text>
                <MaterialIcons name="arrow-back" size={22} color={Colors.blackColor} onPress={() => { navigation.pop(); }} />
            </View>
        )
    }
}

export default CompetitorsScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        padding: Sizes.fixPadding,
    },
    buttonStyle: {
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Sizes.fixPadding,
    }
})