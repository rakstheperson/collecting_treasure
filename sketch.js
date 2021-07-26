var path,boy,cash,diamonds,jewelry,sword;
var pathImage,boyImage,cashImage,diamondsImage,jewelryImage,swordImage,endImage;
var treasureCollection = 0;
var cashG,diamondsG,jewelryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImage = loadImage("Road.png");
  boyImage = loadAnimation("Runner-1.png","Runner-2.png");
  cashImage = loadImage("cash.png");
  diamondsImage = loadImage("diamonds.png");
  jewelryImage = loadImage("jwell.png");
  swordImage = loadImage("sword.png");
  endImage =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImage);
path.velocityY = 4;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImage);
boy.scale=0.08;

end = createSprite(200,300);
end.addAnimation("gameOver", endImage)
end.scale=0.5;
end.visible = false;
  
cashG=new Group();
diamondsG=new Group();
jewelryG=new Group();
swordGroup=new Group();
}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJewelry();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection+100;
    }
    else if(jewelryG.isTouching(boy)) {
      jewelryG.destroyEach();
      treasureCollection = treasureCollection + 150;
    }
    else {
      if(swordGroup.isTouching(boy)) {
        gameState = END;
        boy.addAnimation("SahilRunning")
        end.visible = true;
        boy.x = width/2;
        boy.y = height/2;
        
        cashG.destroyEach();
        cashG.setVelocityEach(0);
        
        diamondsG.destroyEach();
        diamondsG.setVelocityEach(0);
        
        jewelryG.destroyEach();
        jewelryG.setVelocityEach(0);
        
        swordGroup.destroyEach();
        swordGroup.setVelocityEach(0);
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  stroke("black");
  strokeWeight(3);
  text("Treasure: "+ treasureCollection,width-150,30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImage);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImage);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJewelry() {
  if (World.frameCount % 410 == 0) {
  var jewelry = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jewelry.addImage(jewelryImage);
  jewelry.scale=0.13;
  jewelry.velocityY = 3;
  jewelry.lifetime = 150;
  jewelryG.add(jewelry);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImage);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}