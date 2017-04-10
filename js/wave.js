var angle = 0;
var waveLimit = 360;
var waveSpeed = 6;

function wave() {
  this.x = 9999;
  this.y = 9999;
  this.r = 1;
  this.n = 0;
  this.c = " ";
  this.color = color(0,0,0);
  this.hidden = true;

  this.launch = function(kc,sc){
    this.hidden = false;
    this.n = numByKc(kc);
    this.c = charByKc(kc);
    if (this.n != 0) {
      this.x = keys[this.n].x + 36;
      this.y = keys[this.n].y + 36;
      this.color = randomColor();
    }
  }

  this.diffuse = function(){
    if (!this.hidden) {
      this.r += Number(waveSpeed);
      console.log(waveSpeed);
      console.log(this.r);
      if (this.r > waveLimit){
        this.moveFar();
        console.log("move far");
      }
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
    this.r = 4;
    this.hidden = true;
  }

  this.setR = function(r){
    this.r = r;
  }

}
