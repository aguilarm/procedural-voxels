import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Merged } from '@react-three/drei';
import useBlockStore from '../../Game/useBlockStore';

export const Ground = () => {
  const blocks = useBlockStore();
  const boxMesh = useMemo(() => new THREE.BoxBufferGeometry(), []);

  return (
    <Merged castShadow receiveShadow meshes={{ box: boxMesh }}>
      {() => <group>{blocks.blocks}</group>}
    </Merged>
  );
};
