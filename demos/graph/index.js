
// example usage of creating chained animations 
const bars = document.querySelectorAll("path[id^=bar]")
const arrowLines = document.querySelectorAll("path[id^=arrow]")
var idx = 0

//Setup start values for lines (hides them)
setup = function(){
  bars.forEach(function(bar) {
    const len = bar.getTotalLength();
    bar.style.strokeDasharray = len
    bar.style.strokeDashoffset = -len + 1 // + 1 -> making it visible before animation
  })

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

//  Helper function to animate a line
animateLine = function(line, duration=500){
  manipulator = function(val, last){
    line.style.strokeDashoffset = val
  }

  const start = Number(line.style.strokeDashoffset)

  return cudeAnimations.animate(
    manipulator,            //  for each frame call manipulator
    start,                  //  from this value
    0,                      //  to this value
    duration                //  over this duration in ms
  )
}


animateArrow = function(){
  //First animate line
  animateLine(arrowLines[2], 1200)
  //Then animate pointy part
  .then(
    function(){
      animateLine(arrowLines[0])
      animateLine(arrowLines[1])
    }
  )
}

main = function(){
  setup()
  
  bars.forEach(function(bar) {
    // Delay each bar to create overlap
    setTimeout(function(){
      animateLine(bar)
    }, 130*idx++)
  }, this);

  animateArrow()
}()

