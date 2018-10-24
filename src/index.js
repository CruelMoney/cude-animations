import "./polyfills";
import ScrollAnimator, { addOnScroll, removeOnScroll } from "./scrollAnimation";
import Animate from "./customAnimation";
import { promiseSequence, runAnimationSequence } from "./helperFunctions";

if (typeof window !== "undefined") {
	window.cudeAnimations = {
		ScrollAnimator,
		Animate,
		promiseSequence,
		runAnimationSequence,
		runningAnimations: [],
		addOnScroll,
		removeOnScroll
	};
}

export {
	ScrollAnimator,
	Animate,
	promiseSequence,
	runAnimationSequence,
	addOnScroll,
	removeOnScroll
};
