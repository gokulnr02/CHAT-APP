import React, { useCallback, useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { config } from '../config';
import CommonAPI_POST from '../CommonAPI';

function Login() {
    const [userDetails, setUserDetails] = useState({});
    const [ViewSignUp,setViewSignUp]=useState(false)

    const handleChange = (e) => {
        setUserDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = useCallback(async () => {
        const url = `${config.Api}createUser`;
        console.log(url,'url')
        try {
            const result = await CommonAPI_POST({url, params:userDetails});
            console.log(result); 
        } catch (error) {
            console.error('Error:', error); // Handle errors appropriately
        }
    }, [userDetails]);

    return (
        <div className="parent">
           { !ViewSignUp && <div className="container">
                <div>
                    <h1 className="header">Sign in to Your Account</h1>
                </div>
                <div>
                    <div className="inputDiv">
                        <input
                            type="text"
                            className="textField"
                            placeholder="Enter your email"
                        />
                    </div>
                </div>
                <div>
                    <div className="inputDiv">
                        <input
                            type="password"
                            className="textField"
                            placeholder="Enter your password"
                        />
                    </div>
                </div>

                <div className="options">
                    <div className="checkboxOption">
                        <input type="checkbox" />
                        <p>Remember Me</p>
                    </div>
                    <p className="forgotpassword">Forgot Password?</p>
                </div>

                <div>
                    <div className="inputDiv1">
                        <button className="btn">Sign In</button>
                    </div>
                </div>

                <div className="defaultFont fontweight">
                    <p>or Sign in with</p>
                </div>

                <div className="iconDiv">
                    <div className="card">
                        <FaGoogle className="icons google" />
                    </div>
                    <div className="card">
                        <FaFacebookSquare className="icons facebook" />
                    </div>
                </div>

                <div className="defaultFont" style={{ marginTop: '25px' }}>
                    <p >Don't have an account? <span className='linkHighlight' onClick={()=>setViewSignUp(true)}>Sign Up</span></p>
                </div>
            </div>}

            { ViewSignUp && <div className="container">
                <div>
                    <h1 className="header">Sign up for free</h1>
                </div>
                <div>
                    <div className="inputDiv">
                        <input
                            type="text"
                            className="textField"
                            placeholder="Enter your name"
                            name="username"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <div className="inputDiv">
                        <input
                            type="email"
                            className="textField"
                            placeholder="Enter your email"
                            name="email"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <div className="inputDiv">
                        <input
                            type="password"
                            className="textField"
                            placeholder="Enter your password"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <div className="inputDiv1">
                        <button className="btn" onClick={handleSubmit}>
                            Sign Up
                        </button>
                    </div>
                </div>

                <div className="defaultFont fontweight">
                    <p>or Sign in with</p>
                </div>

                <div className="iconDiv">
                    <div className="card">
                        <FaGoogle className="icons google" />
                    </div>
                    <div className="card">
                        <FaFacebookSquare className="icons facebook" />
                    </div>
                </div>

                <div className="defaultFont" style={{ marginTop: '25px' }}>
                    <p>Already have an account?<span className='linkHighlight' onClick={()=>setViewSignUp(false)}> Sign in</span></p>
                </div>
            </div>}
        </div>
    );
}

export default Login;
