import React, { useEffect, useState } from 'react'
import './UserRegister.css'
import Form from 'react-bootstrap/Form';
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { sentPostUser } from '../redux/slice/apiSlice';
import { useNavigate } from 'react-router-dom';

export default function UserRegster() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { userReg } = useSelector(state => state.api)
    console.log('userReg====>', userReg);


    const [userResgister, setUserResgister] = useState({

        name: '',
        email: '',
        address: '',
        age: '',
        phone: '',
        password: '',
        user_img: ''

    })
    console.log('UserResgester====>', userResgister);

    const userRegistertextChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setUserResgister({ ...userResgister, [name]: value })
    }



    const [error, setError] = useState({})

    const submit = (event) => {

        event.preventDefault()

        if (!Validation()) {
            console.log('error====>', error);
            return;
        }

        const UserResgisterData = new FormData();

        UserResgisterData.append('name', userResgister.name)
        UserResgisterData.append('email', userResgister.email)
        UserResgisterData.append('address', userResgister.address)
        UserResgisterData.append('age', userResgister.age)
        UserResgisterData.append('phone', userResgister.phone)
        UserResgisterData.append('password', userResgister.password)
        UserResgisterData.append('user_img', userResgister.user_img)

        for (const value of UserResgisterData.values()) {
            console.log(value);
        }


        try {
            dispatch(sentPostUser(UserResgisterData));
            // toast.success(res.data.message);

        } catch (error) {
            toast.error(error.response.data.message);
            console.error(error.response.data.message);
        }

    }

    useEffect(() => {

        if (userReg && userReg.message) {
            toast.success(userReg.message)
            setTimeout(() => {
                navigate('/login-page')
            }, 2000)
        }

    }, [userReg])

    const Validation = () => {

        const errorMessage = {}
        const emailRegex = /^\S+@\S+\.\S+$/
        const phoneRegex = /^[+]?[1-9]\d{1,14}$/;

        if (!userResgister.name.trim()) {
            errorMessage.name = 'Name is required'
        }
        if (!userResgister.user_img) {
            errorMessage.user_img = 'Image is required'
        }
        if (!userResgister.email.trim()) {
            errorMessage.email = 'Email is required'
        } else if (!emailRegex.test(userResgister.email)) {
            errorMessage.email = 'Invalid email address'
        }
        if (!userResgister.address.trim()) {
            errorMessage.address = 'Address is required '
        }
        if (!userResgister.age.trim()) {
            errorMessage.age = 'Age is required'
        }
        if (!userResgister.phone.trim()) {
            errorMessage.phone = 'Phone no is required'
        } else if (!phoneRegex.test(userResgister.phone)) {
            errorMessage.phone = 'Invalid phone number'
        } else if (+userResgister.phone.length < 10 || +userResgister.phone.length > 10) {
            errorMessage.phone = 'Phone number must have 10 digit'

        } if (!userResgister.password.trim()) {
            errorMessage.password = 'Password is required'
        }

        setError(errorMessage);
        return Object.keys(errorMessage).length === 0;
    }

    return (
        <div>
            <div className='reg-user-body'>
                <Toaster />

                <div className='userReg-card'>
                    <div className="form-card1">
                        <div className="form-card2">
                            <form className="form">
                                <p className="form-heading">User Registration</p>

                                <div className='file-user-reg'>
                                    <span className='span-user-regsiter'>{error.user_img}</span>
                                    <Form.Group >
                                        <Form.Control
                                            type="file"
                                            id="file-upload"
                                            style={{ background: 'transparent' }} // Hide the default input
                                            onChange={(event) => {
                                                setUserResgister({ ...userResgister, user_img: event.target.files[0] });
                                            }}
                                        />
                                    </Form.Group>
                                </div>

                                <span className='span-user-regsiter'>{error.name}</span>
                                <div className="form-field">
                                    <input
                                        required=""
                                        placeholder="Name"
                                        className="input-field"
                                        type="text"
                                        name='name'
                                        onChange={userRegistertextChange}
                                    />
                                </div>
                                <span className='span-user-regsiter'>{error.age}</span>
                                <div className="form-field">
                                    <input
                                        required=""
                                        placeholder="Age"
                                        className="input-field"
                                        type="text"
                                        name='age'
                                        onChange={userRegistertextChange}
                                    />
                                </div>
                                <span className='span-user-regsiter'>{error.email}</span>
                                <div className="form-field">
                                    <input
                                        required=""
                                        placeholder="Email"
                                        className="input-field"
                                        type="email"
                                        name='email'
                                        onChange={userRegistertextChange}
                                    />
                                </div>
                                <span className='span-user-regsiter'>{error.phone}</span>
                                <div className="form-field">
                                    <input
                                        required=""
                                        placeholder="Contact Number"
                                        className="input-field"
                                        type="text"
                                        name='phone'
                                        onChange={userRegistertextChange}
                                    />
                                </div>
                                <span className='span-user-regsiter'>{error.password}</span>
                                <div className="form-field">
                                    <input
                                        required=""
                                        placeholder="Password"
                                        className="input-field"
                                        type="password"
                                        name='password'
                                        onChange={userRegistertextChange}
                                    />
                                </div>
                                <span className='span-user-regsiter'>{error.address}</span>
                                <div className="form-field">
                                    <textarea
                                        required=""
                                        placeholder="Address"
                                        cols={30}
                                        rows={3}
                                        className="input-field"
                                        defaultValue={""}
                                        name='address'
                                        onChange={userRegistertextChange}
                                    />
                                </div>
                                <button className="sendMessage-btn" onClick={submit}>Submit</button>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
