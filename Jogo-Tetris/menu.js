let MENU = 0;
let PAG = 0;
var img;
var imgPerdeu;
let keyPressUp = false;
let keyPressDown = false;
let keyPressLeft = false;
let keyPressRight = false;
var shapeList = [
  [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], // I
  [0, 2, 0, 0, 2, 0, 0, 2, 2], // L
  [0, 3, 0, 0, 3, 0, 3, 3, 0], // J
  [4, 4, 0, 0, 4, 4, 0, 0, 0], // Z
  [0, 5, 5, 5, 5, 0, 0, 0, 0], // S
  [0, 0, 0, 6, 6, 6, 0, 6, 0], // T
  [7, 7, 7, 7], // O
];

var pimgtteMono = [];
var pallette = [
  [255, 255, 255], // 0, void
  [255, 224, 0], // 1 Yellow
  [255, 32, 0], // 2 Red
  [32, 255, 0], // 3 Green
  [16, 128, 255], // 4 Blue
  [255, 96, 16], // 5 Orange
  [0, 196, 255], // 6 Light Blue
  [128, 0, 255], // 7 Purple
];

function setup() {
  createCanvas(windowWidth - 40, windowHeight - 40);

  this.tetris = new Tetris(10, 20);
  this.timer = new Timer();
  frameRate(60);
  palletteMono = [];
  for (let i = 0; i < pallette.length; i++) {
    let rgb = pallette[i];
    let gray = rgb[0] + rgb[1] + rgb[2];
    palletteMono[i] = [];
    palletteMono[i][0] = 255 * gray;
    palletteMono[i][1] = 255 * gray;
    palletteMono[i][2] = 255 * gray;
  }
}

function preload(){
  img = loadImage('JogoDeTetris.png');
}

function draw() {
  print(mouseX, mouseY)
  background(255);
  fill(46, 46, 46);
  rect(50, 50, 200, 75, 15);
  rect(50, 200, 200, 75, 15);
  rect(50, 350, 200, 75, 15);
  textSize(50)
  fill(255);
  text("Iniciar", 80, 105);
  textSize(34);
  text("Informações", 60, 405);
  textSize(40);
  text("Instruções", 60, 255);

  if (MENU == 1) {
    if (this.timer.updateStep()) {
    applyInput(25);
  }
  this.tetris.update();
  this.tetris.display(this);
    if (mouseButton == RIGHT) {
      MENU = 0
    }
  } // START GAME
  if (MENU == 2) {
    background(46, 46, 46)
    textSize(40)
    text("Controles", 300, 40)
    textSize(30)
    text('1. W = Girar forma', 50, 150);
    text('2. S = Mover a forma para baixo', 50, 200);
    text('3. D = Mover a forma para direita', 50, 250);
    text('4. A = Mover a forma para esquerda', 50, 300);
    text('5. ESPAÇO = Pausar jogo', 50, 350);
    text('6. ENTER = Recomeçar jogo', 50, 400);
    text('7. Botão DIRETO DO MOUSE = Voltar ao menu', 50, 450);
    if (mouseButton == RIGHT) {
      MENU = 0
    }
  } // INSTRUCTIONS
  if (MENU == 3) {

// Designer forms
    background(46, 46, 46);
    background(img);
    fill(46, 46, 46, 180)
    rect(0, 0, 1800, 1800);
    
// Botão para página dois
    fill(46, 46, 46, 0);
    rect(600, 500, 100, 25, 25);
    textSize(60);
    fill(255);
    text('➡', 620, 532);
    
// Texto
    textSize(18);
    fill(255);
    text( 'Considerado um verdadeiro clássico dos jogos de videogame, o tetris foi resultado do esforço de um matemático russo chamado Alexey Pajintov. Em meados de 1984, teve grande interesse em estudar os pentaminós desenvolvidos, trinta anos antes, pelo matemático norte-americano Solomon Golomb. Em suma, os pentaminós seriam peças formadas por cinco quadrados que suportariam doze formas de disposição distintas.  \n\nPor meio desse jogo, poderiam ser feitos exercícios que empregavam princípios diversos do raciocínio lógico e matemático. Ampliando a sua aplicabilidade no meio acadêmico, a criação de Golomb foi de grande contribuição para que significativas descobertas no campo da análise combinatória fossem desenvolvidas. Entretanto, ao invés de buscar algo mais complexo com o jogo, Alexey Pajintov resolveu simplificar o esquema trabalhando com peças formadas por quatro quadrados.\n\nO tetris se tornou um jogo único e inovador durante anos, sendo criado várias variações, com vários método e mecânica diferentes, além dos diferentes significados ou temas que se pode abordar, abrindo uma gama de conceitos. O jogo trata do acúmulo de objetos, por isso, queremos abordar a temática da sustentabilidade. Ao analisar e refletir, cada bloco pode ser um pedaço de lixo. Essa é a sua missão, impedir esse acúmulo de lixo!', 20, 20, 680);
    if (mouseButton == RIGHT) {
      MENU = 0
    }
    
    if(PAG == 1){
      background(46, 46, 46);
      background(imgPerdeu);
      //fill(255, 255, 0)
      //rect(340, 0, 370, 350);
      //fill(0, 255, 0)
      //rect(0, 0, 350, 350);
      //fill(255, 165, 0)
      //rect(-200, 0, 350, 350);
      //fill(215, 26, 35)
      //rect(0, -200, 350, 350);
      //fill(0, 0, 255)
      //rect(0, 350, 350, 350);
      fill(46, 46, 46, 10)
      rect(0, 0, 800, 800);
      
    if (mouseButton == RIGHT) {
      MENU = 1
      }
    }
  } // EXIT 
}

