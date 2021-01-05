var b1, b2, b3, b4, b5, b6;
var goal1, goal2;
var comp, ball, player;
var playScore,compScore;

playScore = 0;
compScore = 0;

var gameState = "waiting";

function setup() {
  createCanvas(400, 400);
  
b1 = createSprite(200,10,400,5);
b2 = createSprite(200,390,400,5);
b3 = createSprite(200,150,400,5);
b4 = createSprite(200,250,400,5);

b5 = createSprite(10,200,5,400);
b6 = createSprite(390,200,5,400);

b1.shapeColor = "white";
b2.shapeColor = "white";
b3.shapeColor = "white";
b4.shapeColor = "white";
b5.shapeColor = "white";
b6.shapeColor = "white";

goal1 = createSprite(200,15,100,15);
goal2 = createSprite(200,385,100,15);

goal1.shapeColor = (rgb(2,62,138));
goal2.shapeColor = (rgb(2,62,138));

comp = createSprite(200,38,50,10);
player = createSprite(200,362,50,10);
ball = createSprite(200,200,10,10);

comp.shapeColor = "black";
player.shapeColor = "black";
ball.shapeColor = (rgb(0,180,216));
  
}

function draw() {
  background(rgb(173,232,244));

  if (gameState === "waiting"){
    text("Press space to serve", 145,60);
    
    ball.x=200;
    ball.y=200;
    
    ball.velocityX=0;
    ball.velocityY=0;
  }
  
  if (keyDown("space") && gameState === "waiting") {
    serve();
    gameState = "play";
  }
  
  stroke("white");
  strokeWeight(3);
  for (var i=0; i<400; i=i+20){
    line(i,200,i+10,200);
  }
  
  stroke("black");
  fill("black");
  strokeWeight(1);
  textSize(12);
  text (compScore,30,190);
  text (playScore,30,220);
  
  player.x=World.mouseX;
  comp.x=ball.x;
  
  if (ball.isTouching(goal1) || (ball.isTouching(goal2))){
    if (ball.isTouching(goal1)){
      playScore=playScore+1;
    }
    if (ball.isTouching(goal2)){
      compScore=compScore+1;
    }
    reset();
  }
  
  if (compScore===5 || playScore===5){
    gameState= "end";
  }
  
if (gameState === "end"){
    text("Game Over. Press 'R' to restart.",120,210);
    //reset();
    
    ball.x=200;
    ball.y=200;
    
    ball.velocityX=0;
    ball.velocityY=0;
  }
  if (keyDown("r") && gameState === "end"){
    compScore=0;
    playScore=0;

    reset();
  }

  var edges = createEdgeSprites();
  
  player.collide(edges);
  ball.bounceOff(edges);
  ball.bounceOff(player);
  ball.bounceOff(comp);
  ball.bounceOff(goal1);
  ball.bounceOff(goal2);
  
  drawSprites();
}

function serve(){
    ball.velocityY=Math.round(random(4,12));
    ball.velocityX=Math.round(random(-4,6));
}

function reset(){
  gameState= "waiting";
}


