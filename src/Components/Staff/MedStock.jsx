import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useSelector } from 'react-redux'

const MedStock = (props)=>{
    const [error, setError] = useState('')
    const url = useSelector(state=>state.UrlReducer.url)
    const formik = useFormik({
        initialValues: {
            medicineName: '',
            medicineCategory: '',
            medicineCompany: '',
            unit: '',
            pricePerUnit: ''
        },
        onSubmit: (values)=>{
            console.log(values)
            axios.post(`${url}staff/addMedicine`, values).then((res)=>{
                console.log(res.data.status)
            }).catch((err)=>{
                setError('An Error has occured')
            })
        }
    })
    return (
        <>
            <div className='container-fluid p-3'>
                <div className='row'>
                    <div className='col-12 bg-white border'>
                        <div className='d-flex justify-content-between border-bottom py-2'>
                            <p>Medicine Stock</p>
                            <button className='btn btn-primary' data-target='#medicineModal' data-toggle='modal'><FontAwesomeIcon icon='plus' /> Add Medicine Details</button>
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-8 my-2'>
                            <input className='form-control' placeholder='Search by Medicine Name' />
                        </div>
                    </div>
                </div>

                {/* Add Medicine Modal */}
                <div className='modal fade' id='medicineModal' data-backdrop='static'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <p className='h6'>Add Medicine Details</p>
                                <button className='close text-primary' data-dismiss='modal'>&times;</button>
                            </div>
                            <div className='modal-body'>
                                <form className='p-3' onSubmit={formik.handleSubmit}>
                                    {
                                        error === ''
                                        &&
                                        <div className='alert alert-danger'>
                                            <FontAwesomeIcon icon='triangle-exclamation'/> <b>Error</b> {error}
                                            <button className='close' data-dismiss='alert'>&times;</button>
                                        </div>
                                    }
                                    <div className='form-row'>
                                        <div className='form-group col'>
                                            <input placeholder='Medicine Name' name='medicineName' onChange={formik.handleChange} className='form-control' />
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-group col'>
                                            <input placeholder='Medicine Category' name='medicineCategory' className='form-control' onChange={formik.handleChange} />
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-group col'>
                                            <input placeholder='Medicine Company' name='medicineCompany' className='form-control' onChange={formik.handleChange} />
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-group col-md-6'>
                                            <input type='number' placeholder='Units' name='unit' className='form-control' onChange={formik.handleChange} />
                                        </div>
                                        <div className='form-group col-md-6'>
                                            <input type='number' placeholder='Price Per Units' name='pricePerUnit' className='form-control' onChange={formik.handleChange} />
                                        </div>
                                    </div>
                                    <button className='btn btn-primary btn-block font-weight-bold'>Save Details</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MedStock