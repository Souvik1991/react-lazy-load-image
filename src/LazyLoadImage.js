import React, {useState, useEffect, useRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import debounce from "debounce-promise";

import { findScrollElement, bindEvent, unbindEvent, isInViewPort} from "./util";

const LazyLoadImage = (props) => {
    const {
        className,
        height,
        width,
        placeholder,
        src,
        alt,
        onContentLoaded,
        onContentVisible,
        debounceDelay
    } = props;
    // Creating reference of the image node
    const image = useRef();
    // Creating the reference of the scrollable node of the element
    const scrollNode = useRef();
    // Creating a reference of the component unmount
    // So that we can prevent the updation of state variable
    const componentUnmountedRef = useRef(false);
    // Creating the style object for the image using height and width
    const styleObj = {height, width};
    // Defining few state variables
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState(placeholder);

    // This function start loading the image once it is in view port
    // Once the image is loaded it will set the loaded state variable
    // As well as the src of the image and call the content load callback
    const startLoading = (src) => {
        if(isVisible) return;

        const newImg = new Image();
        newImg.onload = () => {
            if(!componentUnmountedRef.current){
                setIsLoaded(true);
                setImageSrc(src);
                if(onContentLoaded instanceof Function) setTimeout(() => {
                    onContentLoaded();
                });
            }
        };
        
        // handle failure
        newImg.onerror = () => {
            console.log(src, "couldn't be loaded");
        };
        // console.log(src);
        newImg.src = src;
    };

    // This function checks if the element is in view port
    // If it's in viewport it set the visitble state variable to true
    // It start loading the image and
    // Also calls the content visible callback function
    // It also unbind all the event so that we can reduce the load on the browser 
    // To reduce the load on the browser this function get executed in delay of
    // debounceDelay variable value default is 500ms 
    const handleScrollResize = useCallback(
        debounce(() => {
            if(isVisible) return;
            const inViewPort = isInViewPort(image.current, scrollNode.current);
            if(inViewPort && !componentUnmountedRef.current){
                setIsVisible(true);
                startLoading(src);
                // Unbinding the event to reduce the browser load as soon the content is visible
                unbindEvent(window, 'resize', handleScrollResize);
                unbindEvent(scrollNode.current, 'scroll', handleScrollResize);
                // console.log(1, image.current);
                if(onContentVisible instanceof Function) setTimeout(() => {
                    onContentVisible();
                });
            }
        }, debounceDelay)
    , [src, isVisible, onContentVisible, startLoading]);
    
    // This useeffect takes care of the content mount and unmount both
    // As the component unmount it unbind the event as well as set the  
    // componentUnmountedRef variable value so that 
    // we can stop updating the state variable
    useEffect(() => {
        componentUnmountedRef.current = false;
        if(isLoaded || !image.current) return;

        if(!scrollNode.current)
            scrollNode.current = findScrollElement(image.current);
        
        setTimeout(() => {
            handleScrollResize();
        });
        bindEvent(window, 'resize', handleScrollResize);
        bindEvent(scrollNode.current, 'scroll', handleScrollResize);
        return () => {
            componentUnmountedRef.current = true;
            unbindEvent(window, 'resize', handleScrollResize);
            unbindEvent(scrollNode.current, 'scroll', handleScrollResize);
        }
    }, [isLoaded, handleScrollResize]);

    // If the src get change reset the state variable
    // So this component can reinitialize itself
    useEffect(() => {
        setImageSrc(placeholder);
        setIsVisible(false);
        setIsLoaded(false);
    }, [src, placeholder]);

    return (
        <img 
            style={styleObj}
            ref={image}
            src={imageSrc}
            className={className}
            alt={alt}
        />
    )
};

LazyLoadImage.propTypes = {
    className: PropTypes.string,
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    placeholder: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    onContentLoaded: PropTypes.func,
    onContentVisible: PropTypes.func,
    debounceDelay: PropTypes.number
};

LazyLoadImage.defaultProps = {
    alt: 'Lazy loaded image',
    debounceDelay: 500
};

export default LazyLoadImage;