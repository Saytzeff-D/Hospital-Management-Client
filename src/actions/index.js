import axios from "axios"

export const testAction=()=>{
    return{
        type:'change_backend_url_to_hosted',
        payload:'https://hospital-software-server.herokuapp.com/'
          }
}

export const setStaff=(params)=>{
  return{
    type: 'setStaff',
    payload:params
  }
}

export const getStaff = (url)=>{
  return (dispatch)=>{
    return axios.get(`${url}staff/allStaffs`).then((res)=>{
      dispatch({type: 'getStaff', payload: res.data})
    })
  }
}
export const getAllPatient = (url)=>{
  return (dispatch)=>{
    return axios.get(`${url}patient/allPatient`).then((res)=>{
      dispatch({type: 'getAllPatients', payload: res.data})
    })
  }
}
export const setPatientDetails = (details)=>{
  return{
    type: 'patientDetails',
    payload: details
  }
}
export const getPatientAppointmentList = (url, obj)=>{
  return (dispatch)=>{
    return axios.post(`${url}patient/fetchAppointments`, obj).then((res)=>{
      dispatch({type: 'loggedInPatientAppointment', payload: res.data.appointments})
    }).catch((err)=>{
      dispatch({type: 'axiosError', payload: 'AxiosError'})
    })
  }
}
export const allMedicines = (url)=>{
  return (dispatch)=>{
    return axios.get(`${url}staff/allMedicines`).then((res)=>{
      dispatch({type: 'allMedicines', payload: res.data.drugs})
    }).catch((err)=>{
      dispatch({type: 'medicineError', payload: 'MedError'})
    })
  }
}
export const allPharmBillRecords = (url)=>{
  return (dispatch)=>{
    return axios.get(`${url}staff/pharmacyBills`).then((res)=>{
      dispatch({type: 'getAllPharmBills', payload: res.data.bills})
    }).catch((err)=>{
      dispatch({type: 'billError', payload: 'AxiosError'})
    })
  }
}
export const patientPharmBill = (url, healthIdObj)=>{
  return (dispatch)=>{
    return axios.post(`${url}patient/pharmacyBills`, healthIdObj).then((res)=>{
      dispatch({type: 'patientPharmBill', payload: res.data.bill})
    }).catch((err)=>{
      dispatch({type: 'billError', payload: 'AxiosError'})
    })
  }
}