// Given a function fn, return a memoized version of that function.

// A memoized function is a function that will never be called twice with the same inputs. Instead it will return a cached value.

/** 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 
 */

 let callCount = 0;
 function memoize(fn) {
     let cache = {};
 
     return function(...args) {
         let key = JSON.stringify(args);
         if (cache[key] !== undefined) {
             return cache[key];
         } else {
             callCount++;
             let result = fn(...args);
             cache[key] = result;
             return result;
         }
     };
 }
 
  
  let add = (a, b, c) => a + b + c;
  let memoizedAdd = memoize(add);
  
  console.log(memoizedAdd(1, 2, 3)); // Outputs 6, Function has been called 1 times
  console.log(memoizedAdd(1, 2, 3)); // Outputs 6
  console.log(memoizedAdd(2, 3, 4)); // Outputs 9, Function has been called 2 times
  