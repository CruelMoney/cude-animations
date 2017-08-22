// Using target
var options = {
  target: ".animate-counter span",
  start: 0,
  end: 100,
  duration: 1000
}

var animation = new cudeAnimations.Animate(options)
animation.start()


// Using manipulator
var element = document.querySelector(".animate-counter-manipulator span")

manipulator = function(val){
  element.innerHTML = val
}

var options2 = {
  manipulator: manipulator,
  start: 0,
  end: 100,
  duration: 1000
}

var animation2 = new cudeAnimations.Animate(options2)
animation2.start()