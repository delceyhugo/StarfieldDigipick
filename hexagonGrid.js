class Grid{
    constructor(canvas){
        this.width = canvas.width + 5
        this.height = canvas.height
        this.ctx = canvas.getContext('2d')
        this.a = 2 * Math.PI / 6
        this.r = 3
    }
    #drawHexagon(x, y){
        this.ctx.beginPath()
        for (let i = 0; i < 6; i++) {
            this.ctx.lineTo(x + this.r * Math.cos(this.a*i), y + this.r * Math.sin(this.a * i))
        }
        this.ctx.closePath()
        this.ctx.lineWidth = 1
        this.ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        this.ctx.stroke()
    }
    drawGrid(){
        for (let y = this.r; y + this.r * Math.sin(this.a) < this.height; y += this.r * Math.sin(this.a)) {
            for(let x = this.r, j = 0; x + this.r * (1+Math.cos(this.a)) < this.width; x += this.r * (1+Math.cos(this.a)), y += (-1) ** j++ * this.r * Math.sin(this.a)){
                this.#drawHexagon(x,y)
            }
        }
    }
}