import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import LazyLoadImage from "../LazyLoadImage";
// import * as UtilModule from '../util'; 
// jest.mock('../util');

describe("LazyLoadImage Compoenent >> ", () => {
    let wrapper;
    let index = 0;
    const mediaUrl = [
        "https://apod.nasa.gov/apod/image/2009/LightningStorm_Randall_1080.jpg",
        "https://apod.nasa.gov/apod/image/2009/CygnusFilament_HubbleShatz_1080.jpg"
    ];

    beforeEach(() => {
        // UtilModule.isInViewPort.mockReturnValue(true);
        // UtilModule.findScrollElement.mockReturnValue(global.window);
        // UtilModule.bindEvent.mockImplementation(jest.fn());
        // UtilModule.unbindEvent.mockImplementation(jest.fn());

        wrapper = shallow(
            <LazyLoadImage 
                height={100}
                width={100}
                className={'test-image'}
                alt={'Test Image Load'}
                placeholder={'placeholder.jpg'}
                src={mediaUrl[index]}
                onContentLoaded={() => {
                    console.log('Image loaded')
                }}
                onContentVisible={() => {
                    console.log('Image visible')
                }}
                debounceDelay={0}
            />
        );
    });

    it("Attributes are getting set properly", () => {
        const imageProps = wrapper.find('img').props();
        expect(imageProps.style.height).toBe(100);
        expect(imageProps.style.width).toBe(100);
        expect(imageProps.className).toBe('test-image');
        expect(imageProps.alt).toBe('Test Image Load');
        expect(imageProps.src).toBe('placeholder.jpg');
    });

    // afterEach(() => {
    //     jest.restoreAllMocks();
    // });
});