import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientAppointmentList, getStaff } from '../../actions';
import { useNavigate } from 'react-router';
import { PaystackButton } from 'react-paystack';

function PatientAppointment(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const url = useSelector(state=>state.UrlReducer.url)
    const staff = useSelector(state=>state.StaffReducer.staffTray)
    const patient = useSelector(state=>state.PatientReducer.patientDetails)
    const appointmentTray = useSelector(state=>state.AppointmentReducer.patientAppointment)
    const [slot, setSlot] = useState('')
    const [specialist, setSpecialist] = useState('')
    const [shift, setShift] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const reducerError = useSelector(state=>state.AppointmentReducer.awaitingResponse)
    useEffect(()=>{
            dispatch(getPatientAppointmentList(url, {healthId: patient.healthId}))
    }, [dispatch])
    const formik = useFormik({
        initialValues : {
            appointmentDate: '',
            doctorName: '',
            appointmentPriority: '',
            specialist: '',
            shift: '',
            message: ''
        },
        onSubmit: (values)=>{
            setError('')
            setIsLoading(true)
            values.shift = shift
            values.timeSlot = slot
            values.specialist = specialist
            values.healthId = patient.healthId
            console.log(values)
            axios.post(`${url}patient/addAppointment`, values).then((res)=>{
                if(res.data.status){
                    navigate(0)
                }else{
                    setIsLoading(false)
                }
            }).catch((err)=>{
                err.message !== '' ? setError(err.message) : setError(err.response.data.message)
                setIsLoading(false)
            })
        }
    })
    const specialistChange = (value)=>{
        dispatch(getStaff(url))
        setSpecialist(value)
    }
    const shiftChange = (value)=>{
        console.log(value)
        setShift(value)
        if (value === 'Morning') {
            setSlot('08:00 - 11:00 AM')
        } else if(value === 'Afternoon') {
            setSlot('01:00 - 04:00 PM')
        }else{
            setSlot('24/7')
        }
    }

    const config = {
    reference: (new Date()).getTime().toString(),
    email: patient.email,
    amount: 50000,
    publicKey: 'pk_test_bfe3a2fb617743847ecf6d9ea96e3153e2a1186d',
  }
  const handlePaystackSuccessAction = (reference) =>{}
  const handlePaystackCloseAction = () => {}
  const componentProps = {
    ...config,
    text: '',
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
}
    return (
        <div>
            <div className='row px-5 py-2'>
                <div className='col-md-3 bg-white py-2 mt-2'>
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
                <div className='col-md-9 px-3 mt-2'>
                    <div className='bg-white border p-2'>
                        <div className='d-flex justify-content-between border-bottom py-1 mb-1'>
                            <p className='h6'>My Appointments</p>
                            <button className='btn btn-primary' data-toggle='modal' data-target='#appointmentBox'><FontAwesomeIcon icon='plus' /> Add Appointment</button>
                        </div>
                        <input className='form-control col-lg-4 col-md-6 col-sm-8' placeholder='Search...'  />
                        {
                            reducerError === 'Waiting'
                            ?
                            (<span className='spinner-border-sm text-danger'></span>)
                            :
                            (
                                reducerError === 'AxiosError' 
                                ? 
                                <div className='alert alert-danger h6 my-2'> <FontAwesomeIcon icon='triangle-exclamation'/> Unable to fetch from the server</div>
                                : 
                                appointmentTray.length === 0
                                ?
                                (
                                    <div className='p-2'>
                                        <p className='h6'>No recent Appointment</p>
                                    </div>
                                )
                                :
                                (
                                    <table className='mt-1 table table-light border border-primary table-striped table-responsive'>
                                        <thead>
                                            <tr>
                                                <th>Appointment No</th>
                                                <th>Appointment Date</th>
                                                <th>Shift</th>
                                                <th>AppointmentTime</th>
                                                <th>Priority</th>
                                                <th>Specialist</th>
                                                <th>Doctor</th>
                                                <th>Status</th>
                                                <th>Message</th>
                                                <th>FutherAction</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointmentTray.map((appointment, index)=>(
                                                <tr key={index}>
                                                    <td>{appointment.appointmentNo}</td>
                                                    <td>{appointment.appointmentDate}</td>
                                                    <td>{appointment.shift}</td>
                                                    <td>{appointment.timeSlot}</td>
                                                    <td>{appointment.appointmentPriority}</td>
                                                    <td>{appointment.specialist}</td>
                                                    <td>{appointment.doctorName}</td>
                                                    <td>{appointment.status ? <span className='bg-success rounded-pill h6 p-1'>Approved</span> : <span className='rounded-pill bg-warning h6 p-1'>Pending</span>}</td>
                                                    <td>{appointment.message}</td>
                                                    <td>
                                                        <div className='d-flex justify-content-between'>
                                                        <PaystackButton {...componentProps} className='btn'><FontAwesomeIcon className='text-primary cursor-pointer' icon='money-check' /></PaystackButton> <button className='btn'><FontAwesomeIcon className='cursor-pointer text-warning' icon='bars' /></button> <button className='btn'><FontAwesomeIcon className='text-danger cursor-pointer' icon='trash' /></button>
                                                        </div> 
                                                    </td>                                                    
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )
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
                            <form onSubmit={formik.handleSubmit}>
                                {
                                    error !== '' &&
                                (<div className='alert alert-danger'>
                                    <span><b>Error</b> {error}</span>
                                </div>)

                                }
                                <div className='form-row'>
                                    <div className='form-group col-md-6'>
                                        <label>Date</label>
                                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type='date' className='form-control' name='appointmentDate' min={new Date().toISOString().split('T')[0]} />
                                    </div>
                                    <div className='form-group col-md-6'>
                                        <label>Specialist</label>
                                        <select className='form-control' onChange={(e)=>specialistChange(e.target.value)} name='specialist'>
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
                                        <select onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' name='doctorName'>
                                            <option value="">Select</option>
                                            {/* All Doctors will be fetched from the server */}
                                            {staff.filter((each, i)=>(each.specialty === specialist)).map((doctor, i)=>(
                                                <option key={i} value={'Dr.' + doctor.fname + ' ' + doctor.lname}>Dr. {doctor.fname} {doctor.lname}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='form-group col-md-6'>
                                        <label>Shift</label>
                                        <select className='form-control' onChange={(e)=>shiftChange(e.target.value)}>
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
                                        <input type='text' value={slot} className='form-control' disabled />
                                    </div>
                                    <div className='form-group col-md-6'>
                                        <label>Appointment Priority</label>
                                        <select onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' name='appointmentPriority'>
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
                                        <textarea onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' name='message' />
                                    </div>
                                </div>
                                <div typeof='submit' className='modal-footer'>
                                    <button className='btn btn-primary' disabled={isLoading}>{
                                        isLoading ? (<span className='spinner-border spinner-border-sm text-white'></span>) : (<span>Save</span>)
                                    }</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PatientAppointment;