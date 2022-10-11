var sketchWidth;
var sketchHeight;

function setup() {
  sketchWidth = document.getElementById("content").offsetWidth;
  sketchHeight = document.getElementById("content").offsetHeight;
  let renderer = createCanvas(sketchWidth, sketchHeight);
  renderer.parent("content");
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}
function windowResized() {
  sketchWidth = document.getElementById("content").offsetWidth;
  sketchHeight = document.getElementById("content").offsetHeight;
  resizeCanvas(sketchWidth, sketchHeight);
}
