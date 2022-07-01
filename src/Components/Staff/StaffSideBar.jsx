import React from 'react'

const StaffSideBar = ()=>{
    return(
        <div id="wrapper" class="visible">
    {/* <!-- sidebar --> */}
    <div id="sidebar-wrapper" class="visible">
        <div id="sidebar-header">
            <h3 className='icon bg-warning p-1 m-2' style={{letterSpacing: '20px'}}>HMS</h3>
        </div>
        <ul class="sidebar-nav">
            <li><a className='p-3' href="/patient"><span><i class="text-white fa fa-tachometer"></i></span><span>Dashboard</span></a></li>
            <li><a className='p-3' href="/patient"><span><i class="text-white fa fa-calendar"></i></span><span>Appointment</span></a></li>
            <li><a className='p-3' href="/patient"><span><i class="text-white fa fa-medkit"></i></span><span>Pharmacy</span></a></li>
            <li><a className='p-3' href="/patient"><span><i class="text-white fa fa-ambulance"></i></span><span>Ambulance</span></a></li>
            <li><a className='p-3' href="/patient"><span><i class="text-white fa fa-comment"></i></span><span>Birth Records</span></a></li>
            <li><a className='p-3' href="/patient"><span><i class="text-white fa fa-comment"></i></span><span>Death Records</span></a></li>
            <li><a className='p-3' href="/patient"><span><i class="text-white fa fa-prescription"></i></span><span>Prescribe</span></a></li>
            <li><a className='p-3' href="/patient"><span><i class="text-white fa fa-drug"></i></span><span>Medicine Details</span></a></li>
            <li><a className='p-3' href="/patient"><span><i class="text-white fa fa-supply"></i></span><span>Supplier List</span></a></li>
            <li><a className='p-3' href="/patient"><span><i class="text-white fa fa-comment"></i></span><span>Prescription List</span></a></li>
            <li><a className='p-3' href="/patient"><span><i class="text-white fa fa-patient"></i></span><span>Patient</span></a></li>
            <li><a className='p-3' href="/patient"><span><i class="text-white fa fa-money"></i></span><span>Finance</span></a></li>
            <li><a className='p-3' href="/patient"><span><i class="text-white fa fa-cog"></i></span><span>Setup</span></a></li>
        </ul>
        <div id="sidebar-btn">
            <i class="fa fa-bars" aria-hidden="true"></i>
        </div>
    </div>
    {/* <!-- end sidebar --> */}

    {/* <!-- main content --> */}
    <div id="page-content-wrapper">
        <div className='bg-primary text-white'>
            <p className='p-2 h4'>Hospital Management Software</p>
        </div>
        <div class="container-fluid" id='page-content'>
            <div class="row">
        <div class="col-md-12">
            <h1>Test Page</h1>
            <br/>
            <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
        </div>
    </div>

        </div>
    </div>
</div>
    )
}

export default StaffSideBar