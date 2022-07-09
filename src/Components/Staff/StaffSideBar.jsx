import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LogoutMessage from '../Container/LogoutMessage'

const StaffSideBar = ()=>{
    const [staffInfo,setStaffInfo] = useState(useSelector(state=>state.StaffReducer.staffInfo))
    
    useEffect(()=>{
        if(!staffInfo.fullName){
            
            setStaffInfo(JSON.parse(sessionStorage.hcmStaffDetails))
        }
    },[staffInfo.fullName])
   
    const [num, setNum] = useState(0)
    const [mySidebarStyle, setMySideBarStyle] = useState({zIndex:3, width: '300px'})
    const [overlayBgStyle, setOverlayBgStyle] = useState({cursor: 'pointer'})
    const [route, setRoute] = useState('')
    
      const w3_open = ()=>{
          if (num%2 === 0) {
            setMySideBarStyle({zIndex:3, width: '300px', display: 'block'})
            setOverlayBgStyle({cursor: 'pointer', display: 'block'})
            setNum(num+1)         
        } else {
            setMySideBarStyle({zIndex:3, width: '300px', display: 'none'})
            setOverlayBgStyle({cursor: 'pointer', display: 'none'})
            setNum(num+1)
        }
      }
      function logoutStaff(){
        setRoute('staff')
      }
    return(
        <div>
            {/* Top Container */}
            <div className="w3-bar w3-top w3-blue w3-large" style={{zIndex: 4}}>
                <button className="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey" onClick={w3_open}><i className="fa fa-bars"></i></button>
                <span className="w3-bar-item w3-left font-weight-bold">Hospital Management System</span>
                <span data-toggle='modal' data-target='#logoutModal' className='w3-right p-2 w3-hide-small font-weight-bold' onClick={logoutStaff} style={{cursor: 'pointer'}}>Logout <i className='fa fa-power-off'></i></span>
            </div>
            {/* SideNav Menu */}
            <nav className="w3-sidebar w3-collapse w3-white w3-animate-left" style={mySidebarStyle}>
                <br />
                <div className="w3-container w3-row">
                    <div className="w3-col s4">
                    <img src={staffInfo.photo} alt='photoNow' className="w3-circle w3-margin-right" style={{width: '80px'}} />
                    </div>
                    <div className="w3-col s8 w3-bar">
                    <span>Welcome, <strong className='text-capitalize '>{ `${staffInfo.fname}`}.</strong></span><br/>
                    <a href="/" className="w3-bar-item w3-button"><i className="fa fa-envelope"></i></a>
                    <a href="/" className="w3-bar-item w3-button"><i className="fa fa-user"></i></a>
                    <a href="/" className="w3-bar-item w3-button"><i className="fa fa-cog"></i></a>
                    <br/><br/>
                  <span className='h5 text-capitalize'>  Role : {staffInfo.role}</span> 


                    </div>
                </div>
                <hr />
                <div className="w3-container">
                    <h5>Dashboard</h5>
                </div>
                <div className="w3-bar-block">
                    <NavLink to='/staff/dashboard' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><i className="fa fa-users fa-fw"></i>  Overview</NavLink> 
                    { staffInfo.role!=='nurse' && staffInfo.role!=='accountant' && staffInfo.role!=='pharmacist'&& <NavLink to='/staff/appointment' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><i className="fa fa-calendar fa-fw"></i>  My Appointments</NavLink> }
                    {  staffInfo.role!=='accountant' && <NavLink to='/staff/pharmacy' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><i className="fa fa-users fa-fw"></i>  Pharmacy</NavLink> }
                   {staffInfo.role!=='pharmacist'&&staffInfo.role!=='accountant' &&<NavLink to='/staff/ambulance' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><i className="fa fa-ambulance fa-fw"></i>  Ambulance</NavLink> }
                 {  staffInfo.role!=='nurse' && staffInfo.role!=='accountant' && staffInfo.role!=='pharmacist' && <NavLink to='/staff/birthRecords' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><i className="fa fa-comment-o fa-fw"></i>  Birth Records</NavLink>}
                   { staffInfo.role!=='nurse' && staffInfo.role!=='accountant' && staffInfo.role!=='pharmacist' && <NavLink to='/staff/deathRecords' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><i className="fa fa-comment-o fa-fw"></i>  Death Records</NavLink>
}

                   { (staffInfo.role ==='doctor' || staffInfo.role ==='admin') && <NavLink to='/staff/addPrescription' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><i className="fa fa-comment-o fa-fw"></i>  Add Prescription</NavLink>}

                   {staffInfo.role!=='accountant' && <NavLink to='/staff/medicineDetails' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><i className="fa fa-comment-o fa-fw"></i>  Medicine Details</NavLink>}
                    { staffInfo.role!=='nurse'&& staffInfo.role=='accountant' && <NavLink to='/staff/supllierList' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><i className="fa fa-comment-o fa-fw"></i>  Supplier List</NavLink>}

                   { staffInfo.role!=='nurse' && staffInfo.role!=='accountant' && <NavLink to='/staff/prescriptionList' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><i className="fa fa-comment-o fa-fw"></i>  Prescription List</NavLink>}

                    { staffInfo.role!=='pharmacist'&& staffInfo.role!=='pharmacist' &&<NavLink to='/staff/patientList' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><i className="fa fa-comment-o fa-fw"></i>  Patient List</NavLink>}

                    { 
                    (staffInfo.role ==='admin' || staffInfo.role!=='accountant') && 
                    <NavLink style={{textDecoration: 'none'}} to='/staff/finance' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><FontAwesomeIcon icon="sack-dollar" />  Finance</NavLink>
                    }
                     { 
                    (staffInfo.role ==='admin' || staffInfo.role!=='accountant') && 
                    <NavLink style={{textDecoration: 'none'}} to='/staff/staffList' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"> <FontAwesomeIcon icon="fa-person-dress" />  Staffs</NavLink>
                    }
                    <NavLink style={{textDecoration: 'none'}} to='/staff/liveChat' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><FontAwesomeIcon icon="comment-medical" />  Live Chat</NavLink>
                    <p style={{textDecoration: 'none'}} onClick={logoutStaff} className="w3-bar-item w3-button w3-padding w3-hide-large"><i className="fa fa-power-off fa-fw"></i>  Logout</p> 
                </div>
            </nav>

            {/* Overlay Effect when openong sidebar */}
            <div className="w3-overlay w3-hide-large w3-animate-opacity" style={overlayBgStyle} onClick={w3_open} title="close side menu"></div>

            {/* Page Content */}
            <div className="w3-main px-3" style={{marginLeft: '300px', marginTop: '43px'}}>
                <Outlet />
            </div>

            {/* Modal Logout */}
            <div className='modal fade' data-backdrop='static' id='logoutModal'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <p className='h6'>Logout</p>
                        </div>
                        <div className='modal-body'>
                            <LogoutMessage route={route} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StaffSideBar