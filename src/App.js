import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import RegisterPatient from './Components/RegisterPatient';
import BackgroundView from './Components/BackgroundView';
import PatientLogin from './Components/PatientLogin';
import StaffLogin from './Components/StaffLogin';

function App() {
  const url = 'https://hospital-software-server.herokuapp.com'
  // const url = 'http://localhost:4000/'
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate replace to='/views/addPatient' />} />
        <Route path='/views' element={<BackgroundView />}>
          <Route path='/views/addPatient' element={<RegisterPatient url={url} />} />
          <Route path='/views/patientLogin' element={<PatientLogin/>}/>
          <Route path='/views/staffLogin' element={<StaffLogin />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
