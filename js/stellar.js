var stellarR = 96;
var stellarStartRange = 20;
var stellarDuration = 4;
var TWO_PI = 2 * Math.PI;
var delta = TWO_PI / 100;
var stellarSize = 12;

function stellar() {
  this.x = 9999;
  this.y = 9999;
  this.origX = 9999;
  this.origY = 9999;
  this.startTime = 9999;
  this.endTime = 9999;
  this.count = 0;
  this.hidden = true;

  this.r = 12;
  this.n = 0;
  this.c = " ";

  this.launch = function(kc,sc){
    this.n = numByKc(kc);
    this.c = charByKc(kc);
    if (this.n != 0) {
      this.count = 0;
      this.origX = keys[this.n].x + 36;
      this.origY = keys[this.n].y + 36;
      this.x = this.origX + (Math.random()-0.5) * stellarR;
      this.y = this.origY + (Math.random()-0.5) * stellarR;
      this.width = stellarSize + 8*(Math.random()-0.5);
      this.height = this.width*1.4
      // var timeA = Math.random()*stellarDuration;
      // var timeB = Math.random()*stellarDuration;
      // if (timeA < timeB){
      //   this.startTime = timeA;
      //   this.endTime = timeB;
      // } else {
      //   this.startTime = timeB;
      //   this.endTime = timeA;
      // }
      this.startTime = Math.random()*stellarStartRange;
      this.endTime = this.startTime + stellarDuration;
    }
  }

  this.proceed = function(){
    this.count += 1;
    if (this.count > this.startTime){
      this.hidden = false;
    }
    if (this.count > this.endTime) {
      this.moveFar();
    }
  }

  this.display = function(){
    if (!this.hidden){
      stroke(c);
      noFill();
      //fill(this.color);
      // ellipse(this.x,this.y,10,10);

      beginShape();
      for (var t = 0; t < TWO_PI; t += delta) {
          vertex(this.x + this.width * Math.pow(Math.cos(t), 3), this.y + this.height * Math.pow(Math.sin(t), 3));
      }
      endShape(CLOSE);
    }
  }

  this.moveFar = function(){
    this.hidden = true;
    this.x = 9999;
    this.y = 9999;
    this.count = 0;
  }

}
