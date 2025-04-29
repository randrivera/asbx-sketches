let trail = [];
let colorList = ['#019DFE', '#91F6FE', '#ADF43A', '#FED20D', '#FF6200', '#FA50BF', '#B43CDF', '#FF1531'];
let currentColorIndex = 0;
let currentFill;
let uiVisible = true;

function preload() {
  myFont = loadFont('assets/EmberModernDisplayStd-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(myFont);
  background(0);

  currentFill = color(colorList[currentColorIndex]);

  document.getElementById('toggleUI').addEventListener('click', toggleUI);
}

function draw() {
  background(0);

  stroke(0);
  strokeWeight(parseFloat(document.getElementById('strokeWeight').value));
  fill(currentFill);

  for (let box of trail) {
    rectMode(CENTER);
    rect(box.x, box.y, box.w, box.h);
  }
}

function mouseDragged() {
  if (isMouseOverUI()) return;

  let minSize = parseInt(document.getElementById('minSize').value);
  let maxSize = parseInt(document.getElementById('maxSize').value);
  let trailLength = parseInt(document.getElementById('trailLength').value);
  let gap = parseInt(document.getElementById('gap').value);

  if (trail.length == 0 || dist(mouseX, mouseY, trail[trail.length - 1].x, trail[trail.length - 1].y) > gap) {
    trail.push({
      x: mouseX,
      y: mouseY,
      w: random(minSize, maxSize),
      h: random(minSize, maxSize)
    });
  }

  if (trail.length > trailLength) {
    trail.shift();
  }
}

function keyPressed() {
  if (key === ' ') {
    trail = [];
    background(0);
  }

  if (key === 'c' || key === 'C') {
    currentColorIndex = (currentColorIndex + 1) % colorList.length;
    currentFill = color(colorList[currentColorIndex]);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  trail = [];
  background(0);
}

function isMouseOverUI() {
  const panel = document.getElementById('uiPanel').getBoundingClientRect();
  return mouseX >= panel.left && mouseX <= panel.right && mouseY >= panel.top && mouseY <= panel.bottom;
}

function toggleUI() {
  const panel = document.getElementById('uiPanel');
  uiVisible = !uiVisible;
  if (uiVisible) {
    panel.style.display = 'block';
  } else {
    panel.style.display = 'none';
  }
}
