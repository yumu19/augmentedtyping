var k;
var kc;
var prevKc;
var x,y,w,h;
var dipX = 17;
var dipY = 17;
var origX = 20;
var origY = 300;
var keys = [];
var c;
var offsetX = 2;
var offsetY = 60;
var word = "";
var words = new Array();
var wordArray = [];
var currentWord;
var wordSize = 128;
var wordY = 200;
var screenX = 1280;
var screenY = 800;
var wordPointer;
var currentChar;
var currentCharCode;
var currentCharNum;

var nodeNum = 20;
var nodes = [];
var linkNum = nodeNum -1;
var links = [linkNum];
var smallR = 20;
var largeR = 60;
var lastNode;
var mode = 1;

var display = "graph";
var layout = "qwerty";
var isRecording = false;
var oldTime = new Date();
var records = new Array();

var originalWords = ["pot","hand","lemon","bus","fish","watch","car","bird","stamp"];

// words = ["apple","banana","pen","hand","egg","bag","rose","chair","bat","fish",
// "notebook","pencil","dog","desk","watch","mitt","milk","flower","door","boat",
// "piano","orange","bird","sheep","cup","bus","fruit","car","cake","picture","cat",
// "stamp","plane","book","racket","glass","bed","letter","tape","cap","mail","box",
// "bread","doll","table","tree","pen","map","cow","pot","camera","hand","lemon"];
// words = ["cow","dog","box","bus","car","pot","cat"];


function setup() {
  createCanvas(screenX,screenY);
  k = "";
  textSize(64);
  // c = color(255,100,100);
  // c = color(100,200,255);
  c = color(255);

  set1stKeys();
  set2ndKeys();
  set3rdKeys();
  set4thKeys();
  set5thKeys();
  set6thKeys();
  setEnter();

  words = [].concat(originalWords);
//  words = originalWords;

  newWord();
}

function draw() {
  background(0);
  fill(0);
  // Show Recording / not Recording
  c = color(255);
  fill(c);
  noStroke();
  textSize(16);
  if (isRecording) {
    text("Recording",4,16);
  } else {
    text("Not Recording",4,16);
  }

  // Draw Key Frame
  for(j=0;j<77;j++){
    // c = color(255);
    strokeWeight(1);
    // if ((mode == 0)&&(j == currentCharNum)) {
    //   c = color(255,100,100);
    //   strokeWeight(4);
    // }
    fill(0);
    stroke(c);
    rect(keys[j].x, keys[j].y, keys[j].w, keys[j].h, 4);
  }

  noStroke();
  fill(c);
  textSize(wordSize);
  textAlign(CENTER);
  var wordLength = wordArray.length;
  for(j=0;j<wordLength;j++){
    // Draw Node
    noStroke();
    var r = smallR;
    if (display != "graph"){
      r = 0;
    }
    if ((j == wordPointer)&&(display != "none")) {
      r = largeR;
    }
    fill(color(255,100,100));
    ellipse(nodes[j].x,nodes[j].y,r,r);
    // Draw Link
    if (display == "graph"){
      stroke(color(255,100,100));
      strokeWeight(2)
      if (j > 0){
        line(lastNode.x,lastNode.y,nodes[j].x,nodes[j].y);
      }
    }
    lastNode = nodes[j];
    // Draw Word
    if (j<wordPointer) {
      fill(color(255,100,100));
    } else {
      fill(color(255,255,255));
    }
    wordX = screenX*0.5 + wordSize*(0.5+j-wordLength*0.5);
    text(wordArray[j],wordX,wordY);

    //println(wordX);
    // current_word = current_word + wordArray[j];
    if (wordPointer >= wordLength) {
      newWord();
      break;
    }
  }
  //draw keytop character
  for(j=0;j<77;j++){
    fill(c);
    noStroke();
    textSize(32);
    var keytop = charByKc(kcByNum(j,layout),layout);
    if (keytop != '0') {
      text(keytop,keys[j].x+24, keys[j].y+48);
    }
  }
}

function newWord() {
  // var randomFloat = random(words.length);
  // var randomInt = int(randomFloat);
  word = words.pop();
  console.log(words.length);
  if (words.length < 1){
    words = [].concat(originalWords);
  }
  var tmpArray = word.split("");
  wordArray.length = 0;
  wordArray = tmpArray;
  wordPointer = 0;
  currentChar = wordArray[wordPointer];
  currentCharCode = kcByChar(currentChar,layout);
  currentCharNum = numByKc(currentCharCode,layout);

  for (j=0;j<wordArray.length;j++){
    var nodeKc = kcByChar(wordArray[j],layout);
    var num = numByKc(nodeKc,layout);
    setNode(j,num);
    print(nodes[j]);
  }

}

