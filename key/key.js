function numByKc(kc,l){
  switch(l) {
    case "dvorak":
      return numByKcDvorak(kc);
    case "jcuken":
      return numByKcJcuken(kc);
    case "blick":
      return numByKcBlick(kc);
    case "turkish":
      return numByKcTurkish(kc);
    case "neo":
      return numByKcNeo(kc);
    default:
      return numByKcQwerty(kc);
    }
}

function kcByNum(n,l){
  switch(l) {
    case "dvorak":
      return kcByNumDvorak(n);
    case "jcuken":
      return kcByNumJcuken(n);
    case "blick":
      return kcByNumBlick(n);
    case "turkish":
      return kcByNumTurkish(n);
    case "neo":
      return kcByNumNeo(n);
    default:
      return kcByNumQwerty(n);
    }
}

function kcByChar(c,l){
  switch(l) {
    case "dvorak":
      return kcByCharDvorak(c);
    case "jcuken":
      return kcByCharJcuken(c);
    case "blick":
      return kcByCharBlick(c);
    case "turkish":
      return kcByCharTurkish(c);
    case "neo":
      return kcByCharNeo(c);
    default:
      return kcByCharQwerty(c);
    }
}

function charByKc(kc,l){
  switch(l) {
    case "dvorak":
      return charByKcDvorak(kc);
    case "jcuken":
      return charByKcJcuken(kc);
    case "blick":
      return charByKcBlick(kc);
    case "turkish":
      return charByKcTurkish(kc);
    case "neo":
      return charByKcNeo(kc);
    default:
      return charByKcQwerty(kc);
    }
}

function lCharByKc(kc,l){
  switch(l) {
    case "dvorak":
      return lCharByKcDvorak(kc);
    case "jcuken":
      return lCharByKcJcuken(kc);
    case "blick":
      return lCharByKcBlick(kc);
    case "turkish":
      return lCharByKcTurkish(kc);
    case "neo":
      return lCharByKcNeo(kc);
    default:
      return lCharByKcQwerty(kc);
    }
}

function changeLayout(l){
  console.log(l)
  layout = l;
}
