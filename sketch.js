var meteorImg, meteor, meteorgroup;
var gameState = "play"
var score;
var width, height;


function preload(){
  
  
  planetImg = loadImage("minor-planets.jpeg")
  rocketImg = loadImage("rocket.png")
  spookySound = loadSound("spooky.wav");
  meteorImg = loadImage("meteor.png")
  
  
}

function setup(){
  
  width =  displayWidth ;
  height = displayHeight;
  createCanvas(width,height);
  spookySound.loop();
  planet = createSprite(width/2,height/2,width,height);
  planet.addImage("planet",planetImg);
  planet.velocityY = 1;
    
  meteorGroup = new Group();
  score = 0
  
  rocket= createSprite(100,200,50,50);
  rocket.scale = 0.1;
  rocket.addImage("rocket", rocketImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      rocket.x = rocket.x - 3;
    }
    
    if(keyDown("right_arrow")){
      rocket.x = rocket.x + 3;
    }
    
    if(keyDown("up_arrow")){
      rocket.velocityY = -10;
    }
    
    rocket.velocityY = rocket.velocityY + 0.8
    
    if(planet.y > 400){
    planet.y = 300
    }
    spawnMeteor();

    
    
    if(meteorGroup.isTouching(rocket) || rocket.y > 600){
      rocket.destroy();
      gameState = "end"
      
    }
    else
      {
        score = score + 1;
      }
    
       
    
    drawSprites();
        
  textSize(20);
  fill("white");
  stroke("white");
  text("Score: "+ score ,displayWidth/2 ,50);
  console.log (displayWidth/2)
    
  }
  
  if (gameState === "end"){
    stroke("red");
    fill("red");
    textSize(30);
    text("Game Over", displayWidth/2 -20,250)
    
    textSize(20);
    stroke("yellow");
    fill("white");
    text("Press Space to Restart the game!", displayWidth/2 -100,150);
  
  textSize(20);
  fill("white");
  stroke("white");
  text("Score: "+ score ,displayWidth/2 ,50);
        
    if(keyDown("space")) {
      reset();
    }

  }
  

}

function spawnMeteor() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    meteor = createSprite(150,50,50,50);
    meteor.scale = 0.1;
    
    meteor.x = Math.round(random(width/2,400));
    
    meteor.addImage(meteorImg);
    meteor.velocityY = 4;
    
    
    
    rocket.depth = meteor.depth;
    rocket.depth +=1;
   
    //assign lifetime to the variable
    meteor.lifetime = 800;
    
    //add each meteor to the group
    meteorGroup.add(meteor);
    
  }
    
}

function reset(){
  gameState = "play";
  meteorGroup.destroyEach();
  planet.destroy();
  rocket.destroy();
  score = 0;
  setup();
}

