import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './Resources/brain.png'

const Logo = () => {
    
    return (
        <div className='ml5 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 125, width: 125 }} >
                <div className='Tilt-inner brainlogo'>
                    <img className='' alt='logo' src={brain} />
                    <p className='signoutbutton hoverbutton signout link pointer madeby' style={{fontSize: '35px', marginTop: '8px'}}>{"(Made by Filip Boshevski)"}</p>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;