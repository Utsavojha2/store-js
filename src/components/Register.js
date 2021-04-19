import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import './Register.css';
import {auth} from '../firebase';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ErrorIcon from '@material-ui/icons/Error';
import {useDispatch} from 'react-redux';
import { CircularProgress } from '@material-ui/core';

const Register = ({ validateEmail,displayName, setDisplayName}) => {
    const [accountInfo, setAccountInfo] = useState({
        email : '',
        password : '',
        password2 : ''
      })
    
    const history = useHistory();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const {email,password,password2} = accountInfo;


    const createNewAccount = (e) => {
        e.preventDefault();
        const name = displayName.trim();
        const hasUpper = password.match(/[A-Z]/)
        const hasLower = password.match(/[a-z]/g)
        const hasNumber = password.match(/[0-9]/g)
        const passwordChar = password.length >=6
        const doesPasswordMatch = password === password2;
        const isEmailValid = validateEmail(email);

        if(name && isEmailValid && hasUpper && hasLower && hasNumber && passwordChar && doesPasswordMatch){
            auth
                .createUserWithEmailAndPassword(email,password)
                .then(auth => { 
                    auth.user.updateProfile({
                        displayName : name
                    })})
                .then(() => {
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                        history.push('/')
                        window.location.reload()
                    }, 2000)
                })
                .catch(err => {
                    if(err.code === 'auth/email-already-in-use'){
                        setError('email');
                        setTimeout(() => {
                            setError(false);
                        }, 3000)
                    } else {
                       alert(err.message)
                    }
                })
        } else {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000)
        }
    }
    

    return (
        <div className="register">
             <Link to="/">
                 <img className="register__logo" src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Flipkart_logo.svg/1280px-Flipkart_logo.svg.png" alt="Flipkart" />
             </Link>
             <div className="register__inContainer">
                <h1>Create an Account</h1>
                {(error !== 'email' && error === true) && ( 
                    <p className="register__error">
                        <ErrorIcon />
                        <small>Error creating new account</small>
                    </p>
                )}
                 {error === 'email' && ( 
                    <p className="register__error">
                        <ErrorIcon />
                        <small>Sorry! The email is already taken</small>
                    </p>
                )}
                {success && (
                    <span className="register__success">
                     <CircularProgress color="secondary" />
                     <small>Signing in</small>
                    </span>
                )}
                <form>
                    <h5>Your Name</h5>
                    <input value={displayName} type="text" placeholder="Enter Name" onChange={e => setDisplayName(e.target.value)}/>

                    <h5 className="input__emailLabel">Email</h5>
                    <input value={email} type="email" placeholder="something@flipkart.com" onChange={e => setAccountInfo({...accountInfo, email : e.target.value})}/>

                    <h5 className="input__passwordLabel">Password</h5>
                    <input value={password} onChange={e => setAccountInfo({...accountInfo, password : e.target.value})} type="password" placeholder="(at least 6 characters)"  />
                    <p className="register__passwordCondition">
                        <VisibilityIcon /> 
                     <small>Must contain at least an uppercase, lowercase letter and a number.</small>
                    </p>

                    <h5 className="input__passwordLabel">Re-enter Password</h5>
                    <input value={password2} onChange={e => setAccountInfo({...accountInfo, password2 : e.target.value})} type="password" placeholder="Re-enter Password"  />

                    <button type="submit" onClick={createNewAccount} className="register__signUpBtn">Create your Flipkart account</button>
                </form>
                <small className="register__policy">By continuing, you agree to the Flipkart's Condition of <span>Use and Privacy Notice</span>.</small>
                <small className="register__policy account">
                    Already have an account? 
                    <span>
                        <Link to="/login">
                            Sign In <small><PlayArrowIcon/></small>
                        </Link>
                    </span>
                </small>
            </div>
        </div>
    )
}

export default Register
