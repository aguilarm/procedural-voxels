import Cube from './mesh/Cube';
import { Physics } from '@react-three/cannon';
import Player from './Player';
import { Ground } from './mesh/Ground';
import React from 'react';
import SkyBox from './SkyBox';

const MainScene = () => {
  return (
    <scene>
      <ambientLight />
      <SkyBox />
      <pointLight position={[10, 10, 10]} />
      <Physics gravity={[0, -10, 0]}>
        <Cube position={[-1.2, 1, 0]} />
        <Cube position={[1.2, 4, 0]} />
        <Player startPosition={[0, 3, 10]} />
        <Ground />
      </Physics>
    </scene>
  );
};

export default MainScene;
