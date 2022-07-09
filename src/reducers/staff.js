const initState = {
    viewPatientDetails:{},
    staffInfo:{},
    staffTray: [],
    patTray:{}
}

const StaffReducer = (state=initState, action)=>{
    switch (action.type) {
        case 'setStaff':            
            let newState = {...state, staffInfo: action.payload}
            return newState
        case 'getStaff':
            return {...state, staffTray: action.payload}
        case 'updatePatient':
            return {...state, patTray:action.payload}
        case 'viewPatientDetails':
            return {...state, viewPatientDetails: action.payload}
        default:
            return state
    }
}

export default StaffReducer