/**
 * Created by benjamin on 10.10.15.
 */
var pid;
var client;
var model;
var leftUp = 34, leftDown = 44, rightUp = 35, rightDown = 45; //Koordinaten auf regelm��igem virtuellem Tisch
var direction = 0;
var red, green, blue;

//Koordinaten an den Tisch angepasst
var tableLU = leftUp
var tableLD = leftDown
var tableRU = rightUp
var tableRD = rightDown;

function convertValue(x){
    var y=(Math.floor(x/10))*10+(10-(x%10+1));
    return y;
}
function nearEdge(){
    if(leftUp<10||leftUp%10==0){
        if(leftUp==0){
            newDirection = 3; //nach rechts unten da Kasten links oben in Ecke
        }else{
            if(leftUp<10){ //Fallunterscheidung oben oder links
                switch (direction){ //Fall obere Kante
                    case 0:
                        direction = 3;
                        break;
                    case 1:
                        direction = 2;
                        break;
                }
            }else{
                switch (direction){ //Fall linke Kante
                    case 0:
                        direction = 1;
                        break;
                    case 3:
                        direction = 2;
                        break;
                }
            }
        }
    }else{
        if(rightDown%10==9||rightDown>=70){
            if(rightDown==79){
                newDirection = 0; //nach links oben da Kasten rechts unten in Ecke
            }else{
                if(rightDown%10==9){ //Fallunterscheidung rechts oder unten
                    switch (direction){ //Fall rechte Kante
                        case 1: direction = 0;
                            break;
                        case 2: direction = 3;
                            break;
                    }
                }else{
                    switch (direction){ //Fall untere Kante
                        case 3: direction = 0;
                            break;
                        case 2: direction = 1;
                            break;
                    }
                }
            }
        }
    }
}
function moveStep(){
    switch (direction){ //Bewegung abh�ngig von Richtung
        case 0:
            leftUp = leftUp - 11;
            break;
        case 1:
            leftUp = leftUp - 9;
            break;
        case 2:
            leftUp = leftUp + 11;
            break;
        case 3:
            leftUp = leftUp + 9;
            break;
        default: //hier will ich nie hinkommen, quasi Error
            break;
    }

    //andere Punkte in Bezug auf linke obere Ecke berechnen
    leftDown = leftUp + 10;
    rightUp = leftUp + 1;
    rightDown = leftUp + 11;
}


draw = function() {

    client.setPixel(0,red/3,green/3,blue/3);
    client.setPixel(9,red/3,green/3,blue/3);
    client.setPixel(70,red/3,green/3,blue/3);
    client.setPixel(79,red/3,green/3,blue/3);

    //alten Kasten nachleuchten lassen
    client.setPixel(tableLU,red/3,green/3,blue/3);
    client.setPixel(tableLD,red/3,green/3,blue/3);
    client.setPixel(tableRU,red/3,green/3,blue/3);
    client.setPixel(tableRD,red/3,green/3,blue/3);

    //Neue Richtung bestimmen
    nearEdge();

    //Bewegung ausf�hren
    moveStep();


    //Koordinaten an eigentliches Tisch-Layout anpassen
    if((Math.floor(leftUp/10))%2==0){
        tableLU = convertValue(leftUp);
        tableRU = convertValue(rightUp);
        tableLD = leftDown;
        tableRD = rightDown;
    }else{
        tableLD = convertValue(leftDown);
        tableRD = convertValue(rightDown);
        tableLU = leftUp;
        tableRU = rightUp;
    }

    //neuen Kasten setzen und schreiben auf Tisch
    client.setPixel(tableLU,red,green,blue);
    client.setPixel(tableLD,red,green,blue);
    client.setPixel(tableRU,red,green,blue);
    client.setPixel(tableRD,red,green,blue);
    client.writePixels();

    //Farb�nderungen
    if(red < 255){
        red++;
    }else{
        red = 10;
    }

    if(green <= 3){
        green = 255;
    }else{
        green = green - 3;
    }

    if(blue*1.15 > 255){
        blue = 5;
    }else{
        blue = blue * 1.15;
    }


}

module.exports = {
    init: function(cli, mod) {
        client = cli;
        model = mod;
    },
    start: function() {
        pid = setInterval(draw, 400);

        red = 100;
        green = 100;
        blue = 100;
    },
    stop: function() {
        clearInterval(pid);
    },
    update: function() {

    }
};


