/**
 * Created by benjamin on 08.10.15.
 */
var pid;
var client;
var model;
var r = 255, g = 255, b = 255;

var draw = function() {
    for (var pixel = 0; pixel < model.length; pixel++)
    {
        client.setPixel(pixel, r, g, b);
    }
    client.writePixels();
};

module.exports = {
    init: function(cli, mod) {
        client = cli;
        model = mod;
    },
    start: function() {
        draw();
        pid = setInterval(draw, 10);
    },
    stop: function() {
        clearInterval(pid);
        for (var pixel = 0; pixel < model.length; pixel++)
        {
            client.setPixel(pixel, 0, 0, 0);
        }
        client.writePixels();
    },
    update: function(data) {
        var obj = JSON.parse(data);
        console.log(data);
        r = obj.red;
        g = obj.green;
        b = obj.blue;
    }
};