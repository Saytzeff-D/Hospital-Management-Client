import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getStaff } from '../../actions';
import RegisterStaff from './RegisterStaff';

function AllStaff(props) {
    const dispatch = useDispatch()
    const allStaff = useSelector(state=>state.StaffReducer.staffTray)
    const url = useSelector(state=>state.UrlReducer.url)
    useEffect(()=>{
        dispatch(getStaff(url))
    }, [dispatch, url])
    return (
        
        <div className='py-3'>
            {
                allStaff.length === 0
                ?
                (
                <div className='d-flex justify-content-center'>
                    <span className='spinner-border text-danger'></span>
                </div>
                )
                :
                (
                    <div>
                        <div className='bg-white border p-2'>
                <div className='d-flex justify-content-between border-bottom'>
                    <div>
                        <p className='h6'>Staff List</p>
                    </div>
                    <div className=''>
                        <button className='btn btn-primary m-1' data-target='#addStaff' data-toggle='modal'>Add Staff</button>
                        <button className='btn btn-primary m-1'><FontAwesomeIcon icon='plus' /> Import Staff</button>
                    </div>
                </div>
                <div className='row w-100'>
                    <div className='col-md-6'>
                        <input className='form-control m-1' placeholder='Search by Role' />
                        <div className='d-flex justify-content-end'>
                        <button className='btn btn-primary'>Search <FontAwesomeIcon icon='search' /></button>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <input className='form-control m-1' placeholder='Search by Staff Name' />
                        <div className='d-flex justify-content-end'>
                        <button className='btn btn-primary'>Search <FontAwesomeIcon icon='search' /></button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='row mt-2'>
                    {
                        allStaff.map((staff, index)=>(
                            <div key={index} className='col-md-3 my-2'>
                                <div className='border shadow-lg d-flex justify-content-between'>
                                    <div className='col-md-5 px-0'>
                                        <img alt='staffPic' src={staff.photo} className='w-100 h-100' />
                                    </div>
                                    <div className='col-md-7'>
                                        <p className='font-weight-bold'>{staff.fname} {staff.lname}</p>
                                        <p style={{fontSize: '12px'}}>{staff.phone}</p>
                                        <p style={{fontSize: '12px'}}>{staff.address}</p>
                                        <div className='h6 rounded-lg bg-primary text-center my-1 text-white text-capitalize'>{staff.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Add Staff Modal */}
            <div className='modal fade' id="addStaff" data-backdrop="static">
                        <div className='modal-dialog modal-dialog-centered'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <h6 className='modal-title'>Add a New Staff</h6>
                                    <button type="button" className="close" data-dismiss="modal" >&times;</button>
                                </div>
                                <div className='modal-body'>
                                    <RegisterStaff />
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                )
            }
        </div>
    );
}

export default AllStaff;