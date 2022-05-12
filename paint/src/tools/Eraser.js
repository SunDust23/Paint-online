import Brush from "./Brush";

export default class Eraser extends Brush {
    constructor(canvas) {
        super(canvas);
    }

    mouseUpHandler(e) {
        this.ctx.globalCompositeOperation = "source-over";
        this.mouseDown = false
    }

    draw(x, y) {
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }
}