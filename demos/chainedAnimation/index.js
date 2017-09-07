//Not working in ie and edge... 
//Could be rewritten to not use arrow functions and then it would work


// example usage of creating chained animations 
const numbers = document.querySelectorAll(".count-up-animate span")
const pies = document.querySelectorAll(".pie .outer")
const animationFunctions = []

//Create a list of functions that each is 
// a chain in the sequence animation
pies.forEach(function(pie, idx){
  // getting the number inside the pie
  const num = numbers[idx]
  
  // manipulator for the number
  const man1 = function(val, last){
    if(last){
      num.style.fontSize = "64px"
      num.innerHTML = "💩"
    }else{
      num.innerHTML = Math.floor(val) + "%";
    }
  }
  // manipulator for the pie
  const man2 = function(val){
    pie.style.strokeDasharray = val + " 100";    
  }

  // get endvalues set in the html
  const end1 = num.getAttribute('data-endvalue')
  const end2 = pie.getAttribute('data-endvalue')

  //  Create and combine the two animations to 
  //  one function returning a promise
  animationFunctions.push(
    () => Promise.all([
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
  );
})

//Run animations
cudeAnimations.promiseSequence(animationFunctions)