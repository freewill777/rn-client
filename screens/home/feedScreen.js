/* eslint-disable global-require */
import React, { useState, useRef, useContext, useMemo, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Dimensions,
    FlatList,
    TouchableOpacity,
    TextInput
} from "react-native";
import { Platform } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import { ButtonGroup } from '@rneui/themed'

import { UserContext } from "../../UserProvider";
import { FontStyles } from "../../constants/styles";
import { notifications, todaysPostsList } from "./data";

import { shadowStyle } from "../../appData";

const { width, height } = Dimensions.get("window");

const FeedScreen = ({ navigation }) => {
    const [todaysPosts, setTodaysPosts] = useState(todaysPostsList);

    const [searching, setSearching] = useState(false);
    const [text, onChangeText] = React.useState('');

    const renderItem = (data) => (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                {data.item.type == "following" ? (
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            source={data.item.userProfilePic}
                            style={styles.userProfilePicStyle}
                        />
                        <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
                            <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                {data.item.userName} a început să te urmărească
                            </Text>
                            <Text style={{ ...Fonts.grayColor12Regular }}>
                                {data.item.notificationTime}
                            </Text>
                        </View>
                    </View>
                ) : data.item.type == "likeMorePhotos" ? (
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            source={data.item.userProfilePic}
                            style={styles.userProfilePicStyle}
                        />
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{
                                    marginHorizontal: Sizes.fixPadding,
                                    ...Fonts.blackColor14SemiBold,
                                }}
                            >
                                {data.item.userName} a apreciat {data.item.likedPohotos.length}{" "}
                                fotografii
                            </Text>
                            <View
                                style={{
                                    marginHorizontal: Sizes.fixPadding - 5.0,
                                    flexDirection: "row",
                                }}
                            >
                                {data.item.likedPohotos.length >= 4
                                    ? data.item.likedPohotos.slice(0, 4).map((item) => (
                                        <Image
                                            key={`${item.id}`}
                                            source={item.photo}
                                            style={{
                                                ...styles.likedPhotosStyle,
                                                width: width / 6.5,
                                                height: width / 6.5,
                                            }}
                                        />
                                    ))
                                    : data.item.likedPohotos.map((item) => (
                                        <Image
                                            key={`${item.id}`}
                                            source={item.photo}
                                            style={{
                                                ...styles.likedPhotosStyle,
                                                width: width / 5.0,
                                                height: width / 5.0,
                                            }}
                                        />
                                    ))}
                            </View>
                            <Text
                                style={{
                                    marginHorizontal: Sizes.fixPadding,
                                    ...Fonts.grayColor12Regular,
                                }}
                            >
                                {data.item.notificationTime}
                            </Text>
                        </View>
                    </View>
                ) : data.item.type == "likeOnePhoto" ? (
                    <View
                        style={{ flexDirection: "row", justifyContent: "space-between" }}
                    >
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <Image
                                source={data.item.userProfilePic}
                                style={styles.userProfilePicStyle}
                            />
                            <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
                                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                    {data.item.userName} a apreciat fotografia ta
                                </Text>
                                <Text style={{ ...Fonts.grayColor12Regular }}>
                                    {data.item.notificationTime}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                navigation.push("Posts");
                            }}
                        >
                            <Image
                                source={data.item.likedPhoto}
                                style={{
                                    width: width / 6.0,
                                    height: width / 6.0,
                                    borderRadius: Sizes.fixPadding - 5.0,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                ) : data.item.type == "mention" ? (
                    <View
                        style={{ flexDirection: "row", justifyContent: "space-between" }}
                    >
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <Image
                                source={data.item.userProfilePic}
                                style={styles.userProfilePicStyle}
                            />
                            <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
                                <Text>
                                    <Text style={{ ...Fonts.blackColor14Bold }}>
                                        {data.item.userName} { }
                                    </Text>
                                    <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                        te-a menționat aici:
                                    </Text>
                                    <Text style={{ ...Fonts.blueColor14SemiBold }}>
                                        { } {data.item.mantionUserName} { }
                                    </Text>
                                    <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                        {data.item.comment}
                                    </Text>
                                </Text>
                                <Text style={{ ...Fonts.grayColor12Regular }}>
                                    {data.item.notificationTime}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                navigation.push("Comments");
                            }}
                        >
                            <Image
                                source={data.item.mentionPhoto}
                                style={{
                                    width: width / 6.0,
                                    height: width / 6.0,
                                    borderRadius: Sizes.fixPadding - 5.0,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                ) : data.item.type == "likeByMore" ? (
                    <View
                        style={{ flexDirection: "row", justifyContent: "space-between" }}
                    >
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ width: 50.0 }}>
                                <Image
                                    source={data.item.userProfilePics[0].userProfilePic}
                                    style={{ width: 38.0, height: 38.0, borderRadius: 19.0 }}
                                />
                                <Image
                                    source={data.item.userProfilePics[1].userProfilePic}
                                    style={{
                                        width: 38.0,
                                        height: 38.0,
                                        borderRadius: 19.0,
                                        position: "absolute",
                                        right: 0.0,
                                        bottom: 2.0,
                                    }}
                                />
                            </View>
                            <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
                                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                    {data.item.userProfileNames[0]} ,{" "}
                                    {data.item.userProfileNames[1]} and{" "}
                                    {data.item.userProfileNames.length - 2} alții au apreciat fotografia ta
                                </Text>
                                <Text style={{ ...Fonts.grayColor12Regular }}>
                                    {data.item.notificationTime}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                navigation.push("Posts");
                            }}
                        >
                            <Image
                                source={data.item.likedPhoto}
                                style={{
                                    width: width / 6.0,
                                    height: width / 6.0,
                                    borderRadius: Sizes.fixPadding - 5.0,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                ) : data.item.type == "seeOldPost" ? (
                    <View
                        style={{ flexDirection: "row", justifyContent: "space-between" }}
                    >
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={styles.historyIconWrapStyle}>
                                <MaterialIcons
                                    name="history"
                                    size={24}
                                    color={Colors.primaryColor}
                                />
                            </View>
                            <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
                                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                    Vezi postările mai vechi din data de {data.item.postTime} {data.item.seeTime}
                                </Text>
                                <Text style={{ ...Fonts.grayColor12Regular }}>
                                    {data.item.notificationTime}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                navigation.push("Posts");
                            }}
                        >
                            <Image
                                source={data.item.post}
                                style={{
                                    width: width / 6.0,
                                    height: width / 6.0,
                                    borderRadius: Sizes.fixPadding - 5.0,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                ) : data.item.type == "post" ? (
                    <View>
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
                                    navigation.push("UserProfile");
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
                            />
                        </View>
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
                                            changeTodayPosts({ id: data.item.id });
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
                    </View>
                ) : null}
                <View
                    style={{
                        backgroundColor: Colors.extraLightGrayColor,
                        height: 1.0,
                        marginVertical: Sizes.fixPadding,
                    }}
                />
            </View>
        </View>
    );
    const buttons = ['User', 'Sportiv', 'Club', 'Business']
    const { name } = useContext(UserContext)
    const [selectedIndexes, setSelectedIndexes] = useState([]);
    const selectedFilters = useMemo(() => selectedIndexes.map(index => buttons[index]), [selectedIndexes]);
    const listData = useMemo(() => notifications.filter(notification => selectedFilters.length > 0 ? selectedFilters.includes(notification.itemType) : true), [selectedFilters]);
    const queryData = useMemo(() => listData.filter(item => text.length > 0 ? item?.userName?.toLowerCase().includes(text.toLowerCase()) : true))

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <View style={{ flex: 1 }}>
                {<View style={{ ...styles.headerWrapStyle, flexDirection: "row", ...(Platform.OS === 'ios' ? shadowStyle : {}) }}>
                    <View style={{ width: '50%', flexDirection: "row", alignItems: 'center' }}>
                        <Image
                            source={require("../../assets/images/homeAppLogo.png")}
                            style={{ width: 32.0, height: 32.0, resizeMode: "contain", marginEnd: 10 }}
                        />
                        <Text>
                            <Text style={{ ...Fonts.primaryColor20Bold, fontFamily: FontStyles.accentBold, }}>Existăm</Text>
                            <Text style={{ ...Fonts.secondaryColor12ExtraBold }}>.ro</Text>
                        </Text>
                    </View>
                    {searching ? (
                        <View style={{ alignItems: "center", justifyContent: 'flex-end', width: '50%', flexDirection: "row" }}>
                            <TextInput
                                placeholder='Căutare...'
                                style={{ ...styles.searchFieldStyle, marginRight: 8 }}
                                placeholderTextColor={Colors.grayColor}
                                cursorColor={Colors.primaryColor}
                                onChangeText={onChangeText}
                                value={text}
                            />
                            <MaterialIcons
                                onPress={() => setSearching(!searching)}
                                name='search'
                                color={Colors.blackColor}
                                size={28}
                                style={{ marginRight: -6 }}
                            />
                        </View>) : (
                        <View style={{ alignItems: "center", justifyContent: 'flex-end', width: '50%', flexDirection: "row" }}>
                            <MaterialIcons
                                name="search"
                                size={28}
                                color={Colors.grayColor}
                                onPress={() => setSearching(!searching)}
                                style={{ marginRight: -6 }}
                            />
                        </View>
                    )}
                </View >}
                {searching && <>
                    <ButtonGroup
                        buttons={buttons}
                        selectMultiple
                        selectedIndexes={selectedIndexes}
                        onPress={(value) => {
                            setSelectedIndexes(value);
                        }}
                        containerStyle={{ marginBottom: 10 }}
                        buttonStyle={{ backgroundColor: Colors.whiteColor }}
                        selectedButtonStyle={{ backgroundColor: Colors.primaryColor }}
                    />
                </>}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {listData.length === 0
                                ? noNotiificationInfo()
                                : notificationsInfo()}
                        </>
                    }
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 9.0 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );

    function changeTodayPosts({ id }) {
        const copyPosts = todaysPosts;
        const newPosts = copyPosts.map((item) => {
            if (item.id == id) {
                return { ...item, postLike: !item.postLike };
            } else {
                return item;
            }
        });
        setTodaysPosts(newPosts);
    }


    function noNotiificationInfo() {
        return (
            <View
                style={{
                    height: height / 1.8,
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                }}
            >
                <Ionicons
                    name="ios-notifications-off-outline"
                    size={40}
                    color={Colors.lightGrayColor}
                    style={{ marginBottom: Sizes.fixPadding }}
                />
                <Text style={{ ...Fonts.lightGrayColor16SemiBold }}>
                    No any notifications
                </Text>
            </View>
        );
    }

    function notificationsInfo() {
        return (
            <View style={{ paddingTop: Sizes.fixPadding }}>
                <SwipeListView
                    data={queryData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-width}
                    leftOpenValue={width}
                    // onSwipeValueChange={onSwipeValueChange}
                    useNativeDriver={false}
                    scrollEnabled={false}
                />
            </View>
        );
    }
    const renderHiddenItem = () => <View style={styles.rowBack} />;
};

