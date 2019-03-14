var rod = {
  pos: 0,
  dir: 0,
  angle: 0,
  setAngle: function(angle) {
    this.angle = angle;
  },
  move: function(followX, followY, followZ) {
    this.dir.set((followX - this.pos.x) * 0.2, (followY - this.pos.y) * 0.2, (followZ - this.pos.z) * 0.2);
    p5.Vector.add(this.pos, this.dir, this.pos);
  },
  display: function() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    rotateX(this.angle);
    rotateY(0);
    rotateZ(atan2(this.dir.y, this.dir.x));
    noStroke();
    //fill(0, 0, 250);
    box(5, 5, 200);
    pop();
  },
  setZ: function(z) {
    this.pos.z = z;
  }

};

//어레이
let rods = [];

let mx, my;
const num = 200;

function setup() {
  createCanvas(800, 600, WEBGL);
  for (let i = 0; i < num; i++) {
    rods[i] = Object.create(rod);
    rods[i].pos = createVector(0, 0, 0);
    rods[i].dir = createVector(0, 0, 0);
    rods[i].setAngle(i * 0.1);
  }

}

function draw() {
  ambientLight("#010468");
  //ambientLight("#fff600");
  directionalLight("#01842a", 100, 300, 100);
  directionalLight("#823800", 800, 800, 100);
  background(255);
//   for (let i = 0; i < 10; i++) {
//     line(-370 + i * 100, -200, -330+ i *100,-200);
  
//   }
  rotateX(0.3 * PI);
  mx = mouseX - width / 2;
  my = mouseY - height / 2;

  //specularMaterial("00ffff");
  rods[0].move(mx, my);
  rods[0].setZ(150 * sin(frameCount * 0.02));
  rods[0].display();
  for (let i = 1; i < num; i++) {
    rods[i].move(rods[i - 1].pos.x, rods[i - 1].pos.y, rods[i - 1].pos.z);
    rods[i].display();
  }
}
