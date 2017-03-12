//var speed = 12;
//var angle = 0;

function particle(v,diffR,radii) {
  this.x = 9999;
  this.y = 9999;
  this.speedX = 0;
  // Math.random() * 0.5*v - v;
  this.speedY = 0;
  //  Math.random() * 0.5*v - v;
  this.n = 0;

  this.r = Math.random() *(55) + 200;
  this.g = Math.random() *(55) + 200;
  this.b = Math.random() *(55) + 200;
  this.color = color(this.r,this.g,this.b);

  this.launch = function(kc){
    this.n = numByKc(kc);
//    console.log(n);
    if (this.n != 0) {
      this.x = keys[this.n].x + 35;
      this.y = keys[this.n].y + 35;
      this.speedX = Math.random()*2.0*v - v;
      this.speedY = Math.random()*2.0*v - v;

      Math.random() * (max - min) + min
      console.log("launchXY",this.x,this.y);
      console.log("launchSpeed",this.speedX,this.speedY);
    }
  }
  this.move = function(){
  //  console.log("moveXY",this.x,this.y);
  //  console.log("movespeed",this.speedX,this.speedY);
    this.x += this.speedX;
    this.y += this.speedY;

    // if ((Math.abs(this.x-keys[this.n].x)>diffR)||(Math.abs(this.y-keys[this.n].y)>diffR)){
    if ((Math.pow((this.x-keys[this.n].x-35),2)+Math.pow((this.y-keys[this.n].y-35),2)) > Math.pow(diffR,2)){
      this.moveFar();
    }
    // if ((this.y < 0)&&(this.screen == "near")) {
    //   this.moveFar();
    // }
    //console.log(this.x);
  }

  this.display = function(){
    noStroke();
    fill(this.color);
    ellipse(this.x,this.y,radii,radii);
    //console.log("display",this.x,this.y);
  }

  this.moveFar = function(){
    this.x = 9999;
    this.y = 9999;
    this.speedX = 0;
    this.speedY = 0;
  }
}
