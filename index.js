/**
 * https://github.com/atmulyana/reactjs-common
 */
'use strict';
const {proxyObject} = require('javascript-common');

function setRef(refProp, ref) {
    if (typeof(refProp) == 'function') refProp(ref);
    else if (refProp && typeof(refProp) == 'object') refProp.current = ref;
}

function extRefCallback(refProp, extRef, callback) {
    return ref => {
        let newRef = null;
        if (ref) {
            newRef = proxyObject(ref, extRef); //extendObject(ref, extRef)
        }
        else {
            //extendObject(null, extRef);
        }
        setRef(refProp, newRef);
        if (typeof(callback) == 'function') callback(newRef);
    }
}

if (typeof(module) == 'object' && module) module.exports = {
    setRef,
    extRefCallback
};