const initState = {
    staffInfo:{},
    count:0
}

const StaffReducer = (state=initState, action)=>{
    if(action.type=='setStaff'){
        let newState={...state,staffInfo:action.payload}

        return newState
    }


   return state
}

export default StaffReducer