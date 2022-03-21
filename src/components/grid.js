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
    console.log(gridOfLife);
    let newTick = gridOfLife.map((column, colIndex, rowArr) => {
      return column.map((cell, index, cellArr) => {
        let neighbourCount = 0 - cell;
        for (let i = colIndex - 1; i <= colIndex + 1; i++) {
          for (let j = index - 1; j <= index + 1; j++) {
            if (i >= 0 && j >= 0 && i < rowArr.length && j < cellArr.length) {
              neighbourCount += gridOfLife[i][j];
            }
          }
        }
        if (cell === 1) {
          if (neighbourCount < 2) return 0;
          if (neighbourCount === 2 || neighbourCount === 3) return 1;
          if (neighbourCount > 3) return 0;
        }
        if (cell === 0) {
          if (neighbourCount === 3) return 1;
          else return 0;
        }
      });
    });

    setGridOfLife(newTick);
  }

  function addLiveCell(e) {
    const indexes = e.target.id.split("-");
    const newGrid = [...gridOfLife];
    newGrid[indexes[0]][indexes[1]] === 0
      ? (newGrid[indexes[0]][indexes[1]] = 1)
      : (newGrid[indexes[0]][indexes[1]] = 0);
    setGridOfLife(newGrid);
  }

  function handleMouseOver(e) {
    console.log(e);
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
          {" "}
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
