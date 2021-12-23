
const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

let ground;
const boxes = [];
const boxes2 = [];
const boxes3 = [];
const boxes4 = [];
let bird;
let world, engine;
let mConstraint;
let slingshot;

let dotImg;
let boxImg;
let bkgImg;

let lifeimg, lifes;
let life1, life2, life3, link, link1, rope1;
var bigbox;

function preload() {
  dotImg = loadImage('images/dot.png');
  boxImg = loadImage('images/equals.png');
  bkgImg = loadImage('images/skyBackground.png');
  lifeimg = loadImage('life.png')
  badpig = loadImage('badpig.png')
}

function setup() {
  const canvas = createCanvas(screen.width - 200, screen.height - 200);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height - 10, width, 20);

  for (let i = 0; i < 4; i++) {
    boxes[i] = new Box(600, 300 - i * 75, 84, 100);
  }

  for (let i = 0; i < 4; i++) {
    boxes2[i] = new Box(700, 300 - i * 75, 84, 100);
  }

  for (let i = 0; i < 4; i++) {
    boxes3[i] = new Box(800, 300 - i * 75, 84, 100);
  }

  for (let i = 0; i < 4; i++) {
    boxes4[i] = new Box(900, 300 - i * 75, 84, 100);
  }

  bigbox = new Box(740,40,600,10)

  bird = new Bird(200, 400, 30);
  pig = new Pig(750, -10, 30);

  slingshot = new SlingShot(150, 300, bird.body);

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse
  };

  mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);

  lifes = 3;

  life1 = createImg('life.png');
  life1.position(40, 20);
  life1.size(40, 40);

  life2 = createImg('life.png');
  life2.position(80, 20);
  life2.size(40, 40);

  life3 = createImg('life.png');
  life3.position(120, 20);
  life3.size(40, 40);


}

function draw() {
  background(bkgImg);
  Matter.Engine.update(engine);
  ground.show();
  bigbox.show();
  for (let box of boxes) {
    box.show();
  }

  for (let box of boxes2) {
    box.show();
  }

  for (let box of boxes3) {
    box.show();
  }

  for (let box of boxes4) {
    box.show();
  }

  slingshot.show();
  bird.show();
  pig.show();

  if (lifes == 3) {
    console.log("3");
  }
  else if (lifes == 2) {
    life2 = createImg('life_diss.png');
    life2.position(115, 20);
    life2.size(50, 40);
  }

  else if (lifes == 1) {
    console.log("1");
    life2.visible = false;
    life2 = createImg('life_diss.png');
    life2.position(75, 20);
    life2.size(50, 40);
  }
  else if (lifes == 0) {
    console.log("0");
    life2.visible = false;
    life2 = createImg('life_diss.png');
    life2.position(35, 20);
    life2.size(50, 40);
  }
}
function keyPressed() {
  if (key == ' ') {
    if (lifes > 0) {
      World.remove(world, bird.body);
      bird = new Bird(150, 300, 25);
      slingshot.attach(bird.body);
      lifes = lifes - 1;
    }
  }
}

function mouseReleased() {
  setTimeout(() => {
    slingshot.fly();
  }, 100);
}

