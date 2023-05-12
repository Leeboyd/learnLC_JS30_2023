// Given an asyncronous function fn and a time t in milliseconds, return a new time limited version of the input function.

/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */
var timeLimit = function(fn, t) {
	return async function(...args) {
            let timerId;
            let timeout = new Promise((resolve, reject) => {
                timerId = setTimeout(() => {
                clearTimeout(timerId);
                reject("Time Limit Exceeded");
            }, t)
        })

        let fnCall = fn(...args)
            .then(result => {
                return result;
            });


        return Promise.race([timeout, fnCall]);
    }
};

// let fn = async (n) => { 
//     await new Promise(res => setTimeout(res, 100)); 
//     return n * n; 
//   }
  
//   let limitedFn = timeLimit(fn, 150);
//   limitedFn(5).then(console.log).catch(console.log);