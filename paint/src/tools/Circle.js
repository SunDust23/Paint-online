import Tool from "./Tool";

export default class Circle extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
        this.socket.send(JSON.stringify({
            method: "draw",
            id: this.id,
            figure: {
                type: 'circle',
                x: this.startX,
                y: this.startY,
                radius: this.radius,
                color: this.ctx.fillStyle,
                strokeColor: this.strokeStyle,
                strokeWidth: this.ctx.lineWidth
            }
        }))
    }
    mouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = this.canvas.toDataURL()
    }
    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            let width = currentX - this.startX;
            let height = currentY - this.startY;
            this.radius = Math.sqrt(width * width + height * height)
            this.draw(this.startX, this.startY, this.radius)
        }
    }

    draw(x, y, radius) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            this.ctx.fill();
            this.ctx.stroke();
        }
    }

    static staticDraw(ctx, x, y, radius, color, strokeColor, strokeWidth) {
        ctx.lineWidth = strokeWidth;
        ctx.fillStyle = color;
        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();

    }
}