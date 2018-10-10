import "./polyfills";
import ScrollAnimator from "./scrollAnimation";
import Animate from "./customAnimation";
import { promiseSequence, runAnimationSequence } from "./helperFunctions";

if (typeof window !== "undefined") {
	window.cudeAnimations = {
		ScrollAnimator,
		Animate,
		promiseSequence,
		runAnimationSequence,
		runningAnimations: []
	};
}

export { ScrollAnimator, Animate, promiseSequence, runAnimationSequence };
