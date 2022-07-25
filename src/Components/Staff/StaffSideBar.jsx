import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { allMedicines, getAllPatient, setStaff } from '../../actions';
import LogoutMessage from '../Container/LogoutMessage'

const StaffSideBar = ()=>{
  const [isLoading, setIsLoading] = useState(true)
  const url = useSelector(state=>state.UrlReducer.url)
  const navigate = useNavigate()
  const dispatch=useDispatch()
    const staffInfo = useSelector(state=>state.StaffReducer.staffInfo)
    
    useEffect(()=>{        
        if(!localStorage.StaffToken){
          navigate('/views/staffLogin')
        }else{
        let token=localStorage.StaffToken
        axios.get(`${url}staff/dashboard`, {headers:{
          'authorization' :  `Bearer ${token}`,
          'Content-Type':'application/json',
          'Accept':'application/json'
        }}).then(res=>{
        if(res.data.status){
            console.log(res.data.staffDetails)
          dispatch(allMedicines(url))
          dispatch(setStaff(res.data.staffDetails))
          dispatch(getAllPatient(url))
          setIsLoading(false)
        }
        else{
          localStorage.removeItem('StaffToken')
        navigate('/views/staffLogin')
        
        }
        
        }).catch(err=>{
            console.log(err, token)
            localStorage.removeItem('StaffToken')
            navigate('/views/staffLogin')
        })
        
        }
    }, [dispatch, url, navigate])
   
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
                    {
                      isLoading 
                      ? 
                      <div className='d-flex justify-content-center'><span className='spinner-border text-danger'></span></div>
                      :
                      <>
                        <div className="w3-col s4">
                    <img src={staffInfo.photo} alt='photoNow' className="w3-circle w3-margin-right" style={{width: '80px'}} />
                    </div>
                    <div className="w3-col s8 w3-bar">
                    <span>Welcome, <strong className='text-capitalize '>{ `${staffInfo.fname}`}.</strong></span><br/>
                    <a href="/" className="w3-bar-item w3-button"><i className="fa fa-envelope"></i></a>
                    <a href="/" className="w3-bar-item w3-button"><i className="fa fa-user"></i></a>
                    <a href="/" className="w3-bar-item w3-button"><i className="fa fa-cog"></i></a>
                    <br/><br/>
                  <span className='h6 text-capitalize'>{staffInfo.role}</span> 
                    </div>
                      </>
                    }
                </div>
                <hr />
                <div className="w3-container">
                    <h5>Dashboard</h5>
                </div>
                <div className="w3-bar-block">
                    <NavLink style={{textDecoration: 'none'}} to='/staff/dashboard' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><i className="fa fa-users fa-fw"></i>  Overview</NavLink> 
                    { 
                      (staffInfo.role ==='Doctor' || staffInfo.role ==='Accountant' || staffInfo.role ==='Admin') && 
                      <NavLink style={{textDecoration: 'none'}} to='/staff/appointment' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><i className="fa fa-calendar fa-fw"></i>  Appointments</NavLink> 
                    }
                    {  
                      (staffInfo.role === 'Admin' || staffInfo.role === 'Pharmacist' || staffInfo.role ==='Accountant' ) && 
                      <NavLink style={{textDecoration: 'none'}} to='/staff/pharmacyBills' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><i className="fa fa-users fa-fw"></i>  Pharmacy Bills</NavLink> 
                    }
                    {
                      (staffInfo.role === 'Admin' || staffInfo.role ==='Doctor' || staffInfo.role ==='Accountant') &&
                      <NavLink style={{textDecoration: 'none'}} to='/staff/ambulance' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><i className="fa fa-ambulance fa-fw"></i>  Ambulance</NavLink> 
                    }
                    {  
                      (staffInfo.role === 'Admin' || staffInfo.role === 'Doctor' || staffInfo.role ==='Nurse') &&  
                      <NavLink style={{textDecoration: 'none'}} to='/staff/birthRecords' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><FontAwesomeIcon icon='baby' />  Birth Records</NavLink>
                    }
                    { 
                      (staffInfo.role === 'Admin' || staffInfo.role === 'Doctor' || staffInfo.role ==='Nurse') &&
                      <NavLink style={{textDecoration: 'none'}} to='/staff/deathRecords' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><FontAwesomeIcon icon='skull-crossbones' />  Death Records</NavLink>
                    }
                    { 
                      (staffInfo.role === 'Doctor' ) ?
                      <NavLink style={{textDecoration: 'none'}} to='/staff/addPrescription' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><FontAwesomeIcon icon='prescription-bottle-medical' />  Add Prescription</NavLink> : ''
                    }
                    {
                      (staffInfo.role === 'Pharmacist') ? 
                      <NavLink style={{textDecoration: 'none'}} to='/staff/medStock' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><FontAwesomeIcon icon='tablets' />  Medicine Stock</NavLink> : ''
                   }
                   { 
                      (staffInfo.role === 'Doctor' || staffInfo.role ==='Pharmacist') ?
                      <NavLink style={{textDecoration: 'none'}} to='/staff/prescriptionList' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><FontAwesomeIcon icon='prescription' />  Prescription List</NavLink> : ''
                   }
                    <NavLink style={{textDecoration: 'none'}} to='/staff/patientList' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><FontAwesomeIcon icon='bed' />  Patient List</NavLink>

                    { 
                    (staffInfo.role ==='Admin' || staffInfo.role ==='Accountant') ? 
                    <NavLink style={{textDecoration: 'none'}} to='/staff/finance' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><FontAwesomeIcon icon="sack-dollar" />  Finance</NavLink>: ''
                    }
                     { 
                    (staffInfo.role === 'Admin' || staffInfo.role ==='Accountant') ? 
                    <NavLink style={{textDecoration: 'none'}} to='/staff/staffList' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"> <FontAwesomeIcon icon="people-line" />  Staffs</NavLink> : ''
                    }
                    <NavLink style={{textDecoration: 'none'}} to='/staff/liveChat' activeclassname='w3-blue' className="w3-bar-item w3-button w3-padding"><FontAwesomeIcon icon="comment-medical" />  Live Chat</NavLink>
                    <p data-toggle='modal' data-target='#logoutModal' style={{textDecoration: 'none'}} onClick={logoutStaff} className="w3-bar-item w3-button w3-padding w3-hide-large"><i className="fa fa-power-off fa-fw"></i>  Logout</p> 
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