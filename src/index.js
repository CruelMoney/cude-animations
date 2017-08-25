import './polyfills'
import ScrollAnimator from './scrollAnimation'
import Animate from './customAnimation'

if(typeof(window) !== 'undefined'){
  window.cudeAnimations = {
    ScrollAnimator, 
    Animate
  }
}

export {
  ScrollAnimator,
  Animate
}
