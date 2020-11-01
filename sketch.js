
var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var health = 2,play = 0,end = 1,gameState = 0;
var ground;
var Lives = 2;
var colour,colourImage;
var gameImage,game;


function preload(){
  
  monkey_running =              loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  colourImage = loadImage("jungle.jpg");
  gameImage = loadImage("Gamedone.png");
  
}


function setup() {
  
  createCanvas(400,400);
  colour = createSprite(200,200);
  colour.addImage("back",colourImage);
  
  monkey = createSprite(50,350);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground=createSprite(200,380,400,10);
  ground.x = ground.width /2;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score=0;
  
  game = createSprite(200,200);
  game.addImage("over",gameImage);
  game.scale = 0.7;
  game.visible = false;
 
}


function draw() {
  
  background("green");
  
  if (gameState == play){
   colour.velocityX = -3 
   if (colour.x < 100){
      colour.x = colour.width/2;
    }
  monkey.velocityY = monkey.velocityY + 0.8
  if (colour.x < 0){
   colour.x = colour.width/2;
  }
  ground.visible = false;
  food();
  obstacles();
  lives();
    
  }
  
  if(health==0){
    gameState = end
  }
  
  if(mousePressedOver(game)){
     reset();
    } 
  
  monkey.collide(ground);
  
  switch(score){
    case 1: monkey.scale = 0.10;
           break;
    case 2: monkey.scale = 0.12;
           break;
    case 3: monkey.scale = 0.14;
           break; 
    case 4: monkey.scale = 0.16;
           break;       
    default: break;       
  }
  
  if(FoodGroup.isTouching(monkey)){
    score = score+2;
    FoodGroup.destroyEach();
  }
  
  if(keyDown("space")&& monkey.y>=300){
  monkey.velocityY = -15;
  
 }
  
   if(gameState ==end){
    colour.velocityX = 0;
    ground.velocityX=0;
    score = 0;
    monkey.visible = false;
    game.visible = true;
    FoodGroup.destroyEach();  
    obstacleGroup.destroyEach();
  }

  drawSprites();
  
  textSize(20);
  fill("white");
  text("Lives: "+Lives,300,30);
  
  textSize(20);
  fill("white");
  text("Score:"+score,300,60);
   
}


function food(){
  
  if(frameCount % 60 === 0){
    banana = createSprite(200,200);
    banana.scale=0.1;
    banana.addImage("food",bananaImage);
    banana.y=Math.round(random(120,200));
    banana.velocityX = -4;
    banana.lifetime=100;
    FoodGroup.add(banana);
    
}
}


function obstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(200,350);
    obstacle.addImage("hit",obstacleImage);
    obstacle.scale=0.15;
    obstacle.x=Math.round(random(120,400));
    obstacle.velocityX = -4;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  
}
}


function lives(){
  
  if(obstacleGroup.isTouching(monkey)){
    health = health-1;
    obstacleGroup.destroyEach();
    monkey.scale = 0.1;
  }
  
  
  if(health===2){
    Lives = 2;
     }
  
  if(health===1){
    monkey.scale=0.1;
     Lives=1;
     }
  
  if(health===0){
     Lives = 0;
      }
  
}
 
function reset(){
  
  gameState=play;
  monkey.visible=true;
  game.visible=false;
  score=0;
  health=2;
  
}





