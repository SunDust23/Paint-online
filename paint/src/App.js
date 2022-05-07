import React from "react";
import Settingbar from "./components/Settingbar";
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";
import "./styles/app.scss";

function App() {
  return (
    <div className="app">
    <Toolbar/>
    <Settingbar/>
    <Canvas/>
    </div>
  );
}

export default App;
