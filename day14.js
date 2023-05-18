var TimeLimitedCache = function() {
    this.cache = {};
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {
    // const now = Date.now();
    let now = new Date();
    now.setTime(now.getTime()+duration);
    const isExist = this.cache[key] && (this.cache[key].expireTime < now.getTime()) ? true : false;
    this.cache[key] = {
        value,
        expireTime: now.getTime(),
    }
    return isExist;
};

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function(key) {
    const item = this.cache[key];
    if (item && (item.expireTime >= (new Date()).getTime())) {
        return item.value;
    } else {
        delete this.cache[key];
        return -1;
    }
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function(key) {
    // const now = Date.now();
    // let count = 0;
    // for (let key in this.cache) {
    //     if (this.cache[key].expireTime > now) {
    //         count++;
    //     } else {
    //         delete this.cache[key];
    //     }
    // }
    // return count;
    let time = (new Date()).getTime();
    let notExpired = Object.keys(this.cache).filter(key => {
        if(this.cache[key].expireTime >= time) return true;
        else return false;
    })
    return notExpired.length;
}

var obj = new TimeLimitedCache()
console.log(obj.set(1, 42, 1000)); // false
console.log(obj.get(1)); // 1