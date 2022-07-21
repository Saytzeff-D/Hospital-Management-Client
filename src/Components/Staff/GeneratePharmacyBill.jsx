import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const GeneratePharmacyBill = (props)=> {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [testInputArr, setTestInputArr] = useState([0])
    const [prescription, setPrescription] = useState({prescribedMedicine: []})

    const clickGenerate = ()=>{
        document.getElementById('submitForm').click()
    }
    const generateBill = ()=>{}

    useEffect(()=>{
        let prescribe = JSON.parse(sessionStorage.getItem('prescription'))
        setPrescription({...prescription, ...prescribe})
        console.log(prescription)
    }, [])


    return (
        <div>
            <div className='row p-2'>
                <div className='col-12 bg-white border'>
                    <div className='d-flex justify-content-between border-bottom p-2'>
                        <p className='h6'>Generate Pharmacy Bill</p>
                        <button onClick={clickGenerate} className='btn btn-primary'><FontAwesomeIcon icon='plus' /> Generate Bill</button>
                    </div>
                    {
                            error !== '' &&
                            <div className='alert alert-danger mt-1'><FontAwesomeIcon icon='triangle-exclamation' /><b>Error! </b>{error}</div>
                        }
                        {
                            success !== '' &&
                            <div className='alert alert-success mt-1'><FontAwesomeIcon icon='check' /><b>Success! </b>{success}</div>
                        }
                    <div className='py-2'>
                        <form className='border p-3' onSubmit={generateBill}>
                            <div className='form-row'>
                            <div className='form-group col-4'>
                                    <label className='h6'>PrescriptionId</label>
                                    <input className='form-control' disabled value={prescription.prescriptionId} name='healthId' />
                                </div>
                                <div className='form-group col-4'>
                                    <label className='h6'>HealthId</label>
                                    <input className='form-control' disabled value={prescription.healthId} name='healthId' />
                                </div>
                                <div className='form-group col-4'>
                                    <label className='h6'>Patient Name</label>
                                    <input  className='form-control' value={prescription.patientName} name='patientName' disabled />
                                </div>
                            </div>
                            <div className='form-row border-bottom'>
                                <div className='form-group col-6'>
                                    <label className='h6'>Diagnosed Illness</label>
                                    <input  className='form-control' value={prescription.illness} disabled name='illness' />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='h6'>Physician's Name</label>
                                    <input  className='form-control' value={prescription.doctorName} name='doctorName' disabled />
                                </div>
                            </div>
                            <label className='h6 mt-4'>Prescribed Medicines</label>
                            <div className='form-row'>
                                {
                                    prescription.prescribedMedicine.map((each,i)=>(
                                        <>
                                            <div className='form-group col-3'>
                                                <label>Diagnosed Medicine</label>
                                                <input className='form-control' value={each} name={`med${i}`} />
                                            </div>
                                            <div className='form-group col-3'>
                                                <label>Medicine Category</label>
                                                <input className='form-control' name={`med${i}`} />
                                            </div>
                                            <div className='form-group col-3'>
                                                <label className='d-flex justify-content-between'><span>Unit</span> <span>Stock Qty</span></label>
                                                <div className='input-group'>
                                                    <input className='form-control' name={`med${i}`} />
                                                    <div className='input-group-append'>
                                                        <p className='input-group-text'></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='form-group col-3'>
                                                <label className='d-flex justify-content-between'><span>Price Tag</span> <span>PricePerUnit</span></label>
                                                <div className='input-group'>
                                                    <input className='form-control' disabled name={`med${i}`} />
                                                    <div className='input-group-append'>
                                                        <p className='input-group-text'></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                            <div className='d-flex justify-content-end'>
                                <p>Net Price:</p>
                            </div>
                            <button type='submit' id='submitForm' className='d-none'>Submit Form</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeneratePharmacyBill;