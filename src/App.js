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
import AllStaff from './Components/Staff/AllStaff';
import PatientList from './Components/Patient/PatientList';
import PatientAppointment from './Components/Patient/PatientAppointment';
import PatientPharmacy from './Components/Patient/PatientPharmacy';
import PatientAmbulance from './Components/Patient/PatientAmbulance';
import GeneratePharmacyBill from './Components/Staff/GeneratePharmacyBill';
import RegisterStaff from './Components/Staff/RegisterStaff';
import AppointmentList from './Components/Staff/Appointmentlist';
import MedStock from './Components/Staff/MedStock';
import BirthRecords from './Components/Staff/BirthRecords';
import DeathRecords from './Components/Staff/DeathRecords';
import AddPrescription from './Components/Staff/AddPrescription';
import PrescriptionList from './Components/Staff/PrescriptionList';
import PharmacyBills from './Components/Staff/PharmacyBills';
import Finance from './Components/Staff/Finance';
library.add(fas, faTwitter, faFontAwesome)


function App() {
console.log()
const socket = useRef(socketClient(useSelector(state=>state.UrlReducer.url)))
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate replace to='/views/patientLogin' />} />
        <Route path='/views' element={<BackgroundView />}>
          <Route path='/views/addPatient' element={<RegisterPatient />} />
          <Route path='/views/addStaff' element={<RegisterStaff/>} />
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
        <Route path='/staff' element={<StaffSideBar />} >
          <Route path='/staff/dashboard' element={<StaffDashboard />} />
          <Route path='/staff/pharmacy' element={<GeneratePharmacyBill />} />
          <Route path='/staff/pharmacyBills' element={<PharmacyBills />} />
          <Route path='/staff/medStock' element={<MedStock />} />
          <Route path='/staff/staffList' element={<AllStaff />} />
          <Route path='/staff/patientList' element={<PatientList />} />
          <Route path='/staff/livechat' element={<Chat />} />
          <Route path='/staff/appointment' element={<AppointmentList />} />
          <Route path='/staff/birthRecords' element={<BirthRecords />} />
          <Route path='/staff/deathRecords' element={<DeathRecords />} />
          <Route path='/staff/prescriptionList' element={<PrescriptionList />} />
          <Route path='/staff/addPrescription' element={<AddPrescription />} />
          <Route path='/staff/finance' element={<Finance />} />
        </Route>
      </Routes>
    </>
  )
}
    
export default App;