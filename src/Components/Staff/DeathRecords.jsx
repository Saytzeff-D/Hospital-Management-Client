import React, { useState,useEffect } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
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
    const [btnLoading, setBtnLoading] = useState({btn: 'Save Records', loadStyle: ''})
   
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        axios.get(`${url}staff/getDeath`).then(res=>{
            if(res.data.status){
                setDeathTray(res.data.result)
                setList(res.data.result)
                setLoading(false)
            }
        }).catch((err)=>{
            setError('AxiosError')
        })
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
        validationSchema: Yup.object({
            healthId: Yup.string().required('This field is required '),
            // patientName: Yup.string().required('this field is required'),
            deathDate: Yup.date().required('This field is required'),
            gender: Yup.string().required('Address is required'),
            age: Yup.string().required('mother Health Id  is required'),
            // guardianName: Yup.string().required('this field is required'),
            report: Yup.string().required('This field is required'),
            birthDate: Yup.string().required('This field is required')
               
        }),
        onSubmit: (values)=>{
            alert(90)
            const patient = patientTray.find((patient, i)=>( (patient.healthId).toLowerCase() === (values.healthId).toLowerCase() ))
            values.age = Math.floor((new Date(values.deathDate) - new Date(patient.dob))/(1000 * 60 * 60 * 24*365))
            values.gender=patient.gender
            values._id=patient._id
            setBtnLoading({btn: '', loadStyle: 'spinner-border spinner-border-sm'})
            axios.post(`${url}staff/addDeath`,values).then(res=>{
                if(res.data.status){
                    setSuccess(res.data.message)
                    setError('')
                    setBtnLoading({btn: 'Save Records', loadStyle: ''})
                }
            }).catch(err=> console.log(err))
        }
    })
    const getPatientName = (healthId)=>{
        const patient = patientTray.find((patient, i)=>( (patient.healthId).toLowerCase() === (healthId).toLowerCase()))
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
                            loading 
                            ?
                            (<div className='mt-2'><p className='spinner-border text-danger'></p></div>)
                            :
                            error === 'AxiosError'
                            ?
                            <div className='alert alert-danger'>Server Error</div>
                            :
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
                                                <tr key={index}>
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
                                            <input name='healthId' className='form-control' onChange={(e)=>getPatientName(e.target.value)} onBlur={formik.handleBlur} />
                                            {formik.touched.healthId && <div className='text-danger'>{formik.errors.healthId}</div>}
                                        </div>
                                        <div className='form-group col-sm-4'>
                                            <label>Patient Name's</label>
                                            <input name='motherName' onChange={formik.handleChange} value={patientName} className='form-control' style={{color: patientName === 'Record not found...' ? '#ff0000' : ''}} disabled />
                                        </div>
                                        <div className='form-group col-sm-4'>
                                            <label>Death Date</label>
                                            <input type='date' name='deathDate' className='form-control' onChange={formik.handleChange} max={new Date().toISOString().split('T')[0]} onBlur={formik.handleBlur}/>
                                            {formik.touched.deathDate && <div className='text-danger'>{formik.errors.deathDate}</div>}
                                            
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                    <div className='form-group col-sm-4'>
                                            <label>Guardian's Name</label>
                                            <input disabled name='guardianName' className='form-control' onChange={formik.handleChange} value={guardianName}  />

                                        </div>
                                        <div className='form-group col-sm-8'>
                                            <label>Report</label>
                                            <input type='text' name='report' className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            {formik.touched.report && <div className='text-danger'>{formik.errors.report}</div>}
                                        </div>
                                    </div>
                                    {/* <button className='btn btn-primary btn-block mb-1' type='submit'>{btnLoading.btn} <span className={btnLoading.loadStyle}></span></button> */}
                                    <button type='submit' onClick={formik.handleSubmit} className='btn btn-primary btn-block font-weight-bold'>Save Records</button>
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