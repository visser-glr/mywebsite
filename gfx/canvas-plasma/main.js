window.onload=function(){

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let offset_r = 0;
let offset_g = Math.PI/10;
let offset_b = Math.PI/20;

let offset_y = 0;
let offset_amp = 0;

let circle_size = 250; // pixels

loop();

function loop(){
    
    offset_r += Math.PI / 150;
    offset_g += Math.PI / 250;
    offset_b += Math.PI / 450;
    offset_y += Math.PI / 1200;
    
    offset_amp += Math.PI / 2600;
    
    let step = ((Math.PI * 2) / circle_size);
    
    let size= 100;

    // draw screen
    for(let i=0; i<(size*size); i++){
        
        let x = i % size;
        let y = Math.floor(i/size);

        let s_amp = 2*Math.sin(offset_amp+(step * x/2))*2;
        // contoleer amplitude over y
        let ampY = .50 + (Math.sin(offset_y+(step * y)*s_amp));
    
        let sr =  (.50 + ((Math.cos(offset_r+(step * x)+ampY))));
        let sg =  (.50 + ((Math.cos(offset_g+(step * y)*ampY))));
        let sb =  (.50 + ((Math.cos(offset_b+(step * y)+ampY))));
       

        ctx.fillStyle = `rgba(${sr*255}, ${sg*255},${sb*255})`;
        ctx.fillRect(x, y, 1, 1);
        
    }

    requestAnimationFrame(loop);
}
}