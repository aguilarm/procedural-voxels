import { useCallback, useMemo, useState } from 'react';
import React from 'react';
import { Triplet, useBox } from '@react-three/cannon';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

interface CubeProps {
  position: Triplet;
  model: THREE.BufferGeometry;
}

const Cube = ({ position, model }: CubeProps) => {
  const [boxRef] = useBox<THREE.Mesh>(() => ({
    mass: 1,
    position,
    type: 'Static',
  }));
  const textures = useTexture([
    '/textures/dirt.png',
    '/textures/oak_planks.png',
    '/textures/gravel.png',
    '/textures/mossy_cobblestone_slab_double.png',
    '/textures/stone.png',
  ]);
  // TODO - Pass texture as a prop instead. Just want some variety for now.
  const textureIndex = useMemo(
    () => Math.floor(Math.random() * (textures.length - 1)),
    [textures],
  );
  const renderModel = useMemo(() => model || new THREE.BoxGeometry(), [model]);
  const [hoveredFaceIndex, setHoveredFaceIndex] = useState<null | number>(null);
  const [clicked, setClicked] = useState(false);
  const handleHover = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      if (!event.faceIndex) return;
      event.stopPropagation();
      const newFace = event.faceIndex / 2;
      if (hoveredFaceIndex === newFace) return;
      setHoveredFaceIndex(Math.floor(event.faceIndex / 2));
    },
    [setHoveredFaceIndex, hoveredFaceIndex],
  );
  const handleClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      if (!boxRef.current) return;
      setClicked((state) => !state);
      const newScale = Array(3).fill(clicked ? 0.95 : 1) as Triplet;
      boxRef.current.scale.set(...newScale);
    },
    [setClicked, boxRef, clicked],
  );
  const handlePointerLeave = useCallback(() => {
    setHoveredFaceIndex(null);
  }, [setHoveredFaceIndex]);
  const faceMaterials = useMemo(() => {
    return [...Array(6)].map((_, index) => {
      const hovered = hoveredFaceIndex === index;
      return (
        <meshStandardMaterial
          key={index}
          map={textures[textureIndex]}
          attach={`material-${index}`}
          side={THREE.FrontSide}
          color={hovered ? 'darkgrey' : 'white'}
        />
      );
    });
  }, [hoveredFaceIndex, textureIndex, textures]);

  return (
    <>
      <mesh
        castShadow
        receiveShadow
        position={position}
        ref={boxRef}
        scale={clicked ? 0.95 : 1}
        onClick={handleClick}
        onPointerMove={handleHover}
        onPointerLeave={handlePointerLeave}
        geometry={renderModel}
      >
        {faceMaterials}
      </mesh>
    </>
  );
};

export default Cube;
