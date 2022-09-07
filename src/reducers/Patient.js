const initState = {
    patientDetails: {},
    patientTray: [],
    editMessage:''
}

const PatientReducer = (state=initState, action)=>{
    switch (action.type) {
        case 'patientDetails':
            return {...state, patientDetails: action.payload}
        case 'getAllPatients':
            return {...state, patientTray: action.payload}
            
        default:
            return state
    }
}

export default PatientReducer
