import React from 'react';
import { useSelector } from 'react-redux';
const PharmacyBills = () => {
    const pharmBill = useSelector(state=>state.PharmacyReducer.pharmBillRecords)
    return (
        <div>
            <div className='row p-2'>
                <div className='col-12 bg-white border'>
                    <div className='d-flex justify-content-between border-bottom p-2'>
                        <p className='h6'>Pharmacy Bill</p>
                    </div>
                    <div className='col-lg-4 col-md-6 col-sm-8 my-2'>
                        <input className='form-control' placeholder='Search...' />
                    </div>

                    {
                        pharmBill.length === 0
                        ?
                        <p className='h6 p-2'>No Bills recorded yet</p>
                        :
                        <table></table>
                    }
                </div>
            </div>
        </div>
    );
};

export default PharmacyBills;