import { TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 0px 40px;
`;

const Logo = styled.Image`
  max-width: 100%;
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
`;
export default function AuthLayout({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyboard}
      disabled={Platform.OS === 'web'}
    >
      <Container>
        <KeyboardAvoidingView
          style={{
            width: '100%',
          }}
          behavior="position"
          KeyboardAvoidingView={Platform.OS === 'ios' ? 50 : 0}
        >
          <Logo
            resizeMode="contain"
            source={require('../../assets/coffee-img.png')}
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
