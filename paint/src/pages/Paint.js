import React from "react";
import Settingbar from "../components/Settingbar";
import Toolbar from "../components/Toolbar";
import Canvas from "../components/Canvas";

function Paint() {
    return (
        <div className="app">
            <Toolbar />
            <Settingbar />
            <Canvas />
        </div>
    );
}

export default Paint;
