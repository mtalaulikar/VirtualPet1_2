//Create variables here
var dog, happyDog, foodS, foodStock, database;
function preload()
{
	//load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
  houseImage = loadImage("images/house.jpg")

}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(400,400);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  database = firebase.database();
  console.log(database);
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
  
}


function draw() {  
  background(houseImage);
  if(keyWentDown(UP_ARROW)){
    foodS = foodS - 1;
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImage);
  }

 // dog.addImage(dogImage);
  drawSprites();
  //add styles here
  textSize(18);
  fill ("red");
  text("Press and hold UP ARROW key to feed the dog", 50, 20);
  text("Food Remaining : " + foodS, 50, 40);

}

function readStock(data){
  foodS = data.val();
  console.log(foodS);

}

function writeStock(x){
  database.ref('/').update({
    Food : x
  })
}



