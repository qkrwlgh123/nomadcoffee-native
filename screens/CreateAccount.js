import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $name: String!
    $username: String!
    $email: String!
    $location: String!
    $githubUsername: String!
    $password: String!
  ) {
    createAccount(
      name: $name
      username: $username
      email: $email
      location: $location
      githubUsername: $githubUsername
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ navigation }) {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;

    const { username, password } = getValues();

    if (ok) {
      navigation.navigate('Login', {
        username,
        password,
      });
    }
  };
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    { onCompleted }
  );

  const userNameRef = useRef();
  const emailRef = useRef();
  const locationRef = useRef();
  const githubUserNameRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register('name', {
      required: true,
    });
    register('username', {
      required: true,
    });
    register('email', {
      required: true,
    });
    register('githubUsername', {
      required: true,
    });
    register('location', {
      required: true,
    });
    register('password', {
      required: true,
    });
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        placeholder="Name"
        placeholderTextColor={'rgba(255,255,255,0.8)'}
        returnKeyType="next"
        onSubmitEditing={() => onNext(userNameRef)}
        onChangeText={(text) => setValue('name', text)}
      />
      <TextInput
        ref={userNameRef}
        placeholder="Username"
        placeholderTextColor={'rgba(255,255,255,0.8)'}
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text) => setValue('username', text)}
      />
      <TextInput
        ref={emailRef}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor={'rgba(255,255,255,0.8)'}
        returnKeyType="next"
        onSubmitEditing={() => onNext(locationRef)}
        onChangeText={(text) => setValue('email', text)}
      />
      <TextInput
        ref={locationRef}
        placeholder="Location"
        placeholderTextColor={'rgba(255,255,255,0.8)'}
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => onNext(githubUserNameRef)}
        onChangeText={(text) => setValue('location', text)}
      />
      <TextInput
        ref={githubUserNameRef}
        placeholder="GithubUsername"
        placeholderTextColor={'rgba(255,255,255,0.8)'}
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue('githubUsername', text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor={'rgba(255,255,255,0.8)'}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue('password', text)}
      />
      <AuthButton
        text="Create Account"
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
