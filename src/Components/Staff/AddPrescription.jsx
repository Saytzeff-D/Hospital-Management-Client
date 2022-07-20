import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector }  from 'react-redux'

const AddPrescription = (props)=>{
    const url = useSelector(state=>state.UrlReducer.url)
    const patientTray = useSelector(state=>state.PatientReducer.patientTray)
    const medicineTray = useSelector(state=>state.PharmacyReducer.medicineTray)
    const staff = useSelector(state=>state.StaffReducer.staffInfo)
    const [testInputArr, setTestInputArr] = useState([0])
    const [prescribeMed, setPrescribeMed] = useState([])
    const [prescriptionObj, setPrescriptionObj]= useState({healthId: '', patientName: '', doctorName: '', illness: ''})
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const moreInput = ()=>{
        setTestInputArr([...testInputArr, 1])
    }
    const lessInput = ()=>{
       setTestInputArr(testInputArr.slice(1))
    }
    const clickPrescribe = ()=>{
        document.getElementById('submitForm').click()
    }
    const handleChange = (e)=>{
        setPrescriptionObj({...prescriptionObj, [e.target.name]: e.target.value})
    }
    const handleMedicineChange = (e,i)=>{
        prescribeMed[i] = e.target.value
        setPrescribeMed(prescribeMed)
        let med = medicineTray.find((each, i)=>(each.medicineName === e.target.value))
        if(med === undefined){
            setError(`${e.target.value} could not be found in stock`)
        }else{
            setError('')
        }
    }
    const getPatientName = (patientId)=>{
        const patient = patientTray.find((patient, i)=>(patient.healthId === patientId))
        if(patient === undefined){
            setPrescriptionObj({...prescriptionObj, patientName: 'Record not found...'})
        }else{
            setPrescriptionObj({...prescriptionObj, healthId: patientId, patientName: patient.fullName})
        }
    }
    const addPrescription = (e)=>{
        e.preventDefault()
        prescriptionObj.prescribedMedicine=prescribeMed
        console.log(prescriptionObj)
        setLoading(true)
        axios.post(`${url}staff/addPrescription`, prescriptionObj).then((res)=>{
            setLoading(false)
            setSuccess(res.data.message)
        }).catch((err)=>{
            setLoading(false)
            setError('An error has occured...')
        })
    }
    useEffect(()=>{
        setPrescriptionObj({...prescriptionObj, doctorName: `Dr. ${staff.fname} ${staff.lname}`})
    }, [])

    return(
        <>
            <div className='row p-2'>
                <div className='col-12 bg-white border'>
                    {/* Top Header */}
                    <div className='d-flex justify-content-between py-2 border-bottom'>
                        <p className='font-weight-bold h6'>Add Prescription</p>
                        <button className='btn btn-primary' onClick={clickPrescribe}>{loading ? (<span className='spinner-border spinner-border-sm text-white'></span>) : 'Add Prescription' }</button>
                    </div>
                    {/* Top Header */}
                    {/* Body */}
                        {
                            error !== '' &&
                            <div className='alert alert-danger mt-1'><FontAwesomeIcon icon='triangle-exclamation' /><b>Error! </b>{error}</div>
                        }
                        {
                            success !== '' &&
                            <div className='alert alert-success mt-1'><FontAwesomeIcon icon='check' /><b>Success! </b>{success}</div>
                        }
                    <div className='py-2'>
                        <form className='border p-3' onSubmit={addPrescription}>
                            <div className='form-row'>
                                <div className='form-group col-6'>
                                    <label className='h6'>HealthId</label>
                                    <input onChange={(e)=>getPatientName(e.target.value)} className='form-control' name='healthId' />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='h6'>Patient Name</label>
                                    <input onChange={handleChange} className='form-control' value={prescriptionObj.patientName} name='patientName' disabled />
                                </div>
                            </div>
                            <div className='form-row border-bottom'>
                                <div className='form-group col-6'>
                                    <label className='h6'>What's the Illness?</label>
                                    <input onChange={handleChange} className='form-control' name='illness' />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='h6'>Doctor's Name</label>
                                    <input onChange={handleChange} className='form-control' value={prescriptionObj.doctorName} name='doctorName' disabled />
                                </div>
                            </div>
                            <label className='h6 mt-4'>Prescribed Medicines</label>
                            <div className='form-row'>
                                {
                                    testInputArr.map((each,i)=>(
                                        <>
                                            <div className='form-group col-6'>
                                                <input onChange={(e)=>handleMedicineChange(e,i)} className='form-control' name={`med${i}`} />
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                                <div className='btn btn-dark mx-1' onClick={moreInput}><FontAwesomeIcon icon='plus' /> More Input</div>
                                <div className='btn btn-light mx-1' onClick={lessInput}><FontAwesomeIcon icon='minus' /> Less Input</div>
                            <button type='submit' id='submitForm' className='d-none'>Submit Form</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddPrescription