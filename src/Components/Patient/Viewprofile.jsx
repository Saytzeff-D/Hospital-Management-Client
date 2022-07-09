import axios from 'axios'
import { useFormik } from 'formik'
import React,{useState} from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'


const ViewProfile=()=>{
    const patientDetails=useSelector(state=>state.StaffReducer.viewPatientDetails)
    const url=useSelector(state=>state.UrlReducer.url)
    let dispatch=useDispatch()
    
    const[fullName,setFullName]=useState()
    console.log(fullName)
    const [dob,setDOB]=useState()
    const [email,setEmail]=useState()
    const [guardianName,setGuardianName]=useState()
    const [maritalStatus,setMaritalStatus]=useState()
    const [phone,setPhone]=useState()
    const [disability,setDisability]=useState()
    const [healthId,setHealthId]=useState()
    const [weight,setWeight]=useState()
    const [height,setHeight]=useState()
    const [genotype,setGenotype]=useState()
    const [spinner, setSpinner] = useState({spin: 'fa fa-save mx-2', text: 'Save'})

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
        setWeight(patientDetails.weight)     
        setHeight(patientDetails.height)
        setGenotype(patientDetails.genotype)        
    },[patientDetails])

    const saveDetails=()=>{
        let updatedInfo={...patientDetails,fullName,dob,email,guardianName,phone,maritalStatus,disability,weight,height,genotype}
        console.log(updatedInfo)
        setSpinner({spin: 'spinner-border spinner-border-sm', text: ''})
        axios.post(`${url}patient/updatePat`,updatedInfo).then(res=>{
            console.log(res)
            if(res.data.status){
                alert('updated, please close the modal')
                dispatch({type:'updatePatient', payload:[]})
                setSpinner({spin: 'fa fa-save mx-2', text: 'Save'})
            }
            else{
                alert('operation failed')
                setSpinner({spin: 'fa fa-save mx-2', text: 'Save'})


            }
        }).catch(err=>{
             console.log(err)
             setSpinner({spin: 'fa fa-save mx-2', text: 'Save'})
                         })

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
                                <span  style={{fontSize:'12px'}}class="input-group-text" id="inputGroupPrepend2">Genotype</span>
                                <select onChange={(e)=>setGenotype(e.target.value)} className='form-control' value={genotype} name='genotype' >
                                    <option value="ab" >AB</option>
                                    <option value="a">Type A</option>
                                    <option selected value="o"> Type O  </option>
                                    <option value="b">Type B</option>
                                </select>
                            </div>
                            <div className='col-6 input-group'>
                                <span  style={{fontSize:'12px'}}class="input-group-text" id="inputGroupPrepend2">Disability</span>
                                <select onChange={(e)=>setDisability(e.target.value)} className='form-control' value={disability} name='disability' >
                                    <option selected value="Yes" >Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                        <div className='row my-2'>

                            <div className='col-6 input-group'>
                                <span  style={{fontSize:'12px'}}class="input-group-text" id="inputGroupPrepend2">Weight</span>
                                <input  type='text'  className='form-control' name='weight' value={weight} onChange={(e)=>setWeight(e.target.value)}/>
                            </div>
                            <div className='col-6 input-group'>
                                <span  style={{fontSize:'12px'}}class="input-group-text" id="inputGroupPrepend2">height</span>
                                <input onChange={(e)=>setHeight(e.target.value)} type='text' className='form-control' value={height} name='height' />
                                    </div>
                        </div>



                        <button onClick={saveDetails} className='btn btn-success my-2 w-25' >{spinner.text}<span className={spinner.spin}></span></button>
                        </div>
                </div>

              </div>
        </div>
        </>
    )
}


export default ViewProfile