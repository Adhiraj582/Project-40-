var canvas, backgroundImage;

var distance = 0;
var car,carImg,carSound;
var enemyImg,enemyGroup;
var gameState = 0;
var score = 0;
var coinImg,coinGroup;
var lose,loseImg;
var trackImg;


function preload(){

  carImg = loadImage("images/car1.png");
  enemyImg = loadImage("images/enemy.png");
  loseImg = loadImage("images/lose.jpg");
  coinImg = loadImage("images/coin.png");
  trackImg = loadImage("images/track.jpg");
}

function setup(){
  createCanvas(displayWidth,displayHeight);

  car = createSprite(displayWidth/2-50,displayHeight/5+400,50,50);
  car.addImage(carImg);
  car.scale = (0.20); 

  lose = createSprite(displayWidth/2-50,displayHeight/5+300,50,50);
  lose.addImage(loseImg);
  lose.scale = 0.5

  enemyGroup = new Group();
  coinGroup = new Group();

  score = 0;
}

function draw(){
  background(trackImg);
  
  if(keyDown(RIGHT_ARROW)){
    car.x = car.x + 8;
  }
  if(keyDown(LEFT_ARROW)){
    car.x = car.x -8;
  }

  if(gameState === 0){
    car.visible=false
    lose.visible=false
  }else if (gameState === 1){ 
    car.visible = true;
    textSize(30);
    fill("white");
    text("Score :"+score,displayWidth+100,displayHeight+100);
  }else if(gameState === 2 ){
    lose.visible=true
  }

  if(keyDown("SPACE")){
    gameState = 1;
  }

  if(enemyGroup.isTouching(car)){
    gameState = 2;
  }
  if(coinGroup.isTouching(car)){
    score = score+5;
    coinGroup[0].destroy();
  }
  if(gameState === 2){

    enemyGroup.setVelocityYEach(0);
    car.velocityX=0;
    enemyGroup.setLifetimeEach(-1);
    coinGroup.setVelocityYEach(0);
    coinGroup.setLifetimeEach(-1);
    
  }

  hello();
  enemy1();
  spawnCoin();
  score1();

  drawSprites();

}

function hello(){
  if(gameState === 0 ){
    textSize(30);
    fill("#25CCF7");
    text("Welcome User ",displayWidth/2 - 50,200);
    text("Press SPACE to Play :)",displayWidth/2-80,300)
  }
}

function enemy1(){
  if(gameState === 1){
    if(frameCount % 60 === 0){
      var enemy2 = createSprite(800,displayHeight/4-250);
      enemy2.x = Math.round(random(0,1200));
      enemy2.addImage(enemyImg);
      enemy2.scale = 0.30;
      enemy2.velocityY = 4;
      enemy2.debug = false;
      enemy2.setCollider("rectangle",0,0,300,800);
      enemy2.lifetime = 400;

      enemyGroup.add(enemy2);
    }
  }
}

function spawnCoin() {
if(gameState === 1){
  if (frameCount % 60 === 0) {
    var coin = createSprite(800,displayHeight/4-250,40,10);
    coin.x = Math.round(random(0,1200));
    coin.addImage(coinImg);
    coin.scale = 0.1;
    coin.velocityY = 4;
    
    coin.lifetime = 400;
    
    coinGroup.add(coin);
  }
  
}
}

function score1(){
  if(gameState === 1){
    textSize(30);
    fill("white");
    text("Score : "+score,100,100);
  }
}