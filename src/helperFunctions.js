// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export const debounce = (func, wait, immediate) => {
	var timeout;
	return () => {
		var context = this, args = arguments;
		var later = () => {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export const throttle = function(func, limit) {
  var inThrottle,
    lastFunc;
  return function() {
    var context = this,
      args = arguments;
    if (inThrottle) {
      clearTimeout(lastFunc);
      return lastFunc = setTimeout(function() {
        func.apply(context, args);
        inThrottle = false;
      }, limit);
    } else {
      func.apply(context, args);
      inThrottle = true;
      return setTimeout(function() {
        return inThrottle = false;
      }, limit);
    }
  };
};
