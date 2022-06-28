import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import RegisterPatient from './Components/RegisterPatient';
import BackgroundView from './Components/BackgroundView';
import PatientLogin from './Components/PatientLogin';
import StaffLogin from './Components/StaffLogin';
import PatientIdRetrieval from './Components/PatientIdRetrieval';

function App() {
// const [url,setUrl]=useSelector(state=>state)
// console.log(url)
console.log(useSelector(state=>state))
  // const url = 'https://hospital-software-server.herokuapp.com/'
  const url = 'http://localhost:4000/'
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate replace to='/views/addPatient' />} />
        <Route path='/views' element={<BackgroundView />}>
          <Route path='/views/addPatient' element={<RegisterPatient url={url} />} />
          <Route path='/views/patientLogin' element={<PatientLogin url={url} />}/>
          <Route path='/views/staffLogin' element={<StaffLogin url={url} />} />
          <Route path='/views/patientIdRetrieval' element={<PatientIdRetrieval url={url} />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
