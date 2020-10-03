/**
// Get the style of an element
@param {domNode} element : REQUIRED : (Dom node on which the style will be searched)
@param {string} prop : REQUIRED : (They style name you want to fetch)
*/
const getStyle = (element, prop) =>
    (typeof getComputedStyle !== 'undefined' && element instanceof Element)
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

export default isScrollable;