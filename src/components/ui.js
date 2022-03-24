import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

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

  return (
    <div id='ui'>
      <label >
        Size of Field
        <Box sx={{ width: 300 }}>
          <Slider
            aria-label="Grid Size"
            defaultValue={5}
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
      <button onClick={runGame}>Start The Game</button>
      <button onClick={clear}>Clear</button>
    </div>
  );
}
