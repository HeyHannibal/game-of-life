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



  return (
    <div id='ui'>
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Grid Size"
          defaultValue={5}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={5}
          marks
          min={5}
          max={80}
        />
        {/* <Slider defaultValue={30} step={10} marks min={10} max={110} disabled /> */}
      </Box>
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
      <button onClick={runGame}>Start The Game</button>
    </div>
  );
}
