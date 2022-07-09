import { useState, useEffect } from "react";
import Canvas from './canvas'
function Grid(props) {
  const [gridOfLife, setGridOfLife] = useState(generateGrid(props.gridSize));
  const [Count, setCount] = useState(0);

  const {brushSize} = props

  useEffect(() => {
    if (gridOfLife.length !== props.gridSize) {
      setGridOfLife(generateGrid(props.gridSize));
    }
    if (Count !== props.count) {
      tick();
      setCount(props.count);
    }
    // console.log(gridOfLife)
  }, [props]);


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

  function considerPaint(coord) {
    let brushStroke = [coord]
    let {x, y} = coord
    const radius = 2

    for(let i = 1; i <= radius; i++) {
      i % 2 === 0 ? brushStroke.push({x: x - i, y}) : brushStroke.push({x: x + i, y})
    }
    for(let j = 1; j <= radius; j++) {
      j % 2 === 0 ? brushStroke.push({x, y: y -j}) : brushStroke.push({x, y: y + j}) 
    }
    console.log(brushStroke)

  }


  function addCell(coord) {
    console.log(considerPaint(coord))
    const newGrid = [...gridOfLife];
    newGrid[coord.x][coord.y] === 0 ? (newGrid[coord.x][coord.y] = 1) : (newGrid[coord.x][coord.y] = 0);
    setGridOfLife(newGrid);
    // console.log(coord)
    // console.log(newGrid)
  }



  return (
    <div>
      <div
        id="grid"
      >
      <Canvas       addCell={addCell}   gridArray={gridOfLife}></Canvas>
      </div>
    </div>
  );
}

export default Grid;
