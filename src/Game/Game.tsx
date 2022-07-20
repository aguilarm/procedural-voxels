import React from 'react';
import { Canvas } from '@react-three/fiber';
import MainScene from '../three/MainScene';

const Game: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Canvas>
        <MainScene />
      </Canvas>
    </div>
  );
};

export default Game;
