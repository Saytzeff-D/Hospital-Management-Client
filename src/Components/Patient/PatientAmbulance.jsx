import React from 'react';

function PatientAmbulance(props) {
    return (
        <div className='py-5 text-center mx-auto'>
            <img className='img-fluid' alt='coming' src={require('../../assets/miner1.png')}/>
            <h2 style={{fontFamily:'cursive'}} className='mt-4'>Coming Soon ....</h2>
        </div>
    );
}

export default PatientAmbulance;