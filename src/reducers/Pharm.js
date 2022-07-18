const initState = {
    patientPharmBills: [],
    pharmBillRecords: [],
    medicineTray: [],
    reducerError: ''
}

const PharmacyReducer = (state=initState, action)=>{
    switch (action.type) {
        case 'getAllPharmBills':
            return state
        case 'allMedicines':
            return {...state, medicineTray: action.payload}
        case 'medicineError':
            return {...state, reducerError: action.payload}
    
        default:
            return state
    }
}

export default PharmacyReducer