import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {useSelector }from 'react-redux'
import CheckAppointment from "../Container/Checkappointment";
import ApprovedAppointments from "./ApprovedAppointments";

const AppointmentList=()=>{
    const url=useSelector(state=>state.UrlReducer.url)
    const staffDetails=useSelector(state=>state.StaffReducer.staffInfo)
    const [newAppointments,setNewAppointments]=useState([])
    const [oldAppointments,setOldAppointments]=useState([])
    const [actionType,setActionType]=useState({action:'',data:{}})
    let [filterById,setFilterById]=useState('')
    let [filterByName,setFilterByName]=useState('')
    let [filteredList, setFilteredList]=useState([])



   



    useEffect(()=>{
        axios.get(`${url}staff/allAppointments`).then(res=>{
            if(res.data.status){                            
                filterAppointment(res.data.appointments)
            }else{
                console.log(res.data.message)
            }
        })

    },[actionType, url])

    useEffect(()=>{
        filterWithParameter(filterByName)
    },[filterByName])
    useEffect(()=>{
    filterWithParameter(filterById,'id')
    },[filterById])
    
const filterWithParameter=(params,ID)=>{     

    if(params!==''){
        let filteredList=[]
        let allApp=newAppointments
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
        setFilteredList(newAppointments)

    }

    }



    function filterAppointment(allAppointments){
        let oldAppointments=[]
        let newAppointments=[]
        allAppointments.forEach( (each,index)=>{
            let doctorName='Dr.' + staffDetails.fname + ' ' + staffDetails.lname
            if(each.approvalStatus && (each.doctorName==doctorName || staffDetails.role=='Admin') ){
                oldAppointments.push(each)
            }else if(!each.approvalStatus && (each.doctorName==doctorName || staffDetails.role=='Admin')) {
                newAppointments.push(each)
            }
        })
        setOldAppointments(oldAppointments)
        setNewAppointments(newAppointments)
        setFilteredList(newAppointments)
    }
    const checkAppointment=()=>{
        if(actionType.action ==='approve'){
            let updateAppointment=actionType.data
            updateAppointment.approvalStatus=true
            axios.post(`${url}staff/checkAppointment`, updateAppointment).then(res=>{
            if(res.data.status){
                alert('Appointment approved succesfully')
                setActionType({action:'',data:{}})
                }
        }).catch(err=>console.log(err))

        }else{
            alert('Successfully declined')
        }
        
    }
  

    return(

            <section className="" style={{paddingTop:'5px'}}>          

            <div className="container mt-5">
  <ul className="nav nav-pills d-flex justify-content-around mt-5" role="tablist">
    <li className="nav-item">
      <a className="nav-link active h4" data-toggle="pill" href="#home">Pending Appointments</a>
    </li>
    <li className="nav-item">
      <a className="nav-link h4" data-toggle="pill" href="#menu1">Approved Appointments</a>
    </li>
   
  </ul>
     
             

  <div className="tab-content mt-4">
    <div id="home" className="w-100 tab-pane active"><br/>

    <div className='py-3'>
                <div className='bg-white border p-2'>
                    <div className='d-flex justify-content-between border-bottom'>
                        <div>
                            <p className='h6'>APPOINTMENTS LIST</p>
                            </div>
                    </div>

            <div className='row w-100 text-center'>
                <div className='col-sm-6'>
                    <input value={filterById}  onChange={(e)=>setFilterById(e.target.value)} className='form-control m-1' placeholder='Search Patient by ID' />
                </div>
                <div className='col-sm-6'>
                    <input value={filterByName}  onChange={(e)=>setFilterByName(e.target.value)}  className='form-control m-1' placeholder='Search Patient by Name' />
                    </div>
                </div>
            </div>
     </div>

        <table className="table table-bordered table-stripped  border-primary text-center  ">
            <thead className="table-dark text-white">
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
                            <div className="d-flex justify-content-between">
                             <div>
                            <button disabled={!each.paymentStatus} onClick={()=>setActionType({action:'approve',data:each})} title="Accept Appointment" className="btn btn-success text-white " data-target='#checkApp' data-toggle='modal'>Accept</button></div>
                                <div>
                            <button onClick={()=>setActionType({action:'decline',data:each})} title="Remove" className="btn btn-danger  text-white ml-2" data-target='#checkApp' data-toggle='modal'>Decline</button></div>
                            </div>
                        </td>
                        
                    </tr>   

                ))}
                
            </tbody>
            </table>      
    </div>
    
    <div className='modal fade big-modal' id="checkApp" data-backdrop="static">
                     <div className='modal-dialog modal-dialog-centered'>
                         <div className='modal-content'>
                              <div className='modal-header'>
                                  <h4 className='modal-title px-2'>APPOINTMENT ACTION</h4>
                                    <button type="button" className="close text-danger" data-dismiss="modal" >&times;</button>
                                </div>
                                
                                <div className='modal-body border-zero'>
                                    <CheckAppointment actionType={actionType} />  
                                </div>
                                <div className="modal-footer container">
                                <button onClick={checkAppointment} className='btn btn-success m-1' data-dismiss='modal'>Yes, I'm sure</button>

                                 <button  className=' btn btn-danger  m-1' data-dismiss='modal'>No, Go Back</button>
                                </div>
                            </div>
                        </div>
                    </div>



    <div id="menu1" className="container tab-pane fade"><br/>
      <ApprovedAppointments approvedAppointment={oldAppointments}/>
    </div>
  </div>
</div>

                
            </section>
    )

}

export default AppointmentList