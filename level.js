class Level{
    constructor(canvas, position, remove){
        this.width = canvas.width
        this.height = canvas.height
        this.canvas = canvas
        this.position = position
        this.ctx = canvas.getContext('2d')
        this.completed = false
        this.active = false
        this.remove = remove
        this.a = 2*Math.PI/32
        this.cells = new Array()
        this.keyhole = new Array()
        this.#createCells()
        this.#removeCell(remove)
        setTimeout(() => (this.active ? this.changeCellOpacity(1) : this.changeCellOpacity(0.5)), 1200)
    }
    #createCells(){
        for (let i = 0; i < 32; i++) {
            this.cells.unshift(new Cell(this.canvas, this.position, this.a*i, this.a+(this.a*i), this))
        }
    }
    drawLevel(){
        if(this.completed == false){
            for (let i = 0; i < this.cells.length; i++) {
                this.cells[i] ? this.cells[i].drawCell() : null
            }
        }
    }
    #removeCell(i){
        for (let j = 0; j < i; j++) {
            let random = Math.floor(Math.random() * ((31) - 0 + 1) + 0)
            if(this.cells[random+1]?.active == true && this.cells[random-1]?.active == true && this.cells[random].active == true){
                this.keyhole.push(this.cells[random])
                this.cells[random].active = false
            }else{j--}
        }
    }
    changeCellOpacity(to){
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].opacity.toFixed(2) == to.toFixed(2) ?  null : ((this.cells[i].opacity = (1-0.2)*this.cells[i].opacity+0.2*to), requestAnimationFrame(this.changeCellOpacity.bind(this, to)))
        }
    }
    isSolved(select){
        let j = 0
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].active == true ? j++ : null
        }
        if(j == this.cells.length){
            this.completed = true
            select.levels.shift()
            if(select.levels.length !== 0){
                select.level = select.levels[0]
                select.keyhole = select.levels[0].keyhole
                select.lerp('keyOpacity', 0, 0.5)
                setTimeout(() => select.changeFocus(select.levels[0].position + 50, 0.3), 500)
                setTimeout(() => select.setRandomPosition(), 500)
                setTimeout(() => select.lerp('keyOpacity', 1,0.5), 1200)
                setTimeout(() => select.levels[0].changeCellOpacity(1), 800)
                
            }else{
                select.lerp('selectOpacity', 0,0.5)
                select.lerp('keyOpacity', 0,0.5)
                loop = false
                initialLoop = true
            }
            
        }else{
            select.lerp('keyOpacity', 0,0.5)
            setTimeout(() => {
                for (let i = select.keyhole.length-1; i >= 0; i--) {
                    select.keyhole[i].active == true ? select.keyhole.splice(i,1) : null
                }
                select.selectPosition[1].from = select.selectPosition[0].from + (select.keyhole[1].from - select.keyhole[0].from)
                select.selectPosition[1].to = select.selectPosition[0].to + (select.keyhole[1].to - select.keyhole[0].to)
            }, 200)
            setTimeout(() => select.lerp('keyOpacity',1,0.5), 500)
        }
    }
}