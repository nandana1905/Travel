import React, { useEffect, useState } from 'react'
import './AgencyRegister.css'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { sendPostAgency } from '../redux/slice/apiSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function () {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { agencyReg } = useSelector(state => state.api)
    console.log('agencyRegState===>', agencyReg);

    const [agencyRegister, setAgencyRegister] = useState({

        name: '',
        email: '',
        address: '',
        phone: '',
        password: '',
        agency_img: ''

    })
    console.log('agencyRegister====>', agencyRegister);

    const agencyRegistertextChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setAgencyRegister({ ...agencyRegister, [name]: value })
    }

    const [error, setError] = useState({})

    const submit = (event) => {

        event.preventDefault()

        if (!Validation()) {
            console.log('error====>', error);
            return;
        }

        const AgenctResgisterData = new FormData();

        AgenctResgisterData.append('name', agencyRegister.name)
        AgenctResgisterData.append('email', agencyRegister.email)
        AgenctResgisterData.append('address', agencyRegister.address)
        AgenctResgisterData.append('phone', agencyRegister.phone)
        AgenctResgisterData.append('password', agencyRegister.password)
        AgenctResgisterData.append('agency_img', agencyRegister.agency_img)

        for (const value of AgenctResgisterData.values()) {
            console.log(value);
        }

        try {
            dispatch(sendPostAgency(AgenctResgisterData))
        } catch (error) {
            toast.error(error.response.data.message);
            console.error(error.response.data.message);
        }

    }

    useEffect(() => {

        console.log();
        
        if (agencyReg && agencyReg.message) {
            toast.success(agencyReg.message)
            setTimeout(() => {
                navigate('/login-page')
            }, 2000)
        }

    }, [agencyReg])

    const Validation = () => {

        const errorMessage = {}
        const emailRegex = /^\S+@\S+\.\S+$/
        const phoneRegex = /^[+]?[1-9]\d{1,14}$/;

        if (!agencyRegister.name.trim()) {
            errorMessage.name = 'Name is required'
        }
        if (!agencyRegister.agency_img) {
            errorMessage.agency_img = 'Image is required'
        }
        if (!agencyRegister.email.trim()) {
            errorMessage.email = 'Email is required'
        } else if (!emailRegex.test(agencyRegister.email)) {
            errorMessage.email = 'Invalid email address'
        }
        if (!agencyRegister.address.trim()) {
            errorMessage.address = 'Address is required '
        }
        if (!agencyRegister.phone.trim()) {
            errorMessage.phone = 'Phone no is required'
        } else if (!phoneRegex.test(agencyRegister.phone)) {
            errorMessage.phone = 'Invalid phone number'
        } else if (+agencyRegister.phone.length < 10 || +agencyRegister.phone.length > 10) {
            errorMessage.phone = 'Phone number must have 10 digit'

        } if (!agencyRegister.password.trim()) {
            errorMessage.password = 'Password is required'
        }

        setError(errorMessage);
        return Object.keys(errorMessage).length === 0;
    }

    return (
        <div>

            <div className='reg-agency-body'>
                <Toaster />
                <div className='agnencyReg-card'>
                    <div class="form-card1-agency">
                        <div class="form-card2-agency">
                            <form class="form-agency">
                                <p class="form-heading-agency">Agency Registration</p>

                                <div className='file-agency-reg'>
                                    <span className='span-user-regsiter'>{error.agency_img}</span>
                                    <Form.Group >
                                        <Form.Control
                                            type="file"
                                            id="file-upload"
                                            style={{ background: 'transparent' }} // Hide the default input
                                            name='agency_img'
                                            onChange={(event) => { setAgencyRegister({ ...agencyRegister, agency_img: event.target.files[0] }); }}
                                        />
                                    </Form.Group>
                                </div>

                                <span className='span-user-regsiter'>{error.name}</span>
                                <div class="form-field-agency">
                                    <input
                                        required=""
                                        placeholder="Agency Name"
                                        class="input-field-agency"
                                        type="text"
                                        name='name'
                                        onChange={agencyRegistertextChange}
                                    />
                                </div>

                                <span className='span-user-regsiter'>{error.email}</span>
                                <div class="form-field-agency">
                                    <input
                                        required=""
                                        placeholder="Email"
                                        class="input-field-agency"
                                        type="email"
                                        name='email'
                                        onChange={agencyRegistertextChange}
                                    />
                                </div>

                                <span className='span-user-regsiter'>{error.phone}</span>
                                <div class="form-field-agency">
                                    <input
                                        required=""
                                        placeholder="Contact Number"
                                        class="input-field-agency"
                                        type="text"
                                        name='phone'
                                        onChange={agencyRegistertextChange}
                                    />
                                </div>

                                <span className='span-user-regsiter'>{error.password}</span>
                                <div class="form-field-agency">
                                    <input
                                        required=""
                                        placeholder="Password"
                                        class="input-field-agency"
                                        type="password"
                                        name='password'
                                        onChange={agencyRegistertextChange}
                                    />
                                </div>

                                <span className='span-user-regsiter'>{error.address}</span>
                                <div class="form-field-agency">
                                    <textarea
                                        required=""
                                        placeholder="Address"
                                        cols="30"
                                        rows="3"
                                        class="input-field-agency"
                                        name='address'
                                        onChange={agencyRegistertextChange}
                                    ></textarea>
                                </div>

                                <button class="sendMessage-btn-agency" onClick={submit}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}
