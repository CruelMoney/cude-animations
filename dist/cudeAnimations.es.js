!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e,t,n,r){return n*e/r+t},a=function(e,t,n,r){return e/=r,n*e*e+t},i=function(e,t,n,r){return e/=r,-n*e*(e-2)+t},o=function(e,t,n,r){return-n/2*(Math.cos(Math.PI*e/r)-1)+t},s=function(e,t,n,r){return n*Math.sin(e/r*(Math.PI/2))+t},u=function(e,t,n,r){return e/=r,e--,-n*(e*e*e*e-1)+t},c=function(e,t,n,r){return e/=r,e--,n*Math.sqrt(1-e*e)+t},l=function(e,t,n,r){return n*(1-Math.pow(2,-10*e/r))+t},f=function(e,t,n,r){return(e/=r/2)<1?n/2*Math.pow(2,10*(e-1))+t:(e--,n/2*(2-Math.pow(2,-10*e))+t)},m=function(e,t,n,r){return(e/=r/2)<1?n/2*e*e*e+t:(e-=2,n/2*(e*e*e+2)+t)};t.linear=r,t.easeInOutQuad=o,t.easeInQuad=a,t.easeOutQuad=i,t.easeOutSine=s,t.easeOutQuart=u,t.easeOutCirc=c,t.easeOutExpo=l,t.easeInOutExpo=f,t.easeInOutCubic=m},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.runAnimationSequence=t.promiseSequence=t.Animate=t.ScrollAnimator=void 0,n(2);var a=n(3),i=r(a),o=n(4),s=r(o),u=n(5);"undefined"!=typeof window&&(window.cudeAnimations={ScrollAnimator:i.default,Animate:s.default,promiseSequence:u.promiseSequence,runAnimationSequence:u.runAnimationSequence,runningAnimations:[]}),t.ScrollAnimator=i.default,t.Animate=s.default,t.promiseSequence=u.promiseSequence,t.runAnimationSequence=u.runAnimationSequence},function(e,t,n){"use strict";"undefined"!=typeof window&&function(){if("function"==typeof NodeList.prototype.forEach)return!1;NodeList.prototype.forEach=Array.prototype.forEach}()},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(a),o=function e(t,n,a){var o=this;r(this,e),this.setupValues=function(){o.scrollTop=window.scrollY,o.windowHeight=window.innerHeight,o.windowWidth=window.innerWidth,o.convertAllPropsToPx(),o.buildPage()},this.buildPage=function(){var e,t;for(e=0;e<o.keyframes.length;e++){o.bodyHeight+=o.keyframes[e].duration,o.originalBodyHeight+=o.keyframes[e].originalDuration,-1==o.wrappers.indexOf(o.keyframes[e].wrapper)&&o.wrappers.push(o.keyframes[e].wrapper);for(t=0;t<o.keyframes[e].animations.length;t++)!function(){var n=o.keyframes[e].animations[t];n.selector&&(n.selector="string"==typeof n.selector?document.querySelector(n.selector):n.selector),Object.keys(n).forEach(function(e){var t=n[e];if("selector"!==e&&"easing"!==e&&t instanceof Array==!1&&"function"!=typeof t){var r=[];r.push(o.getDefaultPropertyValue(e),t),t=r}n[e]=t})}()}o.container.style.height=o.originalBodyHeight+"px",o.currentWrapper=o.wrappers[0],o.currentWrapper.classList.add("active");o.container.getBoundingClientRect().top;o.maxScroll=o.originalBodyHeight},this.convertAllPropsToPx=function(){var e,t,n;for(e=0;e<o.keyframes.length;e++){var r=o.convertPercentToPx(o.keyframes[e].duration,"y");for(o.keyframes[e].duration=r,o.keyframes[e].originalDuration=r,t=0;t<o.keyframes[e].animations.length;t++)if(Object.keys(o.keyframes[e].animations[t]).forEach(function(r){var a=o.keyframes[e].animations[t][r];if("selector"!==r&&"easing"!==r&&"function"!=typeof a){if(a instanceof Array)for(n=0;n<a.length;n++)"string"==typeof a[n]&&(a[n]="translateY"===r?o.convertPercentToPx(a[n],"y"):o.convertPercentToPx(a[n],"x"));else"string"==typeof a&&(a="translateY"===r?o.convertPercentToPx(a,"y"):o.convertPercentToPx(a,"x"));o.keyframes[e].animations[t][r]=a}}),o.keyframes[e].animations[t].delay){var a=o.keyframes[e].animations[t].delay;o.keyframes[e].duration=Math.max(o.keyframes[e].duration,r+a)}}},this.getDefaultPropertyValue=function(e){switch(e){case"translateX":case"translateY":return 0;case"scale":return 1;case"rotate":case"rotateY":case"rotateX":return 0;case"opacity":return 1;default:return null}},this.updatePage=function(){window.requestAnimationFrame(function(){o.setScrollTops(),o.scrollTop<o.maxScroll&&(o.animateElements(),o.setKeyframe())})},this.setScrollTops=function(){o.scrollTop=window.scrollY,o.relativeScrollTop=o.scrollTop-o.prevKeyframesDurations},this.animateElements=function(){for(var e,t,n,r,a,i,s,u,c=o.keyframes[o.currentKeyframe],l=0;l<c.animations.length;l++){if(e=c.animations[l],e.manipulator){var f=o.calcPropValue(e,"valueRange");e.manipulator(f,o.scrollTop,e.selector)}t=o.calcPropValue(e,"translateY"),n=o.calcPropValue(e,"translateX"),r=o.calcPropValue(e,"scale"),a=o.calcPropValue(e,"rotate"),i=o.calcPropValue(e,"rotateX"),s=o.calcPropValue(e,"rotateY"),u=o.calcPropValue(e,"opacity");var m=e.selector;m&&(o.hasTransform(e)&&(m.style.transform="translate3d("+n+"px, "+t+"px, 0) scale("+r+") rotate("+a+"deg)  rotateX("+i+"deg)rotateY("+s+"deg)"),m.style.opacity=u)}},this.hasTransform=function(e){return!!(e.translateX||e.translateY||e.rotate||e.scale)},this.calcPropValue=function(e,t){var n=e[t],r=o.keyframes[o.currentKeyframe].originalDuration;r=e.delay?r+e.delay[1]:r;var a=i[e.easing]?i[e.easing]:i.easeInOutQuad,s=Math.min(o.relativeScrollTop,r);return s=Math.max(s,0),n=n?a(s,n[0],n[1]-n[0],r):o.getDefaultPropertyValue(t),n=+n.toFixed(2)},this.setKeyframe=function(){o.scrollTop>o.keyframes[o.currentKeyframe].duration+o.prevKeyframesDurations?(o.prevKeyframesDurations+=o.keyframes[o.currentKeyframe].duration,o.currentKeyframe=Math.min(o.keyframes.length-1,o.currentKeyframe+1),o.showCurrentWrappers()):o.scrollTop<o.prevKeyframesDurations&&(o.currentKeyframe=Math.max(0,o.currentKeyframe-1),o.prevKeyframesDurations-=o.keyframes[o.currentKeyframe].duration,o.showCurrentWrappers())},this.showCurrentWrappers=function(){o.keyframes[o.currentKeyframe].wrapper!=o.currentWrapper&&(o.currentWrapper.classList.remove("active"),o.keyframes[o.currentKeyframe].wrapper.classList.add("active"),o.currentWrapper=o.keyframes[o.currentKeyframe].wrapper,o.keyframes[o.currentKeyframe].keyframeStarted&&o.keyframes[o.currentKeyframe].keyframeStarted())},this.convertPercentToPx=function(e,t){return"string"==typeof e&&e.match(/%/g)&&("y"===t&&(e=parseFloat(e)/100*o.windowHeight),"x"===t&&(e=parseFloat(e)/100*o.windowWidth)),e},this.throwError=function(){console.log("errrrrooorrr 💥")},this.isTouchDevice=function(){return"ontouchstart"in window||"onmsgesturechange"in window},this.start=function(){o.scrollHandler=o.updatePage,window.addEventListener("scroll",o.scrollHandler)},this.stop=function(){window.removeEventListener("scroll",o.scrollHandler)},this.PROPERTIES=["translateX","translateY","opacity","rotate","scale","rotateX","rotateY"],this.container=t,this.pageOffset=a||0,this.wrappers=[],this.currentWrapper=null,this.scrollTimeoutID=0,this.bodyHeight=0,this.originalBodyHeight=0,this.windowHeight=0,this.windowWidth=0,this.prevKeyframesDurations=0,this.scrollTop=0,this.relativeScrollTop=0,this.currentKeyframe=0,this.keyframes=n,this.setupValues()};t.default=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(a),o=function e(t){var n=this;if(r(this,e),this.start=function(){return new Promise(function(e,t){n.resolveFun=e;var r=function e(t){n.animation=window.requestAnimationFrame(e),window.cudeAnimations.runningAnimations.forEach(function(e){e.animationHandler(t)})};n.animation=window.requestAnimationFrame(function(e){n.initTimestamp=e,n.state="running",window.cudeAnimations.runningAnimations.push(n),1===window.cudeAnimations.runningAnimations.length&&r(e)})})},this.resolveFunction=function(){n.resolved=!0,!!n.resolveFun&&n.resolveFun()},this.animationFinished=function(){n.manipulator(n.endValue),n.state="finished",window.cudeAnimations.runningAnimations=window.cudeAnimations.runningAnimations.filter(function(e){return e!=n}),0===window.cudeAnimations.runningAnimations.length&&!!n.animation&&cancelAnimationFrame(n.animation)},this.animationHandler=function(e){var t=e-n.initTimestamp,r=n.duration-t;if(r-n.offset<=0&&!n.resolved&&n.resolveFunction(),r<=0)n.animationFinished();else if(t>0){var a=n.easing(t,n.startValue,n.change,n.duration);n.manipulator(a)}},!t.target&&!t.manipulator)throw Error("An element or manipulator need to be specified in options.");var a=null;if(t.target){var o=document.querySelectorAll(t.target);a=function(e,t){o.forEach(function(t){t.innerHTML=Math.floor(e)})}}this.reverse=!!t.reverse,this.startValue=this.reverse?Number(t.end):Number(t.start),this.endValue=this.reverse?Number(t.start):Number(t.end),this.offset=Number(t.offset||0),this.change=this.endValue-this.startValue,this.duration=Number(t.duration||250),this.easing=t.customEasing||(t.easing?i[t.easing]:i.easeInOutExpo),this.manipulator=t.manipulator||a,this.animation=null,this.resolved=!1,this.state="initialized",this.initTimestamp=null,this.resolveFun=null};t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e.reduce(function(e,t){return e.then(function(e){return t().then(Array.prototype.concat.bind(e))})},Promise.resolve([]))},a=function(e){return!!window.animation&&cancelAnimationFrame(window.animation),new Promise(function(t,n){var r=void 0,a=void 0,i=e.reduce(function(e,t){return Math.max(t.duration,e)},0),o=e.reduce(function(e,t){return t.offset+e},-e[0].offset);i+=o;var s=function n(o){i-(o-r)>0?(e.forEach(function(e,t){var n=t*e.offset;e.animationHandler(o-n,r)}),a=window.requestAnimationFrame(n),window.animation=a):(cancelAnimationFrame(a),t())};a=window.requestAnimationFrame(function(e){r=e,s(e)})})};t.promiseSequence=r,t.runAnimationSequence=a}]));
//# sourceMappingURL=cudeAnimations.es.js.map