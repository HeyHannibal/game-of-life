import { useState, useEffect } from "react";

function Grid(props) {
  const [gridOfLife, setGridOfLife] = useState(generateGrid(props.gridSize));
  const [prevGridSize, setPrevGridSize] = useState(0);
  const [prevCount, setPrevCount] = useState(0);
  const [count, setCount] = useState(0);
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const handleMouseUpDown = (e) => {
    e.type === "mousedown" ? setMouseIsDown(true) : setMouseIsDown(false);
  };

  const [paintMode, setPaintMode] = useState(false);
  const paintModeOnOff = () =>
    paintMode ? setPaintMode(false) : setPaintMode(true);

  useEffect(() => {
    if (prevGridSize !== props.gridSize) {
      setPrevGridSize(props.gridSize);
      setGridOfLife(generateGrid(props.gridSize));
    }
    if (prevCount !== props.count) {
      tick();
      setPrevCount(props.count);
    }
  }, [props]);

  const gridStyle = {
    display: "grid",
    gridTemplateRows: `repeat(${props.gridSize}, 1fr)`,
    gridTemplateColumns: `repeat(${props.gridSize}, 1fr)`,
  };

  function generateGrid(N) {
    const board = [];
    for (let i = 0; i < N; i++) {
      const row = [];
      for (let i = 0; i < N; i++) {
        row.push(0);
      }
      board.push(row);
    }
    return board;
  }

  function clear() {
    setGridOfLife(generateGrid(props.gridSize));
  }

  function tick() {
    const startTime = performance.now()
    let newTick = gridOfLife.map((column, colIndex, colArr) => {
      return column.map((cell, index, rowArr) => {
        let neighbourCount = 0 - cell;
        for (let i = colIndex - 1; i <= colIndex + 1; i++) {
          for (let j = index - 1; j <= index + 1; j++) { /// check
            if (i >= 0 && j >= 0 && i < colArr.length && j < rowArr.length) {
              neighbourCount += gridOfLife[i][j];

            }
            if (j >= rowArr.length && (i >= 0 && i < colArr.length)) neighbourCount += gridOfLife[i][0];
            if (j < 0 && (i >= 0 && i < colArr.length)) neighbourCount += gridOfLife[i][rowArr.length - 1];
            if (i >= colArr.length && (j >= 0 && j < rowArr.length)) neighbourCount += gridOfLife[0][j];
            if (i < 0 && (j >= 0 && j < rowArr.length)) neighbourCount += gridOfLife[colArr.length - 1][j];

          }
          if (neighbourCount > 2) console.log('hmm')
        }
        if (cell === 1) {
          if (neighbourCount < 2) return 0;
          if (neighbourCount === 2 || neighbourCount === 3) return 1;
          if (neighbourCount > 3) return 0;

        }
        if (cell === 0) {
          if (neighbourCount === 3) return 1;
          else {
            return 0
          };
        }

      });
    });




    setGridOfLife(newTick);
    const endTime = performance.now()
    console.log(startTime + ' then ' + endTime)
  }

  function addLiveCell(e) {
    const indexes = e.target.id.split("-");
    const newGrid = [...gridOfLife];
    newGrid[indexes[0]][indexes[1]] === 0
      ? (newGrid[indexes[0]][indexes[1]] = 1)
      : (newGrid[indexes[0]][indexes[1]] = 0);
    setGridOfLife(newGrid);
    console.log(gridOfLife)
  }

  function handleMouseOver(e) {
    if (paintMode && mouseIsDown) {
      e.target.classList.add("alive");
      addLiveCell(e);
    }

  }

  const grid = gridOfLife.map((row, index) => {
    return row.map((cell, indexes) => {
      return (
        <div
          id={index + "-" + indexes}
          className={`cell ${cell === 1 ? "alive" : ""}`}
          onClick={addLiveCell}
          key={index + "-" + indexes}
        >
        </div>
      );
    });
  });




  return (
    <div>
      <button onClick={tick}>Tick</button>
      <button onClick={clear}>Clear</button>
      <button onClick={paintModeOnOff}>
        Paint Mode: {`${paintMode ? "on" : "off"}`}
      </button>
      <div
        id="grid"
        style={gridStyle}
        onMouseEnter={handleMouseOver}
        onMouseOver={handleMouseOver}
        onMouseDown={handleMouseUpDown}
        onMouseUp={handleMouseUpDown}
      >
        {grid}
      </div>
    </div>
  );
}

export default Grid;
