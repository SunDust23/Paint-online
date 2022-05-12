import Brush from "./Brush";

export default class Eraser extends Brush {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
    }

    mouseUpHandler(e) {
        this.ctx.globalCompositeOperation = "source-over";
        this.mouseDown = false;
        this.socket.send(JSON.stringify({
            method: "draw",
            id: this.id,
            figure: {
                type: 'finish',
            }
        }))
        
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            //this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
            this.socket.send(JSON.stringify({
                method: "draw",
                id: this.id,
                figure: {
                    type: 'eraser',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    width: this.ctx.lineWidth
                }
            }))
        }
    }
    

    static staticDraw(ctx, x, y, width) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = width;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}