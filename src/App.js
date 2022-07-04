import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import RegisterPatient from './Components/Patient/RegisterPatient';
import BackgroundView from './Components/Container/BackgroundView';
import PatientLogin from './Components/Patient/PatientLogin';
import StaffLogin from './Components/Staff/StaffLogin';
import PatientIdRetrieval from './Components/Patient/PatientIdRetrieval';
import PatientDashboard from './Components/Patient/PatientDashboard';
import PatientSideBar from './Components/Patient/PatientSideBar';
import StaffSideBar from './Components/Staff/StaffSideBar';
import StaffDashboard from './Components/Staff/StaffDashboard';
import RegisterStaff from './Components/Staff/RegisterStaff';


function App() {
  // const url = 'https://hospital-software-server.herokuapp.com/'
  const url = useSelector(state=>state.url)
  
   
  
      return (
        <>
          <Routes>
            <Route path='/' element={<Navigate replace to='/views/addPatient' />} />
            <Route path='/views' element={<BackgroundView />}>
              <Route path='/views/addPatient' element={<RegisterPatient url={url} />} />
              <Route path='/views/patientLogin' element={<PatientLogin url={url} />}/>
              <Route path='/views/staffLogin' element={<StaffLogin url={url} />} />
              <Route path='/views/registerStaff' element={<RegisterStaff url={url} />} />

              <Route path='/views/patientIdRetrieval' element={<PatientIdRetrieval url={url} />} />
            </Route>
            <Route path='/patient/' element={<PatientSideBar />} >
              <Route path='/patient/dashboard' element={<PatientDashboard />} />
            </Route>
            <Route path='/staff' element={<StaffSideBar />} >
              <Route path='/staff/dashboard' element={<StaffDashboard />} />
            </Route>
          </Routes>
        </>
      )
    }
    
    export default App;
    