import React from 'react';
import './Rank.css';

const Rank = ({username, userEntries}) => {
    return(
        <div className='pa1'>
            <div className='white f3 text pa2'>
                {`${username}, your current rank is...`}
            </div>
            <div className='white f2 text'>
                {userEntries}
            </div>
        </div>
    )
}

export default Rank;