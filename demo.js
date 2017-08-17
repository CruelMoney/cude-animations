
// example usage of creating chained animations 
const numbers = document.querySelectorAll(".count-up-animate span")
const pies = document.querySelectorAll(".pie .outer")

const nextAnimation = function(i=0){
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
  cudeAnimations.animate(man1, 0, end1, 600)
  cudeAnimations.animate(man2, 0, end2, 600)
    .then(()=>{
      if(i < pies.length-1) nextAnimation(i+1)
     
    })
}
nextAnimation()
