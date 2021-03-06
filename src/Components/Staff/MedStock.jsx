import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { allMedicines } from '../../actions'
import { useNavigate } from 'react-router'

const MedStock = (props)=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const [success,setSucces]=useState('')
    const url = useSelector(state=>state.UrlReducer.url)
    const medArray = useSelector(state=>state.PharmacyReducer.medicineTray)
    const [reducerError,setReducerError] = useState('Loading')
    const [deleteDrug,setDrug]=useState({})
    const [deleteInfo,setDeleteInfo]=useState('')
    const [searchText,setText]=useState('')
    const [filteredList,setList]=useState()
    const [disableBtn, setDisableBtn] = useState(false)
    const [edittedMed, setEddittedMed] = useState({})
    const formik = useFormik({
        initialValues: {
            medicineName: '',
            medicineCategory: '',
            medicineCompany: '',
            unit: '',
            pricePerUnit: ''
        },
        validationSchema: Yup.object({
            medicineName: Yup.string().required('Medicine Name is required'),
            medicineCategory: Yup.string().required('Medicine Category is required'),
            medicineCompany: Yup.string().required('Manufacturing Company is required'),
            unit: Yup.string().required('Unit of Medicine Added is required'),
            pricePerUnit: Yup.string().required('Price is required')
        }),
        onSubmit: (values)=>{
            console.log(values)
            setDisableBtn(true)
            setError('')
            axios.post(`${url}staff/addMedicine`, values).then((res)=>{
                if(res.data.status){
                    dispatch(allMedicines(url))
                    setDisableBtn(false)
                    setSucces(res.data.message)
                    formik.values.medicineName = ''
                    formik.values.medicineCategory = ''
                    formik.values.medicineCompany = ''
                    formik.values.unit = ''
                    formik.values.pricePerUnit = ''
                }
            }).catch((err)=>{
                setDisableBtn(false)
                setError('An Error has occured')
            })
        }
    })
    const closeModal = ()=>{
        setError('') 
        setSucces('')
    }
    useEffect(()=>{
        axios.get(`${url}staff/allMedicines`).then((res)=>{
            if(res.data.status){
                console.log(res.data.drugs)
                setList(res.data.drugs)
                setReducerError('')
            }
        }).catch((err)=>{
            setError('An Error has occured')
        })

    },[deleteInfo,success])

    useEffect(()=>{
        filterDrug(searchText)
        
    },[searchText])
    
    

    const filterDrug=(text)=>{
        let allMed=medArray
        let filteredList=[]
        if(text==''){
            setList(medArray)
        }else{
            allMed.forEach((each,i)=>{
                if((each.medicineName.toLowerCase()).includes(text.toLowerCase())){
                    filteredList.push(each)
                    console.log('yes')
                }
            })
            setList(filteredList)                       
        }

    }
    const deleteMed=()=>{
        console.log(deleteDrug)
        axios.post(`${url}staff/delMedicine`,deleteDrug).then((res=>{
            if(res.data.status){
                setDeleteInfo('Item removed succesfully, please close the modal.')

            }else{
                setDeleteInfo('an error occured, please try again')

            }
        })).then(err=>console.log(err))

    }


    const updateMed = (item)=>{
        setEddittedMed(item)
    }
    const handleEditChange = (e)=>{
        setEddittedMed({...edittedMed, [e.target.name]: e.target.value})
    }
    const editMed = (e)=>{
        e.preventDefault()
        setDisableBtn(true)
        setError('')
        axios.post(`${url}staff/updateMed`, edittedMed).then((res)=>{
            setDisableBtn(false)
            setSucces(res.data.message)
            setEddittedMed({...edittedMed, medicineName: '', medicineCompany: '', medicineCategory: '', availableQty: '', pricePerUnit: ''})
            dispatch(allMedicines(url))
        }).catch((err)=>{
            setDisableBtn(false)
            setError('An Error has occured, pls try again.')
        })
    }
    
    return (
        <>
            <div className='container-fluid p-3'>
                <div className='row'>
                    <div className='col-12 bg-white border'>
                        <div className='d-flex justify-content-between border-bottom py-2'>
                            <p>Medicine Stock</p>
                            <button className='btn btn-primary' data-target='#medicineModal' data-toggle='modal'><FontAwesomeIcon icon='plus' /> Add Medicine Details</button>
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-8 my-2'>
                            <input onChange={(e)=>setText(e.target.value)} className='form-control' placeholder='Search by Medicine Name' />
                        </div>
                        {
                            reducerError === 'Loading'
                            ?
                            (<div className='mt-2'>
                                <p className='spinner-border text-danger'></p>
                            </div>)
                            :
                            (
                                reducerError === 'MedError'
                                ?
                                <div className='alert alert-danger h6 my-2'> <FontAwesomeIcon icon='triangle-exclamation'/> Unable to fetch from the server</div>
                                :
                                filteredList.length === 0
                                ?
                                (
                                    <div>
                                        <p className='font-weight-bold py-2'>Stocks are empty</p>
                                    </div>
                                )
                                :
                                (
                                    <table className='table table-light table-striped table-responsive'>
                                        <thead>
                                            <tr>
                                                <th>Medicine Name</th>
                                                <th>Medicine Company</th>
                                                <th>Medicine Category</th>
                                                <th>Available Qty</th>
                                                <th>Price Per Unit (<FontAwesomeIcon icon='naira-sign' />)</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filteredList.map((item, index)=>(
                                                    <tr key={index}>
                                                        <td> {item.medicineName} </td>
                                                        <td> {item.medicineCompany} </td>
                                                        <td> {item.medicineCategory} </td>
                                                        
                                                        <td> {item.availableQty} </td>
                                                        <td> <FontAwesomeIcon icon='naira-sign' />{item.pricePerUnit} </td>
                                                        <td> 
                                                            <div className='d-flex justify-content-between'>
                                                                <button data-target='#editMedModal' data-toggle='modal' className='btn btn-success m-1' onClick={()=>updateMed(item)}>Update</button>
                                                                <button  data-target='#delmed' data-toggle='modal' className='btn btn-danger m-1' onClick={()=>setDrug(item)}>Delete</button>
                                                            </div> 
                                                        </td>
                                                    </tr>
                                                ))                                            
                                            }
                                        </tbody>
                                    </table>
                                )
                            )
                        }
                    </div>
                </div>
                {/* DELETE MODAL */}
                <div className='modal fade big-modal ' id='delmed' data-backdrop="static">
                    <div className='modal-dialog modal-dialog-centered'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h4 className='modal-title px-2 text-danger'>Remove Drug</h4>
                                <button onClick={()=>setDeleteInfo('')} type="button" className="close text-danger" data-dismiss="modal" >&times;</button>                             
                            </div>
                            <div className='modal-body border-zero'>
                                <div>
                                    <p className='h5 text-warning text-center'>{deleteInfo}</p>
                                </div><br/>
                                <p>Are you sure you want to Delete this Item?</p>   
                                
                            </div>
                            <div className='modal-footer d-flex'>
                                <button onClick={deleteMed} className='btn btn-danger m-1'>Yes, I'm sure</button>
                                <button  onClick={()=>setDeleteInfo('')} className='btn btn-success m-1' data-dismiss="modal">No, I'm not</button>         
                            </div>
                        </div>
                    </div>

                </div>

                {/* Add Medicine Modal */}
                <div className='modal fade' id='medicineModal' data-backdrop='static'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <p className='h6'>Add Medicine Details</p>
                                <button className='close text-primary' data-dismiss='modal' onClick={()=>{(setError('')) (setSucces(''))}}>&times;</button>
                            </div>
                            <div className='modal-body'>
                                <form className='p-3' onSubmit={formik.handleSubmit}>
                                    {
                                        success !== ''
                                        &&
                                        <div className='alert alert-success'>
                                            <b>{success}</b>
                                        </div>
                                    }

