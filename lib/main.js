/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
// t is the current time (or position) of the tween. 
//    This can be seconds or frames, steps, seconds, ms, whatever 
//    – as long as the unit is the same as is used for the total time [3].
// b is the beginning value of the property.
// c is the change between the beginning and destination value of the property.
// d is the total time of the tween.

var linear = function linear(t, b, c, d) {
	return c * t / d + b;
};
var easeInQuad = function easeInQuad(t, b, c, d) {
	t /= d;
	return c * t * t + b;
};
var easeOutQuad = function easeOutQuad(t, b, c, d) {
	t /= d;
	return -c * t * (t - 2) + b;
};
var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
	return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
};
var easeOutSine = function easeOutSine(t, b, c, d) {
	return c * Math.sin(t / d * (Math.PI / 2)) + b;
};
var easeOutQuart = function easeOutQuart(t, b, c, d) {
	t /= d;
	t--;
	return -c * (t * t * t * t - 1) + b;
};
var easeOutCirc = function easeOutCirc(t, b, c, d) {
	t /= d;
	t--;
	return c * Math.sqrt(1 - t * t) + b;
};
var easeOutExpo = function easeOutExpo(t, b, c, d) {
	return c * (-Math.pow(2, -10 * t / d) + 1) + b;
};
var easeInOutExpo = function easeInOutExpo(t, b, c, d) {
	t /= d / 2;
	if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	t--;
	return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
};

exports.linear = linear;
exports.easeInOutQuad = easeInOutQuad;
exports.easeInQuad = easeInQuad;
exports.easeOutQuad = easeOutQuad;
exports.easeOutSine = easeOutSine;
exports.easeOutQuart = easeOutQuart;
exports.easeOutCirc = easeOutCirc;
exports.easeOutExpo = easeOutExpo;
exports.easeInOutExpo = easeInOutExpo;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animation = exports.keyframes = exports.init = undefined;

var _scrollAnimation = __webpack_require__(2);

var _customAnimation = __webpack_require__(4);

exports.init = _scrollAnimation.init;
exports.keyframes = _scrollAnimation.keyframes;
exports.animation = _customAnimation.animation;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyframes = exports.init = undefined;

var _helperFunctions = __webpack_require__(3);

var _easings = __webpack_require__(0);

var easings = _interopRequireWildcard(_easings);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/*  Globals
-------------------------------------------------- */
/*
ORIGINAL CODE CREDIT: https://github.com/dhg/davegamache/
*/
var PROPERTIES = ['translateX', 'translateY', 'opacity', 'rotate', 'scale'],
    container = null,
    pageOffset = 0,
    wrappers = [],
    currentWrapper = null,
    scrollTimeoutID = 0,
    bodyHeight = 0,
    windowHeight = 0,
    windowWidth = 0,
    prevKeyframesDurations = 0,
    scrollTop = 0,
    relativeScrollTop = 0,
    currentKeyframe = 0,
    keyframes = [];

/*  Construction
-------------------------------------------------- */
var init = function init(theContainer) {
  container = theContainer;
  var throttledFunction = (0, _helperFunctions.throttle)(updatePage, 10);
  window.onscroll = throttledFunction;
  setupValues();
};

var setupValues = function setupValues(wrapper) {
  // MASSIVE HACK FOR GETTING OFFSET IN DEVELOPMENT
  setTimeout(function () {
    // pageOffset = container.getBoundingClientRect().top + window.scrollY
    pageOffset = 200;
    console.log(pageOffset);
  }, 1000);
  scrollTop = window.scrollY - pageOffset;
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;
  convertAllPropsToPx();
  buildPage();
};

