var promisePool = async function(functions, n) {
    let index = 0;

    async function callNext() {
        const curFunction = functions[index];
        if (curFunction) {
            index++;
            await curFunction();
            return callNext();
        }
    }

    return Promise.all(new Array(n).fill().map(callNext));
};

/**
 *Just to summarize, the key points of this solution are:
 *
 *Using an array of size n to initiate the 'pool' of concurrently running promises.
 *Using a recursive function to handle executing the next function in the array, ensuring that the number of active promises never exceeds the limit.
 *Taking advantage of the nature of Promise.all to handle the management of active promises and ensuring all promises complete before the function resolves.
 */