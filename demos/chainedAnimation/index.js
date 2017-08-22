
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
  
  // wait for all promises
  Promise.all([
    new cudeAnimations.Animate({
      manipulator:man1,
      start: 0,
      end: end1,
      duration: 600,
    }).start(),
    new cudeAnimations.Animate({
      manipulator:man2,
      start: 0,
      end: end2,
      duration: 600,
    }).start()
  ])
  .then( 
  function(){
    if(i < pies.length-1) nextAnimation(i+1)  // iterative call with next index
  })
     
}

nextAnimation(0)
