import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={style.parentContainer}>
      <Text style={style.textStyle}>Oops! It's in progress.</Text>
    </View>
  );
};

export default ProfileScreen;

const style = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontWeight: '800',
    color: 'black',
    fontSize: 20,
  },
});
