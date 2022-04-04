import { useState, useEffect } from "react";

function Grid(props) {
  const [gridOfLife, setGridOfLife] = useState(generateGrid(props.gridSize));
  const [Count, setCount] = useState(0);

  useEffect(() => {
    if (gridOfLife.length !== props.gridSize) {
      setGridOfLife(generateGrid(props.gridSize));
    }
    if (Count !== props.count) {
      tick();
      setCount(props.count);
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

  function tick() {
    let newTick = gridOfLife.map((column, colIndex, colArr) => {
      // go through every column in the array
      return column.map((cell, index, rowArr) => {
        // go through ever cell in a row
        let neighbourCount = 0 - cell;

        for (let i = colIndex - 1; i <= colIndex + 1; i++) {
          // loop through 8 neighbours of every cell
          for (let j = index - 1; j <= index + 1; j++) {
            if (i >= 0 && j >= 0 && i < colArr.length && j < rowArr.length) {
              // if cell is alive, count it as a neighbour
              neighbourCount += gridOfLife[i][j];
            }
            if (i >= 0 && i < colArr.length) {
              // if neighbouring cell is beyond the border of the array, count the opposite side as cell's neighbour
              if (j >= rowArr.length) neighbourCount += gridOfLife[i][0];
              if (j < 0) neighbourCount += gridOfLife[i][rowArr.length - 1];
            }
            if (j >= 0 && j < rowArr.length) {
              if (i >= colArr.length && j >= 0 && j < rowArr.length)
                neighbourCount += gridOfLife[0][j];
              if (i < 0 && j >= 0 && j < rowArr.length)
                neighbourCount += gridOfLife[colArr.length - 1][j];
            }
          }
        }
        if (cell === 1) {
          if (neighbourCount < 2 || neighbourCount > 3) return 0; // cell dies
          if (neighbourCount === 2 || neighbourCount === 3) return 1; // cell keeps living
        }
        if (cell === 0) {
          if (neighbourCount === 3) return 1; // cell is born
          else return 0;
        }
      });
    });
    setGridOfLife(newTick);
  }

  function addLiveCell(e) {
    const [col, row] = e.target.id.split("-");
    const newGrid = [...gridOfLife];
    newGrid[col][row] === 0 ? (newGrid[col][row] = 1) : (newGrid[col][row] = 0);
    setGridOfLife(newGrid);
  }

  function handleMouseOver(e) {
    if (props.paintMode && props.mouseIsDown) {
      e.target.classList.add("alive");
      addLiveCell(e);
    }
  }

  const grid = gridOfLife.map((row, index) => {
    ///render grid
    return row.map((cell, indexes) => {
      return (
        <div
          id={index + "-" + indexes}
          className={`cell ${cell === 1 ? "alive" : ""}`}
          onClick={addLiveCell}
          key={index + "-" + indexes}
        ></div>
      );
    });
  });

  return (
    <div>
      <div
        id="grid"
        style={gridStyle}
        onMouseEnter={handleMouseOver}
        onMouseOver={handleMouseOver}
      >
        {grid}
      </div>
    </div>
  );
}

export default Grid;
