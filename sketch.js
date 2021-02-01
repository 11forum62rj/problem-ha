var dog; 
var happyDog;
var database;
var foodS;
var foodStock;
var feedDog;
var addFoods;
var fedTime;
var lastFed
var FoodObj

function preload(){
  dogImg = loadImage("Dog.png");
  dogHappy = loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);


      database = firebase.database();
   dog = createSprite(250,300,10,10);
   dog.addImage(dogImg);
   dog.scale = 0.2;

   foodStock = database.ref('Food');
   foodStock.on("value",readStock);

   feed = createButton("Feed the dog");
   feed.position(700,95);
   feed.mousePressed(feedDog);

   addFood =createButton("Add food");
   addFood.position(800,95);
   addFood.mousePressed(addFoods);


}


function draw() {  
  background(46,139,87);
   fill(255,255,254);
   stroke("black");
   text("Food Remaining: "+foodS,170,200);
   
   fill(255,255,254);
   textSize(15);
   if(lastFed>=12){
     text("Last Feed :" + lastFed%12 + " PM",350,30)
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + "AM",350,30);
   }
   fedTime = database.ref(' Feed Time');
   fedTime.on("value",function(data){
     lastFed = data.val();
   })
   

  

  drawSprites();
 }




 function readStock(data){
   foodS = data.val();
 }

 function writeStock(x){
   if(x<=0){
      x=0
   }else{
     x=x-1;
   }
   database.ref('/').update({
     Food:x
   })
 

 function addFood(){
 if(mousePressedOver(addFoods)){
   foodS++;
   database.ref('/').update({
     Food:foodS
   })

 }
 }

 function feedDog(){
   if(mousePressedOver(feedDog)){
      dog.addImage(happyDog);
      milk.y= dog.y-40
      FoodObj.updateFoodStock(FoodObj.getFoodStock()-1);
      database.ref('/').update({
        Food:FoodObj.getFoodStock(),
        FeedTime:hour()
      })
   } 
 }

 
  }



