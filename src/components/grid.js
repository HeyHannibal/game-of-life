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
    for (let i = 0; i < N * N; i++) {
      board.push([null]);
    }
    return board;
  }

 

   function setStage(e) {
    const newGrid = [...gridOfLife]
    newGrid[e.target.id] = 1
    setGridOfLife(newGrid)
  }   
 

  const grid = gridOfLife.map((cell, index) => {
    return (cell === 1) ? <div id={index} className='cell alive' onClick={setStage}>■</div> : 
                          <div id={index} className='cell ' onClick={setStage}>■</div> ;
  });


  return (
    <div id="grid" style={gridStyle}>
      {grid}
    </div>
  );
}

export default Grid;
