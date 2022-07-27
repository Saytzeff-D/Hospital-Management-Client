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
  let [pharmBillLength, setPharmBillLength] = useState()
  let [income, setIncome] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    axios.get(`${url}staff/getDashboardInfo`).then( res=>{
      console.log(res.data)
      setAllStaffs(res.data.staffArr)
      setPatNum(res.data.patsNum)
      setAppointments(res.data.appointments)
      setPharmBillLength(res.data.pharmNum)
      setIncome(totalIncome(res.data.payments))
      fetched('fetched')
      setLoading(false)
    })
    let count={Admin:0,Pharmacist:0,Nurse:0,Doctor:0}
    allStaffs.forEach((staff,index)=>{
      let role=staff.role
      if(role in count){
        count[role]+=1      
      }  
    })
    setCountRole(count)
  },[fetching])
  console.log(countRole)

  const totalIncome = (result)=>{
    let total = 0
      result.map((each)=>{
        total = parseInt(each.amount) + total
    })
    
    return total
  }
  
   return (
        <div>
            <header className="w3-container" style={{paddingTop: '22px'}}>
              <h5><b><i className="fa fa-dashboard"></i> Overview</b></h5>
            </header>

  <div className="w3-row-padding w3-margin-bottom">
    <div className="w3-quarter">
      <div className="w3-container shadow-lg rounded-lg w3-red w3-padding-16" id='box1'>
        <div className="w3-left"><i className="fa fa-calendar w3-xxlarge"></i></div>
        <div className="w3-right">
          <h3>
            {
              loading
              ?
              <span className='spinner-border text-white'></span>
              :
              appointment
            }
            </h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Appointments</h4>
      </div>
    </div>
    <div className="w3-quarter" id='box2'>
      <div className="w3-container shadow-lg rounded-lg w3-blue w3-padding-16">
        <div className="w3-left"><FontAwesomeIcon icon='capsules' className='w3-xxlarge' /></div>
        <div className="w3-right">
          <h3>
            {
              loading
              ?
              <span className='spinner-border text-white'></span>
              :
              pharmBillLength
            }
          </h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Pharmacy Bills</h4>
      </div>
    </div>
    <div className="w3-quarter" id='box3' >
      <div className="w3-container shadow-lg rounded-lg w3-teal w3-padding-16">
        <div className="w3-left"><i className="fa fa-ambulance w3-xxlarge"></i></div>
        <div className="w3-right">
          <h3>0</h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Ambulance</h4>
      </div>
    </div>
    <div className="w3-quarter" id='box4'>
      <div className="w3-container shadow-lg rounded-lg w3-orange w3-text-white w3-padding-16">
        <div className="w3-left"><FontAwesomeIcon icon='bed' className='w3-xxlarge' /></div>
        <div className="w3-right">
          <h3>
            {
              loading
              ?
              <span className='spinner-border text-white'></span>
              :
              patNum
            }
            </h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Patients</h4>
      </div>
    </div>
  </div>
  <hr />
  {/* Staff Overview */}
  <header className="w3-container">
     <h5><b><FontAwesomeIcon icon="people-line" />  Staffs</b></h5>
  </header>
  <div className="w3-row-padding w3-margin-bottom">
    <div className="w3-quarter" id='box5' >
      <div className="w3-container shadow-lg rounded-lg text-white bg-success w3-padding-16">
        <div className="w3-left"><FontAwesomeIcon icon="fa-solid fa-screwdriver-wrench" className='w3-xxlarge' /></div>
        <div className="w3-right">
          <h3>
            {
              loading
              ?
              <span className='spinner-border text-white'></span>
              :
              countRole.Admin
            }
            </h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Admin</h4>
      </div>
    </div>
    <div className="w3-quarter" id='box6'>
      <div className="w3-container shadow-lg rounded-lg text-white w3-gray w3-padding-16">
        <div className="w3-left"><FontAwesomeIcon icon='stethoscope' className='w3-xxlarge' /></div>
        <div className="w3-right">
          <h3>
            {
              loading
              ?
              <span className='spinner-border text-white'></span>
              :
              countRole.Doctor
            }
          </h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Doctor</h4>
      </div>
    </div>
    <div className="w3-quarter" id='box7'>
      <div className="w3-container shadow-lg rounded-lg text-white w3-deep-orange w3-padding-16">
        <div className="w3-left"><FontAwesomeIcon icon='prescription' className='w3-xxlarge' /></div>
        <div className="w3-right">
          <h3>
            {
              loading
              ?
              <span className='spinner-border text-white'></span>
              :
              countRole.Pharmacist
            }
          </h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Pharmacist</h4>
      </div>
    </div>
    <div className="w3-quarter" id='box8'>
      <div className="w3-container shadow-lg rounded-lg text-white w3-brown w3-text-white w3-padding-16">
        <div className="w3-left"><FontAwesomeIcon icon='bed' className='w3-xxlarge' /></div>
        <div className="w3-right">
          <h3>
            {
              loading
              ?
              <span className='spinner-border text-white'></span>
              :
              countRole.Nurse
            }
          </h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Nurse</h4>
      </div>
    </div>
  </div>
  <hr />

  {/* Finances */}
  <header className="w3-container">
     <h5><b><FontAwesomeIcon icon="coins" />  Finances</b></h5>
  </header>
  <div className="w3-row-padding w3-margin-bottom">
    <div className="w3-quarter" id='box5' >
      <div className="w3-container shadow-lg rounded-lg text-white bg-primary w3-padding-16">
        <div className="w3-left"><FontAwesomeIcon className='w3-xxlarge' icon='sack-dollar' /></div>
        <div className="w3-right">
          <h3>
            {
              loading
              ?
              <span className='spinner-border text-white'></span>
              :
              <span><FontAwesomeIcon icon='naira-sign' /> {income} </span>
            }
            </h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Income</h4>
      </div>
    </div>
    <div className="w3-quarter" id='box7'>
      <div className="w3-container shadow-lg rounded-lg text-white bg-danger w3-padding-16">
        <div className="w3-left"><FontAwesomeIcon icon='file-invoice-dollar' className='w3-xxlarge' /></div>
        <div className="w3-right">
          <h3>
            {
              loading
              ?
              <span className='spinner-border text-white'></span>
              :
              <span><FontAwesomeIcon icon='naira-sign' />6,000</span>
            }
          </h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Expenses</h4>
      </div>
    </div>
    <div className="w3-quarter" id='box8'>
      <div className="w3-container shadow-lg rounded-lg text-white w3-deep-purple w3-text-white w3-padding-16">
        <div className="w3-left"><FontAwesomeIcon icon='wallet' className='w3-xxlarge' /></div>
        <div className="w3-right">
          <h3>
            {
              loading
              ?
              <span className='spinner-border text-white'></span>
              :
              <span><FontAwesomeIcon icon='naira-sign' />4,000</span>
            }
          </h3>
        </div>
        <div className="w3-clear py-3"></div>
        <h4>Net Worth</h4>
      </div>
    </div>
  </div>
        </div>
    );
}

export default StaffDashboard;