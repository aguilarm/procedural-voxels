import { Physics } from '@react-three/cannon';
import Player from './Player';
import { Ground } from './mesh/Ground';
import React from 'react';
import { Sky } from '@react-three/drei';
import Debugger from './Debugger';

const MainScene = () => {
  return (
    <scene>
      <Sky sunPosition={[100, 20, 100]} distance={10000} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} intensity={0.7} />
      <Debugger />
      <Physics gravity={[0, -32, 0]}>
        <Player startPosition={[0, 1, 0]} />
        <Ground />
      </Physics>
    </scene>
  );
};

export default MainScene;
