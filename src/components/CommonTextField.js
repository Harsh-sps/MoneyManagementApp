import React from 'react';
import {TextInput, TouchableOpacity} from 'react-native';

function CommonTextInput({
  placeholderText,
  styles,
  onChangeData,
  data,
  readOnly = false,
  keyboardType = 'default',
  onPress = () => {},
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <TextInput
        onChangeText={onChangeData}
        value={data}
        maxLength={40}
        numberOfLines={1}
        style={styles}
        placeholder={placeholderText}
        placeholderTextColor="#91919F"
        keyboardType={keyboardType}
        readOnly={readOnly}></TextInput>
    </TouchableOpacity>
  );
}

export default CommonTextInput;
