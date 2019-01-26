var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ball = {
	x:320,
	dx:4,
	y:240,
	dy:4,
	r:5,
	color: "white",
	draw:function(ctx){
		ctx.beginPath();	
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
		ctx.fillStyle = this.color;
		ctx.fill();
	},
	move:function(width, height){
		this.x = this.x + this.dx;
		if(this.x > 635){
			this.dx = -this.dx;
            points1++;
	}
		if(this.x < 5){
			this.dx = -this.dx;
            points2++;
	}	
		this.y = this.y + this.dy;
		if(this.y > 475){
			this.dy = -this.dy;
	}	if(this.y < 5){
			this.dy = -this.dy;
	}
	}	
},
pad1 = {
	y:215,
	x:10,
	dy:0,
    height:50,
	draw:function(ctx){
		ctx.beginPath();
		ctx.fillStyle="white";
		ctx.fillRect(this.x,this.y,5,50);
	},
	move:function(height){
		this.y = this.y + this.dy;
			if(this.y > height-50){
				this.y = height-50;
			}
			if(this.y < 0){
				this.y=0;
			}
	},
    shot:function(ball){
		if((ball.dx < 0) && (ball.x <= (this.x+5 + ball.r))){
			if((ball.y >= this.y) && (ball.y <= this.y+this.height)){
				ball.dx = -ball.dx;
                audio1.pause();
                audio1.currentTime=0;
                audio1.play();
                
			}	
			}
			
		}
},
pad2 = {
	y:215,
	x:625,
	dy:0,
    height:50,
	draw:function(ctx){
		ctx.beginPath();
		ctx.fillStyle="white";
		ctx.fillRect(this.x,this.y,5,50);
	},
	move:function(height){
		this.y = this.y + this.dy;
			if(this.y>height-50){
				this.y = height-50;
			}
			if(this.y<0){
				this.y=0;
			}
	},
    shot:function(ball){
		if((ball.dx > 0) && (ball.x >= (this.x - ball.r))){
			if((ball.y >= this.y) && (ball.y <= this.y+this.height)){
				ball.dx = -ball.dx;
                audio1.pause();
                audio1.currentTime=0;
                audio1.play();
			}	
			}
			
		}
    
}

points1 = 0;
points2 = 0;
function drawball(){	
	ctx.fillStyle="black";
	ctx.fillRect(0,0,640,480);
    
    ctx.beginPath();
    ctx.moveTo(320,0);
    ctx.lineTo(320,480);
    ctx.strokeStyle="white";
    ctx.setLineDash([10,5]);
    ctx.stroke();
    
    ctx.fillStyle="gray";
    ctx.font="200px Arial";
    ctx.fillText(points2,380,300);
    ctx.fillText(points1,80,300);
    
    
	ball.draw(ctx);
	ball.move(640,480);
	
	pad1.draw(ctx);
	pad1.move(480);
	pad1.shot(ball);
	
	pad2.draw(ctx);
	pad2.move(480);
    pad2.shot(ball);
	

};
setInterval(drawball,20);

function keydown(e){
	var key = e.which;
	document.title = key;
	if(key==90){
		pad1.dy=5;
	}if(key==65){
		pad1.dy=-5;
	}
	if(key==40){
		pad2.dy=5;
	}
	if(key==38){
		pad2.dy=-5;
	}
};

function keyup(e){
	var key = e.which;
	document.title = key;
	if((key==90) && (pad1.dy>0)){
		pad1.dy=0;
	}
	if((key==65) && (pad1.dy<0)){
		pad1.dy=0;
	}
	if((key==40) && (pad2.dy>0)){
		pad2.dy=0;
	}
	if((key==38) && (pad2.dy<0)){
		pad2.dy=0;
	}
};

document.body.addEventListener("keydown",keydown);
document.body.addEventListener("keyup",keyup);
var audio1 = document.createElement("audio");
audio1.src="gunshot.mp3";
document.body.appendChild(audio1);