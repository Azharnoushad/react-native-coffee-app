import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SPACING} from '../theme/theme';

const ProfilePic = () => {
  return (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={require('../assets/app_images/avatar.png')}/>
    </View>
  );
};

export default ProfilePic;

const styles = StyleSheet.create({
  imageContainer: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    borderRadius: SPACING.space_12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    backgroundColor: COLORS.secondaryDarkGreyHex,
    overflow:'hidden',
  },
  image:{
    height: SPACING.space_36,
    width: SPACING.space_36,
  }
});
