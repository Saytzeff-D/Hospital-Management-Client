const initState = {
    patientPharmBills: [],
    pharmBillRecords: []
}

const PharmacyReducer = (state=initState, action)=>{
    switch (action.type) {
        case 'getAllPharmBills':
            return state
    
        default:
            return state
    }
}

export default PharmacyReducer