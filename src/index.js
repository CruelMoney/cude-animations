import { init, keyframes } from './scrollAnimation'
import { animate } from './customAnimation'

if(window){
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
