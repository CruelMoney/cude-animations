import { init, keyframes } from './scrollAnimation'
import Animate from './customAnimation'

if(typeof(window) !== 'undefined'){
  window.cudeAnimations = {
    init,
    keyframes, 
    Animate
  }
}

export {
  init,
  keyframes,
  Animate
}
