const slide = document.getElementById("slideBar")

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");

async function fileContent(path) {
  let file = await fetch(path);
  file = await file.text();

  let content = file.replace(/(\r)/gm, "").trim().split("\n");
  content.shift();
  content = content.map(line => line.split("\t"));
  
  return content;
}

const imgBola = new Image();
imgBola.src = './bola.png';
desenhaCampo();
imgBola.onload = main();


function desenhaBola(x, y) {
  // 50 mm
  const raioDaBola = 50;

  ctx.drawImage(imgBola, x - raioDaBola, y - raioDaBola, 2 * raioDaBola, 2*raioDaBola);
}

function desenhaCampo() {
  ctx.fillStyle = "#51bb26"
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 50;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  ctx.strokeRect(-20, canvas.height / 3, 500, canvas.height / 3);
  ctx.strokeRect(canvas.width - 500 + 20, canvas.height / 3, 500, canvas.height / 3);
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 500, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath()
  
  ctx.beginPath();
  ctx.fillStyle = '#fff'
  ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function resetCanvas() {
  ctx.fillStyle = "#fff"
  ctx.fillRect(0,0,canvas.width, canvas.height);

  desenhaCampo();
}

async function main(){
  const content = await fileContent('./trajetoria.dat')
 
  let t = content.map(line => line[0]);
  let x = content.map(line => line[1]);
  let y = content.map(line => line[2]);

  slide.min = 0;
  slide.max = t.length;

  desenhaTrajetoria(x, y, t);
}

let i = 0;
function desenhaTrajetoria(x, y, t) {
  const xa = parseFloat(x[i].replace(",", ".")) * 1000;
  const ya = parseFloat(y[i].replace(",", ".")) * 1000;
  // tempo atual em milisegundos
  const ta = parseFloat(t[i].replace(",", ".")) * 1000;
  const tp = parseFloat(t[i + 1].replace(",", ".")) * 1000;

  desenhaBola(xa, canvas.height - ya);

  i++;
  if(i >= t.length - 1){
    i = 0;
    setTimeout(() => {
      resetCanvas();
      desenhaTrajetoria(x, y, t)
    }, 2000);
  } else {
    setTimeout(() => desenhaTrajetoria(x, y, t), tp - ta)
  } 
}

