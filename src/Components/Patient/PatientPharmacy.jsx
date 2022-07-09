import React from 'react';
import { useSelector } from 'react-redux';

function PatientPharmacy(props) {
    const pharmBills = useSelector(state=>state.PatientReducer.pharmBills)
    return (
        <div>
            <div className='row m-3 pt-3'>
                <div className='col-12 border bg-white'>
                    <div className='border-bottom p-2'>
                    <p className='p-1 h6'>Pharmacy Bills</p>
                    </div>
                    <div clasName=''>
                       <input className='form-control col-lg-4 col-md-6 col-sm-8 mt-2' placeholder='Search...' />
                    </div>
                    {
                        pharmBills.length === 0 
                        ?
                        (<p className='h6 p-3'>No recent bills. Thank you.</p>)
                        :
                        (
                            <table className='table table-white table-striped table-rsponsive'>
                                <thead>
                                    <tr>
                                        <th>Bill No</th>
                                        <th>Patient Id</th>
                                        <th>Date Created</th>
                                        <th>Doctor Name</th>
                                        <th>Amount $</th>
                                        <th>Paid Amount $</th>
                                        <th>Balance Amount $</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pharmBills.map((bills, i)=>(
                                            <tr></tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default PatientPharmacy;