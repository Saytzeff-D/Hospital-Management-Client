import axios from 'axios';
import React, {useEffect} from 'react';
import {useSelector,useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { setStaff } from '../../actions';
function StaffDashboard() {
    const dispatch=useDispatch()
const url = useSelector(state=>state.UrlReducer.url)
let navigate=useNavigate()
useEffect( ()=>{

    if(!localStorage.htStaffToken){
navigate('/views/staffLogin')
    }
    else{
        let token=localStorage.htStaffToken
axios.get(`${url}staff/dashboard`,{headers:{
    'authorization' :  `Bearer ${token}`,
    'Content-Type':'application/json',
    'Accept':'application/json'
  }}).then( res=>{
    if(res.data.status){
    dispatch(setStaff(res.data.staffDetails))
    }
    else{
  console.log('unable to connect')
    }



  }).catch(err=>{
    console.log('unable to connect')
    console.log(err)
  })
        
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