{
                                        error !== ''
                                        &&
                                        <div className='alert alert-danger'>
                                            <FontAwesomeIcon icon='triangle-exclamation'/> <b>{error}</b>
                                        </div>
                                    }
                                    <div className='form-row'>
                                        <div className='form-group col'>
                                            <input onBlur={formik.handleBlur} value={formik.values.medicineName} placeholder='Medicine Name' name='medicineName' onChange={formik.handleChange} className='form-control' />
                                            {formik.touched.medicineName && <div className='text-danger'>{formik.errors.medicineName}</div>}
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-group col'>
                                            <select defaultValue={formik.values.medicineCategory} name='medicineCategory' className='form-control' onChange={formik.handleChange}>  
                                                <option value='' >Medicine Category</option>                                             
                                                <option value='Syrup' >Syrup </option>
                                                <option value='Ointment'>Ointment</option>
                                                <option value='Injection'>Injection</option>
                                                <option value='Capsule'>Capsule</option>
                                                <option value='Liquids'>Liquids</option>
                                                <option value='Inhalers'>Inhalers</option>
                                                <option value='Surgical'>Surgical</option>
                                                <option value='Drops'>Drops</option>
                                                <option value='Diaper'>Diaper</option>
                                            </select>
                                            {formik.touched.medicineCategory && <div className='text-danger'>{formik.errors.medicineCategory}</div>}
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-group col'>
                                            <input onBlur={formik.handleBlur} value={formik.values.medicineCompany} placeholder='Medicine Company' name='medicineCompany' className='form-control' onChange={formik.handleChange} />
                                            {formik.touched.medicineCompany && <div className='text-danger'>{formik.errors.medicineCompany}</div>}
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-group col-md-6'>
                                            <input onBlur={formik.handleBlur} type='number' value={formik.values.unit} placeholder='Units' name='unit' className='form-control' onChange={formik.handleChange} />
                                            {formik.touched.unit && <div className='text-danger'>{formik.errors.unit}</div>}
                                        </div>
                                        <div className='form-group col-md-6'>
                                            <input onBlur={formik.handleBlur} type='number' value={formik.values.pricePerUnit} placeholder='Price Per Units' name='pricePerUnit' className='form-control' onChange={formik.handleChange} />
                                            {formik.touched.pricePerUnit && <div className='text-danger'>{formik.errors.pricePerUnit}</div>}
                                        </div>
                                    </div>
                                    <button type='submit' className='btn btn-primary btn-block font-weight-bold' disabled={disableBtn}>Save Details</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Medicine Modal */}
                <div className='modal fade' id='editMedModal' data-backdrop='static'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <p className='h6'>Edit Medicine Details</p>
                                <button className='close text-primary' data-dismiss='modal' onClick={closeModal}>&times;</button>
                            </div>
                            <div className='modal-body'>
                                <form className='p-3' onSubmit={editMed}>
                                    {
                                        success !== ''
                                        &&
                                        <div className='alert alert-success'>
                                            <b>{success}</b>
                                        </div>
                                    }

