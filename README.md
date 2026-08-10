## **reactjs-common**

This package contains common items exist in some my projects. Although for my projects, it may be useful for you.
Things that can be imported from this package:

### `setRef(refProp, ref)`
It's useful when using `React.forwarRef` and you want to set the `ref` prop to a custom object.  
Parameters:
- `refProp` is `ref` prop value
- `ref` is an object that will be set as the reference of component

Usage:
```
    const WrapperComponent = React.forwardRef((props, ref) => {
        //Some your code..

        setRef(ref, {
            //Your custom object can contain any properties/methods you want
        });
        
        //One reason to use `setRef` is because the wrapped component is a function component
        return <FunctionComponent {...props} />
    })
```

### `extRefCallback(refProp, extRef, callback)`
It creates a callback function that can be set to a `ref` prop. The callback function will extend the
reference object returned by the component.   
Parameters:
- `refProp` is `ref` prop value
- `extRef` is the object containing all extension properties/methods or a function that returns that object.
  If it's a function then the its parameter is the original component reference object.
- `callback` is a function that will be called when the callback function (which is returned by `extRefCallback`)
  is called. This function has one parameter that is the `ref` object that has been extended.

It can be used in `React.forwardRef` like the following code:
```javascript
    const WrapperComponent = React.forwardRef((props, ref) => {
        //Some your code..

        const callbackRef = extRefCallback(ref, {
            //The object containing all extension properties/methods
        });
        
        return <NonFunctionComponent {...props} ref={callbackRef} />
    })
```
Or if the second parameter of `callbackRef` is a function, we may utilize the basic/original `ref` in the
extension object as the following example:
```javascript
    ...
        const callbackRef = extRefCallback(ref, basicRef => ({
            newProp: basicRef.prop ?? '', //a new prop example that needs to access the ref object of `NonFunctionComponent` 
            //... the rest of extension properties/methods
        }));
    ...
``` 

### `forwardRef`
It's a function which is the same as `React.forwarRef` if exists. If not exist, it's its polyfill.

> `React.forwarRef` has been deprecated since React 19

### Types for Flow
##### `Ref<Instance>`
It's the same as `React.RefSetter<Instance>`. Shorter name.

##### `RefCallback<Instance>`
It's a sub type of `React.RefSetter<Instance>`. It only defines the function type that can be set to `ref` prop.