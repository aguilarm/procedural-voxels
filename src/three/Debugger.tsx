import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import useDebugStore from '../Game/Debug/useDebugStore';

const Debugger = () => {
  const { gl } = useThree();
  const updateRenderState = useDebugStore((store) => store.updateRender);
  useEffect(() => {
    const updateDebug = setInterval(
      () =>
        updateRenderState({
          forFrame: gl.info.render.frame,
          triangles: gl.info.render.triangles,
          geometries: gl.info.memory.geometries,
          textures: gl.info.memory.textures,
          renderCalls: gl.info.render.calls,
        }),
      1000,
    );
    return () => clearInterval(updateDebug);
  }, [gl, updateRenderState]);
  return <></>;
};

export default Debugger;
