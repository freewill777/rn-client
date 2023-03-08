import React from 'react'
import { FlatList, Dimensions } from 'react-native'
import { SwipeListView } from "react-native-swipe-list-view";

import { Sizes } from '../constants/styles';

const { width } = Dimensions.get("window");

const List = ({ data, renderItem }) => {
    return (
        <FlatList
            ListHeaderComponent={
                <SwipeListView
                    data={data ?? []}
                    renderItem={renderItem}
                    rightOpenValue={-width}
                    leftOpenValue={width}
                    useNativeDriver={false}
                    scrollEnabled={false}
                />
            }
            contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 9.0 }}
            showsVerticalScrollIndicator={false}
        />
    )
}

export default List