function applyInput(newDelay) {
  if (this.tetris.pause) return;
  if (keyPressUp) this.tetris.rotate = true;
  if (keyPressDown) this.tetris.ty = +1;
  if (keyPressLeft) this.tetris.tx = -1;
  if (keyPressRight) this.tetris.tx = +1;
  this.timer.reset(newDelay);
}
function keyPressed() {
  if (keyCode == 32) this.tetris.pause = !this.tetris.pause;
  if (keyCode == 13) this.tetris.restart = true;
  keyPressUp |= keyCode === 87;
  keyPressDown |= keyCode === 83;
  keyPressLeft |= keyCode === 65;
  keyPressRight |= keyCode === 68;
  applyInput(200);
}
function keyReleased() {
  keyPressUp ^= keyCode === 87;
  keyPressDown ^= keyCode === 83;
  keyPressLeft ^= keyCode === 65;
  keyPressRight ^= keyCode === 68;
}
class Tetris {
  constructor(nx, ny) {
    this.tGrid = new TGrid(nx, ny);
    this.timer = new Timer();
    this.restartGame();
    this.shapeNext = undefined;
    this.pickNextShape();
  }
  restartGame() {
    this.tGrid.clearGrid();
    this.restart = false;
    this.pause = false;
    this.gameOver = false;
    this.spawn = true;
    this.rotate = false;
    this.tx = this.ty = 0;
    this.level = 1;
    this.rowsPerLevel = 5;
    this.rowsCompleted = 0;
    this.shapesCount = 0;
    this.timer.reset(600);
  }
  pickNextShape() {
    this.shapeCurr = this.shapeNext;
    var indexNext = parseInt(random(shapeList.length));
    this.shapeNext = shapeList[indexNext].slice();
  }
  update() {
    if (this.restart) {
      this.restartGame();
    }
    if (this.pause) {
      return;
    }
    // Spawn new shape
    if (this.spawn) {
      this.pickNextShape();
      this.tGrid.setShape(this.shapeCurr);
      this.shapesCount++;
      this.spawn = false;
    }
    // Update level/rows/difficulty
    this.level += floor(this.rowsCompleted / this.rowsPerLevel);
    this.rowsCompleted %= this.rowsPerLevel;
    this.timer.duration = ceil(800 / sqrt(this.level));
    // Game over check
    this.gameOver = this.tGrid.collision(0, 0);
    if (this.gameOver) {
      return;
    }
    // Apply user input: transforms
    if (this.rotate) this.tGrid.rotateShape();
    if (!this.tGrid.collision(this.tx, 0)) this.tGrid.sx += this.tx;
    if (!this.tGrid.collision(0, this.ty)) this.tGrid.sy += this.ty;
    // Apply game step
    if (this.timer.updateStep()) {
      if (!this.tGrid.collision(0, 1)) {
        if (this.ty == 0) {
          this.tGrid.sy++;
        }
      } else {
        this.tGrid.splatShape();
        this.rowsCompleted += this.tGrid.updateRows();
        this.spawn = true;
      }
    }
    // Reset transforms
    this.rotate = false;
    this.tx = this.ty = 0;
  }
  display(canvas) {
    var off, x, y, w, h, cell;
    var canvasW = canvas.width;
    var canvasH = canvas.height;
    off = 40;
    h = canvasH - 2 * off;
    w = canvasW - 2 * off;
    cell = ceil(Math.min(w / this.tGrid.nx, h / this.tGrid.ny));
    w = this.tGrid.nx * cell;
    h = this.tGrid.ny * cell;
    x = parseInt((canvasW - w) / 2.0);
    y = parseInt((canvasH - h) / 2.0);
    canvas.background(50);
    canvas.strokeWeight(1);
    canvas.noStroke();
    canvas.fill(16);
    canvas.rect(x - 4, y - 4, w + 8, h + 8);
    canvas.fill(32);
    canvas.rect(x - 1, y - 1, w + 3, h + 3);
    // Game screen
    var colors = this.pause || this.gameOver ? palletteMono : pallette;
    this.displayGrid(canvas, x, y, w, h, colors);
    // Shape preview
    {
      var _w = x - 2 * off;
      var _h = canvasH - 2 * off;
      var _y = off;
      var _x = off + x + w;
      this.displayNextShape(canvas, _x, _y, _w, _h);
    }
    // Header
    {
      var ty = off + 32;
      var tx = x + w + x / 2;
      var txtTitle = "Jogo Tetris";
      canvas.textAlign(CENTER, CENTER);
      canvas.noStroke();
      canvas.textSize(32);
      canvas.fill(200);
      canvas.text(txtTitle, tx, ty);
    }
    // Came level, ...
    {
      var ty = canvasH / 2 - 150;
      var tx1 = x + w + x / 2;
      var txtLevel = "LEVEL " + this.level;
      var txtProgress = "Linhas " + this.rowsCompleted + "/" + this.rowsPerLevel;
      var txtShapes = "Formas " + this.shapesCount;
      canvas.textAlign(CENTER, CENTER);
      canvas.noStroke();
      canvas.fill(200);
      canvas.textSize(24);
      canvas.text(txtLevel, tx1, ty);
      canvas.fill(96);
      canvas.textSize(16);
      canvas.text(txtProgress, tx1, (ty += 24));
      canvas.text(txtShapes, tx1, (ty += 16));
    }
    // Game status
    var txtGameStatus = undefined;
    if (this.gameOver) txtGameStatus = "Perdeu";
    if (this.pause) txtGameStatus = "Pausado";
    if (txtGameStatus !== undefined) {
      canvas.textSize(144);
      canvas.textAlign(CENTER, CENTER);
      canvas.noStroke();
      canvas.fill(0, 0, 0);
      canvas.text(txtGameStatus, canvasW / 2 + 2, canvasH / 2 + 1);
      canvas.fill(255, 224, 0);
      canvas.text(txtGameStatus, canvasW / 2, canvasH / 2);
    }
    // Controlls
    {
      var ty = canvasH - 6 * 15 - off;
      var tx1 = x + w + 40;
      var tx2 = tx1 + 70;
      canvas.textAlign(LEFT);
      canvas.noStroke();
      canvas.textSize(14);
      canvas.fill(96);
      canvas.text("W", tx1, ty);
      canvas.text("-  Girar", tx2, ty);
      ty += 15;
      canvas.text("A", tx1, ty);
      canvas.text("-  Esquerda", tx2, ty);
      ty += 15;
      canvas.text("D", tx1, ty);
      canvas.text("-  Direita", tx2, ty);
      ty += 15;
      canvas.text("S", tx1, ty);
      canvas.text("-  Para cima", tx2, ty);
      ty += 25;
      canvas.text("ESPAÇO", tx1, ty);
      canvas.text("-  Pausar", tx2, ty);
      ty += 15;
      canvas.text("ENTER", tx1, ty);
      canvas.text("-  Recomeçar", tx2, ty);
      ty += 15;
    }
  }
  displayGrid(pg, x, y, w, h, pallette) {
    var nx = this.tGrid.nx;
    var ny = this.tGrid.ny;
    var cw = w / nx;
    var ch = h / ny;
    // BG
    for (var gy = 0; gy < ny; gy++) {
      for (var gx = 0; gx < nx; gx++) {
        var cx = x + gx * cw;
        var cy = y + gy * ch;
        pg.stroke(44);
        if ((gx & 1) == 1) {
          pg.fill(66);
        } else {
          pg.fill(77);
        }
        pg.rect(cx, cy, cw, ch);
      }
    }
    // FG
    for (var gy = 0; gy < ny; gy++) {
      for (var gx = 0; gx < nx; gx++) {
        var cx = x + gx * cw;
        var cy = y + gy * ch;
        var valGrid = this.tGrid.getGridVal(gx, gy);
        if (valGrid > 0) {
          pg.stroke(0);
          var rgb = pallette[valGrid % pallette.length];
          pg.fill(rgb[0], rgb[1], rgb[2]);
          pg.rect(cx, cy, cw, ch);
        }
      }
    }
    // Shape
    var ks = this.tGrid.shapeSize;
    var kr = ceil(this.tGrid.shapeSize / 2.0);
    for (var ky = 0; ky < ks; ky++) {
      for (var kx = 0; kx < ks; kx++) {
        var gx = this.tGrid.sx + kx - kr;
        var gy = this.tGrid.sy + ky - kr;
        var cx = x + gx * cw;
        var cy = y + gy * ch;
        var valShape = this.tGrid.getShapeVal(kx, ky);
        if (valShape != 0) {
          pg.stroke(0);
          var rgb = pallette[valShape % pallette.length];
          pg.fill(rgb[0], rgb[1], rgb[2]);
          pg.rect(cx, cy, cw, ch);
        }
      }
    }
  }
  displayNextShape(pg, x, y, w, h) {
    var shape = this.shapeNext;
    var shapeSize = parseInt(sqrt(shape.length));
    var ks = shapeSize;
    var kr = shapeSize / 2.0;
    var cw = min(w / 5.0, h / 5.0);
    var ch = cw;
    for (var ky = 0; ky < ks; ky++) {
      for (var kx = 0; kx < ks; kx++) {
        var gx = kx - kr;
        var gy = ky - kr;
        var cx = x + gx * cw + w / 2.0;
        var cy = y + gy * ch + h / 2.0;
        cx = parseInt(cx);
        cy = parseInt(cy);
        var valShape = shape[ky * shapeSize + kx];
        if (valShape != 0) {
          pg.fill(200);
        } else {
          pg.fill(32);
        }
        pg.stroke(64);
        pg.rect(cx, cy, cw, ch);
      }
    }
  }
}

