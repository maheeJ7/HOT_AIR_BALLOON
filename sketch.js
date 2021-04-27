var ball,position;
var database;

function setup(){
    createCanvas(500,500);
    database=firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    
    var ballPosition = database.ref('ball/position');
    ballPosition.on('value',readPosition);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();

    if(keyDown(UP_ARROW)){
        updateHeight(0,-10);
        balloon.addAnimation("hotAirBalloon",balloonImage2);
        balloon.scale = balloon.scale - 0.01;
    }

    if(keyDown(DOWN_ARROW)){
        updateHeight(0,10);
        balloon.addAnimation("hotAirBalloon",balloonImage2);
        balloon.scale = balloon.scale - 0.01;
    }

    if(keyDown(RIGHT_ARROW)){
        updateHeight(10,0);
        balloon.addAnimation("hotAirBalloon",balloonImage2);
        balloon.scale = balloon.scale - 0.01;
    }

    if(keyDown(LEFT_ARROW)){
        updateHeight(-10,-10);
        balloon.addAnimation("hotAirBalloon",balloonImage2);
        balloon.scale = balloon.scale - 0.01;
    }
}

function changePosition(x,y){
    database.ref('ball/position').set({
        x:position.x+x,
        y:position.y+y
    });
}

function readPosition(data){
    position = data.val();
    ball.x=position.x;
    ball.y=position.y;
}

function updateHeight(x,y){
    database.ref('ball/height').set({
        'x' : Height.x + x,
        'y' : Height.y + y
    }
}

function readHeight(data){
    height = data.val();
    balloon.x = height.x;
    balloon.y = height.y;
}

function showError(){
    console.log("Error in writing to the database");
}