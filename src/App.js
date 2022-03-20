import { useState, useEffect } from 'react';
import './App.css'

import UI from './components/ui'
import Grid from './components/grid'

function App() {


  const [gameOn, setGameOn] = useState(false)
  const [gridSize, setGridSize] = useState(0)

  const runGame = () => (gameOn) ? setGameOn(false) : setGameOn(true)
  const setSize = (value) => setGridSize(value)

  return (
    <div className="App">
      {(gameOn) ? <h1>On</h1> : <h1>Off</h1>}
      <UI setSize={setSize} runGame={runGame}/>
      <Grid gridSize={gridSize} gameOn={gameOn} />
      </div>
  );
}

export default App;