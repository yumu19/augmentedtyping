var k;
var kc;
var prevKc;
var x,y,w,h;
var dipX = 17;
var dipY = 17;
var origX = 20;
var origY = 100;
var origY = 250;
var keys = [];
var c;
var offsetX = 2;
var offsetY = 60;
var currentBeam = 0;
var beamNum = 42;
var beams = [beamNum];
var currentColor = 0;
var particleNum =50;
var particles = [particleNum];
var particleSpeed = 10;
var particleDiffusion = 80;
var particleRadii = 16;
var sound_number = 0;
var totalWaveNum = 20;
var waves = [totalWaveNum];
var waveNum = 4;
var waveInterval = 24;
var currentWave = 0;
var totalRayNum = 128;
var rays = [totalRayNum];
var rayNum = 32;
var currentRay = 0;
var totalStellarNum = 128;
var stellars = [totalStellarNum];
var stellarNum = 32;
var currentStellar = 0;
var effectType = "stellar"

function changeParticleNum(i){
  // alert("change particle num");
  particleNum = i;
  particles = [particleNum];
  initParticle();
}

function changeParticleRad(i){
  particleRadii = i;
  initParticle();
}

function changeParticleDif(i){
  particleDiffusion = i;
  initParticle();
}

function changeSound(i){
  sound_number = i;
}

function changeSpeed(i){
  speed = i;
}

function changeBeam(i){
  beamtype = i;
}

function changeEffect(i){
  effectType = i;
}

function initParticle(){
  for (var i=0;i<particleNum;i++){
    particles[i] = new particle(particleSpeed,particleDiffusion,particleRadii);
  }
}


function setup() {
  frameRate(30);
  createCanvas(1280, 800);
  k = "";
  textSize(1);
  c = color(100,200,255);
  //c = red;
  for (var i=0;i<beamNum;i++){
    beams[i] = new charBeam();
  }
  initParticle();
  for (var i=0;i<totalWaveNum;i++){
    waves[i] = new wave();
  }
  for (var i=0;i<totalRayNum;i++){
    rays[i] = new ray();
  }
  for (var i=0;i<totalStellarNum;i++){
    stellars[i] = new stellar();
  }


  // スライダーの移動に合わせて横の数字を更新
  $("input#pnum_range").on('input', function () {
  	var val = $(this).val();
    $("#pnum_txt").text(val);
  } );
  $("input#radii_range").on('input', function () {
  	var val = $(this).val();
    $("#radii_txt").text(val);
  } );
  $("input#diffR_range").on('input', function () {
  	var val = $(this).val();
    $("#diffR_txt").text(val);
  } );
  $("input#sound_range").on('input', function () {
  	var val = $(this).val();
    $("#sound_txt").text(val);
  } );
  $("input#speed_range").on('input', function () {
  	var val = $(this).val();
    $("#speed_txt").text(val);
  } );

  // パーティクル数の更新
  $("input#pnum_range" ).change( function () {
    var val = $(this).val();
    changeParticleNum(val);
  } );
  // パーティクル半径の更新
  $("input#radii_range" ).change( function () {
    var val = $(this).val();
    changeParticleRad(val);
  } );
  // パーティクル飛翔半径の更新
  $("input#diffR_range" ).change( function () {
    var val = $(this).val();
    changeParticleDif(val);
  } );

  $("input#sound_range" ).change( function () {
    var val = $(this).val();
    changeSound(val);
  } );

  $( 'input[name="beam"]:radio' ).change( function () {
    var val = $(this).val();
    changeBeam(val);
  } );

  $("input#speed_range" ).change( function () {
    var val = $(this).val();
    changeSpeed(val);
  } );
  $("select#effect" ).change( function () {
    var val = $(this).val();
    changeEffect(val);
  } );
}

