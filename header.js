var sketchWidth;
var sketchHeight;
var title;
function setup() {
  sketchWidth = document.getElementById("header").offsetWidth;
  sketchHeight = document.getElementById("header").offsetHeight;
  let renderer = createCanvas(sketchWidth, sketchHeight);
  renderer.parent("header");
}

function draw() {
  textAlign(LEFT);
  textSize(40);
  text("Welcome",0,0);
}
function windowResized() {
  sketchWidth = document.getElementById("header").offsetWidth;
  sketchHeight = document.getElementById("header").offsetHeight;
  resizeCanvas(sketchWidth, sketchHeight);
}
