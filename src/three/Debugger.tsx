import { Stats } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

const Debugger = () => {
  const { gl } = useThree();
  useEffect(() => {
    console.debug('Stats: ', gl.info.render, gl.info.memory);
    const debugLogger = setInterval(
      () =>
        console.debug(
          'Stats: ',
          performance.now(),
          gl.info.render,
          gl.info.memory,
        ),
      1000,
    );
    return () => clearInterval(debugLogger);
  }, [gl]);
  return <Stats />;
};

export default Debugger;
