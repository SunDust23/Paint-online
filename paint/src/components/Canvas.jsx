import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/canvas.scss';
import { observer } from "mobx-react-lite";
import CanvasState from "../store/canvasState";
import ToolState from "../store/toolState"
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import canvasState from "../store/canvasState";
import { Modal, Button } from "react-bootstrap";

const Canvas = observer(() => {
    const canvasRef = useRef();
    const usernameRef = useRef();
    const [modal, setModal] = useState(true);
    const params = useParams();

    useEffect(() => {
        CanvasState.setCanvas(canvasRef.current);
    }, [])

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket('ws://localhost:5000');
            canvasState.setSocket(socket);
            canvasState.setSessionId(params.id);
            ToolState.setTool(new Brush(canvasRef.current, socket, params.id));
            socket.onopen = () => {
                console.log("Подключение установлено!");
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: "connection"
                }))
            }
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data);
                switch (msg.method) {
                    case "connection":
                        console.log(`Пользователь ${msg.username} присоединился`);
                        break;
                    case "draw":
                        drawHandler(msg);
                        break;
                }
            }
        }
    }, [canvasState.username])

    const drawHandler = (msg) => {
        const figure = msg.figure;
        const ctx = canvasRef.current.getContext('2d');
        switch (figure.type) {
            case "brush":
                Brush.draw(ctx, figure.x, figure.y);
                break;
                case "rect":
                    Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color);
                    break;
            case "finish":
                ctx.beginPath();
                break;
        }
    }

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }

    const connectHandler = () => {
        canvasState.setUsername(usernameRef.current.value);
        setModal(false);
    }

    return (
        <div className="canvas">
            <Modal show={modal} onHide={() => { }}>
                <Modal.Header>
                    <Modal.Title>Введите ваше имя:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={usernameRef} class="form-control" placeholder="Имя пользователя" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => connectHandler()}>
                        Готово
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={1200} height={600} />
        </div>
    );
});

export default Canvas;