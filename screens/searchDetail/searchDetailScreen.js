import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, Image, TextInput } from 'react-native'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons';
import { ButtonGroup } from '@rneui/themed'

import { tagSearchesList } from './data';
const SearchDetailScreen = ({ navigation }) => {


    const [selectedIndexes, setSelectedIndexes] = useState([1]);

    const renderItem = ({ item }) => (
        <View style={styles.suggestedInfoWrapStyle}>
            <View>
                <Image
                    source={item.userProfilePic}
                    style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
                />
                <View style={styles.hasTagWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor12Bold }}>
                        #
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding, }}>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                    {item.hastag}
                </Text>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
                    {item.postsCount} posts
                </Text>
            </View>
        </View>
    )
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {/* {backArrow()} */}
                {searchTab()}
                <View>
                    <ButtonGroup
                        buttons={['Useri', 'Sportivi', 'Cluburi', 'Business']}
                        selectMultiple
                        selectedIndexes={selectedIndexes}
                        onPress={(value) => {
                            setSelectedIndexes(value);
                        }}
                        containerStyle={{ marginBottom: 20 }}
                        buttonStyle={{ backgroundColor: Colors.whiteColor }}
                        selectedButtonStyle={{ backgroundColor: Colors.primaryColor }}
                    />
                </View>
                <View style={{ flex: 1, }}>

                    <FlatList
                        ListHeaderComponent={
                            <>
                                <Text style={{ ...Fonts.blackColor18SemiBold }}>
                                </Text>
                                <FlatList
                                    data={tagSearchesList}
                                    keyExtractor={(item) => `${item.id}`}
                                    renderItem={renderItem}
                                    scrollEnabled={false}
                                />
                            </>
                        }
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </SafeAreaView>
    )

    function searchTab() {
        return (
            <View style={styles.searchTabWrapStyle}>
                <MaterialIcons name='search' color={Colors.grayColor} size={20} />
                <TextInput
                    placeholder='Search here...'
                    style={styles.searchFieldStyle}
                    placeholderTextColor={Colors.grayColor}
                    cursorColor={Colors.primaryColor}
                />
                <MaterialIcons name="arrow-back-ios" size={22} color={Colors.grayColor} onPress={() => navigation.pop()} />
        
            </View>
        )
    }
}

export default SearchDetailScreen

const styles = StyleSheet.create({
    tabBarStyle: {
        elevation: 0.0,
        backgroundColor: Colors.whiteColor,
        borderBottomColor: Colors.lightGrayColor,
        borderBottomWidth: 1.5,
    },
    searchTabWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        marginL: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding - 4.0,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding + 5.0,
    },
    searchFieldStyle: {
        ...Fonts.blackColor14Regular,
        marginHorizontal: Sizes.fixPadding,
        height: 20.0,
        flex: 1,
        flexGrow: 2
    },
    userProfilePicWrapStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        borderWidth: 1.5,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    suggestedInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    hasTagWrapStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0.0,
        right: 0.0,
    }
})