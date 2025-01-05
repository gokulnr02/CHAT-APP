import React, { useState, useCallback } from 'react';
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { config } from '../config';
import CommonAPI_POST from '../CommonAPI';

export default function Login1() {
    const [userDetails, setUserDetails] = useState({});
    const [ViewSignUp, setViewSignUp] = useState(false)

    const handleChange = (e) => {
        setUserDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async () => {
        if (!ViewSignUp) {
            if (Object.keys(userDetails).length > 0) {
                await handleSubmitAPI()
            } else {
                // ALERT ENTER USER DETAILS
                alert('ENTER USER NAME AND PASSWORD')
            }
        } else {
            if (Object.keys(userDetails).length > 0) {
                await handleSubmitAPI()
            } else {
                // ALERT ENTER USER
                alert('ENTER USER INFORMATION')
            }
        }
    }

    const handleSubmitAPI = useCallback(async () => {
        const url = ViewSignUp ? `${config.Api}createUser` : `${config.Api}login`;
        console.log(url, 'url')
        try {
            const result = await CommonAPI_POST({ url, params: userDetails });
            alert(result.message)
            if (!ViewSignUp && result.status == 200) {
                localStorage.setItem('uID', result.data.res._id)
                localStorage.setItem('username', result.data.res.username)
                
                window.location.href = '/inbox'
            }
        } catch (error) {
            console.error('Error:', error); // Handle errors appropriately
        }
    }, [userDetails]);

    return (
        <div className='loginContainer'>
            <div className='leftSideContainer'>
                <div className='loginleft'>
                    <div className='triangleShape'></div>
                    <div className='squarShape'></div>
                    <h1>Welcome Back !</h1>
                    <p className='txtColor'>To Keep connected with us please login with your personal information</p>
                </div>
                <div className='shape-Btn'>
                    <div className='loginBTN' onClick={() => setViewSignUp(!ViewSignUp)}><button className='btn-sign'>{!ViewSignUp ? 'SIGN UP' : 'SIGN IN'}</button></div>
                    <div className='shape'></div>
                </div>
                <div className='circleClip'>
                </div>
            </div>
            <div className='RightSideContainer'>
                <div className='centerBox'>
                    <h1 className='headerText'>{ViewSignUp ? 'Create Account' : 'Login'}</h1>
                    <div className='SignInWith'></div>
                    <div>
                        <div className="inputDiv">
                            <div className='textFieldIcon'><FaRegUser /></div>
                            <input
                                type="text"
                                className="textField"
                                placeholder="Name"
                                name="username"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        {ViewSignUp && <div className="inputDiv">
                            <div className='textFieldIcon'><MdOutlineMailOutline /></div>
                            <input
                                type="email"
                                className="textField"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                            />
                        </div>}
                    </div>

                    <div>
                        <div className="inputDiv">
                            <div className='textFieldIcon'><RiLockPasswordLine /></div>
                            <input
                                type="password"
                                className="textField"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='SignInWith'></div>
                    <div className='loginBTN1'><button className='btn-sign' onClick={handleSubmit}>{ViewSignUp ? 'SIGN UP' : 'SIGN IN'}</button></div>
                </div>

            </div>
        </div>
    )
}
