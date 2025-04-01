var to_x=0;
var to_y=0;
var sx=0;
var csize=400



/////////////////////////////////
// class Dot
/////////////////////////////////
class Dot{
    constructor(ctx,depth){
        this.depth=depth;
        
        this.ssx=((Math.PI*2)/360)*Math.random()*360;
        this.ssy=((Math.PI*2)/360)*Math.random()*360;

        let offset_size=120;
        this.max_depth=100;
        this.offsetX=-(offset_size*.5)+Math.random()*offset_size;
        this.offsetY=-(offset_size*.5)+Math.random()*offset_size

        this.speed=(.1)+Math.random()/20;
        this.ctx=ctx;
        this.x=-offset_size;//-1000+Math.random()*(csize*.5);
        this.y=-offset_size;//-1000+Math.random()*(csize*.5);
        this.depth+=1;
        if(this.depth<this.max_depth){
            this.next=new Dot(ctx,this.depth);
        }
       
    }
  
    update(to_x,to_y){
        this.x = this.x - (this.x-to_x)*this.speed;
        this.y = this.y - (this.y-to_y)*this.speed;
        let brightness= 1 - ((1/this.max_depth)*this.depth);
        let size= 2 - ((2/this.max_depth)*this.depth);
        let yellow = 255 - (125*brightness)
        this.ctx.fillStyle = `rgba(255,${yellow},0,${brightness})`;

        this.ssx+=.01;
        this.ssy+=.01;
        this.sx = Math.sin(this.ssx)*this.offsetX;
        this.sy = Math.sin(this.ssy)*this.offsetY;

       

        this.ctx.fillRect(this.x+this.sx, this.y+this.sy, size,size);
        
        if(this.next){
            this.next.update(this.x,this.y)
        }
    }

}

/////////////////////////////////
// setup
/////////////////////////////////


let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
ctx.fillStyle = 'rgba(0,0,0,1)';
ctx.fillRect(0,0,csize,csize);

ctx.globalCompositeOperation = "hard-light";

window.count=0;
let x = 0;
let y = 0;



let dots=[]
for(var i=0;i<100;i++){
    let d=new Dot(ctx,0);
    dots.push(d);
}


let t = 0;

function loop(){
    t++;

    if(t % 4 == 1){
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
    }
    
    
    ctx.fillRect(0,0,csize,csize);

    sx+=.005;

    to_x=(csize*.5)+Math.sin(sx*2)*(csize*.5)
    to_y=(csize*.5)+Math.cos(sx)*(csize*.5)
    
    dots.forEach((dot)=>{
        dot.update(to_x,to_y)
        
    })
    
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);




