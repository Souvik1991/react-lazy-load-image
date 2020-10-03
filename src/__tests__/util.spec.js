import isScrollable from "../util/isScrollable";
import isInViewPort from "../util/isInViewPort";
import {bindEvent, unbindEvent, findScrollElement} from "../util/util";

describe("UTIL functions >>", () => {
    it("isScrollable >> returns false as the element is not scrollable", () => {
        const element = {
            style: {
                "overflow": "hidden",
                "overflow-y": "hidden", 
                "overflow-x": "hidden"
            }
        };
        expect(isScrollable(element)).toEqual(false);
    });

    it("isScrollable >> returns true as the element overflow is auto", () => {
        const element = {
            style: {
                "overflow": "auto",
                "overflow-y": "hidden", 
                "overflow-x": "hidden"
            }
        };
        expect(isScrollable(element)).toEqual(true);
    });

    it("isScrollable >> returns true as the element overflow-y is scrollable", () => {
        const element = {
            style: {
                "overflow": "hidden",
                "overflow-y": "scroll", 
                "overflow-x": "scroll"
            }
        };
        expect(isScrollable(element)).toEqual(true);
    });

    it("isInViewPort >> returns false if there is not element or element.offsetParent is null", () => {
        expect(isInViewPort(null)).toEqual(false);
        expect(isInViewPort({
            offsetParent: null
        })).toEqual(false);
    });

    it("isInViewPort >> element.getBoundingClientRect function will be called", () => {
        const callFunction = jest.fn(() => ({top: 100, left: 100}));
        const element = {
            getBoundingClientRect: callFunction,
            elementWidth: 100,
            offsetHeight: 100,
            offsetWidth: 100,
            offsetParent: true
        };
        isInViewPort(element);
        expect(callFunction.mock.calls.length).toEqual(1);
    });

    it("isInViewPort >> The element is in window view port should be true", () => {
        const element = {
            getBoundingClientRect: () => ({top: 10, left: 10}),
            elementWidth: 100,
            offsetHeight: 100,
            offsetWidth: 100,
            offsetParent: true
        };
        expect(isInViewPort(element)).toBe(true);
    });

    it("isInViewPort >> The element is out of the window view port should be false", () => {
        const element = {
            getBoundingClientRect: () => ({
                top: window.innerHeight + 10, 
                left: 10
            }),
            elementWidth: 100,
            offsetHeight: 100,
            offsetWidth: 100,
            offsetParent: true
        };
        expect(isInViewPort(element)).toBe(false);
    });

    it("isInViewPort >> The element is in the view port of the container should be true", () => {
        const element = {
            getBoundingClientRect: () => ({
                top: 10, 
                left: 10
            }),
            elementWidth: 100,
            offsetHeight: 100,
            offsetWidth: 100,
            offsetParent: true
        };
        const container = {
            getBoundingClientRect: () => ({
                top: 0, 
                left: 0
            }),
            offsetHeight: 768,
            offsetWidth: 1024
        };

        expect(isInViewPort(element, container)).toBe(true);
    });

    it("isInViewPort >> The element is outside of the container should be false", () => {
        const element = {
            getBoundingClientRect: () => ({
                top: 800, 
                left: 10
            }),
            elementWidth: 100,
            offsetHeight: 100,
            offsetWidth: 100,
            offsetParent: true
        };
        const container = {
            getBoundingClientRect: () => ({
                top: 0, 
                left: 0
            }),
            offsetHeight: 768,
            offsetWidth: 1024
        };

        expect(isInViewPort(element, container)).toBe(false);
    });

    it("findScrollElement >> should return window if there is not parentNode", () => {
        expect(findScrollElement({
            parentNode: null
        })).toBe(global.window);
    });

    it("findScrollElement >> should be called recursively and return window", () => {
        expect(findScrollElement({
            style: {
                "overflow": "hidden",
                "overflow-y": "hidden", 
                "overflow-x": "hidden"
            },
            parentNode: {
                style: {
                    "overflow": "hidden",
                    "overflow-y": "hidden", 
                    "overflow-x": "hidden"
                }
            }
        })).toBe(global.window);
    });

    it("findScrollElement >> should be called recursively and return child Node", () => {
        const parentNode = {
            style: {
                "overflow": "auto",
                "overflow-y": "hidden", 
                "overflow-x": "hidden"
            },
            parentNode: {}
        };
        const output = findScrollElement({
            style: {
                "overflow": "hidden",
                "overflow-y": "hidden", 
                "overflow-x": "hidden"
            },
            parentNode
        })
        expect(output).toBe(parentNode);
    });

    it("bindEvent >> bindEvent function call check", () => {
        const callBackFunction = jest.fn();
        bindEvent({
            addEventListener: jest.fn()
        }, 'click', callBackFunction);
        bindEvent({
            attachEvent: jest.fn(),
        }, 'click', callBackFunction);
    });

    it("unbindEvent >> unbindEvent function", () => {
        const callBackFunction = jest.fn();
        unbindEvent({
            removeEventListener: jest.fn()
        }, 'click', callBackFunction);
        unbindEvent({
            detachEvent: jest.fn(),
        }, 'click', callBackFunction);
    });
});