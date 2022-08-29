import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Finance = () => {
    const api = useSelector(state=>state.UrlReducer.url)
    const [response, setResponse] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [financeTray, setFinanceTray] = useState([])

    useEffect(()=>{
        axios.get(`${api}staff/finance`).then((res)=>{
            if(res.data.status){
                setIsLoading(false)
                setFinanceTray(res.data.finance)
            }else{
                setIsLoading(false)
                setResponse(res.data.message)
            }
        }).catch(()=>{
            setIsLoading(false)
            setResponse('An error has occurred')
        })
    }, [])

    return (
        <div>
            <div className='row p-2'>
                <div className='col-12 bg-white'>
                    <div className='py-2 border-bottom'>
                        <p className='font-weight-bold h6'>Finances</p>
                    </div>
                    {
                        isLoading
                        ?
                        (<div className='m-2'><span className='spinner-border text-danger' ></span></div>)
                        :
                        financeTray.length !== 0
                        ?
                        (
                            <table className='table table-responsive-md'>
                                <thead>
                                    <tr>
                                        <td>S/N</td>
                                        <td>Payment Ref</td>
                                        <td>Paid for</td>
                                        <td>Amount</td>
                                        <td>Health Id</td>
                                        <td>Created on</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        financeTray.map((each, i)=>(
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{each.paymentRef}</td>
                                                <td>{each.paymentType}</td>
                                                <td>{each.amount}</td>
                                                <td>{each.healthId}</td>
                                                <td>{each.created}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
                        :
                        response !== ''
                        ?
                        <div className='mt-2 alert alert-danger'>
                            {response}
                        </div>
                        :
                        <p>Empty</p>
                    }

                </div>
            </div>
        </div>
    );
};

export default Finance;