import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Platform } from 'react-native';
import { Keyboard } from 'react-native';

export default function DismissKeyboard({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyboard}
      disabled={Platform.OS === 'web'}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}
