import create from 'zustand';
import { Triplet } from '@react-three/cannon';
import * as THREE from 'three';
import Block from '../three/mesh/Block';
import React from 'react';

interface BlockPosition {
  pos: Triplet;
  id: string;
}

interface UseBlockStore {
  blocks: JSX.Element[];
  blockPositions: BlockPosition[];
  blockIdMap: Record<string, THREE.Mesh>;
  // addBlock: (position: Triplet, type: string) => void;
  // removeBlock: (position: Triplet) => void;
  // damageBlock: (position: Triplet, amount: number) => void;
  // healBlock: (position: Triplet, amount: number) => void;
}

export function generateChunkSection(y = 0, rootZ = 0, rootX = 0) {
  const blocks = [];
  for (let x = 0; x < 16; x++) {
    for (let z = 0; z < 16; z++) {
      blocks.push(
        <Block
          key={[x + rootX, y, z + rootZ].join(',')}
          position={[x + rootX, y, z + rootZ]}
        />,
      );
    }
  }
  return blocks;
}

const useBlockStore = create<UseBlockStore>(() => ({
  blocks: [
    ...generateChunkSection(0),
    ...generateChunkSection(0, -16, -16),
    ...generateChunkSection(0, -16, 0),
  ],
  blockPositions: [],
  blockIdMap: {},
  // addBlock: (position, type) =>
  //   set((state) => {
  //     // const block =
  //     const blockPositions = [...state.blockPositions].push();
  //     return state;
  //   }),
  // removeBlock: (blockId) => null,
  // damageBlock: (position, amount) => null,
  // healBlock: (position, amount) => null,
}));

export default useBlockStore;
