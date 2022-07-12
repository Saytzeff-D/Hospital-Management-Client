import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const MedStock = (props)=>{
    return (
        <>
            <div className='container-fluid p-3'>
                <div className='row'>
                    <div className='col-12 bg-white border'>
                        <div className='d-flex justify-content-between border-bottom py-2'>
                            <p>Medicine Stock</p>
                            <button className='btn btn-primary'><FontAwesomeIcon icon='plus' /> Add Medicine Details</button>
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-8 my-2'>
                            <input className='form-control' placeholder='Search by Medicine Name' />
                        </div>
                    </div>
                </div>

                {/* Add Medicine Modal */}
                <div className='modal fade'>
                    <div className='modal-dialog'>
                        <div className='modal-content'></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MedStock