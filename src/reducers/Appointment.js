const initState = {
    appointmentTray: [],
    patientAppointment: [],
    awaitingResponse: 'Waiting'
}

const AppointmentReducer = (state=initState, action)=>{
    switch (action.type) {
        case 'loggedInPatientAppointment':
            return{...state, patientAppointment: action.payload, awaitingResponse: ''}
        case 'axiosError':
            return {...state, awaitingResponse: action.payload}
            
        default:
            return state
    }
}

export default AppointmentReducer