import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { patientPharmBill } from '../../actions';

function PatientPharmacy(props) {
    const dispatch = useDispatch()
    const url = useSelector(state=>state.UrlReducer.url)
    const pharmBills = useSelector(state=>state.PharmacyReducer.patientPharmBills)
    const patient = useSelector(state=>state.PatientReducer.patientDetails)

    useEffect(()=>{
        dispatch(patientPharmBill(url, {healthId: patient.healthId}))
    }, [dispatch])
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
                            <table className='table table-white table-striped table-responsive'>
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
                                            <tr>
                                                <td> {bills.billNo} </td>
                                                <td> {bills.healthId} </td>
                                                <td> {bills.created} </td>
                                                <td> {bills.doctorName} </td>
                                                <td> {bills.amount} </td>
                                                <td> {bills.paidAmount} </td>
                                                <td> {bills.amount - bills.paidAmount} </td>
                                                <td>
                                                     <div className='d-flex jsutify-content-between'>
                                                        <button className='btn btn-success'><FontAwesomeIcon icon='credit-card' /></button>
                                                        <button classname='btn btn-dark'> <FontAwesomeIcon icon='bars' /> </button>
                                                     </div> 
                                                </td>
                                            </tr>
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