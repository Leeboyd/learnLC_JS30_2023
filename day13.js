/**
 * @param {Function[]} functions
 * @param {number} n
 * @return {Function}
 */


var promisePool = async function(functions, n) {
    let activePromises = [];
    let currentIdx = 0;
  
    async function executeNext() {
        if (currentIdx >= functions.length) return;
        let promise = functions[currentIdx]();
        currentIdx += 1;
        await promise;
        activePromises = activePromises.filter(p => p !== promise);
        return executeNext()
    }
  
  
    while (activePromises.length < n && currentIdx < functions.length) {
        let promise = executeNext();
        activePromises.push(promise);
    }
  
    return Promise.all(activePromises);
  }
  
  /**
  * const sleep = (t) => new Promise(res => setTimeout(res, t));
  * promisePool([() => sleep(500), () => sleep(400)], 1)
  *   .then(console.log) // After 900ms
  */