
// example usage of creating chained animations 
const numbers = document.querySelectorAll(".count-up-animate span")
const pies = document.querySelectorAll(".pie .outer")

const nextAnimation = function(i){
  const pie = pies[i]
  const num = numbers[i]
  man1 = function(val, last){
    if(last){
      num.style.fontSize = "64px"
      num.innerHTML = "💩"
    }else{
      num.innerHTML = Math.floor(val) + "%";
    }
  }
  man2 = function(val){
    pie.style.strokeDasharray = val + " 100";    
  }
  const end1 = num.getAttribute('data-endvalue')
  const end2 = pie.getAttribute('data-endvalue')
  
  // see source code for more documentation on parameters  
  window.cudeAnimations.animate({
    manipulator:man1,
    start: 0,
    end: end1,
    duration: 600,
  })
 
  window.cudeAnimations.animate({
    manipulator:man2,
    start: 0,
    end: end2,
    duration: 600,
    }).then( // animate() returns a promise that is resolved when animation is finished
    function(){
      if(i < pies.length-1) nextAnimation(i+1) 
    })
}
nextAnimation(0)
