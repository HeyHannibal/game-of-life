import Context from "@mui/base/TabsUnstyled/TabsContext";
import { grid } from "@mui/system";
import { useRef, useEffect, useState } from "react";

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export default function Canvas(props) {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState(1000);
  const { gridArray, addCell } = props;

  const draw = (ctx) => {
    ctx.strokeStyle = "grey";
    ctx.strokeRect(0, 0, canvasSize, canvasSize);
    const res = canvasSize / gridArray.length;
    const gridLength = gridArray.length;

    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridLength; j++) {
        if (gridArray[i][j] === 0) {
          ctx.fillStyle = "#4994ac";
          ctx.shadowColor = "transparent";

          ctx.fillRect(res * i, res * j, res, res);
        } else {
          ctx.fillStyle = "#d0e8ef";
          // ctx.shadowColor = 'lightblue';
          // ctx.shadowOffsetX = randomInt(-5,5)
          // ctx.shadowOffsetY = randomInt(-5,5)
          // ctx.shadowBlur = randomInt(5,30);
          ctx.fillRect(res * i, res * j, res, res);
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    draw(ctx);
  }, [draw]);

  function addLiveCell(e) {
    const rect = e.target.getBoundingClientRect();
    const res = canvasSize / gridArray.length;
    const x = Math.floor((e.clientX - rect.left) / res);
    const y = Math.floor((e.clientY - rect.top) / res);
    const clickCoord = { x, y };
    addCell(clickCoord);
  }

  function paintCells(e) {
    const rect = e.target.getBoundingClientRect();
    const res = canvasSize / gridArray.length;
    const x = Math.floor((e.clientX - rect.left) / res);
    const y = Math.floor((e.clientY - rect.top) / res);
    const clickCoord = { x, y };
    props.paint(clickCoord);
  }

  return (
    <canvas
      // onMouseMove={paintCells}
      onClick={addLiveCell}
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
    />
  );
}

// ctx.fillStyle = '#add8e6'
// ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height)
