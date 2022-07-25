import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allPharmBillRecords } from '../../actions';
const PharmacyBills = () => {
    const dispatch = useDispatch()
    const url = useSelector(state=>state.UrlReducer.url)
    const pharmBill = useSelector(state=>state.PharmacyReducer.pharmBillRecords)
    const reducerError = useSelector(state=>state.PharmacyReducer.reducerError)

    useEffect(()=>{
        dispatch(allPharmBillRecords(url))
    }, [dispatch])
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
                        reducerError === 'Loading'
                        ?
                        (<div className='my-2'><p className='spinner-border text-danger'></p></div>)
                        :
                        reducerError === 'AxiosError'
                        ?
                        (<div className='alert alert-danger h6 my-2'> <FontAwesomeIcon icon='triangle-exclamation'/> Unable to fetch from the server</div>)
                        :
                        (
                            pharmBill.length === 0
                            ?
                            <p className='h6 p-2'>No Bills recorded yet</p>
                            :
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
                                        pharmBill.map((bills, i)=>(
                                            <tr>
                                                <td> {bills.billNo} </td>
                                                <td> {bills.healthId} </td>
                                                <td> {bills.created} </td>
                                                <td> {bills.doctorName} </td>
                                                <td> {bills.amount} </td>
                                                <td> {bills.paidAmount} </td>
                                                <td> {bills.amount - bills.paidAmount} </td>
                                                <td>
                                                        <button classname='btn btn-dark'> <FontAwesomeIcon icon='bars' /> </button>
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
};

export default PharmacyBills;