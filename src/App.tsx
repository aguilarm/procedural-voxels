import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import TitleScreen from './TitleScreen/TitleScreen';
import Game from './Game/Game';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<TitleScreen />} />
      <Route path={'/game'} element={<Game />} />
    </Routes>
  );
}

export default App;
