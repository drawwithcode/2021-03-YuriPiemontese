let mic;
let mySong;
let myImage1;
let myImage2;
let analyser;
let myText;

function preload() {
  mySong = loadSound("./assets/TangoFrenetico.wav");
  myImage1 = loadImage("./assets/1.png");
  myImage2 = loadImage("./assets/2.png");
  myBackground = loadImage("./assets/background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  frameRate(4);

  analyser = new p5.Amplitude();
  analyser.setInput(mySong);

  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  const micLevel = mic.getLevel();
  userStartAudio();

  if (micLevel > 0.7 && mySong.isPlaying() === false) {
    mySong.loop();
  }

  image(myBackground, 0, 0, windowWidth, windowHeight);

  for (var i = 0; i < 250; i++) {
    rect(random(0, width), random(0, height), 5, 5);
    fill("blue");
    noStroke();
  }

  for (var n = 0; n < 250; n++) {
    rect(random(0, width), random(0, height), 5, 5);
    fill("blue");
    noStroke();
  }

  // magari fare che col mouse si frigge qualcosa
  // let songRate = map(mouseY, 0, height, 2, 0.1);
  // mySong.rate(songRate);

  // legare volume a qualcosa, in questo caso il raggio del cerchio
  let volume = analyser.getLevel();
  console.log(volume);

  if (mySong.isPlaying() === true) {
    if (volume > 0.26) {
      push();
      imageMode(CENTER);
      translate(windowWidth / 2 - 100, windowHeight / 2);
      image(myImage1, 0, 0, myImage1.width, myImage1.height);
      scale(0.1);
      pop();
    } else {
      push();
      imageMode(CENTER);
      translate(windowWidth / 2 + 100, windowHeight / 2);
      image(myImage2, 0, 0, myImage2.width, myImage2.height);
      translate(-windowWidth / 4, 0);
      scale(0.1);
      pop();
    }
  }

  if (mySong.isPlaying() === false) {
    let myText = "SCREAM TO PLAY";
    textFont("IBM Plex Mono");
    textAlign(CENTER);
    textSize(24);
    fill(240);
    text(myText, width / 2, height / 2);
  } else {
    let myText = "TANGO FRENETICO";
    textFont("IBM Plex Mono");
    textAlign(CENTER);
    textSize(24);
    fill(240);
    text(myText, width / 2, height / 2);
  }
}

// pause and play
function mousePressed() {
  if (mySong.isPlaying() === true) {
    mySong.stop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
