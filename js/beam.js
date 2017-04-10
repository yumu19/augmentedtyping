var speed = 12;
var angle = 0;
var beamtype = "full";

function charBeam() {
  this.x = 9999;
  this.y = 9999;
  this.speedX = 0.0;
  this.speedY = 0.0;
  this.n = 0;
  this.screen = " ";
  this.c = " ";
  this.color = color(0,0,0);
  this.launch = function(kc,sc){
    this.n = numByKc(kc);
    this.c = charByKc(kc);
//    console.log(n);
    if (this.n != 0) {
      this.x = keys[this.n].x + 6;
      this.y = keys[this.n].y + 70;
      this.speedX = speed * Math.sin(angle);
      this.speedY = -1.0 * speed * Math.cos(angle);
      this.screen = sc;
      this.color = randomColor();
    }
  }
  this.move = function(){
    this.x += this.speedX;
    this.y += this.speedY;
    if ((this.y < 0)&&(this.screen == "near")) {
      this.moveFar();
    }
    if ((beamtype == "limit")&&(this.y < origY + 25)) {
      this.moveFar();
    }
    //console.log(this.x);
  }
  this.receive = function(x,speedX,speedY,c){
    this.x = x;
    this.y = 800;
    this.speedX = speedX;
    this.speedY = speedY;
    this.c = c;
  }

  this.display = function(){
    textSize(64);
    fill(this.color);

    text(this.c,this.x,this.y);
  }

  this.moveFar = function(){
    var data = {x:this.x, y:this.y, speedX:this.speedX, speedY:this.speedY, char:this.c};
    this.x = 9999;
    this.y = 9999;
    this.screen = "far";
  }
}
