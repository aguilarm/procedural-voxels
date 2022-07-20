import { useState, useEffect } from 'react';

const ActionKeyMap: Record<string, string> = {
  KeyW: 'moveForward',
  KeyS: 'moveBackward',
  KeyA: 'moveLeft',
  KeyD: 'moveRight',
  ShiftLeft: 'sprint',
  ShiftRight: 'sprint',
  Space: 'jump',
};

const DEFAULT_MOVEMENT_STATE: Record<string, boolean> = {
  moveForward: false,
  moveBackward: false,
  moveLeft: false,
  moveRight: false,
  jump: false,
  sprint: false,
};

export const useKeyboardControls = () => {
  const [movement, setMovement] = useState(DEFAULT_MOVEMENT_STATE);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (ActionKeyMap[event.code]) {
        setMovement((state) => ({
          ...state,
          [ActionKeyMap[event.code]]: true,
        }));
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (ActionKeyMap[event.code]) {
        setMovement((state) => ({
          ...state,
          [ActionKeyMap[event.code]]: false,
        }));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  });

  return movement;
};
