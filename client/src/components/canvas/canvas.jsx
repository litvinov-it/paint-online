import React, { useEffect, useRef } from "react";
import classes from "./canvas.module.css";
import { observer } from "mobx-react-lite";
import { canvasState } from "../../store/canvasState";
import { Brush } from "../../tools/brush";
import { wsState } from "../../store/wsState";
import { Rectangle } from "../../tools/rectangle";
import { Eraser } from "../../tools/eraser";
import { Circle } from "../../tools/circle";
import { Line } from "../../tools/line";
import axios from "axios";
import { toolState } from "../../store/toolState";

export const Canvas = observer(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);

    wsState.onMessage((e) => {
      const message = JSON.parse(e.data);
      switch (message.method) {
        case "connection":
          console.log(`User: ${message.name} connected room`);
          break;
        case "draw":
          drawHandler(message);
          break;
      }
    });

    axios
      .get("http://localhost:5000/image", {
        params: { sessionId: wsState.sessionId },
      })
      .then((res) => {
        if (res.data.message === 'file not exist') return;
        const img = new Image();
        img.src = res.data.image;
        img.onload = () => {
          canvasState.ctx.clearRect(
            0,
            0,
            canvasState.canvas.width,
            canvasState.canvas.height
          );
          canvasState.ctx.drawImage(
            img,
            0,
            0,
            canvasState.canvas.width,
            canvasState.canvas.height
          );
          canvasState.ctx.stroke();
        };
      });
  }, []);

  const drawHandler = (message) => {
    const figure = message.figure;
    switch (figure.type) {
      case "brush":
        Brush.staticDraw(figure);
        break;
      case "eraser":
        Eraser.erase(figure);
        break;
      case "rectangle":
        Rectangle.staticDraw(figure);
        break;
      case "circle":
        Circle.staticDraw(figure);
        break;
      case "line":
        Line.staticDraw(figure);
        break;
      case "finish":
        canvasState.ctx.beginPath();
        break;
    }
  };

  return (
    <div className={classes.container}>
      <canvas
        ref={canvasRef}
        width={1080}
        height={720}
        className={classes.canvas}
      ></canvas>
    </div>
  );
});
