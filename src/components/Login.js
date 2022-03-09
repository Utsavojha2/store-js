import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import './Login.css';
import {auth} from '../firebase';
import { CircularProgress } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';


const Login = ({validateEmail}) => {
    const history = useHistory();
    const [errorIssue, setErrorIssue] = useState(null);
    const [signInSuccess, setSignInSuccess] = useState(false);
    const [userInfo, setUserInfo] = useState({
        email : '',
        password : ''
    })

    const onSignIn = (e) => {
        const {email, password} = userInfo;
        const isEmailValid = validateEmail(email)
        e.preventDefault();

        if(isEmailValid){
         auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                if(auth){
                    setSignInSuccess(true);
                    setTimeout(() => {
                        setSignInSuccess(false);
                        history.push('/')
                    }, 1500);
                }
            })
            .catch(error => {
                // alert(error.code)
                if(error.code === 'auth/wrong-password'){
                    setErrorIssue('password')
                } else {
                    setErrorIssue('email')
                }
                setTimeout(() => setErrorIssue(null), 2000)
            })
        } else {
            setErrorIssue('email');
            setTimeout(() => setErrorIssue(null), 2000)
        }
    }

    return (
        <div className="login">
            <Link to="/">
             <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Flipkart_logo.svg/1280px-Flipkart_logo.svg.png" alt="" />
            </Link>
            <div className="login__inContainer">
                <h1>Sign-In</h1>
                {signInSuccess && (
                    <span className="login__success">
                        <CircularProgress color="secondary" fontSize="small" />
                        <small>Signing in</small>
                    </span>
                )}
                {errorIssue === 'email' && (
                        <span className="login__error">
                            <ErrorIcon />
                            <small>Invalid Email Address</small>
                        </span>
                    )
                }
                 {errorIssue === 'password' && (
                        <span className="login__error">
                            <ErrorIcon />
                            <small>Incorrect password.</small>
                        </span>
                    )
                }
                <form>
                    <h5>Email</h5>
                    <input value={userInfo.email} type="email" placeholder="Email" onChange={e => setUserInfo({...userInfo, email : e.target.value})}/>

                    <h5 className="input__passwordLabel">Password</h5>
                    <input value={userInfo.password} onChange={e => setUserInfo({...userInfo, password : e.target.value})} type="password" placeholder="Enter Password"  />

                    <button type="submit" onClick={onSignIn} className="login__signInBtn">Sign In</button>
                </form>
                <small className="login__policy">By continuing, you agree to the Flipkart's Condition of <span>Use and Privacy Notice</span>.</small>
                <small className="login__help">
                   <PlayArrowIcon/> Need help?
                </small>
            </div>
            <div className="login__outContainer">
                <div className="login__registerQuestion">
                    <div className="underline"></div>
                    <small>New to Flipkart ?</small>
                    <div className="underline"></div>
                </div>
            <button onClick={() => history.push('/register')} className="login__registerBtn">
                Create your Account
            </button>
            </div>
        </div>
    )
}

export default Login;

