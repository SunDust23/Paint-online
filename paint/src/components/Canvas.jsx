import React, { useEffect, useRef } from "react";
import '../styles/canvas.scss';
import { observer } from "mobx-react-lite";
import CanvasState from "../store/canvasState";
import ToolState from "../store/toolState"
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";

const Canvas = observer( () => {
    const canvasRef = useRef();

    useEffect(()=>{
        CanvasState.setCanvas(canvasRef.current);
        ToolState.setTool(new Brush(canvasRef.current));
        console.log(canvasRef.current)
    },[])

    const mouseDownHandler = ()=>{
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }

    return (
        <div className="canvas">
            <canvas onMouseDown={()=>mouseDownHandler()} ref={canvasRef} width={1200} height={500}/>
        </div>
    );
});

export default Canvas;