!function(e,n){for(var t in n)e[t]=n[t]}(exports,function(e){function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}var t={};return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=1)}([function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e,n,t,r){return t*e/r+n},a=function(e,n,t,r){return e/=r,t*e*e+n},i=function(e,n,t,r){return e/=r,-t*e*(e-2)+n},o=function(e,n,t,r){return-t/2*(Math.cos(Math.PI*e/r)-1)+n},u=function(e,n,t,r){return t*Math.sin(e/r*(Math.PI/2))+n},s=function(e,n,t,r){return e/=r,e--,-t*(e*e*e*e-1)+n},c=function(e,n,t,r){return e/=r,e--,t*Math.sqrt(1-e*e)+n},l=function(e,n,t,r){return t*(1-Math.pow(2,-10*e/r))+n},f=function(e,n,t,r){return(e/=r/2)<1?t/2*Math.pow(2,10*(e-1))+n:(e--,t/2*(2-Math.pow(2,-10*e))+n)},m=function(e,n,t,r){return(e/=r/2)<1?t/2*e*e*e+n:(e-=2,t/2*(e*e*e+2)+n)};n.linear=r,n.easeInOutQuad=o,n.easeInQuad=a,n.easeOutQuad=i,n.easeOutSine=u,n.easeOutQuart=s,n.easeOutCirc=c,n.easeOutExpo=l,n.easeInOutExpo=f,n.easeInOutCubic=m},function(e,n,t){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0}),n.removeOnScroll=n.addOnScroll=n.runAnimationSequence=n.promiseSequence=n.Animate=n.ScrollAnimator=void 0,t(2);var a=t(3),i=r(a),o=t(5),u=r(o),s=t(6);"undefined"!=typeof window&&(window.cudeAnimations={ScrollAnimator:i.default,Animate:u.default,promiseSequence:s.promiseSequence,runAnimationSequence:s.runAnimationSequence,runningAnimations:[],addOnScroll:a.addOnScroll,removeOnScroll:a.removeOnScroll}),n.ScrollAnimator=i.default,n.Animate=u.default,n.promiseSequence=s.promiseSequence,n.runAnimationSequence=s.runAnimationSequence,n.addOnScroll=a.addOnScroll,n.removeOnScroll=a.removeOnScroll},function(e,n,t){"use strict";"undefined"!=typeof window&&function(){if("function"==typeof NodeList.prototype.forEach)return!1;NodeList.prototype.forEach=Array.prototype.forEach}()},function(e,n,t){"use strict";function r(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n.default=e,n}function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0}),n.removeOnScroll=n.addOnScroll=void 0;var i=t(0),o=r(i),u=t(4),s=r(u),c=[],l=function(e){c.push(e)},f=function(e){c=c.filter(function(n){return n!==e})},m=function e(n,t,r){var i=this;a(this,e),this.setupValues=function(){i.scrollTop=window.scrollY,i.windowHeight=window.innerHeight,i.windowWidth=window.innerWidth,i.convertAllPropsToPx(),i.buildPage(),i.preCalculateStyle()},this.buildPage=function(){var e,n;for(e=0;e<i.keyframes.length;e++){i.bodyHeight+=i.keyframes[e].duration,i.originalBodyHeight+=i.keyframes[e].originalDuration,-1==i.wrappers.indexOf(i.keyframes[e].wrapper)&&i.wrappers.push(i.keyframes[e].wrapper);for(n=0;n<i.keyframes[e].animations.length;n++)!function(){var t=i.keyframes[e].animations[n];t.selector&&(t.selector="string"==typeof t.selector?document.querySelector(t.selector):t.selector),Object.keys(t).forEach(function(e){var n=t[e];if("selector"!==e&&"easing"!==e&&n instanceof Array==!1&&"function"!=typeof n){var r=[];r.push(i.getDefaultPropertyValue(e),n),n=r}t[e]=n}),t.preCalculations=[]}()}i.container.style.height=i.originalBodyHeight+"px",i.currentWrapper=i.wrappers[0],i.currentWrapper.classList.add("active");i.container.getBoundingClientRect().top;i.maxScroll=i.originalBodyHeight},this.convertAllPropsToPx=function(){var e,n,t;for(e=0;e<i.keyframes.length;e++){var r=i.convertPercentToPx(i.keyframes[e].duration,"y");for(i.keyframes[e].duration=r,i.keyframes[e].originalDuration=r,n=0;n<i.keyframes[e].animations.length;n++)if(Object.keys(i.keyframes[e].animations[n]).forEach(function(r){var a=i.keyframes[e].animations[n][r];if("selector"!==r&&"easing"!==r&&"function"!=typeof a){if(a instanceof Array)for(t=0;t<a.length;t++)"string"==typeof a[t]&&(a[t]="translateY"===r?i.convertPercentToPx(a[t],"y"):i.convertPercentToPx(a[t],"x"));else"string"==typeof a&&(a="translateY"===r?i.convertPercentToPx(a,"y"):i.convertPercentToPx(a,"x"));i.keyframes[e].animations[n][r]=a}}),i.keyframes[e].animations[n].delay){var a=i.keyframes[e].animations[n].delay;i.keyframes[e].duration=Math.max(i.keyframes[e].duration,r+a)}}},this.preCalculateStyle=function(){for(var e=i.maxScroll,n=0;n<e;)i.setScrollTops(n),i.animateElements(n),n++},this.getDefaultPropertyValue=function(e){switch(e){case"translateX":case"translateY":return 0;case"scale":return 1;case"rotate":case"rotateY":case"rotateX":return 0;case"opacity":return 1;default:return null}},this.updatePage=function(){i.ticking||(i.ticking=!0,window.requestAnimationFrame(i.animationHandler))},this.animationHandler=function(e){i.setScrollTops(),i.scrollTop<i.maxScroll&&(i.animateElements(i.scrollTop),i.setKeyframe()),c.forEach(function(e){return e(i.scrollTop)}),i.ticking=!1},this.setScrollTops=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.scrollY;i.scrollTop=e,i.relativeScrollTop=i.scrollTop-i.prevKeyframesDurations},this.getTransform=function(e){var n=i.calcPropValue(e,"translateY"),t=i.calcPropValue(e,"translateX"),r=i.calcPropValue(e,"scale"),a=i.calcPropValue(e,"rotate"),o=i.calcPropValue(e,"rotateX"),u=i.calcPropValue(e,"rotateY");return"matrix3d("+[s.translateY(n),s.translateX(t),s.scale(r),s.rotate(a),s.rotateX(o),s.rotateY(u)].reduce(s.multiply).join(", ")+")"},this.animateElements=function(e){for(var n=i.keyframes[i.currentKeyframe],t=0;t<n.animations.length;t++){var r=n.animations[t],a=r.selector;if(a){if(i.hasTransform(r)){var o=null;if(e){var u=r.preCalculations[e];u?o=u:(o=i.getTransform(r),r.preCalculations[e]=o)}else o=i.getTransform(r);a.style.webkitTransform=o,a.style.transform=o}if(r.opacity){var s=i.calcPropValue(r,"opacity");a.style.opacity=s}if(r.manipulator){var c=i.calcPropValue(r,"valueRange");r.manipulator(c,i.scrollTop,a)}}}},this.hasTransform=function(e){return!!(e.translateX||e.translateY||e.rotate||e.scale)},this.calcPropValue=function(e,n){var t=e[n],r=i.keyframes[i.currentKeyframe].originalDuration;r=e.delay?r+e.delay[1]:r;var a=o[e.easing]?o[e.easing]:o.easeInOutQuad,u=Math.min(i.relativeScrollTop,r);return u=Math.max(u,0),t=t?a(u,t[0],t[1]-t[0],r):i.getDefaultPropertyValue(n),t=+t.toFixed(2)},this.setKeyframe=function(){i.scrollTop>i.keyframes[i.currentKeyframe].duration+i.prevKeyframesDurations?(i.prevKeyframesDurations+=i.keyframes[i.currentKeyframe].duration,i.currentKeyframe=Math.min(i.keyframes.length-1,i.currentKeyframe+1),i.showCurrentWrappers()):i.scrollTop<i.prevKeyframesDurations&&(i.currentKeyframe=Math.max(0,i.currentKeyframe-1),i.prevKeyframesDurations-=i.keyframes[i.currentKeyframe].duration,i.showCurrentWrappers(),i.prevKeyframesDurations=Math.max(0,i.prevKeyframesDurations))},this.showCurrentWrappers=function(){i.keyframes[i.currentKeyframe].wrapper!=i.currentWrapper&&(i.currentWrapper.classList.remove("active"),i.keyframes[i.currentKeyframe].wrapper.classList.add("active"),i.currentWrapper=i.keyframes[i.currentKeyframe].wrapper),i.keyframes[i.currentKeyframe].keyframeStarted&&i.keyframes[i.currentKeyframe].keyframeStarted()},this.convertPercentToPx=function(e,n){return"string"==typeof e&&e.match(/%/g)&&("y"===n&&(e=parseFloat(e)/100*i.windowHeight),"x"===n&&(e=parseFloat(e)/100*i.windowWidth)),e},this.throwError=function(){console.log("errrrrooorrr 💥")},this.isTouchDevice=function(){return"ontouchstart"in window||"onmsgesturechange"in window},this.start=function(){i.scrollHandler=i.updatePage,window.cudeAnimations.scrollActive=!0,window.addEventListener("scroll",i.scrollHandler)},this.stop=function(){window.cudeAnimations.scrollActive=!1,window.removeEventListener("scroll",i.scrollHandler)},this.PROPERTIES=["translateX","translateY","opacity","rotate","scale","rotateX","rotateY"],this.container=n,this.pageOffset=r||0,this.wrappers=[],this.currentWrapper=null,this.scrollTimeoutID=0,this.bodyHeight=0,this.originalBodyHeight=0,this.windowHeight=0,this.windowWidth=0,this.prevKeyframesDurations=0,this.scrollTop=0,this.relativeScrollTop=0,this.currentKeyframe=0,this.keyframes=t,this.ticking=!1,this.setupValues()};n.default=m,n.addOnScroll=l,n.removeOnScroll=f},function(e,n,t){"use strict";/*! @license Rematrix v0.3.0

	Copyright 2018 Julian Lloyd.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/
function r(e){if(e.constructor!==Array)throw new TypeError("Expected array.");if(16===e.length)return e;if(6===e.length){var n=a();return n[0]=e[0],n[1]=e[1],n[4]=e[2],n[5]=e[3],n[12]=e[4],n[13]=e[5],n}throw new RangeError("Expected array with either 6 or 16 values.")}function a(){for(var e=[],n=0;n<16;n++)n%5==0?e.push(1):e.push(0);return e}function i(e){var n=r(e),t=n[0]*n[5]-n[4]*n[1],a=n[0]*n[6]-n[4]*n[2],i=n[0]*n[7]-n[4]*n[3],o=n[1]*n[6]-n[5]*n[2],u=n[1]*n[7]-n[5]*n[3],s=n[2]*n[7]-n[6]*n[3],c=n[10]*n[15]-n[14]*n[11],l=n[9]*n[15]-n[13]*n[11],f=n[9]*n[14]-n[13]*n[10],m=n[8]*n[15]-n[12]*n[11],d=n[8]*n[14]-n[12]*n[10],p=n[8]*n[13]-n[12]*n[9],h=1/(t*c-a*l+i*f+o*m-u*d+s*p);if(isNaN(h)||h===1/0)throw new Error("Inverse determinant attempted to divide by zero.");return[(n[5]*c-n[6]*l+n[7]*f)*h,(-n[1]*c+n[2]*l-n[3]*f)*h,(n[13]*s-n[14]*u+n[15]*o)*h,(-n[9]*s+n[10]*u-n[11]*o)*h,(-n[4]*c+n[6]*m-n[7]*d)*h,(n[0]*c-n[2]*m+n[3]*d)*h,(-n[12]*s+n[14]*i-n[15]*a)*h,(n[8]*s-n[10]*i+n[11]*a)*h,(n[4]*l-n[5]*m+n[7]*p)*h,(-n[0]*l+n[1]*m-n[3]*p)*h,(n[12]*u-n[13]*i+n[15]*t)*h,(-n[8]*u+n[9]*i-n[11]*t)*h,(-n[4]*f+n[5]*d-n[6]*p)*h,(n[0]*f-n[1]*d+n[2]*p)*h,(-n[12]*o+n[13]*a-n[14]*t)*h,(n[8]*o-n[9]*a+n[10]*t)*h]}function o(e,n){for(var t=r(e),a=r(n),i=[],o=0;o<4;o++)for(var u=[t[o],t[o+4],t[o+8],t[o+12]],s=0;s<4;s++){var c=4*s,l=[a[c],a[c+1],a[c+2],a[c+3]],f=u[0]*l[0]+u[1]*l[1]+u[2]*l[2]+u[3]*l[3];i[o+c]=f}return i}function u(e){if("string"==typeof e){var n=e.match(/matrix(3d)?\(([^)]+)\)/);if(n){return r(n[2].split(", ").map(parseFloat))}}return a()}function s(e){return f(e)}function c(e){var n=Math.PI/180*e,t=a();return t[5]=t[10]=Math.cos(n),t[6]=t[9]=Math.sin(n),t[9]*=-1,t}function l(e){var n=Math.PI/180*e,t=a();return t[0]=t[10]=Math.cos(n),t[2]=t[8]=Math.sin(n),t[2]*=-1,t}function f(e){var n=Math.PI/180*e,t=a();return t[0]=t[5]=Math.cos(n),t[1]=t[4]=Math.sin(n),t[4]*=-1,t}function m(e,n){var t=a();return t[0]=e,t[5]="number"==typeof n?n:e,t}function d(e){var n=a();return n[0]=e,n}function p(e){var n=a();return n[5]=e,n}function h(e){var n=a();return n[10]=e,n}function y(e,n){var t=Math.PI/180*e,r=a();if(r[4]=Math.tan(t),n){var i=Math.PI/180*n;r[1]=Math.tan(i)}return r}function v(e){var n=Math.PI/180*e,t=a();return t[4]=Math.tan(n),t}function w(e){var n=Math.PI/180*e,t=a();return t[1]=Math.tan(n),t}function g(e){return"matrix3d("+r(e).join(", ")+")"}function P(e,n){var t=a();return t[12]=e,n&&(t[13]=n),t}function A(e){var n=a();return n[12]=e,n}function S(e){var n=a();return n[13]=e,n}function M(e){var n=a();return n[14]=e,n}Object.defineProperty(n,"__esModule",{value:!0}),t.d(n,"format",function(){return r}),t.d(n,"identity",function(){return a}),t.d(n,"inverse",function(){return i}),t.d(n,"multiply",function(){return o}),t.d(n,"parse",function(){return u}),t.d(n,"rotate",function(){return s}),t.d(n,"rotateX",function(){return c}),t.d(n,"rotateY",function(){return l}),t.d(n,"rotateZ",function(){return f}),t.d(n,"scale",function(){return m}),t.d(n,"scaleX",function(){return d}),t.d(n,"scaleY",function(){return p}),t.d(n,"scaleZ",function(){return h}),t.d(n,"skew",function(){return y}),t.d(n,"skewX",function(){return v}),t.d(n,"skewY",function(){return w}),t.d(n,"toString",function(){return g}),t.d(n,"translate",function(){return P}),t.d(n,"translateX",function(){return A}),t.d(n,"translateY",function(){return S}),t.d(n,"translateZ",function(){return M})},function(e,n,t){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=t(0),i=function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n.default=e,n}(a),o=function e(n){var t=this;if(r(this,e),this.start=function(){return new Promise(function(e,n){t.resolveFun=e;var r=function e(n){t.animation=window.requestAnimationFrame(e),window.cudeAnimations.runningAnimations.forEach(function(e){e.animationHandler(n)}),0===window.cudeAnimations.runningAnimations.length&&!!t.animation&&cancelAnimationFrame(t.animation)};t.animation=window.requestAnimationFrame(function(e){e+=t.delay,t.initTimestamp=e,t.state="running",window.cudeAnimations.runningAnimations.push(t),1===window.cudeAnimations.runningAnimations.length&&r(e)})})},this.resolveFunction=function(){t.resolved=!0,!!t.resolveFun&&t.resolveFun()},this.animationFinished=function(){t.manipulator(t.endValue),t.state="finished",window.cudeAnimations.runningAnimations=window.cudeAnimations.runningAnimations.filter(function(e){return e!=t})},this.animationHandler=function(e){var n=e-t.initTimestamp,r=t.duration-n;if(r-t.offset<=0&&!t.resolved&&t.resolveFunction(),r<=0)t.animationFinished();else if(n>0){var a=t.easing(n,t.startValue,t.change,t.duration);t.manipulator(a)}},!n.target&&!n.manipulator)throw Error("An element or manipulator need to be specified in options.");var a=null;if(n.target){var o=document.querySelectorAll(n.target);a=function(e,n){o.forEach(function(n){n.innerHTML=Math.floor(e)})}}this.reverse=!!n.reverse,this.startValue=this.reverse?Number(n.end):Number(n.start),this.endValue=this.reverse?Number(n.start):Number(n.end),this.offset=Number(n.offset||0),this.delay=Number(n.delay||0),this.change=this.endValue-this.startValue,this.duration=Number(n.duration||250),this.easing=n.customEasing||(n.easing?i[n.easing]:i.easeInOutExpo),this.manipulator=n.manipulator||a,this.animation=null,this.resolved=!1,this.state="initialized",this.initTimestamp=null,this.resolveFun=null};n.default=o},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e){return e.reduce(function(e,n){return e.then(function(e){return n().then(Array.prototype.concat.bind(e))})},Promise.resolve([]))},a=function(e){return!!window.animation&&cancelAnimationFrame(window.animation),new Promise(function(n,t){var r=void 0,a=void 0,i=e.reduce(function(e,n){return Math.max(n.duration,e)},0),o=e.reduce(function(e,n){return n.offset+e},-e[0].offset);i+=o;var u=function t(o){i-(o-r)>0?(e.forEach(function(e,n){var t=n*e.offset;e.animationHandler(o-t,r)}),a=window.requestAnimationFrame(t),window.animation=a):(cancelAnimationFrame(a),n())};a=window.requestAnimationFrame(function(e){r=e,u(e)})})};n.promiseSequence=r,n.runAnimationSequence=a}]));
//# sourceMappingURL=cudeAnimations.es.js.map