//Create variables here
var dog,happyDog;
var database;
var foodS,foodStock;
var dogImg;
var happyDogImg;

function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20);

  dog = createSprite(250,350,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
}


function draw() {  
  background(46, 139, 87);
  //add styles here
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  
  drawSprites();

  text("Note : Press UP_ARROW key to feed drago milk " ,50,50);
  textSize(20);
  fill("white");
  stroke(5);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    Food : x
  })

}



