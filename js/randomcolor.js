var randomColorRange = 75;
var randomColorBase = 180

function randomColor(){
  var r = Math.random() *(randomColorRange) + randomColorBase;
  var g = Math.random() *(randomColorRange) + randomColorBase;
  var b = Math.random() *(randomColorRange) + randomColorBase;
  return color(r,g,b);
}
