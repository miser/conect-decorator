function conectDecorator(fn, callbacks) {
    let originFn = fn;
    let result, fns;
    if (typeof callbacks === 'function') {
        fns = [];
        fns.push(callbacks);
    } else if (!Array.isArray(callbacks)) {
        throw new Error('callbacks is not function or array')
    } else {
        fns = callbacks;
    }
    return function () {
        var args = Array.prototype.slice.call(arguments);
        for (let i = 0; i < fns.length; i++) {
            if (typeof fns[i] !== 'function') {
                continue;
            }
            result = fns[i].apply(this, args.concat(result))
        }
        return originFn.apply(this, args.concat(result));
    }
}

module.exports = conectDecorator;
export default conectDecorator;