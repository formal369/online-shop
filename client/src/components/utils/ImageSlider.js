import React, { useState, useEffect } from 'react';
import { Carousel } from 'antd';

const ImageSlider = (props) => {
    if(!props.images) return null;

    
    console.log('props', props.images)

    return (
        <div>
            <Carousel autoplay>
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '150px' }}  src={`http://localhost:5000/${image}`} alt="productImage" />
                    </div>
                ))}
            </Carousel>
        </div>
    );
    
};

export default ImageSlider;