function draw() {
  background(0);
  set1stKeys();
  set2ndKeys();
  set3rdKeys();
  set4thKeys();
  set5thKeys();
  set6thKeys();
  setEnter();
  fill(0);
  strokeWeight(1);
  stroke(c);
  for(j=0;j<77;j++){
    rect(keys[j].x, keys[j].y, keys[j].w, keys[j].h, 4);
  }
  // fill(color(0,0,0));
  // strokeWeight(0);
  // rect(1120,origY+2*dipY+39+66+1,30,64,4); // Enterキー内の線を削除
  fill(c);
  rect(keys[70].x, keys[70].y, keys[70].w, keys[70].h, 4);
  rect(keys[75].x, keys[75].y, keys[75].w, keys[75].h, 4);
  rect(keys[76].x, keys[76].y, keys[76].w, keys[76].h, 4);

  switch (effectType){
    case "beam":
      for (i=0;i<beamNum;i++){
        beams[i].move();
        beams[i].display();
      }
      break;
    case "particle":
      for (var i=0;i<particleNum;i++){
        particles[i].move();
        particles[i].display();
      }
      break;
    case "wave":
      for (var i=0;i<totalWaveNum;i++){
        waves[i].diffuse();
        waves[i].display();
      }
      break;
    case "ray":
      for (var i=0;i<totalRayNum;i++){
        rays[i].move();
        rays[i].display();
      }
      break;
    case "stellar":
      for (var i=0;i<totalStellarNum;i++){
        stellars[i].proceed();
        stellars[i].display();
      }
      break;
  }
}

function keyPressed() {
  prevKc = kc;
  kc = keyCode;
  switch (effectType) {
    case "beam":
      if (beamtype != "none") {
        beams[currentBeam].launch(kc, "near");
      }
      currentBeam += 1;
      if (currentBeam >= beamNum){
        currentBeam = 0;
      }
      break;
    case "particle":
      for (var i=0;i<particleNum;i++){
        particles[i].launch(kc);
      }
      break;
    case "wave":
      var r = 0;
      for (var i=0;i<waveNum;i++) {
        waves[currentWave].setR(r);
        waves[currentWave].launch(kc);
        currentWave += 1;
        r += waveInterval;
        if (currentWave >= totalWaveNum){
          currentWave = 0;
        }
      }
      break;
    case "ray":
      var theta = 0;
      for (var i=0;i<rayNum;i++) {
        theta = i * 2 * Math.PI / rayNum;
        rays[currentRay].setTheta(theta);
        rays[currentRay].launch(kc);
        currentRay += 1;
        if (currentRay >= totalRayNum){
          currentRay = 0;
        }
      }
      break;
    case "stellar":
      for (var i=0;i<stellarNum;i++) {
        stellars[currentStellar].launch(kc);
        currentStellar += 1;
        if (currentStellar >= totalStellarNum){
          currentStellar = 0;
        }
      }
      break;
}
  //console.log(kc);
  if (kc == 13){ //Enter
    changeColor();
    fill(c);
    for(j=0;j<77;j++){
      rect(keys[j].x, keys[j].y, keys[j].w, keys[j].h, 4);
    }
    playAudio('assets/enter.mp3');
  } else if (kc == 32) { //Space
    fill(c);
    // for(var i=0;i<24;i++){
    //   rect(keys[i].x, keys[i].y, keys[n].w, keys[n].h, 4);
    // }
    for(var i=40;i<91;i++){
      beams[currentBeam].launch(i, "near");
      currentBeam += 1;
      if (currentBeam >= beamNum){
        currentBeam = 0;
      }
    }
    playAudio('assets/'+sound_number+'.mp3');
  } else {
    var n = numByKc(kc);
    if (n != 0){
      fill(c);
      rect(keys[n].x, keys[n].y, keys[n].w, keys[n].h, 4);
      playAudio('assets/'+sound_number+'.mp3');
    }
  }
}

function playAudio(src){
   var audio = new Audio();
   audio.src = src;
   audio.play();
}

function changeColor(){
  switch (currentColor){
    case 0:
      c  = color(255,255,0); //yellow
      currentColor++;
      break;
    case 1:
      c  = color(255,0,0); //red
      currentColor++;
      break;
    case 2:
      c  = color(0,255,0); //white
      currentColor++;
      break;
    case 3:
      c  = color(255,255,255); //blue
      currentColor++;
      break;
    case 4:
      c  = color(100,200,255); //blue
      currentColor = 0;
      break;
  }
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
    // text(strs[i],posX+1+(offsetX+t)*i,posY+offsetY/2);
  }
  for (var i=3; i<5; i++){
    if (strs[i].length > 1){
      textSize(t/2);
    } else {
      textSize(t);
    }
    // text(strs[i],posX+1+(offsetX+t)*(i-3),posY+offsetY);
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
    // text(str,posX+offsetX,posY+offsetY);
  }
}
