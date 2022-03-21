import { useState, useEffect } from 'react';
import './App.css'

import UI from './components/ui'
import Grid from './components/grid'
import useInterval from './useInterval'

function App() {


  

  const [gameOn, setGameOn] = useState(false)
  const [gridSize, setGridSize] = useState(0)

  const [count, setCount] = useState(0)
  const [delay, setDelay] = useState(1000)

  useInterval(() => {
    if(gameOn) {setCount(count + 1)
    console.log(count)}
  }, delay)     


  
  const runGame = () => (gameOn) ? setGameOn(false) : setGameOn(true)
  const setSize = (value) => setGridSize(value)
  

  return (
    <div className="App">
      {(gameOn) ? <h1>On</h1> : <h1>Off</h1>}
      <UI setSize={setSize} runGame={runGame} setDelay={setDelay}/>
      <Grid gridSize={gridSize} gameOn={gameOn} count={count} setGageOn={setGameOn}/>
      </div>
  );
}

export default App;
