import { useEffect } from "react";
import { Canvas } from "../canvas/canvas";
import { ToolBar } from "../tool-bar/tool-bar";
import classes from './app.module.css'

function App() {

  useEffect(() => {
  }, [])

  return (
    <div className={classes.app}>
      <Canvas />
      <ToolBar />
    </div>
  );
}

export default App;
