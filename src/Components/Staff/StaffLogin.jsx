import{ React, useState, useEffect } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { setStaff } from '../../actions';


function StaffLogin() {
    const url = useSelector(state=>state.UrlReducer.url)
    const staffInfo = useSelector(state=>state.UrlReducer.staffDetails)

    
    const dispatch= useDispatch()
localStorage.removeItem('htStaffToken')
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState({btn: 'Login', loadStyle: ''})
   
    const formik = useFormik({
        initialValues: {
          
            email: '',
           
            password: '',
           
        },
        validationSchema: Yup.object({
          
            email: Yup.string().email('Enter a valid E-Mail Address').required('E-mail is required'),
          
            password: Yup.string().required('Enter your Password')      
        }),
        onSubmit: (values)=>{
            console.log(values)
            setError('')
            setLoading({btn: '', loadStyle: 'spinner-border spinner-border-sm'})
            axios.post(`${url}staff/login`, values).then((res)=>{
                if (res.data.status === false) {
                    console.log(res.data)
                    setError(res.data.message)
                    setLoading({btn: 'Login', loadStyle: ''})
                } else {
                    let staffDetails=res.data.details 
                    console.log(res.data.token)  
                    localStorage.htStaffToken=res.data.token
                    dispatch(setStaff(staffDetails))
                    // dispatch({type:'setStaff',payload:staffDetails})


                    navigate('/staff/dashboard')
                   
                }
            })
            .catch((err)=>{
                console.log(err)
                setError(err.response.data.message)
                setLoading({btn: 'Login', loadStyle: ''})
            })
        }
     
    })
    return (
        <div className='row'>
        <div className='col-md-6 p-5'>
            <form className='text-white p-4' style={{backgroundColor: '#000000', opacity: '0.75'}} onSubmit={formik.handleSubmit}>
                <div className='bg-warning text-white h5 text-center p-3'>
                    HOSPITAL MANAGEMENT SOFTWARE
                </div>
                <hr className='text-white bg-white'/>
              
               
                <div className='form-group '>
                <center> <p className='text-white font-weight-bold'>Staff Login</p></center> 
                {
                  error !== '' && <div className='alert alert-danger'><b>Error!</b> {error}</div>
                }
                  
                    <div className='form-group '>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className='form-control font-weight-bold' placeholder='Email Address' name='email' />
                        {formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}
                    </div>
                   
                   
                   <div className='form-group'>
                       <input type='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control font-weight-bold' placeholder='Enter your Password' name='password' />
                       {formik.touched.password && <div className='text-danger'>{formik.errors.password}</div>}
                    </div>
                
               <button className='btn btn-primary btn-block mb-1' type='submit'>{loading.btn} <span className={loading.loadStyle}></span></button>
               <z className='text-warning font-weight-bold' onClick={()=>{navigate('/')}} style={{cursor: 'pointer'}}>Go Home <i className='fa fa-sign-out'></i></z>
              
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
    </div>
    );
}

export default StaffLogin;