import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const AddPrescription = (props)=>{
    const [testInputArr, setTestInputArr] = useState([0])

    const moreInput = ()=>{
        setTestInputArr([...testInputArr, 1])
    }
    const lessInput = ()=>{
       setTestInputArr(testInputArr.slice(1))
    }
    const addPrescription = ()=>{
        document.getElementById('submitForm').click()
    }
    return(
        <>
            <div className='row p-2'>
                <div className='col-12 bg-white border'>
                    {/* Top Header */}
                    <div className='d-flex justify-content-between py-2 border-bottom'>
                        <p className='font-weight-bold h6'>Add Prescription</p>
                        <button className='btn btn-primary' onClick={addPrescription}>Add Prescription</button>
                    </div>
                    {/* Top Header */}
                    {/* Body */}
                    <div className='py-2'>
                        <form className='border p-3'>
                            <div className='form-row'>
                                <div className='form-group col-6'>
                                    <label className='h6'>HealthId</label>
                                    <input className='form-control' name='' />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='h6'>Patient Name</label>
                                    <input className='form-control' name='' disabled />
                                </div>
                            </div>
                            <div className='form-row border-bottom'>
                                <div className='form-group col-6'>
                                    <label className='h6'>What's the Illness?</label>
                                    <input className='form-control' name='' />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='h6'>Doctor's Name</label>
                                    <input className='form-control' name='' disabled />
                                </div>
                            </div>
                            <label className='h6 mt-4'>Prescribed Medicines</label>
                            <div className='form-row'>
                                {
                                    testInputArr.map((each,i)=>(
                                        <>
                                            <div className='form-group col-6'>
                                                <input className='form-control' name='' />
                                            </div>
                                            <div className='form-group col-6'>
                                                <input className='form-control' name='' />
                                            </div>
                                        </>
                                    ))
                                }
                                <div className='btn btn-dark mx-1' onClick={moreInput}><FontAwesomeIcon icon='plus' /> More Input</div>
                                <div className='btn btn-light mx-1' onClick={lessInput}><FontAwesomeIcon icon='minus' /> Less Input</div>
                            </div>
                            <button type='submit' id='submitForm'>Submit Form</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddPrescription