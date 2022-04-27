import React from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;
const File = styled.Image``;
const Actions = styled.TouchableOpacity`
  margin-left: 15px;
`;
const Name = styled.Text`
  color: white;
  font-weight: 600;
  margin: 10px 0px;
`;
const Categories = styled.Text`
  color: white;
`;

const PhotoBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 170px;
  padding: 5px;
`;

const EmptyBox = styled.View`
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 170px;
  border: 0.5px solid white;
  border-radius: 25px;
`;

export default function Shop({ id, name, photos, categories }) {
  return (
    <Container>
      {photos.length > 0 ? (
        <PhotoBox>
          <File
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 25,
            }}
            source={{ uri: photos[0].url }}
          />
        </PhotoBox>
      ) : (
        <EmptyBox>
          <Name>Add a photo</Name>
        </EmptyBox>
      )}

      <Actions>
        <Name>{name}</Name>
        {categories.map((item) => (
          <Categories>{item.name}</Categories>
        ))}
      </Actions>
    </Container>
  );
}
