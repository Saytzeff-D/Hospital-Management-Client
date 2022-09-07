import React from 'react';

const WildCard = () => {
    return (
        <div>
            <div className='not-found-page p-5'>
                <p className='display-1 font-weight-bold text-warning'>Page not found.</p>
                <a href='/' className='text-white font-weight-bold h6' ><i className='fa fa-arrow-left'></i> Go back home </a>
            </div>
        </div>
    );
};

export default WildCard;