import create from 'zustand';
import { Vector3 } from 'three';
import { Triplet } from '@react-three/cannon';

const FACING_DIRECTIONS = ['northeast', 'northwest', 'southeast', 'southwest'];

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
  facing: {
    vector: Vector3;
    human: typeof FACING_DIRECTIONS[number];
  };
  chunk: string;
  render: RenderState;
  setRender: (newState: RenderState) => void;
  setFacingVector: (newVector: Vector3) => void;
  setPlayerPos: (newPos: Vector3) => void;
}

const useDebugStore = create<UseDebugStore>((set) => ({
  visible: false,
  playerPosition: [0, 0, 0],
  facing: {
    vector: new Vector3(),
    human: 'northwest',
  },
  // TODO - chunks :)
  chunk: '0.0',
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
  setPlayerPos: (newPos: Vector3) =>
    set((state) => ({
      ...state,
      playerPosition: newPos.toArray(),
    })),
  setFacingVector: (newVector: Vector3) =>
    set((state) => {
      let newHumanDir: typeof FACING_DIRECTIONS[number] | null = null;
      // east is positive x
      if (newVector.x > 0) {
        // south is positive z
        if (newVector.z > 0) {
          // southeast
          newHumanDir = 'southeast';
        } else {
          newHumanDir = 'northeast';
        }
      } else {
        if (newVector.z > 0) {
          newHumanDir = 'southwest';
        } else {
          newHumanDir = 'northwest';
        }
      }
      return {
        ...state,
        facing: {
          human: newHumanDir,
          vector: newVector,
        },
      };
    }),
  setRender: (newState: RenderState) =>
    set((state) => ({
      ...state,
      render: newState,
    })),
}));

export default useDebugStore;
