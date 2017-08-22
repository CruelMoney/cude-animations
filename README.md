# CountUp.js
CountUp.js is a dependency-free, lightweight JavaScript "class" that can be used to quickly create animations that display numerical data in a more interesting way.

Despite its name, CountUp can count in either direction, depending on the `startVal` and `endVal` params that you pass.

CountUp.js supports all browsers.

## [Try the demo](http://inorganik.github.io/countUp.js)

## Installation

Simply include the countUp.js file in your project or install via npm or bower using the package name `countup.js` or `countUp.js` respectively.

Before making a pull request, please [read this](#contributing). MIT License.


## Usage:
Params:
- `target` = id of html element, input, svg text element, or var of previously selected element/input where counting occurs
- `startVal` = the value you want to begin at
- `endVal` = the value you want to arrive at
- `decimals` = (optional) number of decimal places in number, default 0
- `duration` = (optional) duration in seconds, default 2
- `options` = (optional, see demo) formatting/easing options object

Decimals, duration, and options can be left out to use the default values.

```js
var numAnim = new CountUp("SomeElementYouWantToAnimate", 24.02, 99.99);
numAnim.start();
```

with optional callback:

```js
numAnim.start(someMethodToCallOnComplete);

// or an anonymous function
numAnim.start(function() {
    // do something
})
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

cudeAnimations.animate(options)
```