import Context from "@mui/base/TabsUnstyled/TabsContext";
import { useRef, useEffect, useState } from "react";
export default function Canvas(props) {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  const draw = (ctx) => {
    ctx.strokeStyle = "grey";
    ctx.strokeRect(250, 100, 400, 400);
    for (let i = 0; i <= 8; i++) {
      for (let j = 0; j <= 8; j++) {
        (i + j) % 2 !== 0
          ? (ctx.fillStyle = "lightblue")
          : (ctx.fillStyle = "lightpink");
        ctx.fillRect(250 + 50 * i, 100 + 50 * j, 50, 50);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = 'lightblue'
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    draw(ctx);

  }, [draw]);

  return <canvas ref={canvasRef} width="840" height="860" />;
}

// ctx.fillStyle = '#add8e6'
// ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height)