export default FeedScreen;

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: Sizes.fixPadding * 12.0,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        flexWrap: 'wrap'
    },
    userProfilePicWrapStyle: {
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
        borderWidth: 1.5,
        alignItems: "center",
        justifyContent: "center",
    },
    userProfilePicStyle: {
        width: 56.0,
        height: 56.0,
        borderRadius: 28.0,
        borderColor: Colors.whiteColor,
        borderWidth: 2.0,
    },
    addStoryIconWrapStyle: {
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
        borderStyle: "dashed",
        borderWidth: 1.5,
        backgroundColor: "#E3F2FD",
        borderColor: Colors.primaryColor,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: Sizes.fixPadding - 5.0,
    },
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
    },
    followAndFollowingButtonStyle: {
        marginTop: Sizes.fixPadding + 5.0,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 2.0,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
    },
    suggestionInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding,
        width: 140.0,
        borderColor: Colors.grayColor,
        borderWidth: 0.5,
    },
    suggestionTitleWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        padding: Sizes.fixPadding * 2.0,
    },
    followingRequestWrapStyle: {
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        backgroundColor: Colors.primaryColor,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: -5.0,
        right: -5.0,
    },
    likedPhotosStyle: {
        marginHorizontal: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding - 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    userProfilePicStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
    },
    historyIconWrapStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
    },
    rowBack: {
        alignItems: "center",
        backgroundColor: Colors.primaryColor,
        flex: 1,
        marginBottom: Sizes.fixPadding,
    },
});
