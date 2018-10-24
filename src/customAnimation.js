import * as easings from "./easings";

export default class Animate {
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
	constructor(options) {
		if (!options.target && !options.manipulator) {
			throw Error("An element or manipulator need to be specified in options.");
		}

		//Create manipulator function if element string is given
		let elementManipulator = null;
		if (options.target) {
			const elements = document.querySelectorAll(options.target);
			elementManipulator = (val, end) => {
				elements.forEach(el => {
					el.innerHTML = Math.floor(val);
				});
			};
		}

		this.reverse = !!options.reverse;
		this.startValue = this.reverse
			? Number(options.end)
			: Number(options.start);
		this.endValue = this.reverse ? Number(options.start) : Number(options.end);
		this.offset = Number(options.offset || 0);
		this.delay = Number(options.delay || 0);
		this.change = this.endValue - this.startValue;
		this.duration = Number(options.duration || 250);
		this.easing =
			options.customEasing ||
			(options.easing ? easings[options.easing] : easings.easeInOutExpo);
		this.manipulator = options.manipulator || elementManipulator;
		this.animation = null;
		this.resolved = false;
		this.state = "initialized"; // running || paused || finished
		this.initTimestamp = null;
		this.resolveFun = null;
	}

	/**
	 * @return {Promise}
	 *  A Promise that is resolved when the animation is finished
	 *  There are no ejects
	 */
	start = () => {
		return new Promise((resolve, reject) => {
			this.resolveFun = resolve;

			const animationRequest = timestamp => {
				this.animation = window.requestAnimationFrame(animationRequest);
				// running all animations in same request
				window.cudeAnimations.runningAnimations.forEach(a => {
					a.animationHandler(timestamp);
				});
				// if no running animations left
				if (window.cudeAnimations.runningAnimations.length === 0) {
					!!this.animation && cancelAnimationFrame(this.animation);
				}
			};

			// start like this to set init timestamp
			this.animation = window.requestAnimationFrame(timestamp => {
				timestamp += this.delay;
				this.initTimestamp = timestamp;
				this.state = "running";
				window.cudeAnimations.runningAnimations.push(this);
				// if the length is > than 1 it means that an animation
				// is already requesting keyframes,
				// and this one is automatically gonna be included
				if (window.cudeAnimations.runningAnimations.length === 1) {
					animationRequest(timestamp);
				}
			});
		});
	};

	resolveFunction = () => {
		this.resolved = true;
		!!this.resolveFun && this.resolveFun();
	};

	animationFinished = () => {
		this.manipulator(this.endValue);
		this.state = "finished";
		window.cudeAnimations.runningAnimations = window.cudeAnimations.runningAnimations.filter(
			a => a != this
		);
	};

	animationHandler = timestamp => {
		const td = timestamp - this.initTimestamp;
		const timeleft = this.duration - td;

		// resolve if time is of (offset subtracted)
		// means it can be resolved before animation is finished, because offset
		if (timeleft - this.offset <= 0 && !this.resolved) {
			this.resolveFunction();
		}

		if (timeleft <= 0) {
			this.animationFinished();
		} else if (td > 0) {
			const val = this.easing(td, this.startValue, this.change, this.duration);
			this.manipulator(val);
		}
	};
}
