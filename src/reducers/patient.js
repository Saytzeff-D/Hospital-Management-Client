const initState = {
    patientDetails: {},
    appointmentTray: []
}

const PatientReducer = (state=initState, action)=>{
    switch (action.type) {
        case 'patientDetails':
            return {...state, patientDetails: action.payload}
    
        default:
            return state
    }
}

export default PatientReducer