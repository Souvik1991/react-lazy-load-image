import isScrollable from "./isScrollable";

/**
// Check if the element scroll is auto or scroll
// If creates a set of output and check if it has auto or scroll mentioned 
// This function called itself recursively until it found the scroll element 
// Else fallback to window scroll
@param {domNode} element : REQUIRED : (Dom node on which the style will be searched)
*/
export const findScrollElement = (element) => {
    if(
        element === document.body || element === document.documentElement || !element.parentNode
    ) return window;
    else if(isScrollable(element)) return element;

    return findScrollElement(element.parentNode)
};


/**
// Binding the different type of event based on the browser support
// Requires element, event type to bind and the callback
@param {domNode} el : REQUIRED : (Dom node on which the event will be binded)
@param {string} event : REQUIRED : (The type of event will be binded)
@param {function} fn : REQUIRED : (The callback function which will be called)
*/
export const bindEvent = (el, event, fn) => {
    el.addEventListener ? el.addEventListener(
        event, fn, false
    ) : el.attachEvent && el.attachEvent('on' + event, fn);
};

/** 
// Unbinding the different type of event based on the browser support
// Requires element, event type to unbind and the callback
@param {domNode} el : REQUIRED : (Dom node on which the event will be unbinded)
@param {string} event : REQUIRED : (The type of event will be unbinded)
@param {function} fn : REQUIRED : (The callback function which will be unbinded)
*/
export const unbindEvent = (el, event, fn) => {
    el.removeEventListener ? el.removeEventListener(
        event, fn
    ) : el.detachEvent && el.detachEvent('on' + event, fn);
};
