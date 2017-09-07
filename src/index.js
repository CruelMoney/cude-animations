import './polyfills'
import ScrollAnimator from './scrollAnimation'
import Animate from './customAnimation'
import {promiseSequence} from './helperFunctions'

if(typeof(window) !== 'undefined'){
  window.cudeAnimations = {
    ScrollAnimator, 
    Animate,
    promiseSequence
  }
}

export {
  ScrollAnimator,
  Animate,
  promiseSequence
}
