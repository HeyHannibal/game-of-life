import { useState, useEffect } from "react";
import Canvas from "./canvas";
function Grid(props) {
  const [gridOfLife, setGridOfLife] = useState(generateGrid(props.gridSize));

  const [Count, setCount] = useState(0);

  const { brushSize } = props;

  useEffect(() => {
    if (gridOfLife.length !== props.gridSize) {
      setGridOfLife(generateGrid(props.gridSize));
    }
    if (Count !== props.count) {
      tick();
      setCount(props.count);
    }
  });

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
    console.time("one tick");
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
            // Put Toroid Algorithm Here
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
    console.timeEnd("one tick");
  }

  function considerPaint(coord) {
    let { x, y } = coord;
    let range = (x) => {
      let arr = [];
      let low = x / -2;
      for (let i = 0; i <= x; i++) {
        arr.push({ x: low + i });
      }
      for (let i = 0; i <= x; i++) {
        arr[i].y = low + i;
      }

      return arr;
    };
    const brushed = range(4).map((coo) => {
      return { x: x - coo.x, y: y - coo.y };
    });
    return brushed;
  }

  function addCell(coord) {
    // const stroke = considerPaint(coord);
    const newGrid = [...gridOfLife];
    [coord].forEach((stroke) => {
      newGrid[stroke.x][stroke.y] === 0
        ? (newGrid[stroke.x][stroke.y] = 1)
        : (newGrid[stroke.x][stroke.y] = 0);
    });

    setGridOfLife(newGrid);
  }

  function paint(coord) {
    const stroke = considerPaint(coord);
    const newGrid = [...gridOfLife];
    stroke.forEach((stroke) => {
      newGrid[stroke.x][stroke.y] = 1;
    });
    setGridOfLife(newGrid);
  }

  return (
    <div>
      <div id="grid">
        <Canvas addCell={addCell} paint={paint} gridArray={gridOfLife}></Canvas>
      </div>
    </div>
  );
}

export default Grid;

// | TOROID !!!

// if (i >= 0 && i < colArr.length) {
//   // if neighbouring cell is beyond the border of the array, count the opposite side as cell's neighbour
//   if (j >= rowArr.length) neighbourCount += gridOfLife[i][0];
//   if (j < 0) neighbourCount += gridOfLife[i][rowArr.length - 1];
// }
// if (j >= 0 && j < rowArr.length) {
//   if (i >= colArr.length && j >= 0 && j < rowArr.length)
//     neighbourCount += gridOfLife[0][j];
//   if (i < 0 && j >= 0 && j < rowArr.length)
//     neighbourCount += gridOfLife[colArr.length - 1][j];
// }

// for (let i = 0; i <= size; i++) {
//   let rng = range(4);
//   brushStroke.push({ x: x + rng[i].x, y });
// }
// for (let i = 0; i <= size; i++) {
//   let rng = range(4);
//   brushStroke.push({ x, y: y + rng[i].y });
// }
// console.log(brushStroke)
// return brushStroke;
