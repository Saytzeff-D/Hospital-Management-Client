import React from 'react';

function CheckAppointment(props) {
    const {actionType} = props

    return (
        <div>
            <p>Are you sure you want to {actionType.action} the Appointment?</p>
        </div>
    );
}

export default CheckAppointment;