import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function StaffDashboard() {
  let url=useSelector(state=>state.UrlReducer.url)
  let [allStaffs,setAllStaffs]=useState([])
  console.log(allStaffs)
  let [countRole,setCountRole]=useState({Admin:0,Pharmacist:0,Nurse:0,Doctor:0})
  let [fetching,fetched]=useState('')
  let [patNum,setPatNum]=useState(0)
  let [appointment,setAppointments]=useState(0)

  useEffect(()=>{
    axios.get(`${url}staff/getDashboardInfo`).then( res=>{
      console.log(res.data)
      setAllStaffs(res.data.staffArr)
      setPatNum(res.data.patsNum)
      setAppointments(res.data.appointments)
      fetched('fetched')
    })
    getRoles()
  },[fetching])

  const getRoles=()=>{
    let count={Admin:0,Pharmacist:0,Nurse:0,Doctor:0}
    allStaffs.forEach((staff,index)=>{
      let role=staff.role
      if(role in count){
        console.log(role,9999)
        count[role]+=1      
      }  
    })
    setCountRole(count)
  }
  
  console.log(countRole)
  
   return (
        <div>
            <header className="w3-container" style={{paddingTop: '22px'}}>
    <h5><b><i className="fa fa-dashboard"></i> Overview</b></h5>
  </header>

  <div className="w3-row-padding w3-margin-bottom">
    <div className="w3-quarter">
      <div className="w3-container w3-red w3-padding-16">
        <div className="w3-left"><i className="fa fa-calendar w3-xxlarge"></i></div>
        <div className="w3-right">
          <h3>{appointment}</h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Appointments</h4>
      </div>
    </div>
    <div className="w3-quarter">
      <div className="w3-container w3-blue w3-padding-16">
        <div className="w3-left"><FontAwesomeIcon icon='capsules' className='w3-xxlarge' /></div>
        <div className="w3-right">
          <h3>99</h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Pharmacy Bills</h4>
      </div>
    </div>
    <div className="w3-quarter">
      <div className="w3-container w3-teal w3-padding-16">
        <div className="w3-left"><i className="fa fa-ambulance w3-xxlarge"></i></div>
        <div className="w3-right">
          <h3>23</h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Ambulance</h4>
      </div>
    </div>
    <div className="w3-quarter">
      <div className="w3-container w3-orange w3-text-white w3-padding-16">
        <div className="w3-left"><FontAwesomeIcon icon='bed' className='w3-xxlarge' /></div>
        <div className="w3-right">
          <h3>{patNum}</h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Patients</h4>
      </div>
    </div>
  </div>
  <hr />
  {/* Staff Overview */}
  <div className="w3-row-padding w3-margin-bottom">
    <div className="w3-quarter">
      <div className="w3-container text-white bg-success w3-padding-16">
        <div className="w3-left"><i className="fa fa-calendar w3-xxlarge"></i></div>
        <div className="w3-right">
          <h3>{countRole.Admin}</h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Admin</h4>
      </div>
    </div>
    <div className="w3-quarter">
      <div className="w3-container text-white bg-warning w3-padding-16">
        <div className="w3-left"><FontAwesomeIcon icon='stethoscope' className='w3-xxlarge' /></div>
        <div className="w3-right">
          <h3>{countRole.Doctor}</h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Doctor</h4>
      </div>
    </div>
    <div className="w3-quarter">
      <div className="w3-container text-white bg-danger w3-padding-16">
        <div className="w3-left"><FontAwesomeIcon icon='prescription' className='w3-xxlarge' /></div>
        <div className="w3-right">
          <h3>{countRole.Pharmacist}</h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Pharmacist</h4>
      </div>
    </div>
    <div className="w3-quarter">
      <div className="w3-container text-white w3-orange w3-text-white w3-padding-16">
        <div className="w3-left"><FontAwesomeIcon icon='bed' className='w3-xxlarge' /></div>
        <div className="w3-right">
          <h3>{countRole.Nurse}</h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Nurse</h4>
      </div>
    </div>
  </div>
        </div>
    );
}

export default StaffDashboard;