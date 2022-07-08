import axios from 'axios'
import { useFormik } from 'formik'
import React,{useState} from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'


const ViewProfile=()=>{
    const patientDetails=useSelector(state=>state.StaffReducer.viewPatientDetails)
    const url=useSelector(state=>state.UrlReducer.url)
    
    const[fullName,setFullName]=useState()
    console.log(fullName)
    const [dob,setDOB]=useState()
    const [email,setEmail]=useState()
    const [guardianName,setGuardianName]=useState()
    const [maritalStatus,setMaritalStatus]=useState()
    const [phone,setPhone]=useState()
    const [disability,setDisability]=useState()
    const [healthId,setHealthId]=useState()
    console.log(patientDetails)

    useEffect(()=>{
        setFullName(patientDetails.fullName)
        setDOB(patientDetails.dob)
        setEmail(patientDetails.email)
        setGuardianName(patientDetails.guardianName)
        setMaritalStatus(patientDetails.maritalStatus)
        setPhone(patientDetails.phone)
        setDisability(patientDetails.disability)
        setHealthId(patientDetails.healthId)        
    },[patientDetails])

    const saveDetails=()=>{
        let updatedInfo={...patientDetails,fullName,dob,email,guardianName,phone,maritalStatus,disability}
        console.log(updatedInfo)
alert('going')
        axios.post(`${url}patient/updatePat`,updatedInfo).then(res=>{
            console.log(res)
            if(res.data.status){
                alert('updated, please close the modal')
            }
            else{
                alert('operation failed')
            }
        }).catch(err=> console.log(err))

    }


    return(
        <>
        <div className=''>
            <div className='row w-100 m-auto text-center'>
               <div className='col-12'>
                    <div>
                        <div class="row">
                            <div class="input-group">
                                <span style={{fontSize:'12px'}} class="input-group-text" id="inputGroupPrepend2">Full Name</span>
                                <input value={fullName} type="text" onChange={(e)=>setFullName(e.target.value)} name='fullName' class="form-control"  required/>
                            </div>                       
                         </div>

                         <div class="row my-2">
                            <div class="input-group">
                                <span style={{fontSize:'12px'}} class="input-group-text" id="inputGroupPrepend2"> Guardian Full Name</span>
                                <input value={guardianName} type="text" onChange={(e)=>setGuardianName(e.target.value)} name='fullName' class="form-control"  required/>
                            </div>                       
                         </div>



                        <div className='row my-2'>
                            <div className='col-6'> <div class="input-group">
                                <span style={{fontSize:'12px'}}class="input-group-text" id="inputGroupPrepend2">E-Mail</span>
                                <input value={email} type="text" onChange={(e)=>setEmail(e.target.value)} name='email' class="form-control"  required/>
                            </div></div>
                            <div className='col-6'>
                                    <div class="input-group">
                                        <span  style={{fontSize:'12px'}}class="input-group-text" id="inputGroupPrepend2">Date</span>
                                         <input value={dob} type="date" onChange={(e)=>setDOB(e.target.value)} name='email' class="form-control"  required/>
                                    </div>
                            </div>
                        </div>



                        <div className='row my-2'>
                            <div className='col-6 input-group'>
                                 <span style={{fontSize:'12px'}} class="input-group-text" id="inputGroupPrepend2">Marital Status</span>
                                <select onChange={(e)=>setMaritalStatus(e.target.value)}  value={maritalStatus} name='maritalStatus' className='form-control'>        <option value="Single" >Single</option>
                                <option value="Married">Married</option>
                                </select>
                            </div>
                            <div className='col-6'>
                                <div class="input-group">
                                    <span  style={{fontSize:'12px'}}class="input-group-text" id="inputGroupPrepend2">Phone</span>
                                    <input value={phone} type="text" onChange={(e)=>setPhone(e.target.value)} name='email' class="form-control"  required/>
                                </div>
                            </div>
                        </div>
                        
                        <div className='row my-2'>

                            <div className='col-6 input-group'>
                                <span  style={{fontSize:'12px'}}class="input-group-text" id="inputGroupPrepend2">Health ID</span>
                                <input style={{cursor:'not-allowed'}} disabled type='text'  className='form-control' name='healthId' value={healthId} />
                            </div>
                            <div className='col-6 input-group'>
                                <span  style={{fontSize:'12px'}}class="input-group-text" id="inputGroupPrepend2">Disability</span>
                                <select onChange={(e)=>setDisability(e.target.value)} className='form-control' value={disability} name='disability' >
                                    <option selected value="Yes" >Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>



                        <button onClick={saveDetails} className='btn btn-success my-2 w-25' >Save <i className='fa fa-save'></i></button>
                    </div>
                </div>

              </div>
        </div>
        </>
    )
}


export default ViewProfile