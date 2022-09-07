import React from 'react';
import { Outlet } from 'react-router-dom';

function BackgroundView() {

    return (
        <div>
            <div className='carousel slide carousel-fade' data-ride='carousel' data-interval='5000'>
                <div className='carousel-inner'>
                    <div className='carousel-item active' id='c-one'></div>
                    <div className='carousel-item' id='c-two'></div>
                    <div className='carousel-item' id='c-three'></div>
                </div>
            </div>
            <div className='d-flex justify-content-center py-5'>
                <div className='col-lg-9 text-white'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default BackgroundView;