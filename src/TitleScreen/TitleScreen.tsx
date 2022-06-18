import React from 'react';
import { Link } from 'react-router-dom';
import { Center, VStack } from '@chakra-ui/react';

const TitleScreen = () => (
  <Center h={'100vh'} w={'100vw'}>
    <VStack>
      <h1>Blocks</h1>
      <Link to={'/game'}>Start</Link>
    </VStack>
  </Center>
);

export default TitleScreen;
