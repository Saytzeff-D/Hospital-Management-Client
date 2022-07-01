import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

function BackgroundView() {
  const url = useSelector(state=>state.url)

    return (
        <div>
            <div className='banner animate__animated animate__pulse animate__faster'>
                <div className='d-flex justify-content-center pt-5'>
                    <div className='col-lg-9 text-white'>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BackgroundView;