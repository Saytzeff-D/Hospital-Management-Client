import React, { useState,useEffect } from 'react';
import { useFormik } from 'formik'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'

function DeathRecords(props) {
    const [error, setError] = useState('')
    const[success,setSuccess]=useState('')
    const url= useSelector(state=>state.UrlReducer.url)
    const patientTray = useSelector(state=>state.PatientReducer.patientTray)
    const [filteredList,setList] = useState([])
    const [deathTray,setDeathTray] = useState([])
    const [patientName, setPatientName] = useState('')
    const [guardianName,setGuardianName]=useState('')
    useEffect(()=>{
        axios.get(`${url}staff/getDeath`).then(res=>{
            if(res.data.status){
                console.log(res.data.result)
                setDeathTray(res.data.result)
                setList(res.data.result)
            }
        }).catch(err=>console.log(err))
    },[success,error])



    const formik = useFormik({
        initialValues: {
            healthId: '',
            patientName: '',
            deathDate: '',
            gender: '',
            age: '',
            guardianName: '',
            report: ''
        },
        onSubmit: (values)=>{
            const patient = patientTray.find((patient, i)=>(patient.healthId === values.healthId))
            values.age = new Date(values.deathDate) - new Date(patient.dob)/(1000 * 60 * 60 * 24)
            console.log(values.age)
            // axios.post(`${url}staff/addDeath`,values).then(res=>{
            //     if(res.data.status){
            //         setSuccess(res.data.message)
            //         setError('')
            //         console.log(res.data)
            //     }else{
            //         setError(res.data.message)
            //         setSuccess('')
            //     }
            // }).catch(err=> console.log(err))
        }
    })
    const getPatientName = (healthId)=>{
        const patient = patientTray.find((patient, i)=>(patient.healthId === healthId))
        if(patient === undefined){
            setPatientName('Record not found...')
            setGuardianName('Record not found...')
        }else{
            formik.values.healthId = healthId
            formik.values.patientName = patient.fullName
            formik.gender = patient.gender
            formik.values.guardianName=patient.guardianName
            setPatientName(patient.fullName)
            setGuardianName(patient.guardianName)
        }
    }
    return (
        <>
             <div className='container-fluid p-3'>
                <div className='row'>
                    <div className='col-12 bg-white border'>
                        <div className='d-flex justify-content-between border-bottom py-2'>
                            <p className='h6'>Death Records</p>
                            <button className='btn btn-primary' data-target='#birthModal' data-toggle='modal'><FontAwesomeIcon icon='plus' /> Add Death Record</button>
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-8 my-2'>
                            <input className='form-control' placeholder='Search...' />
                        </div>
                        {
                            deathTray.length === 0
                            ?
                            (
                                <div>
                                    <p className='font-weight-bold py-2'>No records yet</p>
                                </div>
                            )
                            :
                            (
                                <table className='table table-light table-striped table-responsive'>
                                    <thead>
                                        <tr>
                                            <th>Records Id</th>
                                            <th>Patient Name</th>
                                            <th>Gender</th>
                                            <th>Death Date</th>
                                            <th>Age</th>
                                            <th>Guardian Name</th>
                                            <th>Report</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            deathTray.map((item, index)=>(
                                                <tr>
                                                    <td> {item.recordsId} </td>
                                                    <td> {item.patientName} </td>
                                                    <td> {item.gender} </td>
                                                    <td> {item.deathDate} </td>
                                                    <td> {item.age} </td>
                                                    <td> {item.guardianName} </td>
                                                    <td> {item.report} </td>
                                                </tr>
                                            ))                                            
                                        }
                                    </tbody>
                                </table>
                            )
                        }
                    </div>
                </div>

                {/* Add Death Record Modal */}
                <div className='modal fade' id='birthModal' data-backdrop='static'>
                    <div className='modal-dialog modal-lg'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <p className='h6'>Add Death Record</p>
                                <button className='close text-primary' data-dismiss='modal' onClick={()=>{setError('')}}>&times;</button>
                            </div>
                            <div className='modal-body'>
                                <form className='p-3' onSubmit={formik.handleSubmit}>
                                    {
                                        error !== ''
                                        &&
                                        <div className='alert alert-danger'>
                                            <FontAwesomeIcon icon='triangle-exclamation'/> <b>{error}</b>
                                        </div>
                                    }
                                                                    
                                    {success!==''&& <div className='alert alert-success'>
                                        <FontAwesomeIcon icon='check'/> <b>{success}</b>                                
                                        </div>}
                                    <div className='form-row'>
                                        <div className='form-group col-sm-4'>
                                            <label>Health Id</label>
                                            <input name='' className='form-control' onChange={(e)=>getPatientName(e.target.value)} />
                                        </div>
                                        <div className='form-group col-sm-4'>
                                            <label>Patient Name's</label>
                                            <input name='motherName' onChange={formik.handleChange} value={patientName} className='form-control' style={{color: patientName === 'Record not found...' ? '#ff0000' : ''}} disabled />
                                        </div>
                                        <div className='form-group col-sm-4'>
                                            <label>Death Date</label>
                                            <input type='date' name='deathDate' className='form-control' onChange={formik.handleChange} max={new Date().toISOString().split('T')[0]} />
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                    <div className='form-group col-sm-4'>
                                            <label>Guardian's Name</label>
                                            <input disabled name='guardianName' className='form-control' onChange={formik.handleChange} value={guardianName} />
                                        </div>
                                        <div className='form-group col-sm-8'>
                                            <label>Report</label>
                                            <input type='text' name='report' className='form-control' onChange={formik.handleChange} />
                                        </div>
                                    </div>
                                    <button type='submit' className='btn btn-primary btn-block font-weight-bold'>Save Records</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeathRecords;