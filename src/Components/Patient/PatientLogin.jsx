import{ React, useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPatientDetails } from '../../actions';

function PatientLogin(props) {
    const dispatch = useDispatch()
    const url = useSelector(state=>state.UrlReducer.url)
    sessionStorage.removeItem('PatientToken')

    const [loading, setLoading] = useState({btn: 'Login', loadStyle: ''})
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const healthId = sessionStorage.getItem('Id')
   
    const formik = useFormik({
        initialValues: {
          
            email: '',
           
            healthId: '',
           
        },
        validationSchema: Yup.object({
          
            email: Yup.string().email('Enter a valid E-Mail Address').required('E-mail is required'),
          
            healthId: Yup.string().required('Health Id is required')      
        }),
        onSubmit: (values)=>{
            setError('')
            setLoading({btn: '', loadStyle: 'spinner-border spinner-border-sm'})
            console.log(values)
            axios.post(`${url}patient/login`, values).then((res)=>{
                if (res.data.status === false) {
                    setError(res.data.message)
                    setLoading({btn: 'Login', loadStyle: ''})
                } else {
                    localStorage.PatientToken = res.data.token
                    console.log(res.data.token, res.data.response)
                    dispatch(setPatientDetails(res.data.response))
                    sessionStorage.removeItem('Id')
                    navigate('/patient/dashboard')
                }
            }).catch((err)=>{
                setError('An Error has occured. Please try again')
                setLoading({btn: 'Login', loadStyle: ''})
            })
        }
     
    })
    const goToRegister = ()=>{
        navigate('/views/addPatient')
    }
    const goToStaffLogin=()=>{
        navigate('/views/staffLogin')
    }
 
 
    return (
        <div>
            <main className='row w-100 mx-auto'>
                <div className='d-none d-lg-block col-lg-6 animate__animated animate__fadeInUp animate__slower'>
                    <p className='display-3 h1 py-5 font-weight-bold text-warning'>Welcome to Hospital Management System</p>
                    <p className='text-white h6'>Login Here <i className='fa fa-arrow-right'></i> </p>
                </div>
                <div className='col-md-8 col-lg-6 p-5'>
                <form className='text-white p-4' style={{backgroundColor: '#000000', opacity: '0.75'}} onSubmit={formik.handleSubmit}>
                    <div className='bg-warning text-white h5 text-center p-3'>
                        HOSPITAL MANAGEMENT SOFTWARE
                    </div>
                    <hr className='text-white bg-white'/>
                  
                   
                    <div className='form-group '>
                    <center> <p className='text-white font-weight-bold'>Patient Login</p></center> 
                      {
                        error !== '' && <div className='alert alert-danger'><b>Error!</b> {error}</div>
                      }
                      {
                        healthId !== null && error === ''
                        ?
                        <div className='alert alert-success'><b>Sucess!</b> Your Health Id is <b>{healthId}</b></div>
                        :
                        ''
                      }
                        <div className='form-group '>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className='form-control' placeholder='Email Address' name='email' />
                            {formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}
                        </div>
                       
                       
                       <div className='form-group'>
                           <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' placeholder='Enter your Health ID' name='healthId' />
                           {formik.touched.healthId && <div className='text-danger'>{formik.errors.healthId}</div>}
                        </div>
                    
                   <button className='btn btn-primary btn-block' type='submit'>{loading.btn} <span className={loading.loadStyle}></span></button>
                   <div className="d-flex justify-content-between pt-2 flex-lg-row flex-column">
                        <div>
                            <a href='/views/patientIdRetrieval' className='text-warning' >Forgot Health Id?</a>
                        </div>
                        <div>
                            <div className='d-flex justify-content-between pt-2 pt-md-0'>
                                <p onClick={goToRegister} className='text-primary px-1 font-weight-bold' style={{cursor: 'pointer'}}>Register</p>
                                <p className='text-primary px-1 font-weight-bold' onClick={goToStaffLogin} style={{cursor: 'pointer'}}>Staff Login</p>
                            </div>
                        </div>
                   </div>
                    </div>
                  
            </form>
                </div>
            </main>
           
        </div>
    );
}

export default PatientLogin;