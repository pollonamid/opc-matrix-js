/**
 * Created by pollonamid on 09.10.15.
 */
var pid;
var client;
var model;
var bpm = 500;
var diff = 60000 / bpm / 2;
var on = false;
var r = 255, g = 255, b = 255;


draw = function() {
    if(on){
        for (var pixel = 0; pixel < model.length; pixel++) {
            client.setPixel(pixel, 0, 0, 0);
        }
    }
    else {
        for (var pixel = 0; pixel < model.length; pixel++) {
            client.setPixel(pixel, r, g, b);
        }
    }
    on = !on;
    client.writePixels();
};



module.exports =  {
    init: function(cli, mod) {
        client = cli;
        model = mod;
    },
    start: function() {
        draw();
        pid = setInterval(draw, diff);
    },
    stop: function() {
        clearInterval(pid);
    },
    update: function(data) {
        var obj = JSON.parse(data);
        console.log(data);
        r = obj.red;
        g = obj.green;
        b = obj.blue;
    }
};