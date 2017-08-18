import { init, keyframes } from './scrollAnimation'
import { animate } from './customAnimation'

if(typeof(window) !== 'undefined'){
  window.cudeAnimations = {
    init,
    keyframes, 
    animate
  }
}

export {
  init,
  keyframes,
  animate
}
