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
    let allpat=useSelector(state=>state.StaffReducer.patTray)
    let [allPat,setAllPat]=useState([])
    let [filteredList, setFilteredList]=useState([])
    let [filterByName,setFilterByName]=useState('')
    let [filterById,setFilterById]=useState('')
    let [image,setImage]=useState('')
    let [staffAddPatRoute,setAddPatRoute]=useState('')
    const displayAtOnce=3
    const [presentPage,setPresentPage]=useState(0)
    useEffect(()=>{
        console.log('refetching')
        axios.get(`${url}patient/allpat`).then(res=>{
                console.log(res)
                sessionStorage.patTray=JSON.stringify(res.data)
            
                setAllPat(res.data)
                setFilteredList(res.data)
                setTablePage()

                
    
        }).catch(err=>{
            console.log(err)
            console.log('cannot connect')
        })

    },[allpat, url])
useEffect(()=>{
    setTablePage()
},[presentPage])
useEffect(()=>{
   filterWithParameter(filterByName)
   if(filterByName==''){
     setTablePage()
   }
   setPresentPage(0)
   
},[filterByName])  

useEffect(()=>{
    filterWithParameter(filterById,'id')
     if(filterById==''){
        setTablePage()
      }
      setPresentPage(0)
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
    const fastForward=()=>{
        let allpat=JSON.parse(sessionStorage.patTray)
        if(presentPage<Math.floor((allpat.length)/displayAtOnce)){
        setPresentPage(presentPage+1)
        }
        setTablePage()
        setFilterByName('')
        setFilterById('')

    }
    const fastForwardEnd=()=>{
        let allpat=JSON.parse(sessionStorage.patTray)
        let lastPage= Math.floor((allpat.length)/displayAtOnce)
        setPresentPage(lastPage)
        setTablePage()
        setFilterByName('')
        setFilterById('')
    }
    const backWard=()=>{
        if(presentPage!==0){
        setPresentPage(presentPage-1)
        }
        setTablePage()
        setFilterByName('')
        setFilterById('')


    }
    const backWardEnd=()=>{
        setPresentPage(0)
        setTablePage()
        setFilterByName('')
        setFilterById('')
    }
    function setTablePage(){
        let pageNumber=presentPage
        let filteredList=[]
        
        let allPatients=JSON.parse(sessionStorage.patTray)
        console.log(allPatients)
        allPatients.forEach((each,index)=>{
            if(index>=pageNumber*displayAtOnce && index<=pageNumber*displayAtOnce+displayAtOnce-1){
                filteredList.push(each)
            }

        })

        setFilteredList(filteredList)

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
                    <input value={filterById}  onChange={(e)=>setFilterById(e.target.value)}className='form-control m-1' placeholder='Search Patient by ID' />
                    </div>
                    <div className='col-md-6'>
                        <input value={filterByName}  onChange={(e)=>setFilterByName(e.target.value)} className='form-control m-1' placeholder='Search Patient by Name' />
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
                            <td scope='row'>{i+1+(displayAtOnce*presentPage)}</td>
                            <td colSpan={2}>{each.fullName}</td>
                            <td>{each.healthId}</td>
                            <td>{each.gender}</td>
                            <td>{each.phone}</td>
                            <td>{each.dob}</td>
                            <td>{each.genotype? each.genotype:<span>---</span> }</td>
                            <td>
                               <div className='row'>
                                <div className='col-4'><FontAwesomeIcon className='text-success' style={{cursor: 'pointer'}} icon='edit' data-target='#editPat' data-toggle='modal'  onClick={()=>dispatch({type:'viewPatientDetails', payload:each})} /></div>
                                <div className='col-4'><FontAwesomeIcon style={{cursor: 'pointer'}} onClick={()=>deletePatient(each,i)} class='text-danger' icon='trash' /></div>        
                            <div className='col-4'><FontAwesomeIcon style={{cursor: 'pointer'}} class='text-warning' icon='image' data-target='#viewPat' data-toggle='modal'
                             onClick={()=>setImage(each.photo)} /></div>          
                            </div>          
                                </td>

                            {/* <td></td> */}

                        </tr> 

                       ))
                       
                       
                        
                        }


                    </tbody>


                </table>
            </div>

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
                                            <img src={image} alt='profilePhoto' class='w-100'/>

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