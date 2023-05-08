function once(fn) {
  let hasBeenCalled = false;

  return function(...args) {
    if (!hasBeenCalled) {
      hasBeenCalled = true;
      return fn(...args);
    }
    return undefined;
  };
}

const fn = (a, b, c) => a + b + c;
const fnOnce = once(fn);

console.log(fnOnce(1, 2, 3));  // Outputs 6
console.log(fnOnce(2, 3, 6));  // Outputs undefined, as the function has been called once before.
