import React from 'react'
import './ImageLinkForm.css';

const ImageLinkForm = ({oninputchange, setImageUrl}) => {
    return (
        <div>
            <p className='f3 descr'>
                {'This Magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className='center'>
                <div className='center w-70 form pa4 br3 shadow-5'>
                    <input className='f4 pad2 w-70 center' type ='text' onChange={oninputchange}/>
                    <button className='hoverbutton w-25 f4 ph3 pv2 white detect' onClick={setImageUrl} style={{textShadow: '1px 1px 3px #000000'}}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;