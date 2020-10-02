Lazy Load Image Component using React Hook
=========================

Lazy Load any Image using this easy to use React Component. It uses React Hooks out of the box, takes care of component unmount. It prevents the state variable update once the React Component is unmounted.

It's fast, easy on the browser, works in IE8+, 7KB minified. It uses the debounce function by default.

It automatically detects the container which is scrollable and binds scroll event with it. 

[![build status](https://img.shields.io/travis/Souvik1991/react-lazy-load-image.svg?style=flat-square)](https://travis-ci.org/github/Souvik1991/react-lazy-load-image)
[![dependency status](https://david-dm.org/Souvik1991/react-lazy-load-image.svg?style=flat-square)](https://david-dm.org/Souvik1991/react-lazy-load-image)
[![npm downloads](https://img.shields.io/npm/dm/react-lazy-load-image.svg?style=flat-square)](https://www.npmjs.com/package/@souvik1991/react-lazy-load-image)

## Installation
React Lazy Load requires **React 16.13 or later.**
```
npm install @souvik1991/react-lazy-load-image --save
```

## Usage

```jsx
import React from 'react';
import LazyLoadImage from "@souvik1991/react-lazy-load-image";


```

## Props

### placeholder
Type: `String` Required: `Yes`

The `placeholder` is a required props for the plug-in to work. This accept the placeholder image source which will be disaplayed until the image appear in view port. It will also be displayed until the image is loaded.

### src
Type: `String` Required: `Yes`

The `src` is a required props for the plug-in to work. This accept the original source of the image which will be loaded once the image is in view port.

### alt
Type: `String` Default: `Lazy loaded image`

The required `alt` attribute specifies an alternate text for an image, if the image cannot be displayed. The `alt` attribute provides alternative information for an image if a user for some reason cannot view it (because of slow connection, an error in the src attribute, or if the user uses a screen reader).

### height
Type: `String|Number`

This is used to set the elements height even when it has no content.

### width
Type: `String|Number`

This is used to set the elements width even when it has no content.

### onContentVisible
Type `Function`

A callback function to execute when the content appears on the screen.

### onContentLoaded
Type `Function`

A callback function to execute when the content is loaded.

### debounceDelay
Type `Number` Default: `500`

The debounce is managed by an internal function that prevents performance issues from continuous firing of `scroll` events. Using a debounce will set a small timeout when the user scrolls and will keep debouncing until the user stops. The default is `500` milliseconds.