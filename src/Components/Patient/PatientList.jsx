import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RegisterStaff from '../Staff/RegisterStaff';
import RegisterPatient from './RegisterPatient';
import Viewprofile from './Viewprofile';
import ViewProfile from './Viewprofile';



const  PatientList=()=>{
    let dispatch=useDispatch()
    let url=useSelector(state=>state.UrlReducer.url)
    let [allPat,setAllPat]=useState([])
    let [filteredList, setFilteredList]=useState([])
    let [filterByName,setFilterByName]=useState('')
    let [filterById,setFilterById]=useState('')
    let [image,setImage]=useState('')
    useEffect(()=>{
        console.log('fetching')
        axios.get(`${url}patient/allpat`).then(res=>{
            console.log(res)
                setAllPat(res.data)
                setFilteredList(res.data)
    
        }).catch(err=>{
            console.log(err)
            console.log('cannot connect')
        })

    },[])
useEffect(()=>{
   filterWithParameter(filterByName)
},[filterByName])  

useEffect(()=>{
    filterWithParameter(filterById,'id')
 },[filterById])  
 
const filterWithParameter=(params,ID)=>{     

    if(params!=''){
        let filteredList=[]
        let allPatients=allPat
        if(!ID){        
        allPatients.forEach( (each,i)=>{
            if((each.fullName.toLowerCase()).includes(params.toLowerCase())){
                filteredList.push(each)
            }
        })
    }else{
        allPatients.forEach((each,i)=>{
            if((each.healthId.toLowerCase()).includes(params.toLowerCase())){
                filteredList.push(each)
            }
        })
    }
    


        setFilteredList(filteredList)

    }else{
        setFilteredList(allPat)

    }

    }

    const deletePatient=(obj,index)=>{
        axios.post(`${url}patient/deletePat`,obj).then(res=>{
            console.log(res)
            if(res.data.status){
                alert('deleted')
                filterArray(obj._id)
            }else{
                alert(res.data.message)
            }

        }).catch(err=>{
            console.log(err)
        })
    }

    const filterArray=(index)=>{
        const filterAllPat= allPat.filter( (each,i)=> each._id!==index)
        setAllPat(filterAllPat)
        const filterFilteredList=filteredList.filter( (each,i)=> each._id!==index)
        setFilteredList(filterFilteredList)
    }

    


    return(
        <>
        

        <div className='py-3'>
            <div className='bg-white border p-2'>
                <div className='d-flex justify-content-between border-bottom'>
                    <div>
                        <p className='h6'>Patient List</p>
                        </div>
                        <div className=''>
                            <button className='btn btn-primary m-1' data-target='#addStaff' data-toggle='modal'>Add Patient</button>
                            {/* <button className='btn btn-primary m-1'><FontAwesomeIcon icon='plus' /> Import Staff</button> */}

                    </div>
                </div>

            <div className='row w-100'>
                <div className='col-md-6'>
                    <input value={filterById}  onChange={(e)=>setFilterById(e.target.value)}className='form-control m-1' placeholder='Search Patient by ID' />
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-primary'>Search <FontAwesomeIcon icon='search' /></button>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <input value={filterByName}  onChange={(e)=>setFilterByName(e.target.value)} className='form-control m-1' placeholder='Search Patient by Name' />
                        <div className='d-flex justify-content-end'>
                        <button className='btn btn-primary'>Search <FontAwesomeIcon icon='search' /></button>
                        </div>
                    </div>
             </div>
        </div>
    </div>
       






        
        <section>
               
            <div className='tableDiv row my-5 w-100 text-center'>
                <table className='table table-stripped table-bordered border-primary my-4'>
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last/Other Names</th>
                            <th scope="col">Health ID</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Phone</th>
                            <th scope="col">DOB</th>
                            <th scope="col">Genotype</th>
                            <th scope="col">Actions</th>

                        </tr>
                    </thead>

                    <tbody>

                       { filteredList.map( (each,i)=>(
                        <tr key={i}>
                            <td scope='row'>{i+1}</td>
                            <td colSpan={2}>{each.fullName}</td>
                            <td>{each.healthId}</td>
                            <td>{each.gender}</td>
                            <td>{each.phone}</td>
                            <td>{each.dob}</td>
                            <td>{each.bloodGroup? each.bloodGroup:<span>---</span> }</td>
                            <td>
                               <div className='row'>
                                <div className='col-4'><button data-target='#editPat' data-toggle='modal'  onClick={()=>dispatch({type:'viewPatientDetails', payload:each})}className='btn btn-success actbtn'>Edit <i className='fa fa-edit'></i></button></div>
                                <div className='col-4'><button onClick={()=>deletePatient(each,i)} className=' btn btn-danger actbtn'>Delete <i className='fa fa-trash'></i>
                            </button></div>        
                            <div className='col-4'><button
                            data-target='#viewPat' data-toggle='modal'
                             onClick={()=>setImage(each.photo)} className=' btn btn-warning actbtn'>photo <i className='fa fa-photo'></i></button></div>          
                            </div>          
                                </td>

                            {/* <td></td> */}

                        </tr> 

                       ))
                       
                       
                        
                        }


                    </tbody>


                </table>
            </div>



            <div className='modal fade' id="addStaff" data-backdrop="static">
                        <div className='modal-dialog modal-dialog-centered'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <h6 className='modal-title'>Add another Patient</h6>
                                    <button type="button" className="close" data-dismiss="modal" >&times;</button>
                                </div>
                                <div className='modal-body'>
                                    <RegisterPatient/>
                                </div>
                            </div>
                        </div>
                    </div>

                <div className='modal fade big-modal' id="viewPat" data-backdrop="static">
                     <div className='modal-dialog modal-dialog-centered'>
                         <div className='modal-content'>
                              <div className='modal-header'>
                                  <h4 className='modal-title px-2'>PATIENT PHOTO</h4>
                                    <button type="button" className="close text-danger" data-dismiss="modal" >&times;</button>
                                </div>
                                
                                <div className='modal-body border-zero'>
                                    <div className='w-100 card container border-zero'>
                                        <div className='card-body '> 
                                            <img src={image} alt='profile photo' class='w-100'/>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

            <div  className='modal fade big-modal' id="editPat">
                <div className='modal-dialog modal-dialog-centered'>
                         <div className='modal-content'>
                              <div className='modal-header'>
                                  <h4 className='modal-title px-2'>EDIT PATIENT INFO</h4>
                                    <button type="button" className="close text-danger" data-dismiss="modal" >&times;</button>
                                </div>
                                
                                <div className='modal-body'>
                                   <ViewProfile/>
                                </div>
                            </div>
                        </div>
                    </div>   




        </section>        
        </>


    )

}
export default PatientList