import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Center, Heading, VStack } from '@chakra-ui/react';

const TitleScreen = () => (
  <Center h={'75vh'} w={'100vw'}>
    <VStack>
      <Heading>Vaiotl</Heading>
      <Button>
        <Link to={'/game'}>Start</Link>
      </Button>
    </VStack>
  </Center>
);

export default TitleScreen;
