import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {useSelector }from 'react-redux'
import CheckAppointment from "../Container/Checkappointment";
import AppointmentHistory from "./AppointmentHistory";
import ApprovedAppointments from "./ApprovedAppointments";

const AppointmentList=()=>{
    const url=useSelector(state=>state.UrlReducer.url)
    const staffDetails=useSelector(state=>state.StaffReducer.staffInfo)
    const [newAppointments,setNewAppointments]=useState([])
    const [oldAppointments,setOldAppointments]=useState([])
    const [actionType,setActionType]=useState({action:'',data:{}})
    let [viewPat,setViewPat]=useState({})


    


    useEffect(()=>{
        axios.get(`${url}staff/allAppointments`).then(res=>{
            if(res.data.status){                            
                filterAppointment(res.data.appointments)
            }else{
                console.log(res.data.message)
            }
        })

    },[actionType, url])
    function filterAppointment(allAppointments){
        let oldAppointments=[]
        let newAppointments=[]
        allAppointments.forEach( (each,index)=>{
            let doctorName='Dr.' + staffDetails.fname + ' ' + staffDetails.lname
            alert(staffDetails.fname)
            if(each.paymentStatus && !each.prescriptionStatus && (each.doctorName===doctorName || staffDetails.role==='Admin') ){
                oldAppointments.push(each)
            }else if(each.paymentStatus && each.prescriptionStatus && (each.doctorName===doctorName || staffDetails.role=='Admin')) {
                newAppointments.push(each)
            }
        })
        setOldAppointments(oldAppointments)
        setNewAppointments(newAppointments)
        console.log(allAppointments)
        console.log(oldAppointments)
        console.log(newAppointments)
    }
    return(
        <section className="" style={{paddingTop:'5px'}}>        
            <div className="container mt-5">
                <ul className="nav nav-pills d-flex justify-content-around mt-5" role="tablist">
                    <li className="nav-item">
                    <a className="nav-link active h4" data-toggle="pill" href="#home">Today's Appointments</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link h4" data-toggle="pill" href="#menu1">Appointments History</a>
                    </li>                
                </ul>
             

                {staffDetails.fname==''?<span className='spinner-border text-white'></span>:<div className="tab-content mt-4">
                    <div id="home" className="w-100 tab-pane active">
                    <ApprovedAppointments approvedAppointment={oldAppointments}/>                        
                    </div>
                    <div id="menu1" className="tab-pane fade">
                        <AppointmentHistory appointmentHistory={newAppointments} />
                    </div>
                </div>}
            </div> 
            {/* Modals */}                    
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
                                    <button  className=' btn btn-danger  m-1' data-dismiss='modal'>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                {/* Modal */}
        </section>
    )

}

export default AppointmentList