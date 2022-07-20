import React from 'react';

const PrescriptionList = () => {
    return (
        <div>
            <div className='row p-2'>
                <div className='col-12 bg-white border'>
                <div className='border-bottom py-2'>
                    <p className='h6'>Prescription List</p>
                </div>
                <div className='col-lg-4 col-md-6 col-sm-8 my-2'>
                    <input className='form-control' placeholder='Search...' />
                </div>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionList;