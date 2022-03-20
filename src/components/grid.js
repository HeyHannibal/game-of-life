import { useState, useEffect } from "react";

function Grid(props) {
  const [gridOfLife, setGridOfLife] = useState(generateGrid(props.gridSize));

  useEffect(() => {
    setGridOfLife(generateGrid(props.gridSize));
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
    console.log(gridOfLife)
    let newTick = gridOfLife.map((column, colIndex, rowArr) => {
      return column.map((cell, index, cellArr) => {
        let neighbourCount = 0 - cell;
        for (let i = colIndex - 1; i <= colIndex + 1; i++) {
          for (let j = index - 1; j <= index + 1; j++) {
            if ((i >= 0 && j >= 0) && (i < rowArr.length && j < cellArr.length)) {
              neighbourCount += gridOfLife[i][j]
            }
          }
        } 
        if(cell === 1) {
          if (neighbourCount < 2) return 0;
          if (neighbourCount === 2 || neighbourCount === 3) return 1;
          if (neighbourCount > 3) return 0
        }
        if(cell === 0) {
          if(neighbourCount === 3) return 1
          else return 0
        }
      });
    });

    setGridOfLife(newTick);
  }

  function setStage(e) {
    const indexes = e.target.id.split("-");
    // let nIndex = indexes.map(string => Number(string))
    console.log(indexes);
    const newGrid = [...gridOfLife];
    newGrid[indexes[0]][indexes[1]] = 1;
    setGridOfLife(newGrid);
  }

  const grid = gridOfLife.map((row, index) => {
    return row.map((cell, indexes) => {
      return cell === 1 ? (
        <div
          id={index + "-" + indexes}
          className="cell alive"
          onClick={setStage}
        >
          ■
        </div>
      ) : (
        <div id={index + "-" + indexes} className="cell " onClick={setStage}>
          ■
        </div>
      );
    });
  });

  return (
    <div>
      <button onClick={tick}>Tick</button>

      <div id="grid" style={gridStyle}>
        {grid}
      </div>
    </div>
  );
}

export default Grid;
