import React, { useState } from 'react'
import { useFormik }  from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'

const BirthRecords = (props)=>{
    const [error, setError] = useState('')
    const url= useSelector(state=>state.UrlReducer.url)
    const [birthTray,setBirthTray] = useState([])
    const [filteredList,setList] = useState([])
    const patientTray = useSelector(state=>state.PatientReducer.patientTray)
    const [motherName, setMotherName] = useState('')
    const [success,setSuccess]=useState('')
    const [searchText,setText]=useState('')
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        axios.get(`${url}staff/getBirth`).then(res=>{
            if(res.data.status){
                setBirthTray(res.data.babies)
                setList(res.data.babies)
                setLoading(false)
            }
        }).catch(err=>{
            console.log(err)
            setError('AxiosError')
        })
    },[success,error])

    const formik = useFormik({
        initialValues: {
            childName: '',
            gender: '',
            weight: '',
            birthDate: '',
            address: '',
            motherHealthId: '',
            motherName: '',
            fatherName: '',
            report: ''
        },
        onSubmit: (values)=>{
            axios.post(`${url}staff/addBirth`,values).then(res=>{
                if(res.data.status){
                    setSuccess(res.data.message)
                    setError('')
                    console.log(res.data)
                }else{
                    setError(res.data.message)
                    setSuccess('')
                }
            }).catch(err=> console.log(err))

        }
    })
    
    const getMotherName = (motherId)=>{
        const mother = patientTray.find((patient, i)=>(patient.healthId === motherId))
        if(mother === undefined){
            setMotherName('Record not found...')
        }else{
            formik.values.motherHealthId = motherId
            formik.values.motherName = mother.fullName
            setMotherName(mother.fullName)
        }
    }
    useEffect(()=>{
        filterBaby(searchText)
        
    },[searchText])

    const filterBaby=(text)=>{
        let allBabes=birthTray
        let filteredList=[]
        if(text==''){
            setList(birthTray)
        }else{
            allBabes.forEach((each,i)=>{
                if((each.childName.toLowerCase()).includes(text.toLowerCase()) || (each.motherName.toLowerCase()).includes(text.toLowerCase()) || (each.fatherName.toLowerCase()).includes(text.toLowerCase()) || (each.recordsId.toLowerCase()).includes(text.toLowerCase())){
                    filteredList.push(each)
                    console.log('yes')
                }
            })
            setList(filteredList)                       
        }

    }
    return(
        <>
            <div className='container-fluid p-3'>
                <div className='row'>
                    <div className='col-12 bg-white border'>
                        <div className='d-flex justify-content-between border-bottom py-2'>
                            <p className='h6'>Birth Records</p>
                            <button className='btn btn-primary' data-target='#birthModal' data-toggle='modal'><FontAwesomeIcon icon='plus' /> Add Birth Record</button>
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-8 my-2'>
                            <input onChange={(e)=>setText(e.target.value)} className='form-control' placeholder='Search...' />
                        </div>
                        {
                            loading 
                            ?
                            (<div className='mt-2'><p className='spinner-border text-danger'></p></div>)
                            :
                            error === 'AxiosError'
                            ?
                            <div className='alert alert-danger'>Server Error</div>
                            :
                            birthTray.length === 0
                            ?
                            (
                                <div>
                                    <p className='font-weight-bold py-2'>No records yet</p>
                                </div>
                            )
                            :
                            (
                                <table className='table table-light table-striped table-responsive'>
                                    <thead>
                                        <tr>
                                            <th>Records Id</th>
                                            <th>Child Name</th>
                                            <th>Gender</th>
                                            <th>Birth Date</th>
                                            <th>Mother Name</th>
                                            <th>Father Name</th>
                                            <th>Report</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredList.map((item, index)=>(
                                                <tr>
                                                    <td> {item.recordsId} </td>
                                                    <td> {item.childName} </td>
                                                    <td> {item.gender} </td>
                                                    <td> {item.birthDate} </td>
                                                    <td> {item.motherName} </td>
                                                    <td> {item.fatherName} </td>
                                                    <td> {item.report} </td>
                                                </tr>
                                            ))                                            
                                        }
                                    </tbody>
                                </table>
                            )
                        }
                    </div>
                </div>

                {/* Add Birth Record Modal */}
                <div className='modal fade' id='birthModal' data-backdrop='static'>
                    <div className='modal-dialog modal-lg'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <p className='h6'>Add Birth Record</p>
                                <button className='close text-primary' data-dismiss='modal' onClick={()=>{setError('')}}>&times;</button>
                            </div>
                            <div className='modal-body'>
                                <form className='p-3' onSubmit={formik.handleSubmit}>
                                    {
                                        error !== ''
                                        &&
                                        <div className='alert alert-danger'>
                                            <FontAwesomeIcon icon='triangle-exclamation'/> <b>{error}</b>
                                        </div>
                                    }
                                    {success!==''&& <div className='alert alert-success'>
                                        <FontAwesomeIcon icon='check'/> <b>{success}</b>                                
                                        </div>}
                                    <div className='form-row'>
                                        <div className='form-group col-sm-4'>
                                            <label>Child Name</label>
                                            <input placeholder='' name='childName' onChange={formik.handleChange} className='form-control' />
                                        </div>
                                        <div className='form-group col-sm-4'>
                                            <label>Weight</label>
                                            <input placeholder='' name='weight' onChange={formik.handleChange} className='form-control' />
                                        </div>
                                        <div className='form-group col-sm-4'>
                                            <label>Gender</label>
                                            <select defaultValue='' name='gender' onChange={formik.handleChange} className='form-control'>
                                                <option value=''>Select</option>
                                                <option value='Male'>Male</option>
                                                <option value='Female'>Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-group col-sm-4'>
                                            <label>Birth Date</label>
                                            <input type='date' name='birthDate' className='form-control' onChange={formik.handleChange} max={new Date().toISOString().split('T')[0]} />
                                        </div>
                                        <div className='form-group col-sm-8'>
                                            <label>Address</label>
                                            <input type='text' name='address' className='form-control' onChange={formik.handleChange} />
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-group col-sm-4'>
                                            <label>Mother's Health Id</label>
                                            <input name='' className='form-control' onChange={(e)=>getMotherName(e.target.value)} />
                                        </div>
                                        <div className='form-group col-sm-4'>
                                            <label>Mother's Name</label>
                                            <input name='motherName' onChange={formik.handleChange} value={motherName} className='form-control' style={{color: motherName === 'Record not found...' ? '#ff0000' : ''}} disabled />
                                        </div>
                                        <div className='form-group col-sm-4'>
                                            <label>Father's Name</label>
                                            <input name='fatherName' className='form-control' onChange={formik.handleChange} />
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-group col-md-12'>
                                            <label>Report</label>
                                            <textarea type='text' name='report' className='form-control' onChange={formik.handleChange} />
                                        </div>
                                       
                                    </div>
                                    <button type='submit' className='btn btn-primary btn-block font-weight-bold'>Save Records</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BirthRecords