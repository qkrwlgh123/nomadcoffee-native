import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  View,
  useWindowDimensions,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import styled from 'styled-components/native';
import DismissKeyboard from '../components/DismissKeyboard';
import Shop from '../components/Shop';

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 1);
  width: ${(props) => props.width / 1.5}px;
  color: black;
  padding: 5px 10px;
  border-radius: 7px;
`;

const SEARCH_SHOPS = gql`
  query searchShops($keyword: String) {
    searchShops(keyword: $keyword) {
      id
      name
      photos {
        url
      }
      categories {
        name
      }
    }
  }
`;

export default function Search({ navigation }) {
  const { width } = useWindowDimensions();
  const { setValue, register, watch, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_SHOPS);
  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };

  const SearchBox = () => (
    <Input
      width={width}
      placeholder="Search Shops"
      placeholderTextColor="rgba(0,0,0,0.8)"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue('keyword', text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register('keyword');
  }, []);
  const renderItem = ({ item: shop }) => <Shop {...shop} />;
  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword...</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchShops !== undefined ? (
          data?.searchShops?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not be find anything</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              data={data?.searchShops}
              keyExtractor={(shop) => shop.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
