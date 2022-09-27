import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
import { setPatientDetails } from '../../actions'
import LogoutMessage from '../Container/LogoutMessage'

const PatientSideBar = ()=>{
    const dispatch = useDispatch()
    const url = useSelector(state=>state.UrlReducer.url)
    const loggedInPatient = useSelector(state=>state.PatientReducer.patientDetails)
    const navigate = useNavigate()
    const [num, setNum] = useState(0)
    const [mySidebarStyle, setMySideBarStyle] = useState({zIndex:3, width: '300px'})
    const [overlayBgStyle, setOverlayBgStyle] = useState({cursor: 'pointer'})
    const [loading, setLoading] = useState(true)
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
      useEffect(()=>{
        let token = localStorage.getItem('PatientToken')
        if(!token){
            navigate('/views/patientLogin')
        }else{
            axios.get(`${url}patient/authPatient`, {headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }}).then((res)=>{
                if(res.data.status){
                    dispatch(setPatientDetails(res.data.authPatient))
                    setLoading(false)
                }else{
                    localStorage.removeItem('PatientToken')
                    navigate('/views/patientLogin')
                }
            }).catch((err)=>{
                console.log(err, token)
                localStorage.removeItem('PatientToken')
                navigate('/views/patientLogin')
            })
        }
      }, [navigate, dispatch, url])
      const Logout = ()=>{
        setRoute('patient')
      }
    return(
        <div>
            {/* Top Container */}
            <div className="w3-bar w3-top w3-blue w3-large border-bottom" style={{zIndex: 4}}>
                <button className="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey" onClick={w3_open}><i className="fa fa-bars"></i></button>
                <span className="w3-bar-item w3-left font-weight-bold">Hospital Management System</span>
                <span data-toggle='modal' data-target='#logoutModal' className='w3-right p-2 w3-hide-small font-weight-bold' onClick={Logout} style={{cursor: 'pointer'}}>Logout <i className='fa fa-power-off'></i></span>
            </div>
            {/* SideNav Menu */}
            <nav className="w3-sidebar w3-collapse w3-blue w3-animate-left" style={mySidebarStyle}>
                <br />
                <div className="w3-container w3-row">
                    {
                        loading
                        ?
                        (<div className='d-flex justify-content-center'><span className='spinner-border text-danger'></span></div>)
                        :
                        <>
                            <div className="w3-col s4">
                            <img src={loggedInPatient.photo} alt='photoNow' className="rounded-circle" style={{width: '80px', height: '80px'}} />
                            </div>
                            <div className="w3-col s8 w3-bar">
                            <span>Welcome, <strong>{loggedInPatient.fullName}</strong></span><br/>
                            <a href="/" className="w3-bar-item w3-button"><i className="fa fa-envelope"></i></a>
                            <a href="/" className="w3-bar-item w3-button"><i className="fa fa-user"></i></a>
                            <a href="/" className="w3-bar-item w3-button"><i className="fa fa-cog"></i></a>
                            <br/><br/>
                        <span className='font-weight-bold text-capitalize'>Patient</span> 
                            </div>
                        </>
                    }
                </div>
                <hr />
                <div className="w3-container">
                    <h5>Dashboard</h5>
                </div>
                <div className="w3-bar-block">
                    <NavLink exact style={{textDecoration: 'none'}} to='/patient/dashboard' className={({isActive})=>( isActive ? 'w3-padding w3-bar-item bg-white text-primary' : 'w3-bar-item w3-button w3-padding' )}><i className="fa fa-users fa-fw"></i>  Overview</NavLink> 
                    <NavLink style={{textDecoration: 'none'}} to='/patient/appointment' className={({isActive})=>( isActive ? 'w3-padding w3-bar-item bg-white text-primary' : 'w3-bar-item w3-button w3-padding' )}><i className="fa fa-calendar fa-fw"></i>  My Appointments</NavLink> 
                    <NavLink style={{textDecoration: 'none'}} to='/patient/pharmacy' className={({isActive})=>( isActive ? 'w3-padding w3-bar-item bg-white text-primary' : 'w3-bar-item w3-button w3-padding' )}><i className="fa fa-users fa-fw"></i>  Pharmacy</NavLink> 
                    <NavLink style={{textDecoration: 'none'}} to='/patient/ambulance' className={({isActive})=>( isActive ? 'w3-padding w3-bar-item bg-white text-primary' : 'w3-bar-item w3-button w3-padding' )}><i className="fa fa-ambulance fa-fw"></i>  Ambulance</NavLink> 
                    <NavLink style={{textDecoration: 'none'}} to='/patient/liveChat' className={({isActive})=>( isActive ? 'w3-padding w3-bar-item bg-white text-primary' : 'w3-bar-item w3-button w3-padding' )}><i className="fa fa-comment-o fa-fw"></i>  Live Chat</NavLink>
                    <p style={{textDecoration: 'none'}} onClick={Logout} data-toggle='modal' data-target='#logoutModal' className="w3-bar-item w3-button w3-padding w3-hide-large"><i className="fa fa-power-off fa-fw"></i>  Logout</p> 
                </div>
            </nav>

            {/* Overlay Effect when openong sidebar */}
            <div className="w3-overlay w3-hide-large w3-animate-opacity" style={overlayBgStyle} onClick={w3_open} title="close side menu"></div>

            {/* Page Content */}
            <div className="w3-main text-white" style={{marginLeft: '300px', marginTop: '43px'}}>
                {
                    loading 
                    ?
                    (
                        <div className='d-flex justify-content-center p-5 m-5'>
                            <p className='spinner-border text-danger'></p>
                        </div>
                    )
                    :
                    (
                        <Outlet />
                    )
                }
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

export default PatientSideBar