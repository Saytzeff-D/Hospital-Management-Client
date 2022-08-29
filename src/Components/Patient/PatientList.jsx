import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RegisterPatient from './RegisterPatient';
import ViewProfile from './Viewprofile';



const  PatientList=()=>{
    let dispatch=useDispatch()
    let url=useSelector(state=>state.UrlReducer.url)
    let [allPat,setAllPat]=useState([])
    let [filteredList, setFilteredList]=useState([])
    let [filterById,setFilterById]=useState('')
    let [image,setImage]=useState('')
    let [staffAddPatRoute,setAddPatRoute]=useState('')
    const displayAtOnce = 3
    const [presentPage,setPresentPage]=useState(0)
    const [editsuccess,setEditMessage]=useState('')
    const [uploadButton,setButton]=useState({text:'Upload', class:'',disabled:true})
    const [newImage,setNewImage]=useState('')
    useEffect(()=>{
        axios.get(`${url}patient/allPatient`).then(res=>{
                localStorage.patTray=JSON.stringify(res.data)
                setAllPat(res.data)
                setFilteredList(res.data)
                setTablePage()
        }).catch(err=>{
            console.log(err)
        })

    },[url,editsuccess])
useEffect(()=>{
    setTablePage()
},[presentPage])

useEffect(()=>{
    filterWithParameter(filterById)
},[filterById])

 
const filterWithParameter=(params)=>{
    let filterList=[]
    let allPatients=allPat    
        allPatients.forEach( (each,i)=>{    
            if((each.fullName.toLowerCase()).includes(params.toLowerCase())|| (each.healthId.toLowerCase()).includes(params.toLowerCase())){
                filterList.push(each)
            }
        })
        setFilteredList(filterList)
        if(params==''){
            setTablePage()
        }
    }

    const deletePatient=(obj,index)=>{
        axios.post(`${url}patient/deletePat`,obj).then(res=>{
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
    const fastForward=()=>{
        let allpat=allPat
        if(presentPage<Math.floor((allpat.length)/displayAtOnce)){
        setPresentPage(presentPage+1)
        }
        setTablePage()
        setFilterById('')

    }
    const fastForwardEnd=()=>{
        let allpat=allPat
        let lastPage= Math.floor((allpat.length)/displayAtOnce)
        setPresentPage(lastPage)
        setTablePage()
        setFilterById('')
    }
    const backWard=()=>{
        if(presentPage!==0){
        setPresentPage(presentPage-1)
        }
        setTablePage()
        setFilterById('')


    }
    const backWardEnd=()=>{
        setPresentPage(0)
        setTablePage()
        setFilterById('')
    }
    function setTablePage(){
        let pageNumber=presentPage
        let filteredList=[]
        
        let allPatients=JSON.parse(localStorage.patTray)
        allPatients.forEach((each,index)=>{
            if(index>=pageNumber*displayAtOnce && index<=pageNumber*displayAtOnce+displayAtOnce-1){
                filteredList.push(each)
            }

        })
        setFilteredList(filteredList)
    }
    const setEdit=()=>{
        setEditMessage('updated')
    }
    const uploadImage=()=>{
        setButton({text:'',class:'spinner-border spinner-border-sm mx-2'})
        let obj={fullName:image.fullName,image:newImage,_id:image._id}
        console.log(obj)
        axios.post(`${url}patient/updatePhoto`,obj).then(res=>{
            if(res.data.status){
                setButton({text:'Done',class:' fa fa-check mx-2', disabled:true})
                window.location.reload()
            }
        }).catch(err=>{
            setButton({text:'Upload', class:'',disabled:false})
        })
    }
    const pickFile =(e)=>{
        const file = e.target.files[0]
        if(file){
            setButton({text:'Upload', class:'',disabled:false})
        }else{
            setButton({text:'Upload', class:'',disabled:true})
            
        }
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = ()=>{
            setNewImage(reader.result)
        }
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
                            <button onClick={()=>setAddPatRoute('staffAddPat')} className='btn btn-primary m-1' data-target='#addStaff' data-toggle='modal'>Add Patient</button>
                            {/* <button className='btn btn-primary m-1'><FontAwesomeIcon icon='plus' /> Import Staff</button> */}

                    </div>
                </div>

            <div className='row w-100'>
                <div className='col-md-6'>
                    <input value={filterById}  onChange={(e)=>setFilterById(e.target.value)}className='form-control m-1' placeholder='Search Patient by Name or ID'/>
                    </div>
             </div>
        <section>               
                <table className='table table-light table-striped table-bordered border-primary my-4'>
                    <thead>
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
                            <td>{i+1+(displayAtOnce*presentPage)}</td>
                            <td>{each.fullName.split(' ')[0]}</td>
                            <td>{each.fullName.split(' ')[1]}</td>
                            <td>{each.healthId}</td>
                            <td>{each.gender}</td>
                            <td>{each.phone}</td>
                            <td>{each.dob}</td>
                            <td>{each.genotype? each.genotype:<span>---</span> }</td>
                            <td>
                               <div className='row'>
                                <div className='col-4'><FontAwesomeIcon className='text-success' style={{cursor: 'pointer'}} icon='edit' data-target='#editPat' data-toggle='modal'  onClick={()=>dispatch({type:'viewPatientDetails', payload:each})} /></div>
                                <div className='col-4'><FontAwesomeIcon style={{cursor: 'pointer'}} onClick={()=>deletePatient(each,i)} className='text-danger' icon='trash' /></div>        
                            <div className='col-4'><FontAwesomeIcon style={{cursor: 'pointer'}} className='text-warning' icon='image' data-target='#viewPat' data-toggle='modal'
                             onClick={()=>setImage(each)} /></div>          
                            </div>          
                                </td>
                        </tr> 

                       ))                      
                        }
                    </tbody>
                </table>

            <div  className='row mb-5'>
                <div className='ml-auto mx-5 '> 
                
                    <i style={{border:'1px solid black', width:'20px',borderRadius:'4px'}} className={'fa fa-angle-double-left mr-2 text-center'  }  onClick={backWardEnd}></i>
                    
                     <i  className='fa fa-angle-left text-center' style={{marginRight:'35px',border:'1px solid black', width:'20px',borderRadius:'4px'}}  onClick={backWard}></i>
                                     
                    <span className='text-center m-auto' style={{marginLeft:'20px'}}>{presentPage+1}</span>

                    <i className='fa fa-angle-right text-center' style={{marginLeft:'35px',border:'1px solid black', width:'20px',borderRadius:'4px'}} onClick={fastForward}></i>

                    <i className='fa fa-angle-double-right ml-2 text-center' style={{border:'1px solid black', width:'20px',borderRadius:'4px'}}  onClick={fastForwardEnd} ></i>
                    <br/> <span style={{marginTop:'15px',float:'right'}} className='text-danger'>{Math.ceil((allPat.length)/displayAtOnce)} pages</span>                  
                </div>
            </div>
        </section>
        </div>
    </div>        

{/* Modals */}
            <div className='modal fade' id="addStaff" data-backdrop="static">
                        <div className='modal-dialog modal-dialog-centered'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <h6 className='modal-title'>Add another Patient</h6>
                                    <button type="button" className="close" data-dismiss="modal" >&times;</button>
                                </div>
                                <div className='modal-body'>
                                    <RegisterPatient staffAddPatRoute={staffAddPatRoute}/>
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
                                            {image.photo?<img src={image.photo} alt='profilePhoto' class='w-100'/> : <div>No image, please upload an image here <br/> <input onChange={pickFile}  className='my-3' type='file'/> <br/> <button disabled={uploadButton.disabled} onClick={uploadImage} className='btn btn-success mx-1'>{uploadButton.text} <i className={uploadButton.class}></i></button></div>}

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
                                   <ViewProfile setEdit={setEdit}/>
                                </div>
                            </div>
                        </div>
                    </div>           
        </>


    )

}
export default PatientList