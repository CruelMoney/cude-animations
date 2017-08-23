const wrapper = document.querySelector(".wrapper")

cudeAnimations.keyframes.push({
  'wrapper' : wrapper,
  'duration' : '150%',
  'animations' :  [
    {
      'selector'    : 'img',
      'translateY'  : ['100%', '0%'],
      'rotate'      : [0, 360]     
    },
  ]
},{
  'wrapper' : wrapper,
  'duration' : '50%',
  'animations' :  [
    {
      'selector'    : 'img',
      'scale'       : [1, 2]    
    },
  ]
},{
  'wrapper' : wrapper,
  'duration' : '50%',
  'animations' :  [
    {
      'selector'    : 'img',
      'scale'       : [2, 1]      
    },
  ]
},
{
  'wrapper' : wrapper,
  'duration' : '150%',
  'animations' :  [
    {
      'selector'    : 'img',
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
      'selector'    : 'img',
    },
  ]
})


cudeAnimations.init(document.querySelector("body"), 0)