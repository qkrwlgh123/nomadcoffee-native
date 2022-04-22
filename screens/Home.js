import { useQuery } from '@apollo/client';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { logUserOut } from '../apollo';

export default function Home() {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: 'white' }}>Home</Text>
    </View>
  );
}
