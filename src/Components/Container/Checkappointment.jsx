import React from 'react';

function CheckAppointment(props) {
    const {actionType} = props

    // const onNoClick = ()=>{
    //     if(route === 'patient'){
    //         window.location = '/patient/dashboard'
    //     }else{
    //         window.location = '/staff/dashboard'
    //     }
    // }
    return (
        <div>
            <p>Are you sure you want to {actionType.action} the Appointment?</p>
        </div>
    );
}

export default CheckAppointment;