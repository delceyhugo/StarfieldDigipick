document.body.style.background = 'url(assets/bg' + Math.floor(Math.random() * ((4) - 0 + 1) + 0) + '.webp)'
document.body.style.backgroundSize = "cover";
this.onload = () =>{
    let canvas = document.querySelector('#canvas')
    let ctx = canvas.getContext('2d')
    canvas.width = 500
    canvas.height = 500
    const grid = new Grid(canvas)
    const levels = [new Level(canvas, 170, 2), new Level(canvas, 130, 4)]
    const select = new Select(canvas, levels)

    // Event Listenener
    document.addEventListener('keydown', (event) => {
        select.moveSelector(event.key)
    })
    document.addEventListener('wheel', (event) => {
        select.moveSelector(event.deltaY)
    })
    document.addEventListener('click', (event) => {
        select.try()
    })
    document.addEventListener('keydown', (event) => {
        event.code == 'Space' ? select.try() : null
    })
    animate()
    function animate(){
        ctx.clearRect(0,0,canvas.width, canvas.height)
        for (let i = 0; i < levels.length; i++) {
            levels[i].drawLevel()
            
        }
        select.drawSelect()
        select.drawKey(select.selectPosition)
        grid.drawGrid()
        requestAnimationFrame(animate)
    }
}
 





