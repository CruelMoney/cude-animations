const wrapper = document.querySelector(".wrapper")
const allHeads = document.querySelectorAll(".head-chooser img")

function choosehead(e){
  thehead.src = e.src
  allHeads.forEach(function(i){
    i.classList.remove("active")
  })
  e.classList.add("active")
}

const keyframes = [{
  'wrapper' : wrapper,
  'duration' : '150%',
  'animations' :  [
    {
      'selector'    : '.wrapper img',
      'translateY'  : ['100%', '0%'],
      'rotate'      : [0, 360]     
    },
  ]
},{
  'wrapper' : wrapper,
  'duration' : '50%',
  'animations' :  [
    {
      manipulator : function(val){
        thehead.style.transform = `scale(${val})`
      },
      'valueRange'       : [1, 2]    
    },
  ]
},{
  'wrapper' : wrapper,
  'duration' : '50%',
  'animations' :  [
    {
      'selector'    : '.wrapper img',
      'scale'       : [2, 1]      
    },
  ]
},
{
  'wrapper' : wrapper,
  'duration' : '150%',
  'animations' :  [
    {
      'selector'    : '.wrapper img',
      'translateY'  : ['0%', '-100%'],
      'rotate'      : [0, 360]   
    },
  ]
},
{
  'wrapper' : wrapper,
  'duration' : '100%',
  'animations' :  [
    {
      'selector'    : '.wrapper img',
    },
  ]
}]
const animator = new cudeAnimations.ScrollAnimator(
  document.querySelector("body"), 
  keyframes,
  0
)
animator.start()
