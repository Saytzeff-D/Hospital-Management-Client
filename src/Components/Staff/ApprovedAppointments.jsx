import React from "react";

const ApprovedAppointments=(props)=>{
    let {approvedAppointment}=props
    return(
        <>
        
  <div id="home" className="w-100 tab-pane active"><br/>
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
              {approvedAppointment.map((each,index)=>(
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