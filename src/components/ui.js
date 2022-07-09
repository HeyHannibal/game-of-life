import { useState } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import BrushIcon from "@mui/icons-material/Brush";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import "../css/slider.css";
import "../css/ui.css";

export default function UI(props) {
  const [showUI, setShowUI] = useState(true)
  const hideUI = () => setShowUI(!showUI);



  const {setSize, setDelay, runGame, clear, tick, paintModeSwith, brushSize, setBrushSize} = props

  const valuetext = (value) => setSize(value);  

  const speed = (value) => setDelay(value);

  const startGame = () => runGame();

  const clearGrid = () => clear();

  const tickplus = () => tick();


  const paintModeSwitch = () => paintModeSwitch();

  return (
    <div id="uiContainer">
      <div id="ui" className={!showUI ? "hidden" : ""}>
        <KeyboardDoubleArrowDownIcon id="hideBtn" onClick={hideUI} />

        <div id="sliders">
          <label>
            <p>Size of Field</p>
            <Box sx={{ width: 300 }}>
              <Slider
                size="small"
                aria-label="Grid Size"
                defaultValue={30}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={10}
                min={10}
                max={100}
              />
            </Box>
          </label>
          <label>
            <p>Speed</p>
            <Box sx={{ width: 300 }}>
              <Slider
                size="small"
                aria-label="Speed"
                defaultValue={500}
                getAriaValueText={speed}
                valueLabelDisplay="auto"
                step={50}
                dir="left"
                min={1}
                max={1000}
              />
            </Box>
          </label>
        </div>
        <div id="buttons">
          <RestartAltIcon onClick={clearGrid} />
          <PlusOneIcon onClick={tickplus} />

          <BrushIcon
            onClick={paintModeSwitch}
            sx={{
              color: props.paintMode ? "lightblue" : "#add8e67d",
            }}
          />
        </div>
        <div id="runGame">
          <Fab onClick={startGame}>
            {props.gameOn ? (
              <PauseCircleOutlineIcon />
            ) : (
              <PlayCircleOutlineIcon />
            )}
          </Fab>
        </div>
        <div>
          <p>brush size:{brushSize}</p>
          <button onClick={(() => setBrushSize(prev => prev + 1) )}>+</button>
          <button onClick={(() => setBrushSize(prev => prev - 1) ) }>-</button>
        </div>
      </div>
    </div>
  );
}
