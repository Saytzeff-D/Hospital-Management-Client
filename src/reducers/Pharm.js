const initState = {
    patientPharmBills: [],
    pharmBillRecords: [],
    medicineTray: [],
    reducerError: 'Loading'
}

const PharmacyReducer = (state=initState, action)=>{
    switch (action.type) {
        case 'getAllPharmBills':
            return {...state, pharmBillRecords: action.payload, reducerError: ''}
        case 'allMedicines':
            return {...state, medicineTray: action.payload, reducerError: ''}
        case 'patientPharmBill':
            return {...state, patientPharmBills: action.payload, reducerError: ''}
        case 'medicineError':
            return {...state, reducerError: action.payload}
        case 'billError':
            return {...state, reducerError: action.payload}
    
        default:
            return state
    }
}

export default PharmacyReducer