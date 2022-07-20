import { useThree } from '@react-three/fiber';
import { useCubeTexture } from '@react-three/drei';

const SkyBox = () => {
  const { scene } = useThree();
  const skybox = useCubeTexture(
    ['right.jpg', 'left.jpg', 'top.jpg', 'bottom.jpg', 'front.jpg', 'back.jpg'],
    {
      path: '/skybox/',
    },
  );
  scene.background = skybox;
  return null;
};

export default SkyBox;
