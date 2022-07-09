import { useState, useEffect } from "react";
import "./css/App.css";

import UI from "./components/ui";
import Grid from "./components/grid";
import Canvas from './components/canvas'
import useInterval from "./useInterval";


function App() {
  const [gameOn, setGameOn] = useState(false);
  const [gridSize, setGridSize] = useState(0);
  const [brushSize, setBrushSize] = useState(0)
  
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);

  const [paintMode, setPaintMode] = useState(false);
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const handleMouseUpDown = (e) => {
    if (e.type === "mousedown") setMouseIsDown(!mouseIsDown);
  };
  const paintModeSwitch = () => setPaintMode(!paintMode);

  useInterval(() => {
    if (gameOn) {
      setCount(count + 1);
    }
  }, delay);

  const runGame = () => (gameOn ? setGameOn(false) : setGameOn(true));
  const setSize = (value) => setGridSize(value);
  const clear = () => setGridSize(0);
  const tick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div
      className="App"
      onMouseUp={handleMouseUpDown}
      onMouseDown={handleMouseUpDown}
    >
     
      <Grid
        gridSize={gridSize}
        gameOn={gameOn}
        count={count}
        paintMode={paintMode}
        mouseIsDown={mouseIsDown}
        brushSize={brushSize}
      />
      <UI
        clear={clear}
        tick={tick}
        setSize={setSize}
        setBrushSize={setBrushSize}
        brushSize={brushSize}
        runGame={runGame}
        setDelay={setDelay}
        paintModeSwitch={paintModeSwitch}

        paintMode={paintMode}
        gameOn={gameOn}
      />
    </div>
  );
}

export default App;
