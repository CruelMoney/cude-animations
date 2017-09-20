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
      'rotate'      : [0, 360]     ,
      'easing'      : 'linear'
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
      'valueRange'       : [1, 2]  ,
      'easing'      : 'linear'  
    },
  ]
},{
  'wrapper' : wrapper,
  'duration' : '50%',
  'animations' :  [
    {
      'selector'    : '.wrapper img',
      'scale'       : [2, 1]   ,
      'easing'      : 'linear'   
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
      'rotate'      : [0, 360],
      'easing'      : 'linear'
    },
  ]
}]
const animator = new cudeAnimations.ScrollAnimator(
  document.querySelector(".scrollwrapper"), 
  keyframes,
  100
)
animator.start()
