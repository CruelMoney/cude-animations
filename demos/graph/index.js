
// example usage of creating chained animations 
const bars = document.querySelectorAll("path[id^=bar]")
const arrowLines = document.querySelectorAll("path[id^=arrow]")
var idx = 0

setup = function(){
  var len = arrowLines[0].getTotalLength();
  arrowLines[0].style.strokeDasharray = len
  arrowLines[0].style.strokeDashoffset = len 
  len = arrowLines[1].getTotalLength();
  arrowLines[1].style.strokeDasharray = len
  arrowLines[1].style.strokeDashoffset = len 
  len = arrowLines[2].getTotalLength();
  arrowLines[2].style.strokeDasharray = len
  arrowLines[2].style.strokeDashoffset = -len 
}

animateLine = function(line, resolver, duration=500){
  manipulator = function(val, last){
    const newVal = val + 0
    line.style.strokeDashoffset = newVal
  }

  const start = Number(line.style.strokeDashoffset)

  cudeAnimations.animate(
    manipulator,            //  for each frame call manipulator
    start,                  //  from this value
    0,                      //  to this value
    duration                //  over this duration in ms
  ).then(resolver)
}

animateArrow = function(){
  animateLine(arrowLines[2], function(){
    animateLine(arrowLines[0])
    animateLine(arrowLines[1])
  }, 1200)
  
}

main = function(){
  
  setup()

  bars.forEach(function(bar) {
    const len = bar.getTotalLength();
    bar.style.strokeDasharray = len
    bar.style.strokeDashoffset = -len + 1 // + 1 -> making it visible before animation
    
    setTimeout(function(){
      animateLine(bar)
    }, 130*idx++)
    
    
  }, this);

  animateArrow()

}()

