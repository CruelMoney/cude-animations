console.log("ready")

// t is the current time (or position) of the tween. This can be seconds or frames, steps, seconds, ms, whatever – as long as the unit is the same as is used for the total time [3].
// b is the beginning value of the property.
// c is the change between the beginning and destination value of the property.
// d is the total time of the tween.
linear = function(t, b, c, d) {
  return c * t / d + b;
}
easeInOutQuad = function(t, b, c, d) {
  return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
};
easeInQuad = (t, b, c, d) => {
      t /= d;
      return c*t*t + b;
};
easeOutQuad = function (t, b, c, d) {
	t /= d;
	return -c * t*(t-2) + b;
};
easeOutSine = function (t, b, c, d) {
	return c * Math.sin(t/d * (Math.PI/2)) + b;
};
easeOutQuart = function (t, b, c, d) {
	t /= d;
	t--;
	return -c * (t*t*t*t - 1) + b;
};
easeOutCirc = function (t, b, c, d) {
	t /= d;
	t--;
	return c * Math.sqrt(1 - t*t) + b;
};
easeOutExpo = function (t, b, c, d) {
	return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
};
easeInOutExpo = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
	t--;
	return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
};



animate = function(attributeSelectFun, start, end, dur = 2000, reverse = false){

  let startValue       = start,
      endValue         = end,
      change           = endValue - startValue,
      duration         = dur,
      time             = reverse ? dur : 0,
      easing           = easeInOutExpo

  return new Promise(function(resolve, reject) {
    
    const theAnimation = setInterval(function(){
      window.requestAnimationFrame(function(){
        const val = easing(time, startValue, change, duration);
        attributeSelectFun(val)
        time = reverse ? time-10 : time+10;
        if(time >= duration || (reverse && time <= 0)){ 
          clearInterval(theAnimation);
          attributeSelectFun(endValue, true)
          resolve()
        }
      })
    },10)

  });
}


const numbers = document.querySelectorAll(".count-up-animate span")
const pies = document.querySelectorAll(".pie .outer")

const nextAnimation = (i=0)=>{
  const pie = pies[i]
  const num = numbers[i]
  attrFun1 = function(val, last){
    if(last){
      num.style.fontSize = "64px"
      num.innerHTML = "🖕🏼"
    }else{
      num.innerHTML = Math.floor(val) + "%";
    }
    
  }
  attrFun2 = function(val){
    pie.style.strokeDasharray = val + " 100";    
  }
  animate(attrFun1, 0, num.dataset.endvalue, 600)
  animate(attrFun2, 0, pie.dataset.endvalue, 600)
    .then(()=>{
      if(i < pies.length-1) nextAnimation(i+1)
     
    })
}
nextAnimation()
window.nextAnimation = nextAnimation