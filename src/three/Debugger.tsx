import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import useDebugStore from '../Game/Debug/useDebugStore';

const Debugger = () => {
  const { gl, camera } = useThree();
  const setRenderState = useDebugStore((store) => store.setRender);
  const facingVector = useDebugStore((store) => store.facing.vector);
  const setFacingVector = useDebugStore((store) => store.setFacingVector);
  const setPlayerPos = useDebugStore((store) => store.setPlayerPos);
  useEffect(() => {
    const updateDebug = setInterval(() => {
      setRenderState({
        forFrame: gl.info.render.frame,
        triangles: gl.info.render.triangles,
        geometries: gl.info.memory.geometries,
        textures: gl.info.memory.textures,
        renderCalls: gl.info.render.calls,
      });
      setFacingVector(camera.getWorldDirection(facingVector));
      setPlayerPos(camera.position);
    }, 300);
    return () => clearInterval(updateDebug);
  }, [gl, setRenderState, setFacingVector, facingVector, camera, setPlayerPos]);
  return <></>;
};

export default Debugger;
