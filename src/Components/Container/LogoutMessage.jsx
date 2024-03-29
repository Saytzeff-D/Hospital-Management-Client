import React from 'react';

function LogoutMessage(props) {
    const {route} = props

    const onYesClick = ()=>{
        if(route === 'patient'){
            localStorage.removeItem('PatientToken')
            window.location = '/views/patientLogin'
        }else{
            localStorage.removeItem('StaffToken')
            window.location = '/views/staffLogin'
        }
    }
    
    return (
        <div>
            <p>Are you sure you want to leave?</p>
            <div className='d-flex'>
                <button onClick={onYesClick} className='btn btn-danger m-1'>Yes, I'm sure</button>
                <button data-dismiss='modal' className='btn btn-success m-1'>No, I'm not</button>
            </div>
        </div>
    );
}

export default LogoutMessage;