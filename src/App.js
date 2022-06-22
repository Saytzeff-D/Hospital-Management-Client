import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import RegisterPatient from './Components/RegisterPatient';
import BackgroundView from './Components/BackgroundView';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate replace to='/views/addPatient' />} />
        <Route path='/views' element={<BackgroundView />}>
          <Route path='/views/addPatient' element={<RegisterPatient />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
