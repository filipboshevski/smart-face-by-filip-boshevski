import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageURL}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2' id='imagediv'>
            </div>
        </div>
    )
}

export default FaceRecognition;