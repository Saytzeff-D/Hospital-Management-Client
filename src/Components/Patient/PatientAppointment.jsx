import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';

function PatientAppointment(props) {
    const patient = useSelector(state=>state.PatientReducer.patientDetails)
    const appointmentTray = useSelector(state=>state.PatientReducer.appointmentTray)
    console.log(patient)
    return (
        <div>
            <div className='row px-5 py-2'>
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
                            <p className='text-primary h6'>{patient.email.split('@')[0]}<br/>@{patient.email.split('@')[1]}</p>
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
                <div className='col-md-9 px-3'>
                    <div className='bg-white border p-2'>
                        <div className='d-flex justify-content-between border-bottom py-1 mb-1'>
                            <p>My Appointments</p>
                            <button className='btn btn-primary' data-toggle='modal' data-target='#appointmentBox'><FontAwesomeIcon icon='plus' /> Add Appointment</button>
                        </div>
                        <input className='form-control col-lg-4 col-md-6 col-sm-8' placeholder='Search...'  />
                        {
                            appointmentTray.length === 0
                            ?
                            (
                                <div className='p-2'>
                                    <p className='h6'>No recent Appointment</p>
                                </div>
                            )
                            :
                            (
                                <table className='table table-light table-striped table-responsive'>
                                    <th>Appointment No</th>
                                    <th>Appointment Date</th>
                                    <th>Priority</th>
                                    <th>Specialist</th>
                                    <th>Doctor</th>
                                    <th>Message</th>
                                    <th>Message</th>
                                    <th>Action</th>
                                </table>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* Modal */}
            <div className='modal fade' id='appointmentBox' data-backdrop='static'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h4 className='modal-title'>Add Appointment</h4>
                            <button data-dismiss='modal' className='close'>&times;</button>
                        </div>
                        <div className='modal-body'>
                            <form>
                                <div className='form-row'>
                                    <div className='form-group col-md-6'>
                                        <label>Date</label>
                                        <input type='date' className='form-control' />
                                    </div>
                                    <div className='form-group col-md-6'>
                                        <label>Specialist</label>
                                        <select className='form-control'>
                                            <option value="">Select</option>
                                            <option value="Ophthalmologist">Ophthalmologist</option>
                                            <option value="Paediatrician">Paediatrician</option>
                                            <option value="Dermatologist">Dermatologist</option>
                                            <option value="Orthopaedician">Orthopaedician</option>
                                            <option value="Dentist">Dentist</option>
                                            <option value="Gynaecologist">Gynaecologist</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='form-row'>
                                    <div className='form-group col-md-6'>
                                        <label>Doctor</label>
                                        <select className='form-control'>
                                            <option value="">Select</option>
                                            {/* All Doctors will be fetched from the server */}
                                        </select>
                                    </div>
                                    <div className='form-group col-md-6'>
                                        <label>Shift</label>
                                        <select className='form-control'>
                                            <option value=''>Select</option>
                                            <option value='Morning'>Morning</option>
                                            <option value='Afternoon'>Afternoon</option>
                                            <option value='Emergency'>Emergency</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='form-row'>
                                    <div className='form-group col-md-6'>
                                        <label>Slot</label>
                                        <input type='text' className='form-control' disabled />
                                    </div>
                                    <div className='form-group col-md-6'>
                                        <label>Appointment Priority</label>
                                        <select className='form-control'>
                                            <option value="">Select</option>
                                            <option value="Normal">Normal</option>
                                            <option value="Urgent">Urgent</option>
                                            <option value="Very Urgent">Very Urgent</option>
                                            <option value="Low">Low</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='form-row'>
                                    <div className='form-group col-12'>
                                        <label>Message</label>
                                        <textarea className='form-control' />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='modal-footer'>
                            <button className='btn btn-primary'>Save</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PatientAppointment;