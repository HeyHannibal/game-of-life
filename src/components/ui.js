import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

export default function UI(props) {
  function valuetext(value) {
    props.setSize(value);

    return `${value}°C`;
  }

  function runGame() {
    props.runGame()
  }

  return (
    <div id='ui'>
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Temperature"
          defaultValue={10}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={10}
          marks
          min={40}
          max={80}
        />
        {/* <Slider defaultValue={30} step={10} marks min={10} max={110} disabled /> */}
      </Box>
      <button onClick={runGame}>Start The Game</button>

    </div>
  );
}
