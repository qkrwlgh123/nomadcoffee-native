import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image } from 'react-native';
import Home from '../../screens/Home';
import Me from '../../screens/Me';
import Photo from '../../screens/Photo';
import Profile from '../../screens/Profile';
import Search from '../../screens/Search';
import { isLoggedInVar } from '../../apollo';
import { useReactiveVar } from '@apollo/client';
import Login from '../../screens/Login';
import CreateAccount from '../../screens/CreateAccount';

const Stack = createNativeStackNavigator();

export default function StackNavFactory({ screenName, navigation }) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerShadowVisible: true,
        headerBackTitleVisible: false,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'black',
        },
      }}
    >
      {screenName === 'Home' ? (
        <Stack.Screen
          name={'Home'}
          component={Home}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  maxHeight: 40,
                }}
                resizeMode="contain"
                source={require('../../assets/coffee-img.png')}
              />
            ),
          }}
        />
      ) : null}

      {screenName === 'Search' ? (
        <Stack.Screen
          name={'Search'}
          component={Search}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  maxHeight: 40,
                }}
                resizeMode="contain"
                source={require('../../assets/coffee-img.png')}
              />
            ),
          }}
        />
      ) : null}

      {screenName === 'Me' && isLoggedIn ? (
        <Stack.Screen
          name={'Me'}
          component={Me}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  maxHeight: 40,
                }}
                resizeMode="contain"
                source={require('../../assets/coffee-img.png')}
              />
            ),
          }}
        />
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}

      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
    </Stack.Navigator>
  );
}
