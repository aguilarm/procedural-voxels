import React from 'react';
import { usePlane } from '@react-three/cannon';
import { RepeatWrapping, TextureLoader } from 'three';
import grass from './grass.png';
import * as THREE from 'three';

export const Ground = () => {
  const [ref] = usePlane<THREE.Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));
  const texture = new TextureLoader().load(grass);

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(526, 526);

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshStandardMaterial map={texture} attach="material" color="#26b543" />
    </mesh>
  );
};
