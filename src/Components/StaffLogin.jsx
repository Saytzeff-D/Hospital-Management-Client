import{ React, useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';


function StaffLogin(props) {
    const navigate = useNavigate()
   
    const formik = useFormik({
        initialValues: {
          
            email: '',
           
            staffId: '',
           
        },
        validationSchema: Yup.object({
          
            email: Yup.string().email('Enter a valid E-Mail Address').required('E-mail is required'),
          
            staffId: Yup.string().required('Enter your Password')      
        }),
     
    })
    return (
        <div className='row'>
        <div className='col-lg-6 p-5'>
            <form className='text-white p-4' style={{backgroundColor: '#000000', opacity: '0.75'}} onSubmit={formik.handleSubmit}>
                <div className='bg-warning text-white h5 text-center p-3'>
                    HOSPITAL MANAGEMENT SOFTWARE
                </div>
                <hr className='text-white bg-white'/>
              
               
                <div className='form-group '>
                <center> <p className='text-white font-weight-bold'>Staff Login</p></center> 
                  
                    <div className='form-group '>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className='form-control font-weight-bold' placeholder='Email Address' name='email' />
                        {formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}
                    </div>
                   
                   
                   <div className='form-group'>
                       <input type='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control font-weight-bold' placeholder='Enter your Password' name='staffId' />
                       {formik.touched.staffId && <div className='text-danger'>{formik.errors.staffId}</div>}
                    </div>
                
               <button className='btn btn-primary btn-block mb-1' type='submit'>Login</button>
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