var buildPage = function buildPage() {
  var i, j, k;
  for (i = 0; i < keyframes.length; i++) {
    // loop keyframes
    bodyHeight += keyframes[i].duration;
    if (wrappers.indexOf(keyframes[i].wrapper) == -1) {
      wrappers.push(keyframes[i].wrapper);
    }
    for (j = 0; j < keyframes[i].animations.length; j++) {
      // loop animations
      Object.keys(keyframes[i].animations[j]).forEach(function (key) {
        // loop properties
        var value = keyframes[i].animations[j][key];
        if (key !== 'selector' && key !== 'easing' && value instanceof Array === false) {
          var valueSet = [];
          valueSet.push(getDefaultPropertyValue(key), value);
          value = valueSet;
        }
        keyframes[i].animations[j][key] = value;
      });
    }
  }
  container.style.height = bodyHeight + "px";
  //$window.scroll(0);
  currentWrapper = wrappers[0];
  currentWrapper.classList.add("active");
};

var convertAllPropsToPx = function convertAllPropsToPx() {
  var i, j, k;
  for (i = 0; i < keyframes.length; i++) {
    // loop keyframes
    var originalDuration = convertPercentToPx(keyframes[i].duration, 'y');
    keyframes[i].duration = originalDuration;
    keyframes[i].originalDuration = originalDuration;
    for (j = 0; j < keyframes[i].animations.length; j++) {
      // loop animations
      Object.keys(keyframes[i].animations[j]).forEach(function (key) {
        // loop properties
        var value = keyframes[i].animations[j][key];
        if (key !== 'selector' && key !== 'easing') {
          if (value instanceof Array) {
            // if its an array
            for (k = 0; k < value.length; k++) {
              // if value in array is %
              if (typeof value[k] === "string") {
                if (key === 'translateY') {
                  value[k] = convertPercentToPx(value[k], 'y');
                } else {
                  value[k] = convertPercentToPx(value[k], 'x');
                }
              }
            }
          } else {
            if (typeof value === "string") {
              // if single value is a %
              if (key === 'translateY') {
                value = convertPercentToPx(value, 'y');
              } else {
                value = convertPercentToPx(value, 'x');
              }
            }
          }
          keyframes[i].animations[j][key] = value;
        }
      });

      // Set duration to the longest possible one, when including delay
      if (keyframes[i].animations[j].delay) {
        var delay = keyframes[i].animations[j].delay;
        keyframes[i].duration = Math.max(keyframes[i].duration, originalDuration + delay);
      }
    }
  }
};

var getDefaultPropertyValue = function getDefaultPropertyValue(property) {
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
};

/*  Animation/Scrolling
-------------------------------------------------- */
var updatePage = function updatePage() {
  window.requestAnimationFrame(function () {
    setScrollTops();
    if (scrollTop > 0 && scrollTop <= bodyHeight - windowHeight) {
      animateElements();
      setKeyframe();
    }
  });
};

var setScrollTops = function setScrollTops() {
  scrollTop = window.scrollY - pageOffset;
  relativeScrollTop = scrollTop - prevKeyframesDurations;
};

var animateElements = function animateElements() {
  var animation, translateY, translateX, scale, rotate, opacity;
  for (var i = 0; i < keyframes[currentKeyframe].animations.length; i++) {
    animation = keyframes[currentKeyframe].animations[i];
    translateY = calcPropValue(animation, 'translateY');
    translateX = calcPropValue(animation, 'translateX');
    scale = calcPropValue(animation, 'scale');
    rotate = calcPropValue(animation, 'rotate');
    opacity = calcPropValue(animation, 'opacity');

    var curElem = document.querySelector(animation.selector);
    if (curElem) {
      curElem.style.transform = 'translate3d(' + translateX + 'px, ' + translateY + 'px, 0) scale(' + scale + ') rotate(' + rotate + 'deg)';
      curElem.style.opacity = opacity;
    }
  }
};

var calcPropValue = function calcPropValue(animation, property) {
  var value = animation[property];
  var duration = keyframes[currentKeyframe].originalDuration;
  duration = animation.delay ? duration + animation.delay[1] : duration;
  var easingFun = animation.easing === "linear" ? easings.linear : easings.easeInOutQuad;
  // Progress should not exceed duration, 
  // can happen in case of delayed animations in same keyframe
  var progress = Math.min(relativeScrollTop, duration);

  if (value) {
    value = easingFun(progress, value[0], value[1] - value[0], duration);
  } else {
    value = getDefaultPropertyValue(property);
  }
  // SCALE DOESN'T WORK WITH A AGRESSIVE ROUNDING LIKE THIS
  value = +value.toFixed(2);
  return value;
};

