# CountUp.js
cude-animations is a dependency-free, lightweight simple JavaScript library that can be used to create custom animations.

cude-animations.js supports all browsers.

## [Try the demos](https://cruelmoney.github.io/custom-animations/)

## Installation

Simply include the `cude-animations.js` file in your project or install via npm or bower using the package name `cude-animations`.

When including the file the classes are available through the global variable `cudeAnimations`.

Otherwise the library exports the following modules:
- `init` = (Function)
- `keyframes` = (Function)
- `Animate` = (Class)

## Animate usage:

When creating a new animation, it expects a options paramter.
The options parameter is an object containing the following parameters:
- `target` = {string} ID of html element, needs to be specified if the manipulator is not specified. When using target instead of manipulator, the value is rounded to 0 decimals.
- `start` = {number} The value to start the animation from 
- `end` = {number} The value to end the animation at
- `duration` = {number} (optional) duration of the animation in ms. Default: 250
- `reverse` = {boolean} (optional) If true animates from end to start value. Default: false
- `customEasing` = {(t:number, b:number, c:number, d:number)=>void} (option). Default: easings.easeInOutExpo. See section below about custom functions.
- `manipulator` = {(value:number, end:boolean)=>void} Is called once for each keyframe, needs to be specified if the target is not specified. Recommended way of controlling animation as it gives more control. Keep this function as efficient as possible, as it may be called many times.


Example using target:
```js
var options = {
  target: ".animate-counter span",
  start: 0,
  end: 100,
  duration: 1000
}
var animation = new cudeAnimations.Animate(options)
animation.start()
```

Example using manipulator:
```js
//  Find the element manually. 
//  Don't do this inside the manipulator function
var element = document.querySelector(".animate-counter span")

//  Keep this function as efficient as possible, as it may be called many times
manipulator = function(val){
  element.innerHTML = val
}

var options = {
  manipulator: manipulator,
  start: 0,
  end: 100,
  duration: 1000
}

var animation = new cudeAnimations.Animate(options)
animation.start()
```

The start() method returns a Promise that is resolved when the animation is finished. This can be used to easily create chained animations. 

Example of chained animation:
```js
var options = {
  target: ".animate-counter span",
  start: 0,
  end: 100,
  duration: 1000
}

var options2 = {
  target: ".animate-counter-2 span",
  start: 0,
  end: 100,
  duration: 1000
}

var animation = new cudeAnimations.Animate(options)
var animation2 = new cudeAnimations.Animate(options2)

animation
  .start()
  .then(animation2.start)
```

#### Custom easing:

You can optionally apply your custom easing function, which will receive 4 parameters necessary to calculate a Bezier curve:

- `t` (the current time);
- `b` (the beginning value);
- `c` (the difference between the beginning and destination value);
- `d` (the total time of the tween).

You could use any of Robert Penner's [easing functions](https://github.com/danro/jquery-easing/blob/master/jquery.easing.js).

If you don't specify a custom easing function, the default is `easeInOutExpo`.

Example:

```js
const linear = (t, b, c, d) => {
  return c * t / d + b;
}

const options = {
  target: ".mySelector",
  customEasing: linear
  start: 0,
  end: 100,
  duration: 1000,
}

new cudeAnimations.Animate(options).start()
```

## Scroll Animation:
This library also contains methods for controlling the animatino using scroll, instead of a duration. 
Still needs to be documented. See `scrollAnimation.js` for code.