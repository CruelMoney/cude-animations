import * as easings from './easings'

export default class Animate{

  /**
 * * @param  {object} options
 * object containing the following attributes:
     * @attribute  {(value:number, end:boolean)=>void} manipulator
     *  Is called each time the value is changed to a new number.
     *  End is true if it is the last frame of the aniamtion
     * @attribute  {number} start
     *  The value to start the animation from 
     * @attribute  {number} end
     *  The value to end the animation at
     * @attribute  {number} duration
     *  The duration of the animation in ms. 
     *  The animation will probably exceed this number by a few ms, 
     *  or even a lot if the CPU is under pressure
     *  Default: 250
     * @attribute  {boolean} reverse
     *  If true animates from end to start value 
     *  Default: false
     * @attribute  {(t:number, b:number, c:number, d:number)=>void} customEasing
     *  Custom easing function. See easings.js for examples. 
     *  Default: easings.easeInOutExpo
     * @attribute  {string} target
     *  Automatically finds the elements with the given class, 
     *  and creates a manipulator that changes the innerHTML of the elements
     *  Example: "mySpan"
 * @return {Animate} 
 */
  constructor(options){
    if(!options.target && !options.manipulator){
      throw Error("An element or manipulator need to be specified in options.")
    }
    
    //Create manipulator function if element string is given
    let elementManipulator = null  
    if (options.target){
      const elements = document.querySelectorAll(options.target)
      elementManipulator = (val, end) => {
        elements.forEach(el=>{
          el.innerHTML = Math.floor(val)
        })
      }
    }

    
      this.startValue        = Number(options.start),
      this.endValue          = Number(options.end),
      this.change            = this.endValue - this.startValue,
      this.duration          = Number(options.duration || 250),
      this.reverse           = !!options.reverse,  // !! operator converts to boolean
      this.time              = this.reverse ? this.duration : 0,
      this.easing            = options.customEasing || (options.easing ? easings[options.easing] : easings.easeInOutExpo),
      this.manipulator       = options.manipulator || elementManipulator  
    
      
  }

  /**
  * @return {Promise} 
  *  A Promise that is resolved when the animation is finished
  *  There are no ejects
  */
  start = () => {
    return new Promise((resolve, reject)=> {
      
      const theAnimation = setInterval(()=>{
        window.requestAnimationFrame(()=>{
          
          const val = this.easing(
            this.time, 
            this.startValue, 
            this.change, 
            this.duration
          )
          
          this.manipulator(val)
          
          this.time = this.reverse ? 
            this.time-10 : 
            this.time+10;

          if(
            this.time >= this.duration || 
            (this.reverse && this.time <= 0)
            ){ 
            clearInterval(theAnimation)
            this.manipulator(this.endValue, true)
            resolve()
          }
        })
      },10)
  
    });
  }

}

