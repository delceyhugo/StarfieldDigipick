document.body.style.background = 'url(assets/bg' + Math.floor(Math.random() * ((4) - 0 + 1) + 0) + '.webp)'
document.body.style.backgroundSize = "cover";
let reload = document.querySelector('#reload')
let initialLoop = true
let frame = 0
let loop = true
let finish = false
this.onload = () =>{
    // Canvas
    let canvas = document.querySelector('#canvas')
    let ctx = canvas.getContext('2d')
    canvas.width = 500
    canvas.height = 500

    // Object
    const grid = new Grid(canvas)
    const levels = [new Level(canvas, 170, 2), new Level(canvas, 130, 4)]
    const select = new Select(canvas, levels)

    // Event Listenener
    document.addEventListener('keydown', (event) => {
        select.moveSelector(event.key)
    })
    document.addEventListener('wheel', (event) => {
        select.moveSelector((event.deltaY/100).toFixed(0))
    })
    document.addEventListener('click', () => {
        select.try()
    })
    document.addEventListener('keydown', (event) => {
        event.code == 'Space' ? select.try() : null
    })
    reload.addEventListener('click', () => {
        location.reload()
    })

    // Drawing
    initialAnimation()
    setTimeout(() => animate(), 500)

    // Function
    function initialAnimation(){
        loop ? frame++ : frame--
        ctx.clearRect(0,0,canvas.width, canvas.height)
        ctx.beginPath()
        switch (true) {
            case frame < 3:
                ctx.arc(canvas.width/2, canvas.height/2, 40, 0, 2*Math.PI)
                ctx.lineWidth = 80
                break;
            case frame < 4:
                ctx.arc(canvas.width/2, canvas.height/2, 100, 0, 2*Math.PI)
                ctx.lineWidth = 20
                break;
            case frame < 5:
                ctx.arc(canvas.width/2, canvas.height/2, 130, 0, 2*Math.PI)
                ctx.lineWidth = 20
                break;
            case frame < 6:
                ctx.arc(canvas.width/2, canvas.height/2, 170, 0, 2*Math.PI)
                ctx.lineWidth = 20
                break;
            case frame < 7:
                ctx.arc(canvas.width/2, canvas.height/2, 200, 0, 2*Math.PI)
                ctx.lineWidth = 20
                break;
            case frame < 8:
                ctx.arc(canvas.width/2, canvas.height/2, 235, 0, 2*Math.PI)
                ctx.lineWidth = 30
                break;
        }
        ctx.strokeStyle = 'rgb(167, 191, 183, 1)'
        ctx.stroke()
        grid.drawGrid()
        if(frame == 0){
            initialLoop = false
            ctx.clearRect(0,0,canvas.width, canvas.height)
            reload.classList.remove("off")
        }
        initialLoop ? requestAnimationFrame(initialAnimation) : null
    }
    function animate(){
        if(loop){
            initialLoop = false
            ctx.clearRect(0,0,canvas.width, canvas.height)
            select.drawSelect()
            for (let i = 0; i < levels.length; i++) {
                levels[i].drawLevel()
            }
            select.drawKey(select.selectPosition)
            grid.drawGrid()
            requestAnimationFrame(animate)
        }else{
            frame < 0 ? null : initialAnimation()
        }
    }
}