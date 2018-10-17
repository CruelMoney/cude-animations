/*
ORIGINAL CODE CREDIT: https://github.com/dhg/davegamache/
*/
import * as easings from "./easings";
import * as Rematrix from "rematrix";

export default class ScrollAnimator {
	constructor(theContainer, keyframes, offset) {
		/*  Globals
    -------------------------------------------------- */
		this.PROPERTIES = [
			"translateX",
			"translateY",
			"opacity",
			"rotate",
			"scale",
			"rotateX",
			"rotateY"
		];
		this.container = theContainer;
		this.pageOffset = !offset ? 0 : offset;
		this.wrappers = [];
		this.currentWrapper = null;
		this.scrollTimeoutID = 0;
		this.bodyHeight = 0;
		this.originalBodyHeight = 0;
		this.windowHeight = 0;
		this.windowWidth = 0;
		this.prevKeyframesDurations = 0;
		this.scrollTop = 0;
		this.relativeScrollTop = 0;
		this.currentKeyframe = 0;
		this.keyframes = keyframes;
		this.setupValues();
	}

	setupValues = () => {
		this.scrollTop = window.scrollY;
		this.windowHeight = window.innerHeight;
		this.windowWidth = window.innerWidth;
		this.convertAllPropsToPx();
		this.buildPage();
	};

	buildPage = () => {
		var i, j, k;
		for (i = 0; i < this.keyframes.length; i++) {
			// loop this.keyframes
			this.bodyHeight += this.keyframes[i].duration;
			this.originalBodyHeight += this.keyframes[i].originalDuration;
			if (this.wrappers.indexOf(this.keyframes[i].wrapper) == -1) {
				this.wrappers.push(this.keyframes[i].wrapper);
			}
			for (j = 0; j < this.keyframes[i].animations.length; j++) {
				// loop animations
				// set selector if not using manipulator
				const animation = this.keyframes[i].animations[j];
				if (!!animation.selector) {
					animation.selector =
						typeof animation.selector === "string"
							? document.querySelector(animation.selector)
							: animation.selector;
				}

				Object.keys(animation).forEach(key => {
					// loop properties
					var value = animation[key];
					if (
						key !== "selector" &&
						key !== "easing" &&
						value instanceof Array === false &&
						typeof value !== "function"
					) {
						var valueSet = [];
						valueSet.push(this.getDefaultPropertyValue(key), value);
						value = valueSet;
					}
					animation[key] = value;
				});
			}
		}

		this.container.style.height = this.originalBodyHeight + "px";
		this.currentWrapper = this.wrappers[0];
		this.currentWrapper.classList.add("active");

		// get container page offset
		const containerOffset = this.container.getBoundingClientRect().top;
		// calculate maxScroll as containerHeight - offset. To stop animation after scrolling past container.
		this.maxScroll = this.originalBodyHeight;
	};

	convertAllPropsToPx = () => {
		var i, j, k;
		for (i = 0; i < this.keyframes.length; i++) {
			// loop this.keyframes

			const originalDuration = this.convertPercentToPx(
				this.keyframes[i].duration,
				"y"
			);
			this.keyframes[i].duration = originalDuration;
			this.keyframes[i].originalDuration = originalDuration;

			for (j = 0; j < this.keyframes[i].animations.length; j++) {
				// loop animations
				Object.keys(this.keyframes[i].animations[j]).forEach(key => {
					// loop properties
					var value = this.keyframes[i].animations[j][key];
					if (
						key !== "selector" &&
						key !== "easing" &&
						typeof value !== "function"
					) {
						if (value instanceof Array) {
							// if its an array
							for (k = 0; k < value.length; k++) {
								// if value in array is %
								if (typeof value[k] === "string") {
									if (key === "translateY") {
										value[k] = this.convertPercentToPx(value[k], "y");
									} else {
										value[k] = this.convertPercentToPx(value[k], "x");
									}
								}
							}
						} else {
							if (typeof value === "string") {
								// if single value is a %
								if (key === "translateY") {
									value = this.convertPercentToPx(value, "y");
								} else {
									value = this.convertPercentToPx(value, "x");
								}
							}
						}
						this.keyframes[i].animations[j][key] = value;
					}
				});

				// Set duration to the longest possible one, when including delay
				if (this.keyframes[i].animations[j].delay) {
					var delay = this.keyframes[i].animations[j].delay;
					this.keyframes[i].duration = Math.max(
						this.keyframes[i].duration,
						originalDuration + delay
					);
				}
			}
		}
	};

	getDefaultPropertyValue = property => {
		switch (property) {
			case "translateX":
				return 0;
			case "translateY":
				return 0;
			case "scale":
				return 1;
			case "rotate":
				return 0;
			case "rotateY":
				return 0;
			case "rotateX":
				return 0;
			case "opacity":
				return 1;
			default:
				return null;
		}
	};

