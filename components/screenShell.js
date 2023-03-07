import { View, SafeAreaView } from 'react-native'

import React from 'react'

import { Colors } from '../constants/styles'

const ScreenShell = ({ children }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <View style={{ flex: 1, }}>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default ScreenShell