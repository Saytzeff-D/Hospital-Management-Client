import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const  PatientList=()=>{
    let url=useSelector(state=>state.UrlReducer.url)
    let [allPat,setAllPat]=useState([])
    let [filteredList, setFilteredList]=useState([])
    let [filterByName,setFilterByName]=useState('')
    let [filterById,setFilterById]=useState('')
    useEffect(()=>{
        console.log('fetching')
        axios.get(`${url}patient`).then(res=>{
            console.log(res)
            if(res.data.status){
                console.log(res.data)
                setAllPat(res.data.patients)
                setFilteredList(res.data.patients)
            }
            else{
                console.log('unable to fetch')
            }

        }).catch(err=>{
            console.log(err)
            console.log('cannot connect')

        })

    },[filterById])
useEffect(()=>{
   filterWithParameter(filterByName)
// console.log('cahnging')
},[filterByName,filterById])  
const filterWithParameter=(params=filterByName)=>{     

    if(params!=''){
        // console.log('movinssg')
        let filteredList=[]
        let allPatients=allPat
        allPatients.forEach( (each,i)=>{
            if((each.fullName.toLowerCase()).includes(filterByName.toLowerCase())){
                filteredList.push(each)
            }
            else{
                console.log(false)

            }

        })


        setFilteredList(filteredList)
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
               
            <div className='tableDiv row my-5 container text-center'>
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
                                <div className='col-4'><button className='btn btn-success actbtn'>Edit <i className='fa fa-edit'></i></button></div>
                                <div className='col-4'><button className=' btn btn-danger actbtn'>Delete <i className='fa fa-trash'></i>
                            </button></div>        
                            <div className='col-4'><button className=' btn btn-warning actbtn'>photo <i className='fa fa-photo'></i></button></div>          
                            </div>          
                                </td>

                            {/* <td></td> */}

                        </tr> 

                       ))
                       
                       
                        
                        }


                    </tbody>


                </table>



            </div>
                


        </section>        
        </>


    )

}
export default PatientList