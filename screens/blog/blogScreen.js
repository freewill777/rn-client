import React from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'

import { Colors, Fonts, Sizes } from '../../constants/styles'

const BlogScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <View style={{ flex: 1, }}>
                <Text>Blog</Text>
                <View style={{ backgroundColor: Colors.extraLightGrayColor, height: 2 }} />
            </View>
        </SafeAreaView>
    )

}

export default BlogScreen