import React, { useRef, useState } from 'react'
import { Outlet } from 'react-router'

const PatientSideBar = ()=>{
    // const mySidebar = useRef(0)
    const [mySidebar, setMySidebar] = useState('show')
    const [mySidebarStyle, setMySideBarStyle] = useState({zIndex:3, width: '300px'})
    const [overlayBgStyle, setOverlayBgStyle] = useState({cursor: 'pointer'})
    // const overlayBg = useRef(0)
    // const [overlayBg, setOverlayBg] = useState('show')
      const w3_open = ()=>{
        //   if (mySidebar === 'show') {
        //       setMySideBarStyle({zIndex:3, width: '300px', display: 'none'})
        //       setOverlayBgStyle({cursor: 'pointer', display: 'none'})
        //   } else {
        //     setMySideBarStyle({zIndex:3, width: '300px', display: 'block'})
        //     setOverlayBgStyle({cursor: 'pointer', display: 'block'})
        //   }
      }
      const w3_close = ()=>{
        // setMySideBarStyle({zIndex:3, width: '300px', display: 'none'})
        // setOverlayBgStyle({cursor: 'pointer', display: 'none'})
      }
    return(
        <div>
            {/* Top Container */}
            <div className="w3-bar w3-top w3-black w3-large" style={{zIndex: 4}}>
                <button className="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey" onClick={w3_open}><i className="fa fa-bars"></i>  Menu</button>
                <span className="w3-bar-item w3-right">Logo</span>
            </div>
            {/* SideNav Menu */}
            <nav className="w3-sidebar w3-collapse w3-white w3-animate-left" style={mySidebarStyle}>
                <br />
                <div className="w3-container w3-row">
                    <div className="w3-col s4">
                    <img src="../w3images/avatar2.png" alt='photoNow' className="w3-circle w3-margin-right" style={{width: '46px'}} />
                    </div>
                    <div className="w3-col s8 w3-bar">
                    <span>Welcome, <strong>Mike</strong></span><br/>
                    <a href="/" className="w3-bar-item w3-button"><i className="fa fa-envelope"></i></a>
                    <a href="/" className="w3-bar-item w3-button"><i className="fa fa-user"></i></a>
                    <a href="/" className="w3-bar-item w3-button"><i className="fa fa-cog"></i></a>
                    </div>
                </div>
                <hr />
                <div className="w3-container">
                    <h5>Dashboard</h5>
                </div>
                <div className="w3-bar-block">
                    <a href="/" className="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black" onClick={w3_close()} title="close menu"><i className="fa fa-remove fa-fw"></i>  Close Menu</a>
                    <a href="/" className="w3-bar-item w3-button w3-padding w3-blue"><i className="fa fa-users fa-fw"></i>  Overview</a>
                    <a href="/" className="w3-bar-item w3-button w3-padding"><i className="fa fa-eye fa-fw"></i>  Views</a>
                    <a href="/" className="w3-bar-item w3-button w3-padding"><i className="fa fa-users fa-fw"></i>  Traffic</a>
                    <a href="/" className="w3-bar-item w3-button w3-padding"><i className="fa fa-bullseye fa-fw"></i>  Geo</a>
                    <a href="/" className="w3-bar-item w3-button w3-padding"><i className="fa fa-diamond fa-fw"></i>  Orders</a>
                    <a href="/" className="w3-bar-item w3-button w3-padding"><i className="fa fa-bell fa-fw"></i>  News</a>
                    <a href="/" className="w3-bar-item w3-button w3-padding"><i className="fa fa-bank fa-fw"></i>  General</a>
                    <a href="/" className="w3-bar-item w3-button w3-padding"><i className="fa fa-history fa-fw"></i>  History</a>
                    <a href="/" className="w3-bar-item w3-button w3-padding"><i className="fa fa-cog fa-fw"></i>  Settings</a><br/><br/>
                </div>
            </nav>

            {/* Overlay Effect when openong sidebar */}
            <div className="w3-overlay w3-hide-large w3-animate-opacity" onClick={w3_close} style={overlayBgStyle} title="close side menu"></div>

            {/* Page Content */}
            <div className="w3-main" style={{marginLeft: '300px', marginTop: '43px'}}>
                <Outlet />
            </div>
        </div>
    )
}

export default PatientSideBar