import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const GeneratePharmacyBill = (props)=> {
    const navigate=useNavigate()
    const url=useSelector(state=>state.UrlReducer.url)
    const [error, setError] = useState('')
    const [totalPrice,setTotalPrice]=useState(0)
    const [prescription, setPrescription] = useState({prescribedMedicine: []})
    const allMedicines = useSelector(state=>state.PharmacyReducer.medicineTray)
    const reducerError = useSelector(state=>state.PharmacyReducer.reducerError)
    const [medicine, setMedicine] = useState([])
    const [pharmBill, setPharmBill] = useState({})
    const [sendRequest, setSendRequest]=useState(false)
    const clickGenerate = ()=>{
        document.getElementById('submitForm').click()
    }
    const generateBill = (e)=>{
        setError('')
        e.preventDefault()
        let medicineTray=[]
        prescription.prescribedMedicine.forEach((each,i)=>{
            let drug;
            let drug_id;
            medicine.forEach((drugs,index)=>{
                if(i==index){
                    allMedicines.forEach((medicines,k)=>{
                        if(medicines.medicineName.toLowerCase()==each.toLowerCase() &&medicines.medicineCategory.toLowerCase()==drugs.category.toLowerCase()){
                            drug_id=medicines._id
                            setError('')
                        }
                    })
                    drugs.drug_id=drug_id
                    drug=drugs
                }

            })         
            medicineTray.push({medicineName:each,...drug})
        })
       
        let billData={healthId:prescription.healthId,prescriptionId:prescription.prescriptionId,amount:totalPrice,doctorName:prescription.doctorName,medicineTray,illness:prescription.illness}

        if(validations(billData.medicineTray)){
            axios.post(`${url}staff/createPharmBill`, billData).then((res)=>{
                console.log(res.data)
                navigate('/staff/prescriptionList')
            }).catch((err)=>{
                console.log(err)
                setSendRequest(false)
                err.message === "Request failed with status code 300" ? setError(err.response.data.message) : setError(err.message)
            })
        }
       
    }
    function validations(alldrugs,totalPrice){
        console.log(totalPrice,NaN)
        alldrugs.forEach((each,i)=>{
            if(!each.drug_id){
                setError(`Please select the correct Category for ${each.medicineName}`)
                return false
            }
            if( each.unit==0 || isNaN(each.unit)){
                setError(`Please type a correct quantity for ${each.medicineName}`)
                return false
            }
                setError('')
        })
        return true
    }
    useEffect(()=>{
        let prescribe = JSON.parse(sessionStorage.getItem('prescription'))
        setPrescription({...prescription, ...prescribe})
        console.log(prescription)
        let medicine=[]
        let pres;
        for(pres in prescribe){
            if(medicine.length<prescribe.prescribedMedicine.length){
                 medicine.push({medicineName: '', unit: '', priceTag:'',category:'', drug_id: ''})
            }
        }
        setMedicine(medicine)
    }, [])
    const handleUnitChange = (value, drugs, index)=>{
        let unitPrice = allMedicines.find((each)=>(each.medicineName.toLowerCase() === drugs.toLowerCase())).pricePerUnit
        medicine[index].unit = value
        medicine[index].priceTag = unitPrice * value
        console.log(medicine)
        setMedicine([...medicine])

        let TotalPrice=0
        medicine.forEach((each,i)=>{
            TotalPrice+=(each.priceTag)
            setTotalPrice(TotalPrice)    
        })
    }
    const handleCategoryChange=(drug, cat,i)=>{
        medicine[i].medicineName = drug
        medicine[i].category = cat
        let findId = allMedicines.find((each)=>(each.medicineName.toLowerCase() === drug.toLowerCase() && each.medicineCategory.toLowerCase() === cat.toLowerCase()))
        findId === undefined ? medicine[i].drug_id = undefined : medicine[i].drug_id = findId._id
        setMedicine(medicine)
        console.log(medicine)
    }
    return (
        <div>
            <div className='row p-2'>
                <div className='col-12 bg-white border'>
                    <div className='d-flex justify-content-between border-bottom p-2'>
                        <p className='h6'>Generate Pharmacy Bill</p>
                        <button onClick={clickGenerate} className='btn btn-primary'>
                            {
                                sendRequest
                                ?
                                (<span className='spinner-border spinner-border-sm text-white'></span>)
                                :
                                (<span><FontAwesomeIcon icon='plus' /> Generate Bill</span>)
                            } 
                        </button>
                    </div>
                        {
                            error !== '' &&
                            <div className='alert alert-danger mt-1'><FontAwesomeIcon icon='triangle-exclamation' /><b>Error! </b>{error}</div>
                        }
                        {
                            reducerError === 'Loading'
                            ?
                            (
                                <div className='mt-2'>
                                    <p className='spinner-border text-danger'></p>
                                </div>
                            )
                            :
                            (
                                allMedicines.length === 0
                                ?
                                <p className='h5 py-2'>Please Update Pharmacy Records</p>
                                :
                                (
                                    <div className='py-2'>
                                        <form className='border p-3' onSubmit={generateBill}>
                                            <div className='form-row'>
                                            <div className='form-group col-md-4 col-6'>
                                                    <label className='h6'>PrescriptionId</label>
                                                    <input className='form-control' disabled value={prescription.prescriptionId} name='healthId' />
                                                </div>
                                                <div className='form-group col-md-4 col-6'>
                                                    <label className='h6'>HealthId</label>
                                                    <input className='form-control' disabled value={prescription.healthId} name='healthId' />
                                                </div>
                                                <div className='form-group col-md-4'>
                                                    <label className='h6'>Patient Name</label>
                                                    <input  className='form-control' value={prescription.patientName} name='patientName' disabled />
                                                </div>
                                            </div>
                                            <div className='form-row border-bottom'>
                                                <div className='form-group col-md-6'>
                                                    <label className='h6'>Diagnosed Illness</label>
                                                    <input  className='form-control' value={prescription.illness} disabled name='illness' />
                                                </div>
                                                <div className='form-group col-md-6'>
                                                    <label className='h6'>Physician's Name</label>
                                                    <input  className='form-control' value={prescription.doctorName} name='doctorName' disabled />
                                                </div>
                                            </div>
                                            <label className='h6 mt-4'>Prescribed Medicines</label>
                                            <div className='form-row'>
                                                {
                                                    prescription.prescribedMedicine.map((drugs,i)=>(
                                                        <>
                                                            <div className='form-group col-md-3 col-6' key={i}>
                                                                <label>Diagnosed Medicine</label>
                                                                <input className='form-control' value={drugs} name={`med${i}`} />
                                                            </div>
                                                            <div className='form-group col-md-3 col-5'>
                                                                <label>Medicine Category</label>
                                                                <select  name='medicineCategory' className='form-control' onChange={(e)=>handleCategoryChange(drugs, e.target.value,i)}>  
                                                                    <option value='' >Medicine Category</option>                                             
                                                                    <option value='Syrup' >Syrup </option>
                                                                    <option value='Ointment'>Ointment</option>
                                                                    <option value='Injection'>Injection</option>
                                                                    <option value='Capsule'>Capsule</option>
                                                                    <option value='Liquids'>Liquids</option>
                                                                    <option value='Inhalers'>Inhalers</option>
                                                                    <option value='Surgical'>Surgical</option>
                                                                    <option value='Drops'>Drops</option>
                                                                    <option value='Diaper'>Diaper</option>
                                                                </select>
                                                            </div>
                                                            <div className='form-group col-md-3 col-6'>
                                                                <label className='d-flex justify-content-between'><span>Unit</span> <span>Stock Qty</span></label>
                                                                <div className='input-group'>
                                                                    <input className='form-control' name={`med${i}`} onChange={(e)=>handleUnitChange(e.target.value, drugs, i)} />
                                                                    <div className='input-group-append'>
                                                                        <p className='input-group-text'>
                                                                            {
                                                                                allMedicines.find((each)=>(each.medicineName.toLowerCase() === drugs.toLowerCase())).availableQty
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='form-group col-md-3 col-6'>
                                                                <label className='d-flex justify-content-between'><span>Price Tag</span> <span>PricePerUnit</span></label>
                                                                <div className='input-group'>
                                                                    <input className='form-control' disabled name={`med${i}`} value={medicine[i].priceTag} />
                                                                    <div className='input-group-append'>
                                                                        <p className='input-group-text'>
                                                                            {
                                                                                allMedicines.find((each)=>(each.medicineName.toLowerCase() === drugs.toLowerCase())).pricePerUnit
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ))
                                                }
                                            </div>
                                            <div className='d-flex justify-content-end'>
                                                <p className='h6'>Net Price: <strong>{ totalPrice === '' ? '' : <FontAwesomeIcon icon='naira-sign' /> }{totalPrice}</strong></p>
                                            </div>
                                            <button type='submit' id='submitForm' className='d-none'>Submit Form</button>
                                        </form>
                                    </div>
                                )
                            )
                        }
                </div>
            </div>
        </div>
    );
}

export default GeneratePharmacyBill;