/**
// Get the style of an element
@param {domNode} element : REQUIRED : (Dom node on which the style will be searched)
@param {string} prop : REQUIRED : (They style name you want to fetch)
*/
const getStyle = (element, prop) =>
    typeof getComputedStyle !== 'undefined'
    ? getComputedStyle(element, null).getPropertyValue(prop)
    : element.style[prop];

/**
// Check if the element scroll is auto or scroll
// If creates a set of output and check if it has auto or scroll mentioned 
@param {domNode} element : REQUIRED : (Check the DOM node is scrollable or not)
*/
const isScrollable = (element) => {
    const overflowArray = new Set([
        ...getStyle(element, 'overflow-y').split(' '), 
        ...getStyle(element, 'overflow-x').split(' '), 
        ...getStyle(element, 'overflow').split(' '), 
    ]);
    return overflowArray.has('auto') || overflowArray.has('scroll');
};

/**
// Get the position of the elment
// It also add window scrll top as well to get the precise position
@param {domNode} element : REQUIRED : (Postion of the DOM node will be fetched)
*/
const getElementPosition = (element) => {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset,
    };
};

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
// Checks the DOM node is in view port or not
// If the DOM node is present inside a scrollable container 
// It takes care of that taking the second argument as container
@param {domNode} element : REQUIRED : (Postion of the DOM node will be fetched)
@param {domNode} container : REQUIRED : (The scrollable container of the element)
*/
export const isInViewPort = (element, container = undefined) => {
    // The element is hidden
    if(element.offsetParent === null){ 
        return false;
    }

    const elementPosition = getElementPosition(element);
    const {
        top: elementTop, 
        left: elemenLeft
    } = elementPosition;
    const {
        offsetWidth: elementWidth, 
        offsetHeight: elementHeight
    } = element;

    if(container === undefined || container === window){
        const {
            innerHeight, 
            innerWidth, 
            pageYOffset: containerTop, 
            pageXOffset: containerLeft
        } = window;
        const containerBottom = containerTop + innerHeight;
        const containerRight = containerLeft + innerWidth;

        return (
            containerTop <= elementTop &&
            containerBottom >= elementTop + elementHeight &&
            containerLeft <= elemenLeft &&
            containerRight >= elemenLeft + elementWidth
        )
    }
    else{
        const containerPosition = getElementPosition(container);
        const {
            top: containerTop, 
            left: containerLeft
        } = containerPosition;
        const containerBottom = containerTop + container.offsetHeight;
        const containerRight = containerLeft + container.offsetWidth;

        return (
            containerTop <= elementTop &&
            containerBottom >= elementTop + elementHeight &&
            containerLeft <= elemenLeft &&
            containerRight >= elemenLeft + elementWidth
        )
    }
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