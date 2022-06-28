class Cell{
    constructor(canvas, position, from, to, level){
        this.canvas = canvas
        this.position = position
        this.from = from
        this.to = to
        this.a = 2*Math.PI/32
        this.ctx = canvas.getContext('2d')
        this.active = true
        this.level = level
        this.opacity = 0
    }
    drawCell(){
        if(this.active){
            this.ctx.beginPath()
            this.ctx.arc(this.canvas.width/2, this.canvas.height/2, this.position, (this.from)+(this.a/50), this.to)
            this.ctx.lineWidth = 20 * (this.position/170)
            this.ctx.strokeStyle = 'rgb(167, 191, 183, '+ this.opacity +')'
            this.ctx.stroke()
        }
    }
}