import { View } from 'react-native'
import React from 'react'

import { Sizes } from '../constants/styles'


const ScreenContentShell = ({ children }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                {children}
            </View>
        </View>
    )
}

export default ScreenContentShell