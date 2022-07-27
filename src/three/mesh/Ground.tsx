import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Merged } from '@react-three/drei';
import Cube from './Cube';

export const Ground = () => {
  const boxMesh = useMemo(() => new THREE.BoxBufferGeometry(), []);

  return (
    <Merged castShadow receiveShadow meshes={{ box: boxMesh }}>
      {({ box }: { box: THREE.BoxBufferGeometry }) => (
        <group>
          <Cube position={[0.5, 0, 0.5]} model={box} />
          <Cube position={[0.5, 0, -0.5]} model={box} />
          <Cube position={[-0.5, 0, 0.5]} model={box} />
          <Cube position={[-0.5, 0, -0.5]} model={box} />
          <Cube position={[1.5, 0, 0.5]} model={box} />
          <Cube position={[-1.5, 0, -0.5]} model={box} />
          <Cube position={[1.5, 0, 1.5]} model={box} />
          <Cube position={[-1.5, 0, -1.5]} model={box} />
          <Cube position={[-1.5, 0, 0.5]} model={box} />
          <Cube position={[1.5, 0, -0.5]} model={box} />
          <Cube position={[-1.5, 0, -1.5]} model={box} />
          <Cube position={[-1.5, 0, -10.5]} model={box} />
          <Cube position={[-12.5, 3, -17.5]} model={box} />
          <Cube position={[-14.5, 0, -18.5]} model={box} />
          <Cube position={[-17.5, 0, -1.5]} model={box} />
          <Cube position={[-18.5, 1, -1.5]} model={box} />
          <Cube position={[-13.5, 2, -1.5]} model={box} />
          <Cube position={[-11.5, 0, -11.5]} model={box} />
        </group>
      )}
    </Merged>
  );
};
