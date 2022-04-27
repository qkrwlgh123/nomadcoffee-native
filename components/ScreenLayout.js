import React from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';

export default function ScreenLayout({ loading, children }) {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
      }}
    >
      {loading ? <ActivityIndicator color="white" /> : children}
    </View>
  );
}
