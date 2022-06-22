import React from 'react';

function RegisterPatient(props) {
    return (
        <div>
            <form className='text-white p-4' style={{backgroundColor: '#000000'}}>
                    <div className='bg-warning text-white h5 text-center p-3'>
                        HOSPITAL MANAGEMENT SOFTWARE
                    </div>
                    <hr className='text-white bg-white'/>
                    <p className='text-white font-weight-bold'>Patient Register</p>
                    <div className='form-row'>
                        <div className='form-group col-md-4'>
                            <input className='form-control' placeholder='Enter your Full Name' required name='fullName' />
                        </div>
                        <div className='form-group col-md-4'>
                            <input className='form-control' placeholder='Enter your Guardian Name' required name='guardianName' />
                        </div>
                        <div className='form-group col-md-4'>
                            <input type="email" className='form-control' placeholder='Email Address' required name='email' />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group col-md-4'>
                            <input type="number" className='form-control' placeholder='Enter your Phone Number' required name='phone' />
                        </div>
                        <div className='form-group col-md-4'>
                            <input className='form-control' placeholder='Enter your Home Address' required name='address' />
                        </div>
                        <div className='form-group col-md-4'>
                            <select className='form-control required' name='bloodGroup'>
                                <option>Blood Group</option>
                                <option value="A" >A</option>
                                <option value="B">B</option>
                                <option value="O">O</option>
                                <option value="AB">AB</option>
                            </select>
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group col-md-4'>
                            <input type="date" className='form-control' placeholder='Date of Birth' required name='dob' />
                        </div>
                        <div className='form-group col-md-4'>
                            <select className='form-control' required name='gender'>
                                <option value="">Gender</option>
                                <option value="Single" >Male</option>
                                <option value="Married">Female</option>
                            </select>
                        </div>
                        <div className='form-group col-md-4'>
                            <select className='form-control' required name='maritalStatus' >
                                <option value="">Marital Status</option>
                                <option value="Single" >Single</option>
                                <option value="Married">Married</option>
                            </select>
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group col-md-4'>
                            <select className='form-control' required name='disablity' >
                                <option value="">Any Disablity?</option>
                                <option value="Single" >Yes</option>
                                <option value="Married">No</option>
                            </select>
                        </div>
                        <div className='form-group col-md-8'>
                            {/* <input type="file" className='form-control d-none' required name='photo' /> */}
                            <button className='btn btn-block btn-light text-warning'><span><i className='fa fa-upload'></i></span> Pick a Photo</button>
                        </div>
                    </div>
                    <button className='btn btn-primary btn-block'>Register</button>
                    <p className='py-2 font-weight-bold'>Already Registered? <span className="text-warning" style={{cursor: 'pointer'}}>Patient Login Here</span></p>
            </form>
        </div>
    );
}

export default RegisterPatient;