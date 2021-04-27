var steve, steve_animation;
var mob, mob_animation;
var bgimg;
var dragon, dragonimg;
var dragonball, dragonballimg;

var ground;

var trident,tridentimg;
var PLAY=1;
END = 0;
WIN = 2
var gameState = PLAY;
score = 0;
health = 100;
function preload()
{
  steve_animation=loadAnimation("images/steve1.png","images/steve2.png","images/steve3.png")
  mob_animation = loadAnimation("images/mob1.png","images/mob2.png")
  bgimg= loadImage("images/background.png")
  tridentimg = loadImage("images/trident.png");
  dragonimg = loadImage("images/dragon.png")
  dragonballimg = loadImage("images/breath.png");

}
function setup()
 {
  createCanvas(1000,500);

  mobgroup = new Group();
  tridentgroup = new Group();
  ballgroup = new Group();

  bg=createSprite(500,250,1000,500);
  bg.addImage(bgimg);

  ground = createSprite(width/2,510,width,30);
  ground.visible=false;

  steve= createSprite(850, 465, 50, 50);
  console.log(steve.y)
  steve.addAnimation("steve",steve_animation);
  steve.scale = 0.2;

  steve.velocityY = steve.velocityY + 0.5;

  dragon = createSprite(150,180);
  dragon.addImage(dragonimg);
  dragon.scale = 0.3;

     

}

function draw()
 {

  background("pink");  

 
  if(gameState===PLAY)
  {
    spawnMobs();
    dragonBall();

    ballgroup.bounceOff(ground);

    if(mousePressedOver(bg))
    {
      console.log("clicked")
      spawnTrident();
    }

    if(tridentgroup.isTouching(mobgroup))
    {
      mobgroup[0].destroy();
      tridentgroup.destroyEach();
      score = score + 10;
    }

    if(keyDown("LEFT_ARROW"))
    {
      steve.x=steve.x - 5;
    }
    
    if(keyDown("RIGHT_ARROW"))
    {
      steve.x=steve.x + 5;
    }

    if(ballgroup.isTouching(steve))
    {
      health = health - 5;
    }
    if(mobgroup.isTouching(steve))
    {
      health = health - 10;
    }

    if(health===0)
    {
      gameState = END;
    }

    if(score===100)
    {
      gameState = WIN;
    }

    drawSprites();
     
  }
  else if(gameState === END)
  {
      background("black");
      textSize(50);
      fill("yellow"); 
      text("YOU LOST THE GAME ..!",200,225);

  }
  else if(gameState === WIN)
  {
      background("black");
      textSize(50);
      fill("yellow"); 
      text("STEVE WON THE GAME ..!",200,225);
  }

  
  steve.collide(ground);

  //textSize(30);
  //text("x : "+mouseX+"y : "+mouseY,mouseX,mouseY)

  fill("white");
  textSize(30);
  text(" SCORE : "+score,805,50);
  text(" HEALTH : "+health,800,80);


}

function spawnMobs()
{
  if(frameCount%100===0)
  {
    mob=createSprite(50, 440, 50, 50);
    mob.addAnimation("mob",mob_animation);
    mob.scale = 0.2;
    mob.velocityX = 3;
    mobgroup.add(mob);
  }
}

function spawnTrident()
{
  trident= createSprite(steve.x-30, steve.y, 50 , 50);
  trident.addImage(tridentimg);
  trident.scale = 0.25;
  trident.velocityX =-6;
  tridentgroup.add(trident);
}

function dragonBall()
{
  if(frameCount%50===0)
  {
      dragonball = createSprite(230,225);
      dragonball.addImage(dragonballimg);
      dragonball.scale = 0.2;
      dragon.depth = dragonball.depth;
      dragon.depth = dragon.depth + 1;

      
      num = random(-10,40);
      num2 = random(-10,40)


      dragonball.velocityX = num;
      dragonball.velocityY = num2;

      ballgroup.add(dragonball);


  }
}

