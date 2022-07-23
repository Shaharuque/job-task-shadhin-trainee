import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import './employeeDetails.css'
import { BsFillCollectionFill } from 'react-icons/bs';
import Spinner from '../../Spinner/Spinner';

const EmployeeDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [details, setDetails] = useState()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        fetch(`https://60f2479f6d44f300177885e6.mockapi.io/users/${id}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setDetails(data)
            })
    }, [])
    //console.log(details)

    const updatePage = () => {
        navigate(`/update_details/${id}`)
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                <h3>Employee Details of {details?.first_name} {details?.last_name} <BsFillCollectionFill></BsFillCollectionFill></h3>
            </div>
            <div className='details-box'>
                {
                    loading ?
                        <Spinner></Spinner>
                        :
                        <div>
                            <h4>First Name: {details?.first_name ? details.first_name : 'Not Found'}</h4>
                            <h4>Last Name: {details?.last_name ? details.last_name : 'Not Found'}</h4>
                            <h4>Division: {details?.division}</h4>
                            <h4>District: {details?.district}</h4>
                            <h4 style={{ textTransform: 'uppercase', color: 'red' }}>USER ROLE: {details?.user_type}</h4>
                            <button onClick={updatePage}>Edit Details</button>
                        </div>
                }

                <div className='social-link'>
                    <FacebookShareButton
                        url={`https://simple-task.netlify.app/details/${id}`}
                        quote={"important Documents"}
                        hashtag="#EmployeeDetails"
                    >
                        <FacebookIcon size={36} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                        url={`https://simple-task.netlify.app/details/${id}`}
                        title={"important Documents"}
                        hashtag="#EmployeeDetails"
                    >
                        <TwitterIcon size={36} round />
                    </TwitterShareButton>
                    <WhatsappShareButton
                        url={`https://simple-task.netlify.app/details/${id}`}
                        title={"important Documents"}
                        separator=":: "
                    >
                        <WhatsappIcon size={36} round />
                    </WhatsappShareButton>
                </div>
                <h4 style={{ fontWeight: '400' }}>[Share Content to social media like Facebook, Twitter, Whatsapp]</h4>
            </div>
        </div>
    );
};

export default EmployeeDetails;