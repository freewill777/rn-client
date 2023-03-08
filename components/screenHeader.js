import React from 'react'
import { Text, View, Image, StyleSheet, Dimensions, TextInput } from 'react-native'
import { Colors, Fonts, Sizes, FontStyles } from '../constants/styles';
import { MaterialIcons } from "@expo/vector-icons";
import { ButtonGroup } from '@rneui/themed'

import { shadowStyle } from '../appData';

const buttons = ['User', 'Sportiv', 'Club', 'Business']

const { height } = Dimensions.get("window");

function ScreenHeader({ title, subtitle }) {
  
  const [searching, setSearching] = React.useState(false);
  const [queryText, onChangeText] = React.useState('');
  const [selectedIndexes, setSelectedIndexes] = React.useState([]);

  return (
    <>
      {<View style={{ ...styles.headerWrapStyle, flexDirection: "row", ...(Platform.OS === 'ios' ? shadowStyle : {}) }}>
        <View style={{ width: '50%', flexDirection: "row", alignItems: 'center' }}>
          <Image
            source={require("../assets/images/homeAppLogo.png")}
            style={{ width: 32.0, height: 32.0, resizeMode: "contain", marginEnd: 10 }}
          />
          <Text>
            <Text style={{ ...Fonts.primaryColor20Bold, fontFamily: FontStyles.accentBold, }}>{title}</Text>
            <Text style={{ ...Fonts.secondaryColor12ExtraBold }}>{subtitle}</Text>
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
              value={queryText}
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
    </>
  )
}

export default ScreenHeader


const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Sizes.fixPadding * 12.0,
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    flexWrap: 'wrap',
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