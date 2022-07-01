import React from 'react';

function PatientDashboard(props) {
    return (
        <div>
            <header className="w3-container" style={{paddingTop: '22px'}}>
    <h5><b><i className="fa fa-dashboard"></i> My Dashboard</b></h5>
  </header>

  <div className="w3-row-padding w3-margin-bottom">
    <div className="w3-quarter">
      <div className="w3-container w3-red w3-padding-16">
        <div className="w3-left"><i className="fa fa-calendar w3-xxxlarge"></i></div>
        <div className="w3-right">
          <h3>52</h3>
        </div>
        <div className="w3-clear"></div>
        <h4>My Appointment</h4>
      </div>
    </div>
    <div className="w3-quarter">
      <div className="w3-container w3-blue w3-padding-16">
        <div className="w3-left"><i className="fa fa-medkit w3-xxxlarge"></i></div>
        <div className="w3-right">
          <h3>99</h3>
        </div>
        <div className="w3-clear"></div>
        <h4>Pharmacy Bills</h4>
      </div>
    </div>
    <div className="w3-quarter">
      <div className="w3-container w3-teal w3-padding-16">
        <div className="w3-left"><i className="fa fa-ambulance w3-xxxlarge"></i></div>
        <div className="w3-right">
          <h3>23</h3>
        </div>
        <div className="w3-clear"></div>
        <h4>Ambulance</h4>
      </div>
    </div>
    <div className="w3-quarter">
      <div className="w3-container w3-orange w3-text-white w3-padding-16">
        <div className="w3-left"><i className="fa fa-users w3-xxxlarge"></i></div>
        <div className="w3-right">
          <h3>50</h3>
        </div>
        <div className="w3-clear"></div>
        <h4>Users</h4>
      </div>
    </div>
  </div>
        </div>
    );
}

export default PatientDashboard;