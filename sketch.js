// let bird = new Bird();
const TOTAL = 500;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let cycles = 100;
let slider;

function keyPressed() {
  if(key == 'S') {
  let bird = birds[0];
  saveJSON(bird.brain, 'bird.json');
  // let json = bird.brain.serialize();
  // save('bird.json',json);
  // // let json = JSON.stringify(bird);
  console.log(json);
  }
}

function setup() {
  createCanvas(640, 480);
  slider = createSlider(1,100,1);
  for(let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
    // pipes.push(new Pipe());
}

function draw() {

  for(let n = 0; n < slider.value(); n++) {

  if(counter % 200 == 0) {
      pipes.push(new Pipe());
  }
  counter++;

    for(let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    for(let j = birds.length - 1; j >= 0; j--) {
      if(pipes[i].hits(birds[j])) {
        savedBirds.push(birds.splice(j,1)[0]);
      }
    }

    // if(pipes[i].hits(bird)) {
    //   console.log("hit!");
    // }

    if(pipes[i].offscreen()) {
      pipes.splice(i,1);
    }
  }

  for(let i = birds.length - 1; i >= 0; i--) {
    if(birds[i].offscreen()) {
      savedBirds.push(birds.splice(i,1)[0]);
    }
  }

  for(let bird of birds) {
  bird.think(pipes);
  bird.update();
  // bird.show();
  }

  if(birds.length == 0) {
    counter = 0;
    nextGeneration();
    pipes = [];
  }
  }

//all drawing stuff
  background(0);
  for(let bird of birds) {
    bird.show();
  }

  for(let pipe of pipes) {
    pipe.show();
  }


}

// function keyPressed() {
//   if(key == ' ') {
//     // console.log("SPACE");
//   }
//   bird.up();
// }
