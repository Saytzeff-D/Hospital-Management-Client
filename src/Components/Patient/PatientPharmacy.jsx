import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { patientPharmBill } from '../../actions';
import { PaystackButton } from 'react-paystack'
import axios from 'axios'

function PatientPharmacy(props) {
    const dispatch = useDispatch()
    const [amountToBePaid, setamountToBePaid] = useState();
    const url = useSelector(state=>state.UrlReducer.url)
    const pharmBills = useSelector(state=>state.PharmacyReducer.patientPharmBills)
    const patient = useSelector(state=>state.PatientReducer.patientDetails)
    const details = { paymentRef: `H${Math.ceil(Math.random()*1000)}M${Math.ceil(Math.random()*1000)}S${Math.ceil(Math.random()*1000)}`, paymentType: 'Pharmacy', healthId: patient.healthId }
    const [config, setconfig] = useState({
        reference: details.paymentRef, 
        email: patient.email, 
        amount: '1200.00', 
        publicKey: 'pk_test_bfe3a2fb617743847ecf6d9ea96e3153e2a1186d',
        billId: ''
    })


    const handlePaystackCloseAction = ()=>{}
    const componentProps = {
        ...config,
        text: `Pay ${amountToBePaid}`,
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    }
    const handlePaystackSuccessAction = (ref)=>{
        let obj={paymentRef:config.reference,paymentType:'Pharmacy',amount:config.amount,healthId:patient.healthId, billId: config.billId}
        console.log(obj)
        axios.post(`${url}patient/payPharmBill`,obj).then(res=>{
            if(res.data.message ==='Success'){
                window.location.reload()
            }
        }).catch(err=>console.log(err))
    }
    const setPaymentDetails = (amount, _id)=>{
        setconfig({...config, amount: amount + '00', billId: _id, reference: `H${Math.ceil(Math.random()*1000)}M${Math.ceil(Math.random()*1000)}S${Math.ceil(Math.random()*1000)}`})
        setamountToBePaid(amount)
    }

    useEffect(()=>{
        dispatch(patientPharmBill(url, {healthId: patient.healthId}))
    }, [dispatch])
    return (
        <div>
            <div className='row m-3 pt-3'>
                <div className='col-12 border bg-white rounded-lg shadow-lg'>
                    <div className='border-bottom p-2'>
                    <p className='p-1 h6 text-dark'>Pharmacy Bills</p>
                    </div>
                    <div>
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
                                        <th>PatientId</th>
                                        <th>Date Created</th>
                                        <th>Doctor Name</th>
                                        <th>Amount($)</th>
                                        <th>Paid Amount($)</th>
                                        <th>Due Amount($)</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pharmBills.map((bills, i)=>(
                                            <tr key={i}>
                                                <td> {bills.billNo} </td>
                                                <td> {bills.healthId} </td>
                                                <td> {bills.created} </td>
                                                <td> {bills.doctorName} </td>
                                                <td> {bills.amount} </td>
                                                <td> {bills.paidAmount} </td>
                                                <td> {bills.amount - bills.paidAmount} </td>
                                                <td>
                                                     <div className='d-flex jsutify-content-between'>
                                                        {
                                                            !bills.paymentStatus
                                                            &&
                                                            <button data-toggle='modal' data-target='#payModal' className='btn text-success' onClick={()=>setPaymentDetails(bills.amount, bills._id)}>
                                                                    <FontAwesomeIcon
                                                                      icon='credit-card' 
                                                                    />
                                                            </button>
                                                        }
                                                        <button
                                                         className='btn text-warning'
                                                         >
                                                             <FontAwesomeIcon icon='bars' 
                                                             /> 
                                                        </button>
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

            {/* Modal */}
            <div className="modal fade" id='payModal'>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header h4 text-dark">
                            Bill Payment
                        </div>
                        <div className="modal-body h6 text-dark">
                            Are you sure you want to pay for this bill?
                        </div>
                        <div className="modal-footer">
                        <PaystackButton
                            {...componentProps} 
                            className='btn btn-success'
                            >
                        </PaystackButton>
                            <button className='btn btn-dark' data-dismiss="modal" >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientPharmacy;