import { useRef } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import socketClient from 'socket.io-client';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import RegisterPatient from './Components/Patient/RegisterPatient';
import BackgroundView from './Components/Container/BackgroundView';
import PatientLogin from './Components/Patient/PatientLogin';
import StaffLogin from './Components/Staff/StaffLogin';
import PatientIdRetrieval from './Components/Patient/PatientIdRetrieval';
import PatientDashboard from './Components/Patient/PatientDashboard';
import PatientSideBar from './Components/Patient/PatientSideBar';
import StaffSideBar from './Components/Staff/StaffSideBar';
import StaffDashboard from './Components/Staff/StaffDashboard';
import Chat from './Components/Chat';
import RegisterStaff from './Components/Staff/RegisterStaff';
import AllStaff from './Components/Staff/AllStaff';
import PatientList from './Components/Patient/PatientList';
import PatientAppointment from './Components/Patient/PatientAppointment';
import PatientPharmacy from './Components/Patient/PatientPharmacy';
import PatientAmbulance from './Components/Patient/PatientAmbulance';
library.add(fas, faTwitter, faFontAwesome)


function App() {
console.log()
const socket = useRef(socketClient(useSelector(state=>state.UrlReducer.url)))
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate replace to='/views/addPatient' />} />
        <Route path='/views' element={<BackgroundView />}>
          <Route path='/views/addPatient' element={<RegisterPatient />} />
          <Route path='/views/addStaff' element={<RegisterStaff />} />
          <Route path='/views/patientLogin' element={<PatientLogin />}/>
          <Route path='/views/staffLogin' element={<StaffLogin />} />
          <Route path='/views/patientIdRetrieval' element={<PatientIdRetrieval />} />
        </Route>
        <Route path='/patient/' element={<PatientSideBar />} >
          <Route path='/patient/dashboard' element={<PatientDashboard />} />
          <Route path='/patient/liveChat' element={<Chat socket={socket} />} />
          <Route path='/patient/appointment' element={<PatientAppointment />} />
          <Route path='/patient/pharmacy' element={<PatientPharmacy />} />
          <Route path='/patient/ambulance' element={<PatientAmbulance />} />
        </Route>
        {/* <Route path='/views/addStaff' element={<RegisterStaff />} /> */}
        <Route path='/staff' element={<StaffSideBar />} >
          <Route path='/staff/dashboard' element={<StaffDashboard />} />
          <Route path='/staff/staffList' element={<AllStaff />} />
          <Route path='/staff/patientList' element={<PatientList />} />
          <Route path='/staff/livechat' element={<Chat />} />
          <Route path='/staff/liveChat' element={<Chat />} />
        </Route>
      </Routes>
    </>
  )
}
    
    export default App;
    