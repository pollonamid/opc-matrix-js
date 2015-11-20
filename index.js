/**
 * Created by pollonamid on 11/19/2015.
 */
var opc = new require('./opc');
var client;
var model;

var animations = require('require-all')(__dirname + '/animations');
var running = 'off';

var init = function() {
    for (var ans in animations) {
        if (animations.hasOwnProperty(ans)) {
            animations[ans].init(client, model);
        }
    }
};

module.exports = {
    setup: function(host, port, modelpath) {
        client = new opc(host, port, modelpath);
        console.log(opc);
        model = opc.getModel();
        init();
    },
    start: function(animation){
        if(running != 'off'){
            animations[running].stop();
        }
        running = animation;
        animations[running].start();
    },
    stop: function(){
        animations[running].stop();
        running = 'off';
    },
    update: function(animation, data){
        animations[animation].update(data);
    }
};



