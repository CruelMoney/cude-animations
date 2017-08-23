/*
ORIGINAL CODE CREDIT: https://github.com/dhg/davegamache/
*/
import {throttle} from './helperFunctions'
import * as easings from './easings'


export default class ScrollAnimator{
  
  constructor(theContainer, keyframes, offset = 0){
    /*  Globals
    -------------------------------------------------- */
    this.PROPERTIES =               ['translateX', 'translateY', 'opacity', 'rotate', 'scale']
    this.container =                theContainer
    this.pageOffset =               offset
    this.wrappers =                 []
    this.currentWrapper =           null
    this.scrollTimeoutID =          0
    this.bodyHeight =               0
    this.windowHeight =             0
    this.windowWidth =              0
    this.prevKeyframesDurations =   0
    this.scrollTop =                0
    this.relativeScrollTop =        0
    this.currentKeyframe =          0
    this.keyframes =                keyframes
    
    this.setupValues();
  }

  setupValues = () => {
    this.scrollTop = window.scrollY - this.pageOffset
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
    this.convertAllPropsToPx();
    this.buildPage();
  }
  
  buildPage = () => {
    var i, j, k;
    for(i=0;i<this.keyframes.length;i++) { // loop this.keyframes
      this.bodyHeight += this.keyframes[i].duration;
        if(this.wrappers.indexOf(this.keyframes[i].wrapper) == -1) {
          this.wrappers.push(this.keyframes[i].wrapper);
        }
        for(j=0;j<this.keyframes[i].animations.length;j++) { // loop animations
          Object.keys(this.keyframes[i].animations[j]).forEach((key)=> { // loop properties
            var value = this.keyframes[i].animations[j][key];
            if(key !== 'selector' && key !== 'easing' && value instanceof Array === false && typeof value !== 'function') {
              var valueSet = [];
              valueSet.push(this.getDefaultPropertyValue(key), value);
              value = valueSet;
            }
            this.keyframes[i].animations[j][key] = value;
          });
        }
    }
    
    this.container.style.height = this.bodyHeight + "px";
    //$window.scroll(0);
   // currentWrapper = wrappers[0];
   // currentWrapper.classList.add("active")
  }
  
  convertAllPropsToPx = () => {
    var i, j, k;
    for(i=0;i<this.keyframes.length;i++) { // loop this.keyframes
      
      const originalDuration = this.convertPercentToPx(this.keyframes[i].duration, 'y');
      this.keyframes[i].duration = originalDuration
      this.keyframes[i].originalDuration = originalDuration
      
      for(j=0;j<this.keyframes[i].animations.length;j++) { // loop animations
        Object.keys(this.keyframes[i].animations[j]).forEach((key)=> { // loop properties
          var value = this.keyframes[i].animations[j][key];
          if(key !== 'selector' && key !== 'easing' && typeof value !== 'function') {
            if(value instanceof Array) { // if its an array
              for(k=0;k<value.length;k++) { // if value in array is %
                if(typeof value[k] === "string") {
                  if(key === 'translateY') {
                    value[k] = this.convertPercentToPx(value[k], 'y');
                  } else {
                    value[k] = this.convertPercentToPx(value[k], 'x');
                  }
                }
              } 
            } else {
              if(typeof value === "string") { // if single value is a %
                if(key === 'translateY') {
                  value = this.convertPercentToPx(value, 'y');
                } else {
                  value = this.convertPercentToPx(value, 'x');
                }
              }
            }
            this.keyframes[i].animations[j][key] = value;
          }
        });
  
             
          // Set duration to the longest possible one, when including delay
          if(this.keyframes[i].animations[j].delay){
            var delay = this.keyframes[i].animations[j].delay
            this.keyframes[i].duration = Math.max(this.keyframes[i].duration, originalDuration+delay)
          }
      }
    }
  }
  
  getDefaultPropertyValue = (property) => {
    switch (property) {
      case 'translateX':
        return 0;
      case 'translateY':
        return 0;
      case 'scale':
        return 1;
      case 'rotate':
        return 0;
      case 'opacity':
        return 1;
      default:
        return null;
    }
  }
  
