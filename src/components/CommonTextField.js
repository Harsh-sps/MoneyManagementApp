import React from 'react';
import {TextInput} from 'react-native';

function CommonTextInput({placeholderText, styles, onChangeData, data}) {
  return (
    <TextInput
      onChangeText={onChangeData}
      value={data}
      maxLength={40}
      numberOfLines={1}
      style={styles}
      placeholder={placeholderText}
      placeholderTextColor="#91919F"
      keyboardType="default"></TextInput>
  );
}

export default CommonTextInput;
