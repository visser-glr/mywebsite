window.onload=function(){

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let offset_r = 0;
let offset_g = Math.PI/10;
let offset_b = Math.PI/20;

let offset_y = 0;
let offset_z = 0;
let offset_amp = 0;
let offset_namp = Math.PI/2;

let circle_size = 200; // pixels

let text="<Software_Developer>";

let text_container=document.getElementById('text_container');

for(var i=0;i<text.length;i++){
    let char = text.charAt(i);
    let el = document.createElement('div');
    el.innerHTML=char;
    el.style.display="inline-block";
    text_container.appendChild(el);
}

let text_children =  Array.from(text_container.children);



requestAnimationFrame(loop);

let st_offset = 0;
let su_offset = 0;
function loop(){
    
    st_offset+=.1;
    su_offset+=.01;

    text_children.forEach((el,index)=>{
        let step=index*Math.PI/30
        let step_u=index*Math.PI/360
        let st = Math.sin(st_offset+step)*40;
        let su = Math.sin(su_offset+step_u)*360;
        el.style.transform=`translateY(${st}px) rotateY(${su}deg)`;
       
    })

    offset_r += Math.PI / 150;
    offset_g += Math.PI / 250;
    offset_b += Math.PI / 450;
    offset_y += Math.PI / 1200;
    
    offset_amp += Math.PI / 2600;
    
    
    let step = ((Math.PI * 2) / circle_size);
    
    
    let size= 200

    ctx.clearRect(0,0,size,size)
    // draw screen
    for(let i=0; i<(size*size); i++){
        
        let x = i % size;
        let y = Math.floor(i/size);




        //let n_amp= 6*Math.sin(offset_namp)
        let s_amp = 2*Math.sin(offset_amp+(step * x/2))*2;
        // contoleer amplitude over y
        let ampY = .50 + (Math.sin(offset_y+(step * y)*s_amp));
        // controleer x
        let sr =  (.50 + ((Math.cos(offset_r+(step * x)+ampY))));
        
        let sg =  (.50 + ((Math.cos(offset_g+(step * y)*ampY))));

        let sb =  (.50 + ((Math.cos(offset_b+(step * y)+ampY))));
        //let sz = (.50 + ((Math.cos(offset_z+(step * y)+sx+n_amp))));
        //let brightness = sx;
        //console.log(brightness)

        ctx.fillStyle = `rgba(${sr*255}, ${sg*255},${sb*255})`;
        ctx.fillRect(x, y, 1, 1);
        //led.plotBrightness(x, y, brightness);
        
    }

    requestAnimationFrame(loop);
}
}