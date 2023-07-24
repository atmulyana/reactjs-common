/**
 * https://github.com/atmulyana/reactjs-common
 */
'use strict';
import {proxyObject} from 'javascript-common';

export function setRef(refProp, ref) {
    if (typeof(refProp) == 'function') refProp(ref);
    else if (refProp && typeof(refProp) == 'object') refProp.current = ref;
}

export function extRefCallback(refProp, extRef) {
    return ref => {
        if (ref) {
            setRef(
                refProp,
                proxyObject(ref, extRef)
                //extendObject(ref, extRef)
            );
        }
        else {
            //extendObject(null, extRef);
            setRef(refProp, null);
        }
    }
}