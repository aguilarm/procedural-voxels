import create from 'zustand';
import { Triplet } from '@react-three/cannon';

interface RenderState {
  forFrame: number;
  triangles: number;
  geometries: number;
  textures: number;
  renderCalls: number;
}

interface UseDebugStore {
  visible: boolean;
  playerPosition: Triplet;
  facing: string;
  chunk: string;
  render: RenderState;
  updateRender: (newState: RenderState) => void;
}

const useDebugStore = create<UseDebugStore>((set) => ({
  visible: false,
  playerPosition: [0, 0, 0],
  facing: '',
  chunk: '',
  render: {
    forFrame: 0,
    triangles: 0,
    geometries: 0,
    textures: 0,
    renderCalls: 0,
  },
  setVisible: (to: boolean) =>
    set((state) => ({
      ...state,
      visible: to,
    })),
  setPlayerPos: (newPos: Triplet) =>
    set((state) => ({
      ...state,
      playerPosition: newPos,
    })),
  updateRender: (newState: RenderState) =>
    set((state) => ({
      ...state,
      render: newState,
    })),
}));

export default useDebugStore;
