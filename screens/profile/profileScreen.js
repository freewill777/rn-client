import React, { useState, useRef, useContext, useEffect } from 'react'
import {
    StyleSheet, Text, View,
    SafeAreaView, StatusBar, Dimensions,
    ScrollView, FlatList, TouchableOpacity,
    Image,
} from 'react-native'
import { Video, ResizeMode } from 'expo-av';

import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import LazyImage from '../../components/LazyImage';
import { UserContext } from '../../UserProvider';
import { HOST } from '../../settings';

const { width, height } = Dimensions.get('window');

const allPosts = [
    {
        id: '1',
        image: require('../../assets/images/gallery/gallery1.png'),
    },
    {
        id: '2',
        image: require('../../assets/images/gallery/gallery2.png'),
    },
    {
        id: '3',
        image: require('../../assets/images/gallery/gallery3.png'),
    },
    {
        id: '4',
        image: require('../../assets/images/gallery/gallery4.png'),
    },
    {
        id: '5',
        image: require('../../assets/images/gallery/gallery5.png'),
    },
    {
        id: '6',
        image: require('../../assets/images/gallery/gallery6.png'),
    },
];

const videoPosts = [
    {
        id: '1',
        image: require('../../assets/images/videoThumbnails/thumbnail1.png'),
        views: '190k',
    },
    {
        id: '2',
        image: require('../../assets/images/videoThumbnails/thumbnail2.png'),
        views: '200k',
    },
    {
        id: '3',
        image: require('../../assets/images/videoThumbnails/thumbnail3.png'),
        views: '120k',
    },
    {
        id: '4',
        image: require('../../assets/images/videoThumbnails/thumbnail3.png'),
        views: '120k',
    },
    {
        id: '5',
        image: require('../../assets/images/videoThumbnails/thumbnail3.png'),
        views: '120k',
    },
    {
        id: '6',
        image: require('../../assets/images/videoThumbnails/thumbnail3.png'),
        views: '120k',
    },
];

const imagePosts = [
    {
        id: '1',
        image: require('../../assets/images/posts/post26.png'),
    },
    {
        id: '2',
        image: require('../../assets/images/posts/post27.png'),
    },
    {
        id: '3',
        image: require('../../assets/images/posts/post28.png'),
    },
    {
        id: '4',
        image: require('../../assets/images/posts/post29.png'),
    },
];

