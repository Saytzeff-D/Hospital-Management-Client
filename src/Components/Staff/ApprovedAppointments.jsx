import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ApprovedAppointments=(props)=>{
    let {approvedAppointment}=props
    
    let [filterById,setFilterById]=useState('')
    let [filterByName,setFilterByName]=useState('')
    let [filteredList, setFilteredList]=useState([])



   



    useEffect(()=>{
       setFilteredList(approvedAppointment)

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




    return(
        <>
        
  <div id="home" className="w-100 tab-pane active"><br/>

  <div className='py-3'>
                <div className='bg-white border p-2'>
                    <div className='d-flex justify-content-between border-bottom'>
                        <div>
                            <p className='h6'>APPOINTMENTS LIST</p>
                            </div>
                    </div>

            <div className='row '>
                <div className='col-sm-6'>
                    <input  value={filterById}  onChange={(e)=>setFilterById(e.target.value)}  className='form-control m-1' placeholder='Search Patient by ID' />
                </div>
                <div className='col-sm-6'>
                    <input  onChange={(e)=>setFilterByName(e.target.value)}   className='form-control m-1' placeholder='Search Patient by Name' />
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
                  <th>View Patient Profile</th>
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
                          <i data-target='#viewProfile' data-toggle='modal' className='fa fa-photo text-warning fa-lg'></i>
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
                                    PROFILE
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