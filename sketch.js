var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood,feedMyDog;
var foodObj,lastFed,feed;



function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedMyDog=createButton("Feed The Dog")
  feedMyDog.position(700,95)
  feedMyDog.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  let lastFed = hour()
  fill("black")
  if(lastFed>=12){
     text("Last Feed : "+ lastFed%12 + " PM", 350,30);
 
  }else if (lastFed<=12){
    text("Last Feed : "+ lastFed + " AM", 350,30);
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  foodS--;
  database.ref('/').update({
    Food:foodS
  })
}

//function to add food in stock
function addFoods(){
  dog.addImage(sadDog)
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
