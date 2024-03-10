import React, { useEffect, useState } from "react";
import classes from "./tool-bar.module.css";
import { ReactComponent as BrushSvg } from "../../sprites/brush.svg";
import { ReactComponent as EraserSvg } from "../../sprites/eraser.svg";
import { ReactComponent as RectangleSvg } from "../../sprites/rectangle.svg";
import { ReactComponent as CircleSvg } from "../../sprites/circle.svg";
import { ReactComponent as SaveSvg } from "../../sprites/save.svg";
import { ReactComponent as LineSvg } from "../../sprites/line.svg";
import { toolState } from "../../store/toolState";
import { canvasState } from "../../store/canvasState";
import { Brush } from "../../tools/brush";
import { Rectangle } from "../../tools/rectangle";
import { Circle } from "../../tools/circle";
import { Line } from "../../tools/line";
import { Eraser } from "../../tools/eraser";
import { wsState } from "../../store/wsState";
import { Tooltip } from "react-tooltip";

export const ToolBar = () => {
  const [activeTool, setActiveTool] = useState("Brush");

  useEffect(() => {
    switch (activeTool) {
      case "Brush":
        toolState.setTool(new Brush(canvasState.canvas));
        break;
      case "Eraser":
        toolState.setTool(new Eraser(canvasState.canvas));
        break;
      case "Line":
        toolState.setTool(new Line(canvasState.canvas));
        break;
      case "Rectangle":
        toolState.setTool(new Rectangle(canvasState.canvas));
        break;
      case "Circle":
        toolState.setTool(new Circle(canvasState.canvas));
        break;
    }
  }, [activeTool]);

  const download = () => {
    const dataURL = canvasState.canvas.toDataURL();
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = wsState.sessionId + ".png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const tools = [
    {
      dataTooltipContent: "Перо",
      type: "Brush",
      active: true,
      sprite: <BrushSvg className={classes.icon} />,
    },
    {
      dataTooltipContent: "Ластик",
      type: "Eraser",
      sprite: <EraserSvg className={classes.icon} />,
    },
    {
      dataTooltipContent: "Линия",
      type: "Line",
      sprite: <LineSvg className={classes.icon} />,
    },
    {
      dataTooltipContent: "Квадрат",
      type: "Rectangle",
      sprite: <RectangleSvg className={classes.icon} />,
    },
    {
      dataTooltipContent: "Круг",
      type: "Circle",
      sprite: <CircleSvg className={classes.icon} />,
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.tools}>
        <div className={classes.tools_container}>
          {tools.map((tool) => (
            <div
              data-tooltip-id="my-tooltip"
              data-tooltip-content={tool.dataTooltipContent}
              data-tooltip-place="right"
              key={tool.type}
              className={`${classes.tool} ${
                activeTool === tool.type ? classes.active : ""
              }`}
              onClick={() => setActiveTool(tool.type)}
            >
              {tool.sprite}
            </div>
          ))}

          <div className={classes.settings_container}>
            <input
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Цвет заливки"
              className={classes.color}
              type="color"
              onChange={(e) => canvasState.fillColor(e.target.value)}
            />

            <input
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Цвет обводки/линии"
              className={classes.color}
              type="color"
              onChange={(e) => canvasState.strokeColor(e.target.value)}
            />

            <input
              className={classes.number}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Ширина обводки/линии"
              type="number"
              min={1}
              max={50}
              defaultValue={1}
              onChange={(e) => canvasState.lineWidth(e.target.value)}
            />
          </div>
        </div>

        <div
          className={classes.tool}
          onClick={() => download()}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Сохранить рисунок на компьтер"
        >
          <SaveSvg />
        </div>

        {/* Иницализация всплывающих подсказок */}
        <Tooltip id="my-tooltip" />
      </div>
      <div className={classes.btn}>ID комнаты: <span className={classes.copy} onClick={() => {navigator.clipboard.writeText(wsState.sessionId)}}>{wsState.sessionId }</span></div>
    </div>
  );
};
