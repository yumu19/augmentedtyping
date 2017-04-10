var raySpeed = 12;
var rayLimit = 2000
var rayR = 96;

function ray() {
  this.x1 = 9999;
  this.y1 = 9999;
  this.x2 = 9999;
  this.y2 = 9999;
  this.origX = 9999;
  this.origY = 9999;
  this.theta = 0;

  this.r = 12;
  this.n = 0;
  this.c = " ";
  this.color = color(0,0,0);

  this.launch = function(kc,sc){
    this.n = numByKc(kc);
    this.c = charByKc(kc);
    if (this.n != 0) {
      this.origX = keys[this.n].x + 36;
      this.origY = keys[this.n].y + 36;
      this.x1 = this.origX;
      this.y1 = this.origY;
      this.x2 = this.x1 + rayR * Math.cos(this.theta);
      this.y2 = this.y1 + rayR * Math.sin(this.theta);
      this.speedX = raySpeed * Math.cos(this.theta);
      this.speedY = raySpeed * Math.sin(this.theta);
      this.color = randomColor();
    }
  }

  this.move = function(){
    this.x1 += this.speedX;
    this.y1 += this.speedY;
    this.x2 += this.speedX;
    this.y2 += this.speedY;

    if (((Math.pow((this.x1-this.origX),2)+Math.pow((this.y1-this.origY),2)) > Math.pow(rayLimit,2))||
        ((Math.pow((this.x2-this.origX),2)+Math.pow((this.y2-this.origY),2)) > Math.pow(rayLimit,2)))
    {
      this.moveFar();
    }
  }

  this.display = function(){
    stroke(this.color);
    strokeWeight(2);

    //fill(this.color);
    line(this.x1,this.y1,this.x2,this.y2);
  }

  this.moveFar = function(){
    this.x1 = 9999;
    this.y1 = 9999;
    this.x2 = 9999;
    this.y2 = 9999;
  }

  this.setTheta = function(theta){
    this.theta = theta;
  }
}
