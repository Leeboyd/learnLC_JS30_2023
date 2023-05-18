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
    const now = new Date();
    const existing = Boolean(this.cache[key]);
    this.cache[key] = {
        value: value,
        expireTime: new Date(now.getTime() + duration)
    };
    return existing;
}

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function(key) {
    const now = new Date();
    if (this.cache[key] && this.cache[key].expireTime > now) {
        return this.cache[key].value;
    }
    return -1;
}

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function() {
    const now = new Date();
    return Object.values(this.cache).filter(item => item.expireTime > now).length;
}