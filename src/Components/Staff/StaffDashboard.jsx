import React, {useEffect} from 'react';
import {useSelector,useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
function StaffDashboard(props) {
let navigate=useNavigate()
useEffect( ()=>{

    if(!localStorage.htStaffToken){
navigate('/views/staffLogin')
    }
    else{

        
    }

}

)


    return (
        <div>
            <div className="row w-100">
                <div className="col-md-12">
                    <h1>Test Page</h1>
                    <br/>
                    <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </p>
                </div>
            </div>
        </div>
    );
}

export default StaffDashboard;