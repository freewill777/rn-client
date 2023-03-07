import { View, Text, TouchableOpacity, Image, Platform, StyleSheet, Dimensions } from 'react-native'

import React from 'react'

import { MaterialIcons } from "@expo/vector-icons";

import { Sizes, Fonts, Colors } from '../constants/styles'

const { height } = Dimensions.get("window");

import { shadowStyle } from '../appData';

const ListItem = ({ title, subtitle }) => {
    const [extended, setExtended] = React.useState(true)
    const data = createItem(title, subtitle)

    return (
        <View style={{ marginVertical: Sizes.fixPadding / 2 }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        alert("UserProfile");
                    }}
                    style={{ flex: 1, alignItems: "center", flexDirection: "row" }}
                >
                    <Image
                        source={data.item.userProfilePic}
                        style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
                    />
                    <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
                        <Text
                            numberOfLines={1}
                            style={{ ...Fonts.blackColor14SemiBold }}
                        >
                            {data.item.userName}
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={{ ...Fonts.grayColor12Regular }}
                        >
                            {data.item.userDetail}
                        </Text>
                    </View>
                </TouchableOpacity>
                <MaterialIcons
                    name="more-vert"
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => setExtended(!extended)}
                />
            </View>
            {extended && (
                <>
                    <Text
                        style={{
                            marginBottom: Sizes.fixPadding,
                            marginTop: Sizes.fixPadding - 6.0,
                            ...Fonts.grayColor12Regular,
                        }}
                    >
                        {data.item.aboutPost}
                    </Text>
                    <View
                        style={{
                            borderRadius: Sizes.fixPadding,
                            backgroundColor: Colors.whiteColor,
                            elevation: 2.0,
                            ...(Platform.OS === 'ios' ? shadowStyle : {})
                        }}
                    >
                        <Image
                            source={data.item.postImage}
                            style={styles.postImageStyle}
                        />
                        <View style={styles.likeCommentAndShareInfoWrapStyle}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <MaterialIcons
                                    name={data.item.postLike ? "favorite" : "favorite-border"}
                                    size={15}
                                    color={
                                        data.item.postLike ? Colors.redColor : Colors.grayColor
                                    }
                                    onPress={() => {
                                        alert({ id: data.item.id });
                                    }}
                                />
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        flex: 1,
                                        marginLeft: Sizes.fixPadding - 3.0,
                                        ...Fonts.grayColor14SemiBold,
                                    }}
                                >
                                    {data.item.postLikes} Likes
                                </Text>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <MaterialIcons
                                    name="comment"
                                    size={15}
                                    color={Colors.grayColor}
                                />
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        flex: 1,
                                        marginLeft: Sizes.fixPadding - 3.0,
                                        ...Fonts.grayColor14SemiBold,
                                    }}
                                >
                                    {data.item.postComments} Comments
                                </Text>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <MaterialIcons
                                    name="share"
                                    size={15}
                                    color={Colors.grayColor}
                                />
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        marginLeft: Sizes.fixPadding - 3.0,
                                        ...Fonts.grayColor14SemiBold,
                                    }}
                                >
                                    {data.item.postShares} Share
                                </Text>
                            </View>
                        </View>
                    </View>
                </>
            )}
        </View>
    )
}

function createItem(name, sport) {
    return {
        item: {
            key: "4",
            itemType: 'Club',
            id: "1",
            userProfilePic: require('../assets/images/contests/basketball.jpg'),
            userName: name,
            userDetail: sport,
            aboutPost:
                "Grup de basket pentru a se organiza meciur de basket 3v3 sau 5v5.",
            postLikes: "10k",
            postComments: "100",
            postShares: "35",
            postImage: require("../assets/images/contests/basketball.jpg"),
            postLike: true,
            type: "post",
        },
    }
}
export default ListItem

const styles = StyleSheet.create({
    postImageStyle: {
        height: height / 5.5,
        borderTopLeftRadius: Sizes.fixPadding,
        borderTopRightRadius: Sizes.fixPadding,
        width: "100%",
    },
    likeCommentAndShareInfoWrapStyle: {
        flexDirection: "row",
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 2.0,
        borderBottomLeftRadius: Sizes.fixPadding,
        borderBottomRightRadius: Sizes.fixPadding,
    }
});