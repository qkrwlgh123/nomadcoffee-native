import { gql, useQuery, useReactiveVar } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { isLoggedInVar } from '../apollo';
import { colors } from '../colors';

import ScreenLayout from '../components/ScreenLayout';
import Shop from '../components/Shop';

const SEE_MY_SHOP_QUERY = gql`
  query seeMyShopListMobile($offset: Int) {
    seeMyShopListMobile(offset: $offset) {
      name
      id
      photos {
        url
      }
      categories {
        name
      }
    }
  }
`;

export default function Home({ navigation }) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data, loading, refetch, fetchMore } = useQuery(SEE_MY_SHOP_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const renderShop = ({ item }) => {
    return <Shop {...item} />;
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);

  return (
    <ScreenLayout loading={loading}>
      {isLoggedIn ? (
        <FlatList
          onEndReachedThreshold={0.02}
          onEndReached={() =>
            fetchMore({
              variables: {
                offset: data?.seeMyShopListMobile?.length,
              },
            })
          }
          refreshing={refreshing}
          onRefresh={refresh}
          data={data?.seeMyShopListMobile}
          keyExtractor={(shop) => shop.id}
          renderItem={renderShop}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: colors.blue, textAlign: 'center' }}>
            Click to log in to check my list
          </Text>
        </TouchableOpacity>
      )}
    </ScreenLayout>
  );
}
