import React from "react";
import "./TiltCodeGen.css";

const tiltCodeGen = (props)=>{
    if(document.getElementById('tilt')){

        var canvas = document.getElementById('tilt');
        var ctx = canvas.getContext("2d");

        canvas.width = 500;
        canvas.height = 500;
        ctx.font = '25px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        var scale = {
        h: canvas.height/20,
        v: canvas.width/20
        };
        var text = {
        h: props.horiCode,
        v: 'You look like an idiot right now'
        };



        function update() {
            ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
            ctx.fillStyle = "#000";
            
        ctx.save();
        ctx.scale(1, scale.h);
        ctx.fillText(text.h, canvas.width/2, canvas.height/scale.h/2);
        ctx.restore();
        
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(Math.PI/2);
        ctx.translate(-canvas.width/2, -canvas.width/2);
        ctx.scale(1, scale.v);
        ctx.fillText(text.v, canvas.width/2, canvas.height/scale.v/2);
        ctx.restore();
        }



        // document.getElementById('hText').oninput = function() {
        // text.h = this.value;
        // update();
        // };

        // document.getElementById('vText').oninput = function() {
        // text.v = this.value;
        // update();
        // };

        update();
    }
    return(
        <canvas id="tilt"></canvas>
    );
}

export default tiltCodeGen;