class Timer {
  constructor() {
    this.duration = 600;
    this.time = 0;
  }
  reset(duration) {
    this.setTime();
    this.duration = duration;
  }
  setTime() {
    this.time = millis();
  }
  getTime() {
    return millis() - this.time;
  }
  updateStep() {
    if (this.getTime() >= this.duration) {
      this.setTime();
      return true;
    }
    return false;
  }
}

class TGrid {
  constructor(nx, ny) {
    this.nx = nx;
    this.ny = ny;
    this.grid = [];
    this.grid.length = nx * ny;
    this.clearGrid();
    this.setShape([0]);
  }
  clearGrid() {
    for (var i = 0; i < this.grid.length; i++) {
      this.grid[i] = 0;
    }
  }
  isInsideGrid(x, y) {
    return x >= 0 && x < this.nx && y >= 0 && y < this.ny;
  }
  setShape(shape) {
    this.shape = shape;
    this.shapeSize = parseInt(sqrt(shape.length));
    this.sx = ceil(this.nx / 2);
    this.sy = ceil(this.shapeSize / 2);
  }
  getGridVal(x, y) {
    if (!this.isInsideGrid(x, y)) {
      return -1;
    } else {
      return this.grid[y * this.nx + x];
    }
  }
  setGridVal(x, y, val) {
    this.grid[y * this.nx + x] = val;
  }
  getShapeVal(x, y) {
    return this.shape[y * this.shapeSize + x];
  }
  rotateShapeDir(CW) {
    var size = this.shapeSize;
    var cpy = this.shape.slice(0);
    if (CW) {
      var ib = 0,
        ia = size * size;
      for (var y = 1; y <= size; y++, ia++) {
        for (var x = 1; x <= size; x++, ib++) {
          this.shape[ib] = cpy[ia - x * size];
        }
      }
    } else {
      var ib = 0,
        ia = -1;
      for (var y = 1; y <= size; y++, ia--) {
        for (var x = 1; x <= size; x++, ib++) {
          this.shape[ib] = cpy[ia + x * size];
        }
      }
    }
  }
  rotateShape() {
    this.rotateShapeDir(true);
    if (this.collision(0, 0)) {
      this.rotateShapeDir(false);
    }
  }

