/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */

var throttle = function(fn, t) {
    let lastCallTime = 0;
    let timer;
    let lastArgs;
    return function(...args) {
        lastArgs = args;
        if (!timer) {
            let now = Date.now();
            let durationFromLastCall = now - lastCallTime;

            if (durationFromLastCall >= t) {
                lastCallTime = now;
                fn.apply(this, lastArgs);
            } else {
                timer = setTimeout(() => {
                    timer = null;
                    lastCallTime = Date.now();
                    fn.apply(this, lastArgs);
                }, t - durationFromLastCall);
            };
        };
    };
  };