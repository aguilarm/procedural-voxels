import React, { useEffect, useState } from 'react';
import useDebugStore from './useDebugStore';
import { Box, Portal, Stack, Text } from '@chakra-ui/react';

const Debug = () => {
  const [visible, setVisible] = useState(false);
  const debugStats = useDebugStore();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.code === 'Backquote' && setVisible((state) => !state);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
  if (!visible) return null;
  return (
    <Portal>
      <Box
        bg={'whiteAlpha.50'}
        p={1}
        style={{ zIndex: 999, position: 'fixed', top: '6px', left: '6px' }}
      >
        <Stack spacing={1}>
          <Text fontSize={'md'}>Debug Stats (~ to hide)</Text>
          <Text fontSize={'sm'}>Render Stats:</Text>
          <Text fontSize={'sm'}>Frame: {debugStats.render.forFrame}</Text>
          <Text fontSize={'sm'}>Triangles: {debugStats.render.triangles}</Text>
          <Text fontSize={'sm'}>
            Geometries: {debugStats.render.geometries}
          </Text>
          <Text fontSize={'sm'}>Textures: {debugStats.render.textures}</Text>
          <Text fontSize={'sm'}>
            Render Calls: {debugStats.render.renderCalls}
          </Text>
        </Stack>
      </Box>
    </Portal>
  );
};

export default Debug;
