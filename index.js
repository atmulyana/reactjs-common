/**
 * https://github.com/atmulyana/reactjs-common
 */
'use strict';
const {proxyObject} = require('javascript-common');
const React = require('react');

function setRef(refProp, ref) {
    if (typeof(refProp) == 'function') refProp(ref);
    else if (refProp && typeof(refProp) == 'object') refProp.current = ref;
}

function extRefCallback(refProp, extRef, callback) {
    return ref => {
        let newRef = null;
        if (ref) {
            let $extRef = (typeof(extRef) == 'function') ? extRef(ref) : extRef;
            newRef = proxyObject(ref, $extRef); //extendObject(ref, $extRef)
        }
        else {
            //let $extRef = (typeof(extRef) == 'function') ? extRef(null) : extRef;
            //extendObject(null, $extRef);
        }
        setRef(refProp, newRef);
        if (typeof(callback) == 'function') callback(newRef);
    }
}

const forwardRef = typeof(React.forwardRef) == 'function' ? React.forwardRef : function(render) {
    const fnRender = function({ref, ...props}) {
        return render(props, ref);
    }
    fnRender.displayName = render.displayName;
    fnRender.propTypes = render.propTypes;
    return fnRender;
};

module.exports = {
    extRefCallback,
    forwardRef,
    setRef,
};