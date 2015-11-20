/**
 * Created by benjamin on 08.10.15.
 */
var pid;
var OPC = new require('../opc.js');
var client;
var model;

draw = function() {
    var time = 0.004 * new Date().getTime();
    var numParticles = 100;
    var particles = [];

    for (var i = 0; i < numParticles; i++) {
        var s = i / numParticles;

        var radius = 0.2 + 1.5 * s;
        var theta = time + 0.04 * i;
        var x = radius * Math.cos(theta);
        var y = radius * Math.sin(theta + 10.0 * Math.sin(theta * 0.15));
        var hue = time * 0.01 + s * 0.2;

        particles[i] = {
            point: [x, 0, y],
            intensity: 1,
            falloff: 60,
            color: OPC.hsv(hue, 0.5, 0.8)
        };
    }

    client.mapParticles(particles, model);
};

module.exports = {
    init: function(cli, mod) {
        client = cli;
        model = mod;
    },
    start: function() {
        draw();
        pid = setInterval(this.draw, 10);
    },
    stop: function() {
        clearInterval(pid);
    },
    update: function() {

    }
};



