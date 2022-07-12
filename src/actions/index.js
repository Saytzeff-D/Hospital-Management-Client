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
export const setPatientDetails = (details)=>{
  return{
    type: 'patientDetails',
    payload: details
  }
}
export const getPatientAppointmentList = (url, healthId)=>{
  return (dispatch)=>{
    return axios.post(`${url}patient/fetchAppointments`, healthId).then((res)=>{
      dispatch({type: 'loggedInPatientAppointment', payload: res.data.appointments})
    }).catch((err)=>{
      dispatch({type: 'axiosError', payload: 'AxiosError'})
    })
  }
}