import React, { useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function RegisterStaff() {
    const url = useSelector(state=>state.UrlReducer.url)


    const navigate = useNavigate()
    const [photo, setPhoto] = useState('')
    const [photoError, setPhotoError] = useState('')
    const [error, setError] = useState('')  
    const [spinner, setSpinner] = useState({spin: '', text: 'Register'})
    const formik = useFormik({
        initialValues: {
            lname: '',
            email: '',
            phone: '',
            address: '',
            bloodGroup: '',
            role:'',
            dob: '',
            gender: '',
            maritalStatus: '',
            fname: '',
            specialty:'',
            created: new Date().toLocaleDateString()
         
        },
        validationSchema: Yup.object({
            fname: Yup.string().required('Full Name is required'),
            email: Yup.string().email('Enter a valid E-Mail Address').required('E-mail is required'),
            phone: Yup.number().typeError('That doesnt look like a number').min(10).required('Phone Number is required'),
            address: Yup.string().required('Address is required'),
            dob: Yup.string().required('Date of Birth must be filled'),
            gender: Yup.string().required('Gender is required'),
            maritalStatus: Yup.string().required('This field is required'),
            lname: Yup.string().required('Last Name is required'),
            bloodGroup: Yup.string().required('This field is required'),
            role: Yup.string().required('This field is required') ,
            specialty:Yup.string().required('This field is required')

        }),
        onSubmit: (values)=>{
            if(photo === ''){
                setPhotoError('Upload a photo')
            }else{
                setError('')
                setSpinner({spin: 'spinner-border spinner-border-sm', text: ''})
                values.photo = photo
                values.password=values.fname
                console.log(values)
                axios.post(`${url}staff/register`, values).then((res)=>{
                    console.log(res.data)
                    if(res.data.status){
                        sessionStorage.setItem('Id', res.data.healthId)
                        navigate(0)
                    }else{
                        setError(res.data.message)
                        setSpinner({spin: '', text: 'Register'})
                    }
                }).catch((err)=>{
                    console.log(err.response.data.message)
                    setError(err.response.data.message)
                    setSpinner({spin: '', text: 'Register'})
                })
            }
        }
    })
    const clickFileInput = ()=>{
        document.getElementById('photo').click()
    }
    const pickFile =(e)=>{
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = ()=>{
            setPhoto(reader.result)
        }
    }
    return (
        <div>
            <form className='text-white px-4 pb-4' onSubmit={formik.handleSubmit}>
                    <div className='bg-warning text-white h5 text-center p-3'>
                        Basic Information
                    </div>
                    <hr className='text-white bg-dark'/>
                    {error !== '' && <div className="alert alert-danger"> <strong>Error!</strong> {error}</div>}
                    <div className='form-row'>
                        <div className='form-group col-md-6'>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' placeholder='First Name' name='fname' />
                            {formik.touched.fname && <div className='text-danger'>{formik.errors.fname}</div>}
                        </div>
                        <div className='form-group col-md-6'>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' placeholder='Last Name' name='lname' />
                            {formik.touched.lname && <div className='text-danger'>{formik.errors.lname}</div>}
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group col-md-6'>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className='form-control' placeholder='Email Address' name='email' />
                            {formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}
                        </div>
                        <div className='form-group col-md-6'>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control' placeholder='Phone Number' name='phone' />
                            {formik.touched.phone && <div className='text-danger'>{formik.errors.phone}</div>}
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group col-md-6'>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' placeholder='Home Address' name='address' />
                            {formik.touched.address && <div className='text-danger'>{formik.errors.address}</div>}
                        </div>
                        <div className='form-group col-md-6'>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="date" className='form-control' placeholder='Date of Birth' name='dob' />
                            {formik.touched.dob && <div className='text-danger'>{formik.errors.dob}</div>}
                        </div>
                    </div>
                    <div className='form-row'>                        
                        <div className='form-group col-md-6'>
                            <select onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' name='gender'>
                                <option value="">Gender</option>
                                <option value="Male" >Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {formik.touched.gender && <div className='text-danger'>{formik.errors.gender}</div>}
                        </div>
                        <div className='form-group col-md-6'>
                            <select onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' name='maritalStatus' >
                                <option value="">Marital Status</option>
                                <option value="Single" >Single</option>
                                <option value="Married">Married</option>
                            </select>
                            {formik.touched.maritalStatus && <div className='text-danger'>{formik.errors.maritalStatus}</div>}
                        </div>
                    </div>
                    <div className='form-row'>                        
                        <div className='form-group col-md-6'>
                            <select onChange={formik.handleChange} className='form-control' onBlur={formik.handleBlur} name='role' >
                                <option value="">Role</option>
                                <option value="Pharmacist" >Pharmacist</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Nurse">Nurse</option>
                                <option value="Accountant">Accountant</option>
                                <option value="Admin">Portal ADMIN</option>
                            </select>
                            {formik.touched.role && <div className='text-danger'>{formik.errors.role}</div>}
                        </div>
                        <div className='form-group col-md-6'>
                            <select onChange={formik.handleChange} className='form-control' onBlur={formik.handleBlur} name='specialty' >
                                <option value="">Specialist</option>
                                <option value="Ophthalmologist">Ophthalmologist</option>
                                <option value="Paediatrician">Paediatrician</option>
                                <option value="Pharmacist">Pharmacist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Orthopaedician">Orthopaedician</option>
                                <option value="Dentist">Dentist</option>
                                <option value="Gynaecologist">Gynaecologist</option>
                                <option value="Physiotherapist">Physiotherapist</option>
                                <option value="Nurse">Nurse</option>
                                <option value="Accountant">Accountant</option>
                                <option value="admin">Portal ADMIN</option>
                            </select>
                            {formik.touched.specialty && <div className='text-danger'>{formik.errors.specialty}</div>}
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group col-md-6'>
                            <select onChange={formik.handleChange} className='form-control' onBlur={formik.handleBlur} name='bloodGroup' >
                                <option value=""> Blood Group Selection?</option>
                                <option value="AB" >AB</option>
                                <option value="A">Type A</option>
                                <option value="O"> Type O  </option>
                                <option value="B">Type B</option>
                            </select>
                            {formik.touched.bloodGroup && <div className='text-danger'>{formik.errors.bloodGroup}</div>}
                        </div>
                    <div className='form-group col-md-6'>
                            <input onChange={pickFile} type="file" className='form-control d-none' name='photo' id='photo' />
                            <div className='btn btn-dark btn-block btn-light text-warning' onClick={clickFileInput} ><span><i className='fa fa-upload'></i></span> Click to Pick a Passport</div>
                            {photo === '' ? <div className='text-danger'>{photoError}</div> : null}
                        </div>
                    </div>
                    <button className='btn btn-warning btn-block' type='submit'>{spinner.text} <span className={spinner.spin}></span></button>
            </form>
        </div>
    );
}

export default RegisterStaff;