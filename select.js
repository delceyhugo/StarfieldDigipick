class Select{
    constructor(canvas, levels){
        this.width = canvas.width
        this.height = canvas.height
        this.ctx = canvas.getContext('2d')
        this.levels = levels
        this.level = this.levels[0]
        this.keyhole = levels[0].keyhole
        this.selectPosition
        this.a = 2*Math.PI/32
        this.focus = 250
        this.selectOpacity = 0
        this.keyOpacity = 0
        this.initialized()
    }
    initialized(){
        this.setRandomPosition()
        setTimeout(() => this.changeFocus(220, 0.2), 300)
        setTimeout(() => this.changeSelectOpacity(1, 0.2), 300)
        setTimeout(() => this.changeKeyOpacity(1, 0.3), 800)
        // setTimeout(code, delay)
        // setTimeout(code, delay)
    }
    drawSelect(){
        this.levels[0].active = true
        this.ctx.beginPath()
        this.ctx.arc(this.width/2, this.height/2, this.focus, 0, 2*Math.PI)
        this.ctx.lineWidth = 3
        this.ctx.strokeStyle = 'rgb(167, 191, 183, '+this.selectOpacity+')'
        this.ctx.stroke()
    }
    drawKey(keyholes){
        for (let i = 0; i < 2; i++){
            this.ctx.beginPath()
            this.ctx.arc(this.width/2, this.height/2, this.focus-15, keyholes[i].from+this.a/2.8, keyholes[i].to-this.a/2.8)
            this.ctx.lineWidth = 30
            this.ctx.strokeStyle = 'rgb(167, 191, 183, '+this.keyOpacity+')'
            this.ctx.stroke()
            this.ctx.beginPath()
            this.ctx.arc(this.width/2, this.height/2, this.focus+10, keyholes[i].from+this.a/2.8, keyholes[i].to-this.a/2.8)
            this.ctx.lineWidth = 10
            this.ctx.strokeStyle = 'rgb(167, 191, 183, '+this.keyOpacity+')'
            this.ctx.stroke()
        }
    }
    setRandomPosition(){
        let random = Math.floor(Math.random() * ((29) - 1 + 1) + 1)
        this.selectPosition = [{from: this.keyhole[0].from + random*this.a, to:this.keyhole[0].to + random*this.a},{from: this.keyhole[1].from + random*this.a, to:this.keyhole[1].to + random*this.a}]
    }
    moveSelector(control){
        if(isNaN(control)){
            switch (control) {
                case 'd':
                case 'ArrowRight':
                    this.selectPosition[0].from += this.a
                    this.selectPosition[0].to += this.a
                    this.selectPosition[1].from += this.a
                    this.selectPosition[1].to += this.a
                    break;
                case 'a':
                case 'ArrowLeft':
                    this.selectPosition[0].from -= this.a
                    this.selectPosition[0].to -= this.a
                    this.selectPosition[1].from -= this.a
                    this.selectPosition[1].to -= this.a
                    break;
            }
        }else{
            control < 0 ? this.selectPosition[0].from += this.a * (Math.abs(control/100)) : this.selectPosition[0].from -= this.a * (Math.abs(control/100))
            control < 0 ? this.selectPosition[0].to += this.a * (Math.abs(control/100)) : this.selectPosition[0].to -= this.a * (Math.abs(control/100))
            control < 0 ? this.selectPosition[1].from += this.a * (Math.abs(control/100)) : this.selectPosition[1].from -= this.a * (Math.abs(control/100))
            control < 0 ? this.selectPosition[1].to += this.a * (Math.abs(control/100)) : this.selectPosition[1].to -= this.a * (Math.abs(control/100))
        }
    }
    try(){
        let i = 0
        let k = 0
        let l = 0
        let index = []
        for (let j = 0; j < this.keyhole.length*2; j++) {
            k == this.keyhole.length ? l = 1 : null
            k == this.keyhole.length ? k = 0 : null
            Math.round((2*Math.PI + (this.selectPosition[l].from % (2*Math.PI))) * 1000)/ 1000 == Math.round(this.keyhole[k].from * 1000) / 1000 ? i++ : null
            Math.round((2*Math.PI + (this.selectPosition[l].to % (2*Math.PI))) * 1000)/ 1000 == Math.round(this.keyhole[k].to * 1000) / 1000 ? i++ && index.push(k) : null
            Math.round((this.selectPosition[l].from % (2*Math.PI)) * 1000) / 1000 == Math.round(this.keyhole[k].from * 1000) / 1000 ? i++ : null
            Math.round((this.selectPosition[l].to % (2*Math.PI)) * 1000) / 1000 == Math.round(this.keyhole[k].to * 1000) / 1000 ? i++ && index.push(k) : null
            k++
        }
        if(i == 4){
            this.keyhole[index[0]].active = true
            this.keyhole[index[1]].active = true
            this.level.isSolved(this)
        }else{
            console.log('No')
        }
    }
    changeFocus(to, t){
        this.focus == to ? null : (this.focus = Math.floor((1-t)*this.focus+t*to), requestAnimationFrame(this.changeFocus.bind(this, to, t)))
    }
    changeKeyOpacity(to, t){
        this.keyOpacity.toFixed(2) == to.toFixed(2) ?  this.keyOpacity = to : ((this.keyOpacity = (1-t)*this.keyOpacity+t*to), requestAnimationFrame(this.changeKeyOpacity.bind(this, to, t)))
    }
    changeSelectOpacity(to, t){
        this.selectOpacity.toFixed(2) == to.toFixed(2) ?  null : ((this.selectOpacity = (1-t)*this.selectOpacity+t*to), requestAnimationFrame(this.changeSelectOpacity.bind(this, to, t)))
    }
    animate(){
        this.changeKeyOpacity(0,0.3)
        this.changeFocus(to,0.3)
        this.setRandomPosition()
        this.changeKeyOpacity(1,0.3)
    }
}