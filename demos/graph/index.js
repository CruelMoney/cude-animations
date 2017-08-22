
const bars = document.querySelectorAll("path[id^=bar]")
const arrowLines = document.querySelectorAll("path[id^=arrow]")
var idx = 0

//Setup start values for lines (hides them)
function setup(){
  idx = 0

  setStrokes = function(line, hide){
    const len = line.getTotalLength().toFixed(0);
    line.style.strokeDasharray = len 
    line.style.strokeDashoffset = hide ? len : len-1
  }

  bars.forEach(function(bar) {
    setStrokes(bar)
  })

  arrowLines.forEach(function(line) {
    setStrokes(line, true)
  })

}
setup()

//  Helper function to animate a line
animateLine = function(line, duration){
  manipulator = function(val, last){
    line.style.strokeDashoffset = val.toFixed(0) 
  }

  const start = parseFloat(line.style.strokeDashoffset)
  const options = {
    manipulator: manipulator,
    start: start,
    end: 0,
    duration: duration,
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

animation = function(){
  bars.forEach(function(bar) {
    // Delay each bar to create overlap
    setTimeout(function(){
      animateLine(bar, 600).start()
    }, 130*idx++)
  }, this);

  animateArrow()
 
}



var prevRatio = 0.0;

function intersectionHandler(cb){
  return function(entries, observer){
    entries.forEach(function(entry){

      // Reset values if element all out
      if (entry.intersectionRatio === 0) {
        setup()     
      
      // Run animation if element all the way in
      }else if(entry.intersectionRatio === 1){
        cb()
      }

    })
  }
}

// call animation when in view
var options = {
  root: null,
  rootMargin: "0px",
  threshold: [1.0, 0.0]
};
var target = document.querySelector('#animate-here');
var observer = new IntersectionObserver(
  intersectionHandler(animation),
  options
);
observer.observe(target);



