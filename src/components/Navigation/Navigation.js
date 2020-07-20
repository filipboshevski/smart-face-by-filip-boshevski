import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn, clearUser}) => {
    const signOut = () => {
        clearUser();
        onRouteChange('signin');
    }
    
    if (isSignedIn) {
        return (
            <nav className='' style={{display: 'flex', justifyContent: 'flex-end', marginRight:'30px'}}>
                <p className='signoutbutton hoverbutton signout link pointer' onClick={signOut}>(Sign Out)</p>
            </nav>
        )
    } else {
        return (
            <nav className='' style={{display: 'flex', justifyContent: 'flex-end', marginRight:'30px'}}>
                <p className='signoutbutton hoverbutton signout link pointer ph4' onClick={() => onRouteChange('signin')}>(Sign In)</p>
                <p className='signoutbutton hoverbutton signout link pointer' onClick={() => onRouteChange('register')}>(Register)</p>
            </nav>
        )
    }
}

export default Navigation;