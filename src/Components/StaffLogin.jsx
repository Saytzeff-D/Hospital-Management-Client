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
          
            patientId: Yup.string().required('staff Id is required')      
        }),
     
    })
    const goToRegister = ()=>{
        navigate('/views/addPatient')
    }
    return (
        <div>
           <center> 
 <div className='col-lg-6 p-5 '>
            <form className='text-white p-4' style={{backgroundColor: '#000000', opacity: '0.75'}} onSubmit={formik.handleSubmit}>
                <div className='bg-warning text-white h5 text-center p-3'>
                    HOSPITAL MANAGEMENT SOFTWARE
                </div>
                <hr className='text-white bg-white'/>
              
               
                <div className='form-group '>
                <center> <p className='text-white font-weight-bold'>Staff Login</p></center> 
                  
                    <div className='form-group '>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className='form-control' placeholder='Email Address' name='email' />
                        {formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}
                    </div>
                   
                   
                   <div className='form-group'>
                       <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' placeholder='Enter your Staff ID' name='staffId' />
                       {formik.touched.staffId && <div className='text-danger'>{formik.errors.staffId}</div>}
                    </div>
                
               <button className='btn btn-primary btn-block' type='submit'>Login</button>
              
                </div>
              
        </form>
            </div>
            </center>
        {/* <main className='form-row'>
           
          
        </main>
        */}
    </div>
    );
}

export default StaffLogin;