var wall,wallimage;
var door,doorimage,doorGroup;
var rail,railimage,railGroup;
var ghost,ghostimage;
var invblk,invblkGroup;
var gamestate = "play";
var song;
var score;

function preload(){
  
  wallimage = loadImage("tower.png")
  
  doorimage = loadImage("door.png")
  railimage = loadImage("climber.png")
  ghostimage = loadImage("ghost-standing.png")
  song = loadSound("spooky.wav")
}

function setup(){
  
  createCanvas (600,600)
  
  song.loop(); 
  score = 0
  
  wall = createSprite(300,300)
  wall.addImage("wall",wallimage) 
  wall.velocityY = 2
  
   
  doorGroup = new Group();
  railGroup = new Group();
  invblkGroup = new Group();
  
  ghost = createSprite(200,200,50,50)
  ghost.addImage("g",ghostimage)
  ghost.scale = 0.4
  
}


function draw(){
  
  
  background (0)
 
  
  if(gamestate === "play"){
  
  if (wall.y>400){
    wall.y = 300
}

  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3
  }
   if(keyDown("right_arrow")){
    ghost.x = ghost.x+3
  }
  
  if(keyDown("space")){
   ghost.velocityY = -5
  }
  ghost.velocityY =  ghost.velocityY+0.5
  
  if(railGroup.isTouching(ghost)){
    ghost.velocityY = 0
  }
  if(invblkGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
  gamestate = "end"  
  }
  
  
  spawnDoors();
  
  drawSprites()
  }
if(gamestate === "end"){
  
  stroke("red")
  fill("red")
  textSize(30)
  text("GAME OVER",230,270)
}
   stroke("yellow")
  fill("yellow")
  textSize(20)
  text("score = "+score,450,20)
  
  score = score + Math.round(getFrameRate)
  
}

function spawnDoors(){
  
  if(frameCount%200 === 0  ){
  door = createSprite(200,-50)  
  door.addImage(doorimage)
    
 rail = createSprite(200,10) 
  rail.addImage(railimage) 
    
    invblk = createSprite(200,15)
    invblk.width = rail.width
    invblk.height = 2
    
    
    door.x = Math.round(random(150,450)) 
  door.velocityY = 2
    
    rail.x = door.x
    rail.velocityY = 2
     
    invblk.x = door.x
    invblk.velocityY = 2
    
   invblk.debug = true
    invblkGroup.add(invblk)
    
    ghost.depth = door.depth
    ghost.depth = ghost.depth+1
    
    door.lifetime = 650
    rail.lifetime = 650
    invblk.lifetime = 650
    
    doorGroup.add (door)
    railGroup.add (rail)
    
    
    
  }
  
}



















