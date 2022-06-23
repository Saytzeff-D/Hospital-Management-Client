import{ React, useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';

function PatientLogin(props) {
    const navigate = useNavigate()
   
    const formik = useFormik({
        initialValues: {
          
            email: '',
           
            patientId: '',
           
        },
        validationSchema: Yup.object({
          
            email: Yup.string().email('Enter a valid E-Mail Address').required('E-mail is required'),
          
            healthNum: Yup.string().required('HEALTH NUMBER IS REQUIRED')      
        }),
     
    })
    const goToRegister = ()=>{
        navigate('/views/addPatient')
    }
 
 
    return (
        <div>
            <main className='form-row'>
                <div className='form-group col-md-5 px-3 mx-3' style={{borderRight:"2px solid grey"}}>
                <form className='text-white p-4' style={{backgroundColor: '#000000'}} onSubmit={formik.handleSubmit}>
                    <div className='bg-warning text-white h5 text-center p-3'>
                        HOSPITAL MANAGEMENT SOFTWARE
                    </div>
                    <hr className='text-white bg-white'/>
                  
                   
                    <div className='form-group '>
                    <center> <p className='text-white font-weight-bold'>Patient Login</p></center> 
                      
                        <div className='form-group '>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className='form-control' placeholder='Email Address' name='email' />
                            {formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}
                        </div>
                       
                       
                       <div className='form-group'>
                           <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' placeholder='Enter your Patient ID' name='patientId' />
                           {formik.touched.patientId && <div className='text-danger'>{formik.errors.patientId}</div>}
                    
                       <div className='form-group col-md-12 mt-3'>                        
                   <button className='btn btn-primary form-control w-100' type='submit'>Login</button>
                   <p className='py-2 font-weight-bold'>Don't have an account? <span className="text-warning" style={{cursor: 'pointer'}} onClick={goToRegister}>Register Here</span></p>
                   </div>
                    </div>
                  
                    </div>
            </form>
                </div>
                <div className='form-group col-md-6 mx-4'>
                        <div className='form-group col-md-12 '>1.Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci sint cum beatae iusto numquam aut mollitia nobis amet, laudantium animi ea consectetur ratione! Placeat dignissimos quis debitis? Consectetur, eos enim!
                        </div>
                        <div className='form-group col-md-12 '>2.Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci sint cum beatae iusto numquam aut mollitia nobis amet, laudantium animi ea consectetur ratione! Placeat dignissimos quis debitis? Consectetur, eos enim!
                        </div>
                        <div className='form-group col-md-12 '>3.Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci sint cum beatae iusto numquam aut mollitia nobis amet, laudantium animi ea consectetur ratione! Placeat dignissimos quis debitis? Consectetur, eos enim!
                        </div>
              </div>
            </main>
           
        </div>
    );
}

export default PatientLogin;