{
                                        error !== ''
                                        &&
                                        <div className='alert alert-danger'>
                                            <FontAwesomeIcon icon='triangle-exclamation'/> <b>{error}</b>
                                        </div>
                                    }
                                    <div className='form-row'>
                                        <div className='form-group col'>
                                            <label className='font-weight-bold' >Medicine Name</label>
                                            <input value={edittedMed.medicineName} placeholder='Medicine Name' name='medicineName' onChange={handleEditChange} className='form-control' />
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-group col'>
                                        <label className='font-weight-bold' >Medicine Category</label>
                                            <select value={edittedMed.medicineCategory} name='medicineCategory' className='form-control' onChange={handleEditChange}>  
                                                <option value='' >Medicine Category</option>                                             
                                                <option value='Syrup' >Syrup </option>
                                                <option value='Ointment'>Ointment</option>
                                                <option value='Injection'>Injection</option>
                                                <option value='Capsule'>Capsule</option>
                                                <option value='Liquids'>Liquids</option>
                                                <option value='Inhalers'>Inhalers</option>
                                                <option value='Surgical'>Surgical</option>
                                                <option value='Drops'>Drops</option>
                                                <option value='Diaper'>Diaper</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-group col'>
                                        <label className='font-weight-bold' >Medicine Company</label>
                                            <input value={edittedMed.medicineCompany} placeholder='Medicine Company' name='medicineCompany' className='form-control' onChange={handleEditChange} />
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-group col-md-6'>
                                        <label className='font-weight-bold' >Available Qty</label>
                                            <input type='number' value={edittedMed.availableQty} placeholder='Available Qty' name='availableQty' className='form-control' onChange={handleEditChange} />
                                        </div>
                                        <div className='form-group col-md-6'>
                                        <label className='font-weight-bold' >Price Per Unit</label>
                                            <input type='number' value={edittedMed.pricePerUnit} placeholder='Price Per Units' name='pricePerUnit' className='form-control' onChange={handleEditChange} />
                                        </div>
                                    </div>
                                    <button type='submit' className='btn btn-primary btn-block font-weight-bold' disabled={disableBtn}>Edit Details</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MedStock