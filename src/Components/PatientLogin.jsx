import{ React, useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PatientLogin(props) {
    const {url} = props
    const [loading, setLoading] = useState({btn: 'Login', loadStyle: ''})
    const [error, setError] = useState('')
    const navigate = useNavigate()
   
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
                    navigate('/dashboard')
                }
            }).catch((err)=>{
                setError(err.response.data.message)
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
            <main className='form-row'>
                <div className='col-lg-6 p-5 border-right'>
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
                        <div className='form-group '>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className='form-control' placeholder='Email Address' name='email' />
                            {formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}
                        </div>
                       
                       
                       <div className='form-group'>
                           <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' placeholder='Enter your Health ID' name='healthId' />
                           {formik.touched.healthId && <div className='text-danger'>{formik.errors.healthId}</div>}
                        </div>
                    
                   <button className='btn btn-primary btn-block' type='submit'>{loading.btn} <span className={loading.loadStyle}></span></button>
                   <div className="d-flex justify-content-between pt-2">
                        <div>
                            <a href='/views/patientIdRetrieval' className='text-warning' >Forgot Patient Id?</a>
                        </div>
                        <div>
                            <div className='d-flex justify-content-between'>
                                <p onClick={goToRegister} className='text-primary px-1 font-weight-bold' style={{cursor: 'pointer', borderRight:"2px solid gray"}}>Register</p>
                                <p className='text-primary px-1 font-weight-bold' onClick={goToStaffLogin} style={{cursor: 'pointer'}}>Staff Login</p>
                            </div>
                        </div>
                   </div>
                    </div>
                  
            </form>
                </div>
                <div className='col-6 d-none d-lg-block p-5'>
                        <div className='form-group col-md-12 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci sint cum beatae iusto numquam aut mollitia nobis amet, laudantium animi ea consectetur ratione! Placeat dignissimos quis debitis? Consectetur, eos enim!
                        </div>
                        <div className='form-group col-md-12 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci sint cum beatae iusto numquam aut mollitia nobis amet, laudantium animi ea consectetur ratione! Placeat dignissimos quis debitis? Consectetur, eos enim!
                        </div>
                        <div className='form-group col-md-12 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci sint cum beatae iusto numquam aut mollitia nobis amet, laudantium animi ea consectetur ratione! Placeat dignissimos quis debitis? Consectetur, eos enim!
                        </div>
              </div>
            </main>
           
        </div>
    );
}

export default PatientLogin;