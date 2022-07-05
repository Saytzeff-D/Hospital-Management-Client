const initState = {
    staffInfo:{},
    staffTray: []
}

const StaffReducer = (state=initState, action)=>{
    switch (action.type) {
        case 'setStaff':
            let newState = {...state, staffInfo: action.payload}
            return newState
        case 'getStaff':
            return {...state, staffTray: action.payload}
        default:
            return state
    }
}

export default StaffReducer