  /*  Animation/Scrolling
  -------------------------------------------------- */
  updatePage = () => {
    window.requestAnimationFrame(() => {
      this.setScrollTops();
      if(this.scrollTop > 0 && this.scrollTop <= (this.bodyHeight - this.windowHeight)) {
        this.animateElements();
        this.setKeyframe();
      }else{
        this.currentWrapper && this.currentWrapper.classList.remove("active")
        this.currentWrapper = null
      }
    });
  }
  
  setScrollTops = () => {
    this.scrollTop = window.scrollY - this.pageOffset
    this.relativeScrollTop = this.scrollTop - this.prevKeyframesDurations;
  }
  
  
  animateElements = () => {
    var animation, translateY, translateX, scale, rotate, opacity;
    for(var i=0;i<this.keyframes[this.currentKeyframe].animations.length;i++) {
      animation   = this.keyframes[this.currentKeyframe].animations[i];
      if(animation.manipulator){
        const value = this.calcPropValue(animation, 'valueRange')
        animation.manipulator(value)
      }else{
        translateY  = this.calcPropValue(animation, "translateY");
        translateX  = this.calcPropValue(animation, "translateX");
        scale       = this.calcPropValue(animation, "scale");
        rotate      = this.calcPropValue(animation, "rotate");
        opacity     = this.calcPropValue(animation, "opacity");
    
        const curElem = document.querySelector(animation.selector)
        if (curElem){
          curElem.style.transform = 'translate3d(' + translateX +'px, ' + translateY + 'px, 0) scale('+ scale +') rotate('+ rotate +'deg)';
          curElem.style.opacity = opacity;
        }
      }
    
    }
  }
  
  calcPropValue = (animation, property) => {
    var value = animation[property]
    var duration = this.keyframes[this.currentKeyframe].originalDuration
    duration = animation.delay ? duration + animation.delay[1] : duration
    const easingFun = animation.easing === "linear" ? easings.linear : easings.easeInOutQuad
    // Progress should not exceed duration, 
    // can happen in case of delayed animations in same keyframe
    var progress = Math.min(this.relativeScrollTop, duration)
    
    if(value) {
      value = easingFun(progress, value[0], (value[1]-value[0]), duration)
    } else {
      value = this.getDefaultPropertyValue(property);
    }
    // SCALE DOESN'T WORK WITH A AGRESSIVE ROUNDING LIKE THIS
    value = +value.toFixed(2) 
    return value;
  }
  
  
  setKeyframe = () => {
    if(!this.currentWrapper){
      this.currentWrapper = this.wrappers[0]
      this.currentWrapper.classList.add("active")
    }
    if(this.scrollTop > (this.keyframes[this.currentKeyframe].duration + this.prevKeyframesDurations)) {
      this.prevKeyframesDurations += this.keyframes[this.currentKeyframe].duration;
        this.currentKeyframe++;
        this.showCurrentWrappers();
    } else if(this.scrollTop < this.prevKeyframesDurations) {
        this.currentKeyframe--;
        this.prevKeyframesDurations -= this.keyframes[this.currentKeyframe].duration;
        this.showCurrentWrappers();
    }
  }
  
  showCurrentWrappers = () => {
    var i;
   
    if(this.keyframes[this.currentKeyframe].wrapper != this.currentWrapper) {
      this.currentWrapper.classList.remove("active")
      this.keyframes[this.currentKeyframe].wrapper.classList.add("active")
      this.currentWrapper = this.keyframes[this.currentKeyframe].wrapper;
      if (this.keyframes[this.currentKeyframe].keyframeStarted){
        this.keyframes[this.currentKeyframe].keyframeStarted();
      }
    } 
  
  }


  /*  Helpers
  -------------------------------------------------- */

  convertPercentToPx = (value, axis) => {
    if(typeof value === "string" && value.match(/%/g)) {
      if(axis === 'y') value = (parseFloat(value) / 100) * this.windowHeight;
      if(axis === 'x') value = (parseFloat(value) / 100) * this.windowWidth;
    }
    return value;
  }

  throwError = () => {
    console.log("errrrrooorrr 💥")
  }

  isTouchDevice = () => {
    return 'ontouchstart' in window // works on most browsers 
    || 'onmsgesturechange' in window; // works on ie10
  }

  start=()=>{
    this.scrollHandler = throttle(this.updatePage, 10);
    window.addEventListener("scroll", this.scrollHandler)
  }

  stop=()=>{
    window.removeEventListener("scroll", this.scrollHandler)
  }
}
