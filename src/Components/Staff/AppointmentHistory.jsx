import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const AppointmentHistory = ()=>{
    const url=useSelector(state=>state.UrlReducer.url)
    const staffDetails=useSelector(state=>state.StaffReducer.staffInfo)
    const [newAppointments,setNewAppointments]=useState([])
    const [oldAppointments,setOldAppointments]=useState([])
    const [actionType,setActionType]=useState({action:'',data:{}})
    let [filterById,setFilterById]=useState('')
    let [filterByName,setFilterByName]=useState('')
    let [filteredList, setFilteredList]=useState([])
    let [appointmentDate,setNewDate]=useState('')
    let [shift,setShift]=useState('')
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

    }}
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
    const reschedule=(each)=>{
        setActionType({action:'decline',data:each})
        setNewDate(each.appointmentDate)
        setShift(each.shift)
               
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
    return (
        <div>
            <div className='py-3'>
                <div className='bg-white border p-2'>
                    <div className='border-bottom'>
                        <p className='h6'>APPOINTMENTS LIST</p>
                    </div>
                    <div className='row w-100 text-center'>
                        <div className='col-sm-6'>
                            <input value={filterById}  onChange={(e)=>setFilterById(e.target.value)} className='form-control m-1' placeholder='Search Patient by ID' />
                        </div>
                        <div className='col-sm-6'>
                            <input value={filterByName}  onChange={(e)=>setFilterByName(e.target.value)}  className='form-control m-1' placeholder='Search Patient by Name' />
                        </div>
                    </div>

                    <table className="table table-primary table-hover table-responsive text-center">
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
                                        <div className="d-flex justify-content-between">
                                        <div>
                                        <button style={{fontSize:'10px'}} disabled={!each.paymentStatus} onClick={()=>setActionType({action:'approve',data:each})} title="Accept Appointment" className="btn btn-success text-white " data-target='#checkApp' data-toggle='modal'>Accept</button></div>
                                            <div>
                                        <button style={{fontSize:'10px'}}  onClick={()=>reschedule(each)} title="Remove" className="btn btn-danger  text-white ml-1" data-target='#checkApp' data-toggle='modal'>Reschedule</button></div>                            
                                        <div>
                                            <button style={{fontSize:'10px'}}  className="btn bg-white ml-1" onClick={()=>fetchPatientProfile(each.healthId)}><i data-target='#viewProfile' data-toggle='modal' className='fa fa-photo text-warning fa-lg'></i>
                                        </button></div>
                                        </div>
                                    </td>
                                </tr>   
                            ))}
                        </tbody>
                    </table>      
                </div>
            </div>
        </div>
    )
}

export default AppointmentHistory