import { useState } from 'react';
import React from 'react';
import { Triplet, useBox } from '@react-three/cannon';
import * as THREE from 'three';

interface CubeProps {
  position: Triplet;
}

const Cube = ({ position }: CubeProps) => {
  const [ref] = useBox<THREE.Mesh>(() => ({ mass: 1, position }));
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  return (
    <mesh
      position={position}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

export default Cube;
