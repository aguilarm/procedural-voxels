import React, { useEffect, useRef } from 'react';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { Camera, useFrame, useThree } from '@react-three/fiber';
import { PublicApi, Triplet, useSphere } from '@react-three/cannon';
import { Vector3 } from 'three';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';

const BASE_SPEED = 5;
const SPRINT_MULTIPLIER = 1.75;

interface HandleFrameArgs {
  sphereMesh: THREE.Mesh<THREE.BufferGeometry>;
  sphereApi: PublicApi;
  velocity: Triplet;
  camera: Camera;
  direction: Vector3;
  frontVector: Vector3;
  sideVector: Vector3;
  activeControls: Record<string, boolean>;
}

function handleFrame({
  sphereMesh,
  sphereApi,
  camera,
  direction,
  frontVector,
  sideVector,
  activeControls,
  velocity,
}: HandleFrameArgs) {
  if (sphereMesh) {
    camera.position.copy(sphereMesh.position);
  }
  frontVector.set(
    0,
    0,
    Number(activeControls.moveBackward) - Number(activeControls.moveForward),
  );
  sideVector.set(
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
  sphereApi.velocity.set(direction.x, velocity[1], direction.z);

  if (activeControls.jump && Math.abs(velocity[1]) <= 0.02 && velocity[1] > 0) {
    sphereApi.velocity.set(velocity[0], 3, velocity[2]);
  }

  sphereMesh.getWorldPosition(sphereMesh.position);
}

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
  const velocity = useRef<Triplet>([0, 0, 0]);
  const direction = useRef(new Vector3());
  const frontVector = useRef(new Vector3());
  const sideVector = useRef(new Vector3());
  useEffect(() => {
    sphereApi.velocity.subscribe((v) => (velocity.current = v));
  }, [sphereApi.velocity]);
  useFrame(() => {
    if (!sphereRef.current) {
      return;
    }
    handleFrame({
      sphereMesh: sphereRef.current,
      sphereApi,
      camera,
      direction: direction.current,
      frontVector: frontVector.current,
      sideVector: sideVector.current,
      activeControls,
      velocity: velocity.current,
    });
  });
  return (
    <>
      <PointerLockControls />
      <mesh ref={sphereRef} />
    </>
  );
};

export default Player;
