import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const PrescriptionList = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [list, setList] = useState([])
    const url = useSelector(state=>state.UrlReducer.url)
    const staffInfo=useSelector(state=>state.StaffReducer.staffInfo)
    useEffect(()=>{
        axios.get(`${url}staff/allPrescription`).then((res)=>{
            setList(res.data.result)
            setIsLoading(false)
        }).catch((err)=>{
            setIsLoading(false)
            setError('AxiosError')
        })
    }, [])
    const billNow = (prescription)=>{
        console.log(prescription)
        sessionStorage.setItem('prescription', JSON.stringify(prescription))
        navigate('/staff/pharmacy')
    }
    return (
        <div>
            <div className='row p-2'>
                <div className='col-12 bg-white border'>
                <div className='border-bottom py-2'>
                    <p className='h6'>Prescription List</p>
                </div>
                <div className='col-lg-4 col-md-6 col-sm-8 my-2'>
                    <input className='form-control' placeholder='Search...' />
                </div>
                {
                    isLoading
                    ?
                    (
                        <div className='my-2'>
                            <span className='spinner-border text-danger'></span>
                        </div>
                    )
                    :
                    error === 'AxiosError'
                    ?
                    (
                        <div className='alert alert-danger'>Server Error</div>
                    )
                    :
                    (
                        list.length === 0
                        ?
                        <div className='my-2'>
                            <p>Very much empty !</p>
                        </div>
                        :
                        <table className='table table-light table-striped table-responsive'>
                            <thead>
                                <tr>
                                    <th>Prescription Id</th>
                                    <th>Patient Name</th>
                                    <th>Illness</th>
                                    <th>Physician Name</th>
                                    <th>Prescribed Medicine</th>
                                    {staffInfo.role.toLowerCase()=='pharmacist' && <th>FurtherAction</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.map((each, i)=>(
                                        <tr key={i}>
                                            <td> {each.prescriptionId} </td>
                                            <td> {each.patientName} </td>
                                            <td> {each.illness} </td>
                                            <td> {each.doctorName} </td>

                                            <td style={{height:'10px'}}> 
                                                {
                                                    (<div className={each.prescribedMedicine.length > 3 ? 'display-drugs' : ''}>
                                                    <ol style={{listStyleType: 'circle'}}>                                               
                                                    {each.prescribedMedicine.map((each,index)=>(
                                                        <li key={index}> { each } </li>
                                                    ))}                                                
                                                    </ol>
                                                    </div>)
                                                }                                               
                                                </td>
                                                {staffInfo.role.toLowerCase()=='pharmacist' &&<td> 
                                                {
                                                    each.billStatus
                                                    ?
                                                    (<button  className='btn btn-light font-weight-bold'>Billed</button>)
                                                    :
                                                    (<button onClick={()=>billNow(each)} className='btn btn-warning'>Bill Now</button>)
                                                } 
                                            </td>}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
                }
                </div>
            </div>
        </div>
    );
};

export default PrescriptionList;