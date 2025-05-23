/**
 * https://github.com/atmulyana/reactjs-common
 */
import * as React from 'react';

export type Ref<T> = React.Ref<T>;

/**
 * It's useful when using `React.forwarRef` and you want to set the `ref` prop to a custom object.
 * Usage:
 * 
 *      const WrapperComponent = React.forwardRef((props, ref) => {
 *          //Some your code..
 * 
 *          setRef(ref, {
 *              //Your custom object can contain any properties/methods you want
 *          });
 *          
 *          //One reason to use `setRef` is because the wrapped component is a function component
 *          return <FunctionComponent {...props} />
 *      })
 * 
 * @param refProp is `ref` prop value 
 * @param ref is an object that will be set as the reference of component
 */
export function setRef<Instance>(
    refProp: Ref<Instance>,
    ref: Instance | null
): void;

/**
 * It creates a callback function that can be set to a `ref` prop. The callback function will extend the
 * reference object returned by the component. It can be used in `React.forwardRef` like the following code:
 * 
 *      const WrapperComponent = React.forwardRef((props, ref) => {
 *          //Some your code..
 * 
 *          const callbackRef = extRefCallback(ref, {
 *              //The object containing all extension properties/methods
 *          });
 *          
 *          return <NonFunctionComponent {...props} ref={callbackRef} />
 *      })
 * 
 * @param refProp is `ref` prop value
 * @param extRef is the object containing all extension properties/methods or a function that returns that object.
 *               If it's a function then the its parameter is the original component reference object.
 * @param callback is a function that will be called when the callback function (which is returned by `extRefCallback`)
 *                 is called. This function has one parameter that is the `ref` object that has been extended.
 */
export function extRefCallback<T, P>(
    refProp: Ref<T & P>,
    extRef: P | ((ref: T) => P),
    callback?: (ref: T & P) => any
): (instance: T | null) => void;