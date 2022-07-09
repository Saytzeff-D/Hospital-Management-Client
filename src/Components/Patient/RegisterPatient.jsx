import React, { useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function RegisterPatient(props) {
    sessionStorage.removeItem('Id')
    const url = useSelector(state=>state.UrlReducer.url)

    const navigate = useNavigate()
    const [photo, setPhoto] = useState('')
    const [photoError, setPhotoError] = useState('')
    const [error, setError] = useState('')
    const [spinner, setSpinner] = useState({spin: '', text: 'Register'})
    const formik = useFormik({
        initialValues: {
            fullName: '',
            guardianName: '',
            email: '',
            phone: '',
            address: '',
            bloodGroup: '',
            dob: '',
            gender: '',
            maritalStatus: '',
            disability: ''
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required('Full Name is required'),
            email: Yup.string().email('Enter a valid E-Mail Address').required('E-mail is required'),
            phone: Yup.number().typeError('That doesnt look like a number').min(10).required('Phone Number is required'),
            address: Yup.string().required('Address is required'),
            dob: Yup.string().required('Date of Birth must be filled'),
            gender: Yup.string().required('Gender is required'),
            maritalStatus: Yup.string().required('This field is required'),
            disability: Yup.string().required('This field is required')          
        }),
        onSubmit: (values)=>{
            if(photo === ''){
                setPhotoError('Upload a photo')
            }else{
                setError('')
                setSpinner({spin: 'spinner-border spinner-border-sm', text: ''})
                values.photo = photo
                console.log(values)
                axios.post(`${url}patient/register`, values).then((res)=>{
                    console.log(res.data)
                    if(res.data.message === 'Success'){
                        sessionStorage.setItem('Id', res.data.healthId)
                        navigate('/views/patientLogin')
                    }else{
                        setError(res.data.message)
                        setSpinner({spin: '', text: 'Register'})
                    }
                }).catch((err)=>{
                    setSpinner({spin: '', text: 'Register'})
                    console.log(err)
                    err.message ? setError(err.message) : setError(err.response.data.message)
                })
            }
        }
    })
    const goToLogin = ()=>{
        navigate('/views/patientLogin')
    }
    const clickFileInput = ()=>{
        document.getElementById('photo').click()
    }
    const pickFile =(e)=>{
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = ()=>{
            console.log(reader.result)
            setPhoto(reader.result)
        }
    }
    return (
        <div>
            <form className='text-white p-4' style={{backgroundColor: '#000000', opacity: '0.8'}} onSubmit={formik.handleSubmit}>
                    <div className='bg-warning text-white h5 text-center p-3'>
                        HOSPITAL MANAGEMENT SOFTWARE
                    </div>
                    <hr className='text-white bg-white'/>
                    <p className='text-white font-weight-bold'>Patient Registration</p>
                    {error !== '' && <div className="alert alert-danger"> <strong>Error!</strong> {error}</div>}
                    <div className='form-row'>
                        <div className='form-group col-md-4'>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' placeholder='Enter your Full Name' name='fullName' />
                            {formik.touched.fullName && <div className='text-danger'>{formik.errors.fullName}</div>}
                        </div>
                        <div className='form-group col-md-4'>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' placeholder='Enter your Guardian Name' name='guardianName' />
                        </div>
                        <div className='form-group col-md-4'>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className='form-control' placeholder='Email Address' name='email' />
                            {formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group col-md-4'>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control' placeholder='Enter your Phone Number' name='phone' />
                            {formik.touched.phone && <div className='text-danger'>{formik.errors.phone}</div>}
                        </div>
                        <div className='form-group col-md-4'>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' placeholder='Enter your Home Address' name='address' />
                            {formik.touched.address && <div className='text-danger'>{formik.errors.address}</div>}
                        </div>
                        <div className='form-group col-md-4'>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="date" className='form-control' placeholder='Date of Birth' name='dob' />
                            {formik.touched.dob && <div className='text-danger'>{formik.errors.dob}</div>}
                        </div>
                    </div>
                    <div className='form-row'>                        
                        <div className='form-group col-md-4'>
                            <select onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' name='gender'>
                                <option value="">Gender</option>
                                <option value="Male" >Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {formik.touched.gender && <div className='text-danger'>{formik.errors.gender}</div>}
                        </div>
                        <div className='form-group col-md-4'>
                            <select onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' name='maritalStatus' >
                                <option value="">Marital Status</option>
                                <option value="Single" >Single</option>
                                <option value="Married">Married</option>
                            </select>
                            {formik.touched.maritalStatus && <div className='text-danger'>{formik.errors.maritalStatus}</div>}
                        </div>
                        <div className='form-group col-md-4'>
                            <select onChange={formik.handleChange} className='form-control' onBlur={formik.handleBlur} name='disability' >
                                <option value="">Any Disablity?</option>
                                <option value="Yes" >Yes</option>
                                <option value="No">No</option>
                            </select>
                            {formik.touched.disability && <div className='text-danger'>{formik.errors.disability}</div>}
                        </div>
                    </div>
                    <div className='form-row'>                        
                        <div className='form-group col-12'>
                            <input onChange={pickFile} type="file" className='form-control d-none' name='photo' id='photo' />
                            <div className='btn btn-block btn-light text-warning' onClick={clickFileInput} ><span><i className='fa fa-upload'></i></span> Pick a Photo</div>
                            {photo === '' ? <div className='text-danger'>{photoError}</div> : null}
                        </div>
                    </div>
                    <button className='btn btn-primary btn-block' type='submit'>{spinner.text} <span className={spinner.spin}></span></button>
                    <p className='py-2 font-weight-bold'>Already Registered? <span className="text-warning" style={{cursor: 'pointer'}} onClick={goToLogin}>Patient Login Here</span></p>
            </form>
        </div>
    );
}

export default RegisterPatient;