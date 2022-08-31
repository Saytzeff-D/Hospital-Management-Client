import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function PatientDashboard(props) {
  const navigate = useNavigate()
  const [patInfo,setPatInfo]=useState({AppNo:'',presNo:""})
  const url= useSelector(state=>state.UrlReducer.url)
  const patientDetails=useSelector(state=>state.PatientReducer.patientDetails)
  useEffect(()=>{
    axios.post(`${url}patient/getInfo`,patientDetails).then(res=>{
      if(res.data.status){
        let data=res.data
        setPatInfo({...patInfo,AppNo:data.AppNo,presNo:data.presNo,patNo:data.patNo})
      }
    })
  },[])
    return (
        <div>
            <header className="w3-container" style={{paddingTop: '22px'}}>
    <h5><b><i className="fa fa-dashboard"></i> My Dashboard</b></h5>
  </header>

  <div className="card-deck w3-row-padding w3-margin-bottom px-5">
    <div className="w3-quarter">
      <div style={{cursor: 'pointer'}} onClick={()=>navigate('/patient/appointment')} className="w3-container w3-red w3-padding-16 shadow rounded-lg">
        <div className="w3-left"><i className="fa fa-calendar w3-xxlarge"></i></div>
        <div className="w3-right">
          <h3>{(patInfo.AppNo==''  && patInfo.AppNo!==0 )?  
              <span className='spinner-border text-white'></span>:patInfo.AppNo
          
        }</h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>My Appointment</h4>
      </div>
    </div>
    <div className="w3-quarter">
      <div style={{cursor: 'pointer'}} onClick={()=>navigate('/patient/pharmacy')} className="w3-container w3-blue w3-padding-16 shadow rounded-lg">
        <div className="w3-left"><FontAwesomeIcon icon='mortar-pestle' className='w3-xxlarge' /></div>
        <div className="w3-right">
        <h3>{(patInfo.presNo=='' && patInfo.presNo!==0 ) ?  
              <span className='spinner-border text-white'></span>:patInfo.presNo
          
        }</h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Pharmacy Bills</h4>
      </div>
    </div>
    <div className="w3-quarter">
      <div style={{cursor: 'pointer'}} onClick={()=>navigate('/patient/ambulance')} className="w3-container w3-teal w3-padding-16 shadow rounded-lg">
        <div className="w3-left"><i className="fa fa-ambulance w3-xxlarge"></i></div>
        <div className="w3-right">
          <h3>0</h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Ambulance</h4>
      </div>
    </div>
    <div className="w3-quarter">
      <div className="w3-container w3-orange w3-text-white w3-padding-16 shadow rounded-lg">
        <div className="w3-left"><FontAwesomeIcon icon='bed' className='w3-xxlarge' /></div>
        <div className="w3-right">
        <h3>{(patInfo.patNo=='' && patInfo.patNo!==0 ) ?  
              <span className='spinner-border text-white'></span>:patInfo.patNo
          
        }</h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Patients</h4>
      </div>
    </div>
  </div>
        </div>
    );
}

export default PatientDashboard;