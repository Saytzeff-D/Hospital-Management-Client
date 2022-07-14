const initState = {
    birthRecords: [],
    deathRecords: []
}

const RecordsReducer = (state=initState, action)=>{
    switch (action.type) {
        case 'setBirthRecords':
            return {...state, birthRecords: action.payload};
    
        default:
            return state;
    }
}

export default RecordsReducer