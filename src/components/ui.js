import { useState } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import BrushIcon from "@mui/icons-material/Brush";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import '../css/slider.css';
import '../css/ui.css';

export default function UI(props) {
  function valuetext(value) {
    props.setSize(value);
    return `${value}`;
  }

  function speed(value) {
    props.setDelay(value);
    return `${value}`;
  }

  function runGame() {
    props.runGame();
  }

  function clear() {
    props.clear();
  }

  function tick() {
    props.tick();
  }

  const [showUI, setShowUI] = useState(true);
  const hideUI = () => {
    setShowUI(!showUI)
  }


  function paintModeSwitch() {
    props.paintModeSwitch();
  }

  return (
    <div id="uiContainer">
      {/* <button id='hideBtn' onClick={hideUI} >Hide</button> */}
      <div id="ui" className={(!showUI) ?'hidden' : ''}>
      <KeyboardDoubleArrowDownIcon id='hideBtn' onClick={hideUI} />

        <div id="sliders">
          <label>
            <p>Size of Field</p>
            <Box sx={{ width: 300 }}>
              <Slider size='small'
                aria-label="Grid Size"
                defaultValue={30}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={10}
                
                min={10}
                max={90}
              />
            </Box>
          </label>
          <label>
            <p>Speed</p>
            <Box sx={{ width: 300 }}>
              <Slider size='small'
                aria-label="Speed"
                defaultValue={500}
                getAriaValueText={speed}
                valueLabelDisplay="auto"
                step={50}
                dir="left"
                min={10}
                max={1000}
              />
            </Box>
          </label>
        </div>
        <div id="buttons">
          <RestartAltIcon
            onClick={clear}
          />
          <PlusOneIcon onClick={tick} />

          <BrushIcon
            onClick={paintModeSwitch}
            sx={{
              color: props.paintMode ? "lightblue" : "#add8e67d",
            }}
          />
        </div>
         <div id="runGame">
        <Fab onClick={runGame}>
          {props.gameOn ? (
            <PauseCircleOutlineIcon />
          ) : (
            <PlayCircleOutlineIcon/>
          )}
        </Fab>
      </div>
      </div>
     
    </div>
  );
}
