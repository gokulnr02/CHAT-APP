import React from 'react';
import { FaGoogle } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

function Login() {
    return (
        <div className='parent'>
            <div className='container'>
                <div><h1 className='header'> Sign in to Your Account </h1></div>
                <div>
                    <div className='inputDiv'>
                        <input type='text' className='textField' placeholder='Enter your email' />
                    </div>
                </div>
                <div>
                    <div className='inputDiv'>
                        <input type='text' className='textField' placeholder='Enter your password'/>
                    </div>
                </div>

                <div className='options'>
                    <div className='checkboxOption'><input type='checkbox' /> <p>Remember Me</p></div>
                    <p className='forgotpassword'>Forgot Password ?</p>
                </div>

                <div>
                    <div className='inputDiv1'>
                        <button className='btn'>Sign In</button>
                    </div>
                </div>

                <div className='defaultFont fontweight'>
                    <p>or Sign in with</p>
                </div>

                <div className='iconDiv'>
                    <div className='card'><FaGoogle className='icons google'/></div>
                    <div className='card'><FaFacebookSquare className='icons facebook'/></div>
                </div>

                <div className='defaultFont' style={{marginTop:'25px'}}>
                    <p>Don't have an account ? Sign Up</p>
                </div>
            </div>
        </div>
    )
}

export default Login