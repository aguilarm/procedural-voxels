import React, { useEffect, useRef } from 'react';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { Vector3 } from 'three';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';

const BASE_SPEED = 5;
const SPRINT_MULTIPLIER = 1.75;

const Player = ({
  startPosition,
}: {
  startPosition: [x: number, y: number, z: number];
}) => {
  const { camera } = useThree();
  const activeControls = useKeyboardControls();
  const [sphereRef, sphereApi] = useSphere<THREE.Mesh>(() => ({
    mass: 1,
    type: 'Dynamic',
    position: startPosition,
  }));
  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    sphereApi.velocity.subscribe((v) => (velocity.current = v));
  }, [sphereApi.velocity]);
  console.log(velocity.current, sphereApi.velocity);
  useFrame(() => {
    if (sphereRef.current) {
      camera.position.copy(sphereRef.current.position);
    }
    const direction = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      Number(activeControls.moveBackward) - Number(activeControls.moveForward),
    );
    const sideVector = new Vector3(
      Number(activeControls.moveLeft) - Number(activeControls.moveRight),
      0,
      0,
    );

    const speed = BASE_SPEED * (activeControls.sprint ? SPRINT_MULTIPLIER : 1);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(speed)
      .applyEuler(camera.rotation);
    sphereApi.velocity.set(direction.x, velocity.current[1], direction.z);

    if (
      activeControls.jump &&
      Math.abs(velocity.current[1]) <= 0.02 &&
      velocity.current[1] > 0
    ) {
      sphereApi.velocity.set(velocity.current[0], 3, velocity.current[2]);
    }

    sphereRef.current?.getWorldPosition(sphereRef.current.position);
  });
  return (
    <>
      <PointerLockControls />
      <mesh ref={sphereRef} />
    </>
  );
};

export default Player;
