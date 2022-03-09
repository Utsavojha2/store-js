import React, {useState} from 'react'
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {Link, useHistory} from 'react-router-dom';
import {auth} from '../firebase';
import {useSelector, useDispatch} from 'react-redux';
import {getUser} from '../features/userSlice';
import {setSearchTerm,getSearchState} from '../features/searchSlice';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { CircularProgress } from '@material-ui/core';

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const [loading, setLoading] = useState(false);
    const {basket} = useSelector(state => state.basket);
    const {searchTerm} = useSelector(getSearchState);
    const history = useHistory(); 

    const onFormSubmit = (e) => {
        e.preventDefault();
         const trimmedTerm = searchTerm.trim();
         if(trimmedTerm){
             history.push(`/search/q=${trimmedTerm}`)
         }
    }

    const onSignOut = () => {
        setLoading(true);
        setTimeout(() => {
            auth.signOut();
            setLoading(false)
        }, 1600)
    }
    
    return (
        <div className="header">
            <img style={{padding : '2px 4px'}} onClick={() => history.push('/')} className="header__logo" src="https://www.freepnglogos.com/uploads/flipkart-logo-png/logo-of-flipkart-icube-portable-ice-maker-latest-model-7.png" alt="" />
            <div className="header__search">
                <form onSubmit={onFormSubmit}>
                    <input value={searchTerm} onChange={e => dispatch(setSearchTerm({searchVal : e.target.value}))} type="text" placeholder="Search Items" />
                   <SearchIcon onClick={onFormSubmit}/>
                </form>
            </div>
            <div className="header__nav">
                <div className="header__option signIn">
                    <span className="header__optionLineOne">
                       {(user && user?.displayName) ? `Hello ${user.displayName}!` : `Hello Guest!`}
                    </span>
                    {!user ? (
                        <span  onClick={() => history.push('/login')} className="header__optionLineTwo plus">
                            Sign In
                            <PersonAddIcon className="header__addIcon" />
                        </span>
                        ) : (
                        <span onClick={onSignOut} className="header__optionLineTwo plus">
                            {!loading ? (
                            <>
                                Sign Out
                                <ExitToAppOutlinedIcon />
                            </> 
                            ) : (
                            <small className="header__signSmall">
                                Signing Out
                                <CircularProgress className="header__progressCircle" /> 
                            </small> 
                            )}
                        </span>
                    )}
                </div>
                <div className="header__option returns">
                    <span className="header__optionLineOne">Returns</span>
                    <span className="header__optionLineTwo">& Orders</span>
                </div>
                <Link to="/checkout" className="header__checkoutLink">
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header__optionLineTwo header__basketCount">
                            {basket?.map(el => el.quantity).reduce((a,b) => a+b, 0)}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header;

