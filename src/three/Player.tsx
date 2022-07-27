import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { Camera, useFrame, useThree } from '@react-three/fiber';
import { PublicApi, Triplet, useSphere } from '@react-three/cannon';
import { Vector3 } from 'three';
import { OrbitControls, PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';

const BASE_SPEED = 5;
const SPRINT_MULTIPLIER = 1.75;
const JUMP_MULTIPLIER = 7;
const HEIGHT_DIFF = 1;
const RADIUS = 0.45;

interface HandleFrameArgs {
  sphereMesh: THREE.Mesh<THREE.BufferGeometry>;
  sphereApi: PublicApi;
  velocity: Triplet;
  camera: Camera;
  direction: Vector3;
  frontVector: Vector3;
  sideVector: Vector3;
  activeControls: Record<string, boolean>;
  syncCamera: boolean;
  lastYPosRef: MutableRefObject<number | null>;
}

function handleFrame({
  sphereMesh,
  sphereApi,
  camera,
  direction,
  lastYPosRef,
  frontVector,
  sideVector,
  activeControls,
  velocity,
  syncCamera,
}: HandleFrameArgs) {
  if (sphereMesh && !syncCamera) {
    const currentY = sphereMesh.position.y;
    const cameraPos = sphereMesh.position.clone();
    if (
      lastYPosRef.current === null ||
      currentY !== lastYPosRef.current - HEIGHT_DIFF
    ) {
      lastYPosRef.current = currentY + HEIGHT_DIFF;
    }
    cameraPos.setY(lastYPosRef.current);
    camera.position.copy(cameraPos);
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
    sphereApi.velocity.set(velocity[0], JUMP_MULTIPLIER, velocity[2]);
  }

  sphereMesh.getWorldPosition(sphereMesh.position);
}

const Player = ({ startPosition }: { startPosition: Triplet }) => {
  const { camera } = useThree();
  const [isThirdPerson, setIsThirdPerson] = useState(false);
  const activeControls = useKeyboardControls();
  const [sphereRef, sphereApi] = useSphere<THREE.Mesh>(() => ({
    mass: 1,
    args: [RADIUS],
    type: 'Dynamic',
    position: startPosition,
  }));
  const velocity = useRef<Triplet>([0, 0, 0]);
  const direction = useRef(new Vector3());
  const frontVector = useRef(new Vector3());
  const sideVector = useRef(new Vector3());
  const lastYPos = useRef<number | null>(null);
  useEffect(() => {
    sphereApi.velocity.subscribe((v) => (velocity.current = v));
  }, [sphereApi.velocity]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'KeyT') {
        setIsThirdPerson((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
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
      lastYPosRef: lastYPos,
      velocity: velocity.current,
      syncCamera: isThirdPerson,
    });
  });
  return (
    <>
      {isThirdPerson ? <OrbitControls /> : <PointerLockControls />}
      <mesh ref={sphereRef}>
        <meshStandardMaterial wireframe={true} color={'black'} />
        <sphereBufferGeometry args={[RADIUS]} />
      </mesh>
    </>
  );
};

export default Player;
