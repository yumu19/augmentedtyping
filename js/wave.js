var speed = 12;
var angle = 0;
var limitR = 360;

function wave() {
  this.x = 9999;
  this.y = 9999;
  this.diffspeed = 6;
  this.r = 1;
  this.n = 0;
  this.c = " ";
  this.color = color(0,0,0);

  this.launch = function(kc,sc){
    this.n = numByKc(kc);
    this.c = charByKc(kc);
    if (this.n != 0) {
      this.x = keys[this.n].x + 36;
      this.y = keys[this.n].y + 36;
      this.color = randomColor();
    }
  }

  this.diffuse = function(){
    this.r += this.diffspeed;
    if (this.r > limitR){
      this.moveFar();
    }
  }


  this.display = function(){
    stroke(this.color);
    strokeWeight(2);
    noFill();
    //fill(this.color);
    ellipse(this.x,this.y,this.r,this.r);
  }

  this.moveFar = function(){
    this.x = 9999;
    this.y = 9999;
    this.r = 1;
  }

  this.setR = function(r){
    this.r = r;
  }

}
