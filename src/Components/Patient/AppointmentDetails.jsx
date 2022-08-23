import React, { useEffect } from 'react';

const AppointmentDetails = (props) => {
    const { details } = props
    useEffect(()=>{
        console.log(props)
    })
    return (
        <div>
            <div className="row w-100 mx-auto">
                <div className="col-md-4"><strong>AppointmentDate:</strong> {details.appointmentDate}</div>
                <div className="col-md-4"><strong>AppointmentNo:</strong> {details.appointmentNo}</div>
                <div className="col-md-4"><strong>AppointmentPriority:</strong> {details.appointmentPriority}</div>
            <div className="row w-100 mx-auto">
                <div className="col-md-4"><strong>Health Id:</strong> {details.healthId}</div>
                <div className="col-md-4"><strong>Physician:</strong> {details.doctorName}</div>
                <div className="col-md-4"><strong>Specialist:</strong> {details.specialist}</div>
            </div>
                <div className="col-md-6"><strong>Shift:</strong> {details.shift}</div>
                <div className="col-md-6"><strong>Time Alotted:</strong> {details.timeSlot}</div>
                <div className="col-md-6"><strong>Message:</strong> {details.message}</div>
            </div>
        </div>
    );
};

export default AppointmentDetails;