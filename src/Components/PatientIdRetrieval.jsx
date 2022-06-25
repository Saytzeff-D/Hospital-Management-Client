import{ React, useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function PatientIdRetrieval(props) {
    const {url} = props
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [feedBack, setFeedBack] = useState('')
   
    const formik = useFormik({
        initialValues: {          
            email: ''        
           
        },
        validationSchema: Yup.object({
          
            email: Yup.string().email('Enter a valid E-Mail Address').required('E-mail is required'),
          
          
        }),
        onSubmit: (values)=>{
            setError('')
            setFeedBack('')
            console.log(values)
            axios.post(`${url}patient/retrievePatientId`, values).then((res)=>{
                    if (res.data.status === false) {
                        setError(res.data.message)
                    } else {
                        setFeedBack(res.data.message)
                    }
            }).catch((err)=>{
                console.log(err)
                setError(err.response.data.message)
            })
        }
     
    })
    return (
        <div className=''>
 <div className='col-lg-6 p-5 '>
            <form className='text-white p-4' style={{backgroundColor: '#000000', opacity: '0.75'}} onSubmit={formik.handleSubmit}>
                <div className='bg-warning text-white h5 text-center p-3'>
                    HOSPITAL MANAGEMENT SOFTWARE
                </div>
                <hr className='text-white bg-white'/>
              
               
                <div className='form-group '>
                <center> <p className='text-white font-weight-bold'>Patient ID Retrieval</p></center> 
                  {
                  error !== ''
                  &&
                <div className='alert alert-danger'><b>Error!</b> {error}</div> 
                  }
                  {
                    feedBack !== '' &&
                <div className='alert alert-success'><b>Success!</b> {feedBack}</div>
                }
                    <div className='form-group '>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className='form-control' placeholder='Email Address' name='email' />
                        {formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}
                    </div>                      
               <button className='btn btn-primary btn-block mb-1' type='submit'>Retrieve ID</button>
                    <i onClick={()=>{navigate('/views/patientLogin')}} className='text-primary font-weight-bold' style={{cursor: 'pointer'}}>Back to Login</i>
             
                </div>
              
        </form>
            </div>
    </div>
    );
}

export default PatientIdRetrieval;