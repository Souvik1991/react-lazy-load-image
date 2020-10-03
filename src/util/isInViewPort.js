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
// Checks the DOM node is in view port or not
// If the DOM node is present inside a scrollable container 
// It takes care of that taking the second argument as container
@param {domNode} element : REQUIRED : (Postion of the DOM node will be fetched)
@param {domNode} container : REQUIRED : (The scrollable container of the element)
*/
const isInViewPort = (element, container = undefined) => {
    // The element is hidden or not present is DOM
    if(!element || element.offsetParent === null){ 
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

export default isInViewPort;