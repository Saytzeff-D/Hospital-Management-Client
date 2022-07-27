import React, { useEffect, useState } from 'react'

const AppointmentHistory = (props)=>{
    let { appointmentHistory } = props
    const [newAppointments,setNewAppointments]=useState([])
    let [filterByName,setFilterByName] = useState('')

    useEffect(()=>{
        setNewAppointments(appointmentHistory)
    },[appointmentHistory])

    const searchByDate = (value)=>{
        if(value !== ''){
            let filteredArr =  newAppointments.filter((appoint)=>(appoint.appointmentDate.includes(value)))
            filteredArr.length !== 0 ? setNewAppointments(filteredArr) : setNewAppointments([])
        }else{
            setNewAppointments(appointmentHistory)
        }
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
                            {/* <input value={filterById}  onChange={(e)=>setFilterById(e.target.value)} className='form-control m-1' placeholder='Search Patient by ID' /> */}
                            <input onChange={(e)=>searchByDate(e.target.value)} className='form-control m-1' placeholder='Search' />
                        </div>
                        <div className='col-sm-6'>
                            <input value={filterByName}  onChange={(e)=>setFilterByName(e.target.value)}  className='form-control m-1' placeholder='Search Patient by Name' />
                        </div>
                    </div>

                    {
                        appointmentHistory.length === 0
                        ?
                        (<p className='font-weight-bolder h5 py-2'>No History of Appointment</p>)
                        :
                        (
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {newAppointments.map((each,index)=>(
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{each.appointmentNo}</td>
                                            <td>{each.doctorName}</td>
                                            <td>{each.healthId}</td>
                                            <td>{each.appointmentDate}</td>
                                            <td>{each.timeSlot}</td>
                                            <td>{each.message}</td>
                                        </tr>   
                                    ))}
                                </tbody>
                            </table>    
                        )
                    }  
                </div>
            </div>
        </div>
    )
}

export default AppointmentHistory