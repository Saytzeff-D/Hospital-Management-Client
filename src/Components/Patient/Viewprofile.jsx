import { useFormik } from 'formik'
import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'


const ViewProfile=()=>{
    const patientDetails=useSelector(state=>state.StaffReducer.viewPatientDetails)
    console.log(patientDetails)
    const[fullName,setFullName]=useState(patientDetails.fullName)
    console.log(fullName)
    const [dob,setDOB]=useState(patientDetails.dob)
    const [email,setEmail]=useState(patientDetails.email)
    const [guardianName,setGuardianName]=useState(patientDetails.guardianName)
    const [maritalStatus,setMaritalStatus]=useState(patientDetails.maritalStatus)
    const [phone,setPhone]=useState(patientDetails.phone)
    const [disability,setDisability]=useState(patientDetails.disability)
    // const [dob,setDOB]=useState(patientDetails.dob)

    // console.log(patientDetails)
    // const formik=useFormik({
    //     initialValues:{
    //         fullName:patientDetails.fullName,
    //         dob:patientDetails.dob,
    //         email:patientDetails.email,
    //         guardianName:patientDetails.guardianName,
    //         healthId:patientDetails.healthId,
    //         phone:patientDetails.phone,
    //         maritalStatus:patientDetails.maritalStatus,
    //         address:patientDetails.address,
    //         disablility:patientDetails.disability,
    //         gender:patientDetails.gender
    //     },
    //     validationSchema: Yup.object({
    //         fullName:Yup.string().required('This field is required')
    //     }),
    //     onSubmit:(values)=>{
    //         console.log(values)
    //     }
    // })
    // console.log(formik.values)



    return(
        <>
        <div className='container'>
            <div className='row w-100 bg-white m-auto text-center' style={{height:'200px'}}>
               <div className='col-12'>
                    <form>
                        <div class="row">
                        <div class="input-group">
                                <span class="input-group-text" id="inputGroupPrepend2">Full Name</span>
                                <input value={fullName} type="text" onChange={(e)=>setFullName(e.target.value)} name='fullName' class="form-control"  required/>
                            </div>
                            
                        </div>
                        <div className='row my-2'>
                            <div className='col-6'> <div class="input-group">
                                <span class="input-group-text" id="inputGroupPrepend2">E-Mail</span>
                                <input value={email} type="text" onChange={(e)=>setEmail(e.target.value)} name='email' class="form-control"  required/>
                            </div></div>
                            <div className='col'></div>

                        </div>


                        {/* <div className='row my-2'>
                            <div class="input-group">
                                <span class="input-group-text" id="inputGroupPrepend2">@</span>
                                <input type="text" class="form-control" id="validationDefaultUsername"  aria-describedby="inputGroupPrepend2" required/>
                            </div>
                        </div> */}
                        {/* <div className='row'>
                            <div class="input-group input-group-sm mb-3">
                                <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
                                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
                            </div>
                            
                        </div> */}
                        <button type='submit'>Submit</button>
                    </form>
                </div>

              </div>
        </div>
        </>
    )
}


export default ViewProfile