const ProfileScreen = ({ navigation }) => {
    const { userId, name, setUserStats, setName, userStats } = useContext(UserContext)
    const [currentTab, setCurrentTab] = useState(1);
    const [photo, setPhoto] = useState(null);

    const { fullname, description1, description2, occupation } = userStats
    const [profileImage, setProfileImage] = useState(null);

    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);

    const [photosLength, setPhotosLength] = useState(undefined)
    const [videosLength, setVideosLength] = useState(undefined)
    const [following, setFollowing] = useState(undefined)
    const [followers, setFollowers] = useState(undefined)

    const scrollToIndex = ({ index }) => {
        listRef.current.scrollToIndex({ animated: true, index: index });
        setCurrentTab(index);
    }

    const listRef = useRef();

    useEffect(() => {
        async function getUserData() {
            try {
                const response = await fetch(`${HOST}/user?id=${userId}`);
                const json = await response.json();
                const { name, stats } = json
                setUserStats(stats)

                if (name !== undefined) {
                    setName(name)
                }
            } catch (error) {
                alert(error);
            }
        }
        getUserData()
    }, [userId])

    useEffect(() => {
        async function getUserData() {
            try {
                const response = await fetch(`${HOST}/photos-length?userId=${userId}`);
                const json = await response.json();
                setPhotosLength(json)
            } catch (error) {
                alert(error);
            }
        }
        getUserData()
    }, [userId])

    useEffect(() => {
        async function getUserData() {
            try {
                const response = await fetch(`${HOST}/videos-length?userId=${userId}`);
                const json = await response.json();
                setVideosLength(json)
                console.log('videos', json)
            } catch (error) {
                alert(error);
            }
        }
        getUserData()
    }, [userId])

    useEffect(() => {
        async function getUserData() {
            try {
                const response = await fetch(`${HOST}/following?userId=${userId}`);
                const json = await response.json();
                setFollowing(json.length)
            } catch (error) {
                alert(error);
            }
        }
        getUserData()
    }, [userId])

    useEffect(() => {
        async function getUserData() {
            try {
                const response = await fetch(`${HOST}/followers?userId=${userId}`);
                const json = await response.json();
                setFollowers(json.length)
            } catch (error) {
                alert(error);
            }
        }
        getUserData()
    }, [userId])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, zIndex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0, }}>
                    <UserPostsAndFollowersRelatedInfo />
                    {<View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                            <View style={{ flex: 1, }}>
                                <Text numberOfLines={1} style={{ ...Fonts.blackColor18SemiBold }}>
                                    {fullname}
                                </Text>
                                <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
                                    {occupation}
                                </Text>
                                <Text numberOfLines={1} style={{ ...Fonts.blackColor14Regular }}>
                                    {description1}
                                </Text>
                                <Text numberOfLines={1}>
                                    <Text style={{ ...Fonts.blackColor14Regular }}>
                                        {description2}
                                    </Text>
                                </Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={async () => {
                                    let result = await ImagePicker.launchImageLibraryAsync({
                                        mediaTypes: ImagePicker.MediaTypeOptions.All,
                                        allowsEditing: true,
                                        aspect: [4, 3],
                                        quality: 1,
                                    });
                                    if (!result.canceled) {
                                        const formData = new FormData();
                                        setProfileImage(result.uri);
                                        formData.append('files', {
                                            uri: result.uri,
                                            type: 'image/jpeg',
                                            name: 'my-image.jpg',
                                        });
                                        formData.append('userId', userId)
                                        try {
                                            const response = await fetch(`${HOST}/upload_files?avatar=true`, {
                                                method: 'POST',
                                                headers: {
                                                    'userId': userId,
                                                    'mediaType': 'image',
                                                    'isAvatar': 'yes'
                                                },
                                                body: formData,
                                            });
                                            // const responseData = await response.json();
                                        } catch (error) {
                                            console.error(error);
                                        }
                                    }
                                }}
                            >
                                {!!profileImage ? (
                                    <LazyImage source={{ uri: profileImage }}
                                        style={{ width: width / 4.0, height: width / 4.0, borderRadius: (width / 4.0) / 2.0 }}
                                    />
                                ) : (
                                    <LazyImage
                                        source={{ uri: `${HOST}/avatar?userId=${userId}` }}
                                        style={{ width: width / 4.0, height: width / 4.0, borderRadius: (width / 4.0) / 2.0 }}
                                    />
                                )}

                            </TouchableOpacity>

                        </View>
                    </View >}
                    {editProfileButton()}
                    {tabs(userId)}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function allPostsInfo(userId) {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { alert(item.id) }}
                style={{ marginHorizontal: Sizes.fixPadding - 5.0, marginBottom: Sizes.fixPadding }}
            >
                <LazyImage
                    source={{ uri: `${HOST}/photo?userId=${userId}&index=${item.id}` }}
                    style={styles.galleryImageStyle}
                />
            </TouchableOpacity>
        )
        return (
            <View style={{ flex: 1, }}>
                <FlatList
                    data={allPosts}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding + 5.0, paddingBottom: Sizes.fixPadding }}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    function videoPostsInfo(userId) {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                // onPress={() => { alert(item.image) }}
                style={{ marginHorizontal: Sizes.fixPadding - 5.0, marginBottom: Sizes.fixPadding }}
            >
                <Video
                    // ref={video}
                    style={styles.galleryImageStyle}
                    source={{
                        uri: `${HOST}/video?userId=${userId}&index=${item.id}`,
                    }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                // onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
                <View style={styles.videoViewsInfoWrapStyle}>
                    <MaterialCommunityIcons name="play-outline" size={20} color={Colors.whiteColor} />
                    <Text style={{ ...Fonts.whiteColor12SemiBold }}>
                        {item.views}
                    </Text>
                </View>
            </TouchableOpacity>

        )
        return (
            <View style={{ flex: 1, }}>
                <FlatList
                    data={videoPosts}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding + 5.0, paddingBottom: Sizes.fixPadding }}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    function imagePostsInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                // onPress={() => { alert(item.image) }}
                style={{ marginHorizontal: Sizes.fixPadding - 5.0, marginBottom: Sizes.fixPadding }}
            >
                <Image
                    source={item.image}
                    style={styles.galleryImageStyle}
                />
            </TouchableOpacity>
        )
        return (
            <View style={{ flex: 1, }}>
                <FlatList
                    data={imagePosts}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding + 5.0, paddingBottom: Sizes.fixPadding }}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    function tabBarHeader() {
        return (
            <View style={styles.tabBarHeaderWrapStyle}>
                {/* {tabBarHeaderSort({
                    icon: <MaterialCommunityIcons
                        name="grid" size={23}
                        color={currentTab == 0 ? Colors.primaryColor : Colors.lightGrayColor} />,
                    index: 0,
                })} */}
                {tabBarHeaderSort({
                    icon: <MaterialCommunityIcons
                        name="tooltip-image-outline"
                        size={24} color={currentTab == 2 ? Colors.primaryColor : Colors.lightGrayColor} />,
                    index: 2,
                })}
                {tabBarHeaderSort({
                    icon: <MaterialIcons
                        name="airplay" size={22}
                        color={currentTab == 1 ? Colors.primaryColor : Colors.lightGrayColor} />,
                    index: 1,
                })}
            </View>
        )
    }

    function tabBarHeaderSort({ icon, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { scrollToIndex({ index: index }) }}
                style={{ flex: 1, alignItems: 'center' }}
            >
                <View style={{
                    width: 24., height: 24.0,
                    marginBottom: Sizes.fixPadding
                }}>
                    {icon}
                </View>
                <View style={{
                    height: 2.0,
                    backgroundColor: index == currentTab ? Colors.primaryColor : Colors.lightGrayColor,
                    width: '100%'
                }} />
            </TouchableOpacity>
        )
    }

    function onScrollEnd(e) {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        setCurrentTab(pageNum);
    }

    function tabs(userId) {
        return (
            <View style={{ flex: 1, }}>
                {tabBarHeader()}
                {tabData(userId)}
            </View>
        )
    }

    function tabData(userId) {
        return (
            <FlatList
                ref={listRef}
                initialScrollIndex={currentTab}
                data={[0, 1, 2]}
                renderItem={({ item }) => (
                    <View style={{ width: width, }}>
                        {item === 0 && imagePostsInfo()}
                        {item === 1 && videoPostsInfo(userId)}
                        {item === 2 && allPostsInfo(userId)}
                    </View>
                )}
                onScrollToIndexFailed={(error) => console.error(error)}
                horizontal={true}
                scrollEventThrottle={32}
                pagingEnabled
                onMomentumScrollEnd={onScrollEnd}
                showsHorizontalScrollIndicator={false}
            />
        )
    }

    function editProfileButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => { navigation.push('EditProfile') }}
                style={styles.editProfileButtoStyle}
            >
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    Edit Profile
                </Text>
            </TouchableOpacity>
        )
    }

    function UserPostsAndFollowersRelatedInfo() {
        const { userStats } = useContext(UserContext)
        // const { posts, videos, followers, following } = userStats
        return (
            <View style={styles.userPostsAndFollowersRelatedInfoWrapStyle}>
                <View style={{ alignItems: 'center', }}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>
                        {photosLength}
                    </Text>
                    <Text numberOfLines={1} style={{ maxWidth: width / 4.3, ...Fonts.grayColor14Regular }}>
                        photos
                    </Text>
                </View>
                <View style={{ alignItems: 'center', }}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>
                        {videosLength}
                    </Text>
                    <Text numberOfLines={1} style={{ maxWidth: width / 4.3, ...Fonts.grayColor14Regular }}>
                        videos
                    </Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.push('Followers') }} style={{ alignItems: 'center', }}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>
                        {followers}
                    </Text>
                    <Text numberOfLines={1} style={{ maxWidth: width / 4.3, ...Fonts.grayColor14Regular }}>
                        followers
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.push('Followings') }} style={{ alignItems: 'center', }}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>
                        {following}
                    </Text>
                    <Text numberOfLines={1} style={{ maxWidth: width / 4.3, ...Fonts.grayColor14Regular }}>
                        following
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ flex: 1, marginHorizontal: Sizes.fixPadding - 5.0, ...Fonts.blackColor20SemiBold }}>
                    {name}
                </Text>
                <MaterialIcons name="menu" size={22} color={Colors.blackColor} onPress={() => { navigation.openDrawer(); }} />
            </View>
        )
    }
}

export default ProfileScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        padding: Sizes.fixPadding * 2.0,
    },
    userPostsAndFollowersRelatedInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: Sizes.fixPadding * 2.0,
    },
    buttonStyle: {
        flex: 1,
        paddingVertical: Sizes.fixPadding + 2.0,
        marginHorizontal: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        elevation: 3.0,
    },
    galleryImageStyle: {
        width: (width / 3.0) - 20.0,
        height: height / 6.0,
        flex: 1,
    },
    tabBarHeaderWrapStyle: {
        marginVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    videoViewsInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10.0,
        left: 5.0
    },
    editProfileButtoStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 5.0,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
    }
})