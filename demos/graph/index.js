
const bars = document.querySelectorAll("path[id^=bar]")
const arrowLines = document.querySelectorAll("path[id^=arrow]")
var idx = 0

//Setup start values for lines (hides them)
setup = function(){

  bars.forEach(function(bar) {
    const len = bar.getTotalLength().toFixed(0);
    bar.style.strokeDasharray = len 
    bar.style.strokeDashoffset = len-1 // - 1 -> making it visible before animation
  })

  var len = arrowLines[0].getTotalLength().toFixed(0);
  arrowLines[0].style.strokeDasharray = len
  arrowLines[0].style.strokeDashoffset = len 

  len = arrowLines[1].getTotalLength().toFixed(0);
  arrowLines[1].style.strokeDasharray = len
  arrowLines[1].style.strokeDashoffset = len 

  len = arrowLines[2].getTotalLength().toFixed(0);
  arrowLines[2].style.strokeDasharray = len
  arrowLines[2].style.strokeDashoffset = len 

}

//  Helper function to animate a line
animateLine = function(line, duration=500){
  manipulator = function(val, last){
    line.style.strokeDashoffset = val.toFixed(0) 
  }

  const start = parseFloat(line.style.strokeDashoffset)
  const options = {
    manipulator: manipulator,
    start: start,
    end: 0,
    duration: duration
  }

  return new cudeAnimations.Animate(options)
}

animateArrow = function(){
  //First animate line
  animateLine(arrowLines[2], 1200).start()
  //Then animate pointy part
  .then(
    function(){
      animateLine(arrowLines[0]).start()
      animateLine(arrowLines[1]).start()
    }
  )
}

main = function(){
  setup()
  
  bars.forEach(function(bar) {
    // Delay each bar to create overlap
    setTimeout(function(){
      animateLine(bar).start()
    }, 130*idx++)
  }, this);

  animateArrow()
}()