function keyPressed() {
  prevKc = kc;
  kc = keyCode;
  if (isRecording){
    //addRecord(lCharByKc(kc,layout),word,currentChar);
  }

  //  print(kc);
  if ((currentChar == lCharByKc(kc,layout))||(currentChar == charByKc(kc,layout)) ){
    wordPointer++;
    currentChar = wordArray[wordPointer];
    currentCharCode = kcByChar(currentChar,layout);
    currentCharNum = numByKc(currentCharCode,layout);
  } else {
  }
  console.log(kc);
}

function set1stKeys(){
  x = origX;
  y = origY;
  w = 70;
  h = 39;
  for(j=0;j<14;j++){
    setKey(j);
  }
}

function set2ndKeys(){
  x = origX;
  y = origY+dipY+39;
  w = 110;
  h = 66;
  setKey(j);
  w = 67;
  for(j=15;j<28;j++){
    setKey(j);
  }
}

function set3rdKeys(){
  x = origX;
  y = origY+2*dipY+39+66;
  w = 67;
  for(j=28;j<41;j++){
    setKey(j);
  }
}

function set4thKeys(){
  x = origX;
  y = origY+3*dipY+39+2*66;
  w = 88;
  keys[j] = {x:x, y:y, w:w, h:h};
  x = x + w + dipX;
  w = 67;
  for(j=42;j<54;j++){
    setKey(j);
  }
}

function set5thKeys(){
  x = origX;
  y = origY+4*dipY+39+3*66;
  w = 130;
  setKey(j);
  w = 67;
  for(j=55;j<66;j++){
    setKey(j);
  }
  w = 130;
  setKey(j);
}

function set6thKeys(){
  x = origX;
  y = origY+5*dipY+39+4*66;
  w = 119;
  h = 75;
  for(j=67;j<69;j++){
    setKey(j);
  }
  w = 88;
  setKey(69);
  w = 277;
  setKey(70);
  w = 88;
  setKey(71);
  w = 119;
  for(j=72;j<74;j++){
    setKey(j);
  }
  w = 154;
  setKey(74);
}

function setEnter(){
  x = 1112;
  y = origY+2*dipY+39+66;
  w = 109;
  h = 66;
  setKey(75);
  x = 1133;
  w = 88;
  h = 149;
  setKey(76);
}

function setKey(index){
  keys[index] = {x:x, y:y, w:w, h:h};
  x = x + w + dipX;
}

function setNode(index,n){
  nodes[index] = {x:keys[n].x+33, y:keys[n].y+33};
}

function drawVowel(a,i,u,e,o,ltu){
  drawChar(a,keys[42].x, keys[42].y, false);
  drawChar(i,keys[36].x, keys[36].y, false);
  drawChar(u,keys[35].x, keys[35].y, false);
  drawChar(e,keys[31].x, keys[31].y, false);
  drawChar(o,keys[37].x, keys[37].y, false);
  if (0 < ltu) {
    drawChar("っ",keys[ltu].x, keys[ltu].y, false);
  }
}

function drawConsonant(a,i,u,e,o,n){
  var posX = keys[n].x;
  var posY = keys[n].y;
  var t = 21;

  textSize(t);
  // if (false) {
  fill(c);
  // rect(posX,posY,67,66,4);
  // fill(0);
  noStroke();
  // }
  var strs = [a,i,u,e,o];
  for (var i=0; i<3; i++){
    if (strs[i].length > 1){
      textSize(t/2);
    } else {
      textSize(t);
    }
    text(strs[i],posX+1+(offsetX+t)*i,posY+offsetY/2);
  }
  for (var i=3; i<5; i++){
    if (strs[i].length > 1){
      textSize(t/2);
    } else {
      textSize(t);
    }
    text(strs[i],posX+1+(offsetX+t)*(i-3),posY+offsetY);
  }
}

function drawChar(str,posX,posY,isFilled){
  if ((str.length > 1)||(str == "っ")||(kc==76)||(kc==88)) {
    textSize(32);
  } else {
    textSize(64);
  }
  if (str.length > 0) {
    if(!isFilled){
      fill(c);
      rect(posX,posY,67,66,4);
      fill(0);
      noStroke();
    }
    text(str,posX+offsetX,posY+offsetY);
  }
}

function changeDisplay(d){
  display = d;
}
