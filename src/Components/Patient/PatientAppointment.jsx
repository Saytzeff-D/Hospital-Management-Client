import React from 'react';
import { useSelector } from 'react-redux';

function PatientAppointment(props) {
    const patient = useSelector(state=>state.PatientReducer.patientDetails)
    console.log(patient)
    return (
        <div>
            <div className='row pl-5 py-4'>
                <div className='col-md-3 bg-white py-2'>
                        <div className='d-flex justify-content-center'>
                            <img src={patient.photo} alt='patientPhoto' className='rounded-circle' width='100px' height='100px'  />
                        </div>
                        <p className='font-weight-bold text-center'>{patient.fullName}</p>
                        <div className='d-flex justify-content-between border-bottom p-2'>
                            <p className='font-weight-bold'>Patient Id</p>
                            <p className='text-primary h6'>{patient.healthId}</p>
                        </div>
                        <div className='d-flex justify-content-between border-bottom p-2'>
                            <p className='font-weight-bold'>Gender</p>
                            <p className='text-primary h6'>{patient.gender}</p>
                        </div>
                        <div className='d-flex justify-content-between border-bottom p-2'>
                            <p className='font-weight-bold'>Marital Status</p>
                            <p className='text-primary h6'>{patient.maritalStatus}</p>
                        </div>
                        <div className='d-flex justify-content-between border-bottom p-2'>
                            <p className='font-weight-bold'>Phone</p>
                            <p className='text-primary h6'>{patient.phone}</p>
                        </div>
                        <div className='d-flex justify-content-between border-bottom p-2'>
                            <p className='font-weight-bold'>E-Mail</p>
                            <p className='text-primary'>{patient.email.split('@')[0]}<br/>@{patient.email.split('@')[1]}</p>
                        </div>
                        <div className='d-flex justify-content-between border-bottom p-2'>
                            <p className='font-weight-bold'>Address</p>
                            <p className='text-primary h6'>{patient.address}</p>
                        </div>
                        <div className='d-flex justify-content-between border-bottom p-2'>
                            <p className='font-weight-bold'>Guardian Name</p>
                            <p className='text-primary h6'>{patient.guardianName}</p>
                        </div>
                </div>
                <div className='col-md-9'></div>
            </div>
        </div>
    );
}

export default PatientAppointment;