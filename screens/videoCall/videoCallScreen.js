import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const VideoCallScreen = ({ navigation }) => {

    const [isMute, setIsMute] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <ImageBackground
                source={require('../../assets/images/users/user12.png')}
                style={{ flex: 1, }}
            >
                {callingInfo()}
                {callingFunctionalities()}
            </ImageBackground>
        </SafeAreaView>
    )

    function callingFunctionalities() {
        return (
            <View style={styles.callButtonsWrapStyle}>
                {effectButton()}
                {muteButton()}
                {flipButton()}
                {endButton()}
            </View>
        )
    }

    function endButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.pop() }}
                style={{ flex: 1, alignItems: 'center', }}
            >
                <MaterialCommunityIcons name="close-circle" size={30} color={Colors.redColor} style={{ marginBottom: Sizes.fixPadding }} />
                <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                    End
                </Text>
            </TouchableOpacity>
        )
    }

    function flipButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { }}
                style={{ flex: 1, alignItems: 'center', }}
            >
                <MaterialIcons name="flip-camera-ios" size={30} color={Colors.whiteColor} style={{ marginBottom: Sizes.fixPadding }} />
                <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                    Flip
                </Text>
            </TouchableOpacity>
        )
    }

    function muteButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { }}
                style={{ flex: 1, alignItems: 'center', }}
            >
                <MaterialIcons
                    name={isMute ? "mic" : "mic-off"}
                    size={30}
                    color={Colors.whiteColor}
                    style={{ marginBottom: Sizes.fixPadding }}
                    onPress={() => setIsMute(!isMute)}
                />
                <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                    Mute
                </Text>
            </TouchableOpacity>
        )
    }

    function effectButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { }}
                style={{ flex: 1, alignItems: 'center', }}
            >
                <Image
                    source={require('../../assets/images/icons/effect.png')}
                    style={{ width: 30.0, height: 30.0, resizeMode: 'contain', }}
                />
                <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.whiteColor16SemiBold }}>
                    Effects
                </Text>
            </TouchableOpacity>
        )
    }

    function callingInfo() {
        return (
            <View style={styles.callingDetailWrapStyle}>
                <View style={{ flex: 1, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.whiteColor20Bold }}>
                        Jiya shah
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.whiteColor14SemiBold }}>
                        02:35 min
                    </Text>
                </View>
                <Image
                    source={require('../../assets/images/users/user43.png')}
                    style={{ width: width / 3.0, height: width / 3.0, borderRadius: Sizes.fixPadding }}
                />
            </View>
        )
    }
}

export default VideoCallScreen

const styles = StyleSheet.create({
    callButtonsWrapStyle: {
        backgroundColor: '#00000080',
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding + 5.0
    },
    callingDetailWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: (Sizes.fixPadding * 2.0) + StatusBar.currentHeight
    }
})