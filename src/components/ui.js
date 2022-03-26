import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Fab from '@mui/material/Fab';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import '../ui.css'

export default function UI(props) {
  function valuetext(value) {
    props.setSize(value);

    return `${value}`;
  }

  function speed(value) {
    props.setDelay(value)
    return `${value}`
  }

  function runGame() {
    props.runGame()
  }

  function clear() {
    props.clear()
  }

  function tick() {
    props.tick()
  }

  function paintModeSwitch() {
    props.paintModeSwitch()
  }

  return (
    <div id='uiContainer'>
      <div id='ui'>
        <div id='sliders'>
          <label >
            Size of Field
            <Box sx={{ width: 300 }}>
              <Slider
                aria-label="Grid Size"
                defaultValue={30}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={5}
                marks
                min={5}
                max={90}
              />
              {/* <Slider defaultValue={30} step={10} marks min={10} max={110} disabled /> */}
            </Box>
          </label>
          <label >
            Speed
            <Box sx={{ width: 300 }}>
              <Slider
                aria-label="Speed"
                defaultValue={500}
                getAriaValueText={speed}
                valueLabelDisplay="auto"
                step={50}
                marks
                min={10}
                max={1000}
              />
              {/* <Slider defaultValue={30} step={10} marks min={10} max={110} disabled /> */}
            </Box>
          </label>
        </div>
        <div id='buttons'>
          <button onClick={clear}>Clear</button>
          <button onClick={tick}>Tick</button>
      
            <button onClick={paintModeSwitch}>
              Paint Mode: {`${props.paintMode ? "on" : "off"}`}
            </button>
      
        </div>
        
      </div>
      <div id='runGame'>
        <Fab onClick={runGame}>{(props.gameOn) ?  <PauseCircleOutlineIcon sx={{ fontSize: 40 }}/> : <PlayCircleOutlineIcon sx={{ fontSize: 40 }}/>   }</Fab>
        </div>
    </div>
  );
}
