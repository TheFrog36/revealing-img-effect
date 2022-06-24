const canvas = document.getElementById('canvas')
const canvasCTX = canvas.getContext('2d')

const width = 600
const height = 800

canvas.height = height
canvas.width = width

canvasCTX.fillStyle = 'rgba(0, 0, 0, 1)'
canvasCTX.fillRect(0, 0, width, height)
let canvasData = canvasCTX.getImageData(0, 0, width, height)

function addShape(){
  const point1 = generatePoint()
  const point2 = generatePoint()
  const point3 = generatePoint()
  const point4 = generatePoint()
  plotLine(point1.x, point1.y, point2.x, point2.y)
  plotLine(point2.x, point2.y, point3.x, point3.y)
  plotLine(point3.x, point3.y, point4.x, point4.y)
  plotLine(point4.x, point4.y, point1.x, point1.y)
  canvasCTX.putImageData(canvasData, 0, 0)
}

function generatePoint(){
  return  point = {x: Math.round(Math.random() * width),y: Math.round(Math.random() * height)}
}

function plotLine(x0, y0, x1, y1) { // Bresenham's line algorithm
  dx = Math.abs(x1 - x0)
  sx = x0 < x1 ? 1 : -1
  dy = -Math.abs(y1 - y0)
  sy = y0 < y1 ? 1 : -1
  error = dx + dy
  while (true) {
    putPixel(x0, y0)
    if (x0 == x1 && y0 == y1) break
    e2 = 2 * error
    if (e2 >= dy) {
      if (x0 == x1) break
      error = error + dy
      x0 = x0 + sx
    }
    if (e2 <= dx) {
      if (y0 == y1) break
      error = error + dx
      y0 = y0 + sy
    }
  }
}

function putPixel(x,y){
  const point = (y * width + x) * 4
  canvasData.data[point] = 0
  canvasData.data[point + 1] = 0
  canvasData.data[point + 2] = 0
  canvasData.data[point + 3] = 0
}

function start() {

  for(let i = 0; i < 10000; i ++) setTimeout(addShape,10) 
}