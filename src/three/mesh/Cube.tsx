import { useCallback, useMemo, useRef, useState } from 'react';
import React from 'react';
import { Triplet, useBox } from '@react-three/cannon';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';

interface CubeProps {
  position: Triplet;
}

const Cube = ({ position }: CubeProps) => {
  const [boxRef] = useBox<THREE.Mesh>(() => ({
    mass: 1,
    position,
    type: 'Static',
  }));
  const boxGeometryRef = useRef<THREE.BoxBufferGeometry>(null);
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
    [setHoveredFaceIndex],
  );
  const handleClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      if (!boxRef.current) return;
      setClicked((state) => !state);
      const newScale = Array(3).fill(clicked ? 0.95 : 1) as Triplet;
      boxRef.current.scale.set(...newScale);
    },
    [setClicked, boxRef],
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
          attach={`material-${index}`}
          color={hovered ? 'hotpink' : 'orange'}
        />
      );
    });
  }, [hoveredFaceIndex]);
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
      >
        <boxBufferGeometry
          ref={boxGeometryRef}
          attach={'geometry'}
          args={[1, 1, 1]}
        />
        {faceMaterials}
      </mesh>
      {boxGeometryRef.current && hoveredFaceIndex && (
        <lineSegments position={position} scale={1.02}>
          <edgesGeometry attach={'geometry'} args={[boxGeometryRef.current]} />
          <lineBasicMaterial
            color={'black'}
            linewidth={10}
            // attach={`material-${hoveredFaceIndex}`}
          />
        </lineSegments>
      )}
    </>
  );
};

export default Cube;