	/*  Animation/Scrolling
  -------------------------------------------------- */
	updatePage = () => {
		window.requestAnimationFrame(timestamp => {
			this.setScrollTops();
			if (this.scrollTop < this.maxScroll) {
				this.animateElements();
				this.setKeyframe();
			} else {
				// above max scroll
			}
		});
	};

	setScrollTops = () => {
		this.scrollTop = window.scrollY;
		this.relativeScrollTop = this.scrollTop - this.prevKeyframesDurations;
	};

	getTransform = animation => {
		const translateY = this.calcPropValue(animation, "translateY");
		const translateX = this.calcPropValue(animation, "translateX");
		const scale = this.calcPropValue(animation, "scale");
		const rotate = this.calcPropValue(animation, "rotate");
		const rotateX = this.calcPropValue(animation, "rotateX");
		const rotateY = this.calcPropValue(animation, "rotateY");

		const product = [
			Rematrix.translateY(translateY),
			Rematrix.translateX(translateX),
			Rematrix.scale(scale),
			Rematrix.rotate(rotate),
			Rematrix.rotateX(rotateX),
			Rematrix.rotateY(rotateY)
		].reduce(Rematrix.multiply);

		return "matrix3d(" + product.join(", ") + ")";
	};

	animateElements = () => {
		const keyframe = this.keyframes[this.currentKeyframe];
		for (var i = 0; i < keyframe.animations.length; i++) {
			const animation = keyframe.animations[i];
			const curElem = animation.selector;
			if (curElem) {
				if (animation.manipulator) {
					const value = this.calcPropValue(animation, "valueRange");
					animation.manipulator(value, this.scrollTop, curElem);
				}
				curElem.style.transform = this.getTransform(animation);
				if (animation.opacity) {
					const opacity = this.calcPropValue(animation, "opacity");
					curElem.style.opacity = opacity;
				}
			}
		}
	};

	hasTransform = animation =>
		!!animation.translateX ||
		!!animation.translateY ||
		!!animation.rotate ||
		!!animation.scale;

	calcPropValue = (animation, property) => {
		var value = animation[property];
		var duration = this.keyframes[this.currentKeyframe].originalDuration;
		duration = animation.delay ? duration + animation.delay[1] : duration;
		const easingFun = easings[animation.easing]
			? easings[animation.easing]
			: easings.easeInOutQuad;
		// Progress should not exceed duration,
		// can happen in case of delayed animations in same keyframe
		var progress = Math.min(this.relativeScrollTop, duration);
		progress = Math.max(progress, 0);

		if (value) {
			value = easingFun(progress, value[0], value[1] - value[0], duration);
		} else {
			value = this.getDefaultPropertyValue(property);
		}
		// SCALE DOESN'T WORK WITH A AGRESSIVE ROUNDING LIKE THIS
		value = +value.toFixed(2);
		return value;
	};

	setKeyframe = () => {
		if (
			this.scrollTop >
			this.keyframes[this.currentKeyframe].duration +
				this.prevKeyframesDurations
		) {
			this.prevKeyframesDurations += this.keyframes[
				this.currentKeyframe
			].duration;
			this.currentKeyframe = Math.min(
				this.keyframes.length - 1,
				this.currentKeyframe + 1
			); // prevent out of bounds
			this.showCurrentWrappers();
		} else if (this.scrollTop < this.prevKeyframesDurations) {
			this.currentKeyframe = Math.max(0, this.currentKeyframe - 1); // prevent out of bounds
			this.prevKeyframesDurations -= this.keyframes[
				this.currentKeyframe
			].duration;
			this.showCurrentWrappers();
		}
	};

	showCurrentWrappers = () => {
		var i;

		if (this.keyframes[this.currentKeyframe].wrapper != this.currentWrapper) {
			this.currentWrapper.classList.remove("active");
			this.keyframes[this.currentKeyframe].wrapper.classList.add("active");
			this.currentWrapper = this.keyframes[this.currentKeyframe].wrapper;
			if (this.keyframes[this.currentKeyframe].keyframeStarted) {
				this.keyframes[this.currentKeyframe].keyframeStarted();
			}
		}
	};

	/*  Helpers
  -------------------------------------------------- */

	convertPercentToPx = (value, axis) => {
		if (typeof value === "string" && value.match(/%/g)) {
			if (axis === "y") value = (parseFloat(value) / 100) * this.windowHeight;
			if (axis === "x") value = (parseFloat(value) / 100) * this.windowWidth;
		}
		return value;
	};

	throwError = () => {
		console.log("errrrrooorrr 💥");
	};

	isTouchDevice = () => {
		return (
			"ontouchstart" in window || "onmsgesturechange" in window // works on most browsers
		); // works on ie10
	};

	start = () => {
		this.scrollHandler = this.updatePage;
		window.addEventListener("scroll", this.scrollHandler);
	};

	stop = () => {
		window.removeEventListener("scroll", this.scrollHandler);
	};
}