var setKeyframe = function setKeyframe() {
  if (scrollTop > keyframes[currentKeyframe].duration + prevKeyframesDurations) {
    prevKeyframesDurations += keyframes[currentKeyframe].duration;
    currentKeyframe++;
    showCurrentWrappers();
  } else if (scrollTop < prevKeyframesDurations) {
    currentKeyframe--;
    prevKeyframesDurations -= keyframes[currentKeyframe].duration;
    showCurrentWrappers();
  }
};

var showCurrentWrappers = function showCurrentWrappers() {
  var i;
  if (keyframes[currentKeyframe].wrapper != currentWrapper) {
    currentWrapper.classList.remove("active");
    keyframes[currentKeyframe].wrapper.classList.add("active");
    currentWrapper = keyframes[currentKeyframe].wrapper;
    if (keyframes[currentKeyframe].keyframeStarted) {
      keyframes[currentKeyframe].keyframeStarted();
    }
  }
};

/*  Helpers
-------------------------------------------------- */

var convertPercentToPx = function convertPercentToPx(value, axis) {
  if (typeof value === "string" && value.match(/%/g)) {
    if (axis === 'y') value = parseFloat(value) / 100 * windowHeight;
    if (axis === 'x') value = parseFloat(value) / 100 * windowWidth;
  }
  return value;
};

var throwError = function throwError() {
  console.log("errrrrooorrr 💥");
};

var isTouchDevice = function isTouchDevice() {
  return 'ontouchstart' in window // works on most browsers 
  || 'onmsgesturechange' in window; // works on ie10
};

/*  Exports
-------------------------------------------------- */
exports.init = init;
exports.keyframes = keyframes;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _arguments = arguments;
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
var debounce = exports.debounce = function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = undefined,
        args = _arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

var throttle = exports.throttle = function throttle(func, limit) {
  var inThrottle, lastFunc;
  return function () {
    var context = this,
        args = arguments;
    if (inThrottle) {
      clearTimeout(lastFunc);
      return lastFunc = setTimeout(function () {
        func.apply(context, args);
        inThrottle = false;
      }, limit);
    } else {
      func.apply(context, args);
      inThrottle = true;
      return setTimeout(function () {
        return inThrottle = false;
      }, limit);
    }
  };
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animate = undefined;

var _easings = __webpack_require__(0);

var easings = _interopRequireWildcard(_easings);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @param  {(value:number, end:boolean)=>void} manipulator
 *  Is called each time the value is changed to a new number.
 *  End is true if it is the last frame of the aniamtion 
 * @param  {number} start
 *  The value to start the animation from 
 * @param  {number} end
 *  The value to end the animation at
 * @param  {number} dur=2000
 *  The duration of the animation in ms. 
 *  The animation will probably exceed this number by a few ms, 
 *  or even a lot if the CPU is under pressure
 * @param  {boolean} reverse=false
 *  If true animates from end to start value 
 * @return {Promise} 
 *  a Promise that is resolved when the animation is finished
 *  There's no ejects
 * @example
 *    const pie = document.querySelector(".pie")
 *    const man = function(val, end){
 *      pie.style.strokeDasharray = val;    
 *    }
 *    animate(man, 0, 100)
 */
var animate = exports.animate = function animate(manipulator, start, end) {
  var dur = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2000;
  var reverse = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;


  var startValue = start,
      endValue = end,
      change = endValue - startValue,
      duration = dur,
      time = reverse ? dur : 0,
      easing = easings.easeInOutExpo;

  return new Promise(function (resolve, reject) {

    var theAnimation = setInterval(function () {
      window.requestAnimationFrame(function () {
        var val = easing(time, startValue, change, duration);
        manipulator(val);
        time = reverse ? time - 10 : time + 10;
        if (time >= duration || reverse && time <= 0) {
          clearInterval(theAnimation);
          manipulator(endValue, true);
          resolve();
        }
      });
    }, 10);
  });
};

/***/ })
/******/ ]);