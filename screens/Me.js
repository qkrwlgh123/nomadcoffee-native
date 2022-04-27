import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { logUserOut } from '../apollo';
import { colors } from '../colors';

const Info = styled.Text`
  color: white;
  margin-bottom: 15px;
`;

const SEE_PROFILE_QUERY = gql`
  query seeProfile {
    seeProfile {
      name
      username
      email
      location
      githubUsername
      avatar
    }
  }
`;

export default function Me() {
  const { data } = useQuery(SEE_PROFILE_QUERY);

  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Info>name : {data?.seeProfile?.name}</Info>
      <Info>username : {data?.seeProfile?.username}</Info>
      <Info>email : {data?.seeProfile?.email}</Info>
      <Info>location : {data?.seeProfile?.location}</Info>
      <Info>githubUsername : {data?.seeProfile?.githubUsername}</Info>
      <Text onPress={() => logUserOut()} style={{ color: colors.blue }}>
        Log out
      </Text>
    </View>
  );
}
