import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ApprovedAppointments=(props)=>{
    let {approvedAppointment}=props
    let url = useSelector(state=>state.UrlReducer.url)    
    let [filterById,setFilterById]=useState('')
    let [filterByName,setFilterByName]=useState('')
    let [filteredList, setFilteredList]=useState([])
    let [viewPat,setViewPat]=useState({})
    const [actionType,setActionType]=useState({action:'',data:{}})
    let [appointmentDate,setNewDate]=useState('')
    let [shift,setShift]=useState('')

    useEffect(()=>{
       setFilteredList(approvedAppointment)
       console.log(approvedAppointment,9000)

    },[approvedAppointment])

    useEffect(()=>{
        filterWithParameter(filterByName)
    },[filterByName])
    useEffect(()=>{
    filterWithParameter(filterById,'id')
    },[filterById])
    
const filterWithParameter=(params,ID)=>{     

    if(params!==''){
        let filteredList=[]
        let allApp=approvedAppointment
        if(!ID){        
        allApp.forEach( (each,i)=>{
            if((each.doctorName.toLowerCase()).includes(params.toLowerCase())){
                filteredList.push(each)
            }
        })
    }else{allApp.forEach((each,i)=>{
            if((each.appointmentNo.toLowerCase()).includes(params.toLowerCase())){
                filteredList.push(each)
            }
        })
    }
         setFilteredList(filteredList)

    }else{
        setFilteredList(approvedAppointment)

    }

    }
    const fetchPatientProfile=(healthId)=>{
        let patientId={healthId}
        axios.post(`${url}staff/getPat`,patientId).then(res=>{
            console.log(res.data)
            setViewPat(res.data.patDetails)            
        }).then(err=>{
            console.log(err)            
        })
    }
    const reschedule=(each)=>{
        setNewDate(each.appointmentDate)
        setShift(each.shift)               
    }
    const updateAppointment=()=>{
        let timeSlot=''
        if (shift === 'Morning') {
            timeSlot='08:00 - 11:00 AM'
        } else if(shift === 'Afternoon') {
            timeSlot='01:00 - 04:00 PM'
        }else{
            timeSlot='24/7'
        }
        let updateDetails={_id:actionType.data._id,appointmentDate,shift,timeSlot}
        console.log(updateDetails)
        axios.post(`${url}staff/updateApp`,updateDetails).then(res=>{
            console.log(res.data)
            setNewDate('')
            setShift('')
            setActionType({action:'decline',data:{}})
            alert('update succesful. close the modal')

        }).catch(err=> console.log(err))
    }

    return(
        <>        
            <div id="home" className="w-100 tab-pane active">
                 <div className='py-3'>
                    <div className='bg-white border p-2'>
                        <div className='border-bottom'>
                          <p className='h6'>APPOINTMENTS LIST</p>
                        </div>
                        <div className='row '>
                            <div className='col-sm-6'>
                                <input  value={filterById}  onChange={(e)=>setFilterById(e.target.value)}  className='form-control m-1' placeholder='Search Patient by ID' />
                            </div>
                            <div className='col-sm-6'>
                                <input  onChange={(e)=>setFilterByName(e.target.value)}   className='form-control m-1' placeholder='Search Patient by Name' />
                            </div>
                        </div>
                        <table className="table table-warning table-hover table-responsive text-center">
                            <thead>
                                <tr>
                                    <th>NO.</th>
                                    <th>App. ID</th>
                                    <th>Doctor</th>
                                    <th>Patient ID</th>
                                    <th>App. Date</th>
                                    <th>Time</th>
                                    <th>Message</th>
                                    <th>Payment</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredList.map((each,index)=>(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{each.appointmentNo}</td>
                                        <td>{each.doctorName}</td>
                                        <td>{each.healthId}</td>
                                        <td>{each.appointmentDate}</td>
                                        <td>{each.timeSlot}</td>
                                        <td>{each.message}</td>
                                        <td>{each.paymentStatus?<span>Paid <i className="fa fa-check text-success mx-1"></i></span>:<span>Pending</span>}</td>
                                        <td style={{cursor:'pointer'}} >
                                            <div className='d-flex justify-content-between'>
                                                <button style={{fontSize:'10px'}}  onClick={()=>reschedule(each)} title="Remove" className="btn btn-danger  text-white ml-1" data-target='#checkApp' data-toggle='modal'>
                                                    Reschedule
                                                </button>
                                                <button style={{fontSize:'10px'}}  className="btn bg-white ml-1" onClick={()=>fetchPatientProfile(each.healthId)}><i data-target='#viewProfile' data-toggle='modal' className='fa fa-photo text-warning fa-lg'></i>
                                                </button>
                                            </div>
                                        </td>                      
                                    </tr>   

                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>


                <div className='modal fade big-modal' id="viewProfile" data-backdrop="static">
                     <div className='modal-dialog modal-dialog-centered'>
                         <div className='modal-content'>
                              <div className='modal-header'>
                                  <h4 className='modal-title px-2'>Patient Profile</h4>
                                    <button type="button" className="close text-danger" data-dismiss="modal" >&times;</button>
                                </div>
                                
                                <div className='modal-body border-zero'>
                                <div className='col-md-12 my-2'>
                                <div className='border shadow-lg d-flex justify-content-between'>
                                    <div className='col-md-5 px-0'>
                                        <img alt='staffPic' src={viewPat.photo} className='w-100 h-100' />
                                    </div>
                                    <div className='col-md-7'>
                                        <p className=''>{viewPat.fullName} ({viewPat.gender}) </p>
                                        <p className=''>{viewPat.weight}kg ,  {viewPat.height} cm</p>
                                        <p style={{fontSize: '12px'}}>{viewPat.phone} {viewPat.email}</p>
                                        <p style={{fontSize: '12px'}}>DOB: {viewPat.dob}</p>
                                        <p className="text-capitalize" style={{fontSize: '12px'}}>Blood: Type {viewPat.genotype}</p>
                                        <p style={{fontSize: '12px'}}>Address: {viewPat.address}</p>
                                        <div className='h6 rounded-lg bg-primary text-center my-1 text-white text-capitalize'>{viewPat.healthId}</div>
                                    </div>
                                </div>
                            </div>

                                </div>
                                <div className="modal-footer container">
                                    <button  className=' btn btn-danger  m-1' data-dismiss='modal'>
                                        Close
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Reschedule Modal */}
                    <div className='modal fade big-modal' id="checkApp" data-backdrop="static">
                     <div className='modal-dialog modal-dialog-centered'>
                         <div className='modal-content'>
                              <div className='modal-header'>
                                  <h4 className='modal-title px-2'>APPOINTMENT ACTION</h4>
                                    <button type="button" className="close text-danger" data-dismiss="modal" >&times;</button>
                                </div>
                                
                                <div className='modal-body border-zero text-center m-auto'>
                                    
                                    <div className='row text-center'>
                                        <div className="col-md-6 input-group">
                                        <label class="input-group-text" id="inputGroupPrepend2">Date</label>
                                        <input value={appointmentDate} onChange={(e)=>setNewDate(e.target.value)} type='date' className='form-control' name='appointmentDate' min={new Date().toISOString().split('T')[0]} />
                                        </div>
                                        

                                        <div className='col-md-6 input-group'>
                                        <label class="input-group-text" id="inputGroupPrepend2">Shift</label>
                                        <select value={shift}  onChange={(e)=>setShift(e.target.value)} className='form-control'>
                                            <option value=''>Select</option>
                                            <option value='Morning'>Morning</option>
                                            <option value='Afternoon'>Afternoon</option>
                                            <option value='Emergency'>Emergency</option>
                                        </select>
                                    </div>
                                    <button onClick={updateAppointment} style={{marginLeft:'20%'}} className="btn btn-secondary w-50 mt-4">Update</button>
                                    </div> 
                                </div>
                                <div className="modal-footer container">
                                 <button  className=' btn btn-danger  m-1' data-dismiss='modal'>No, Go Back</button>
                                </div>
                            </div>
                        </div>
                    </div>

        </>


    )

}

export default ApprovedAppointments