  collision(tx, ty) {
    var ks = this.shapeSize;
    var kr = ceil(this.shapeSize / 2);
    for (var ky = 0; ky < ks; ky++) {
      for (var kx = 0; kx < ks; kx++) {
        var px = this.sx + kx - kr + tx;
        var py = this.sy + ky - kr + ty;
        var valGrid = this.getGridVal(px, py);
        var valShape = this.getShapeVal(kx, ky);
        if (valGrid * valShape != 0) {
          return true;
        }
      }
    }
    return false;
  }
  updateRows() {
    var rows = 0;
    for (var gy = 0; gy < this.ny; gy++) {
      var rowCompleted = true;
      for (var gx = 0; gx < this.nx; gx++) {
        var gi = gy * this.nx + gx;
        if (this.grid[gi] == 0) rowCompleted = false;
      }
      if (rowCompleted) {
        this.grid.copyWithin(this.nx, 0, gy * this.nx);
        rows++;
      }
    }
    if (rows > 0) {
      for (var gx = 0; gx < this.nx; gx++) {
        this.grid[gx] = 0;
      }
    }
    return rows;
  }
  splatShape() {
    let ks = this.shapeSize;
    let kr = ceil(this.shapeSize / 2);
    for (let ky = 0; ky < ks; ky++) {
      for (let kx = 0; kx < ks; kx++) {
        let px = this.sx + kx - kr;
        let py = this.sy + ky - kr;
        let valShape = this.getShapeVal(kx, ky);
        if (valShape != 0) {
          this.setGridVal(px, py, valShape);
        }
      }
    }
  }
}

function mouseClicked() {
  if (MENU == 0) {
    if (mouseX < 200 && mouseX > 50) {
      if (mouseY < 125 && mouseY > 50) {
        MENU = 1
      }
      if (mouseY < 275 && mouseY > 200) {
        MENU = 2
      }
      if (mouseY < 425 && mouseY > 350) {
        MENU = 3
      }
    }
  }
  
  if (MENU == 3){
   if (mouseX < 700 && mouseX > 600) {
      if (mouseY < 525 && mouseY > 495) {
        MENU = 1
      }
    }
  }
}