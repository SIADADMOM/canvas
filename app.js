const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas"); 
const ctx = canvas.getContext("2d"); // 캔버스에 그림을 그리는 것
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value; // 선의 굵기 정해줌
let isPainting = false;
let isFilling = false;


function onMove(event) {
    if(isPainting) {
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
      return;
    }
  ctx.beginPath();   // 선마다 굵기가 다르게 만들어주기 위해 선을 분리시켜준다.
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) { 
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick(event) {
  if(isFilling) {
    isFilling = false
    modeBtn.innerText = "Fill"
  } else {
    isFilling = true
    modeBtn.innerText = "Draw"
  }
  console.log(event);
}

function onCanvasClick() {
  if(isFilling) {
    ctx.fillRect(0, 0, 800, 800);
  }
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
// document.addEventListener("mouseup", cancelPainting); // 옵션2, 화면전체에서 마우스 클릭이 반대가 되었을때 onMouseup을 실행시켜줌
// canvas.addEventListener("mouseleave", cancelPainting); // 옵션1, 마우스가 화면에서 캔버스에 떨어졌을때 onMouseup을 실행시켜줌
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);