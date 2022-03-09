import React from 'react'
import './Home.css'
import SearchIcon from '@material-ui/icons/Search';
import {useDispatch} from 'react-redux';
import {selectProduct} from '../features/productSlice';
import {useHistory} from 'react-router-dom';
import {fillBasket} from '../features/basketSlice';

const FeaturedItem = ({name,link,price,id,available}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    return (
            <div className="home__item">
                <h4>{name}</h4>
                    <div onClick={(e) => {
                        if(e.target.classList.contains('img') || e.target.classList.contains('home__itemIcon')){
                          dispatch(selectProduct({name , link, price, id, available}))
                          history.push(`/${name.toLowerCase().split(' ').join('')}`)
                        }
                    }} className="home__imgItem">
                        <img className="img" src={link} alt={name} loading="lazy" />
                        <SearchIcon className="home__itemIcon" />
                    </div>
                <div className="home__itemInfo">
                    <button onClick={() => {
                        dispatch(fillBasket({name,price,id,quantity : 1}));
                         history.push('/checkout');
                    }}>
                     Add To Basket
                    </button>
                    <p>${price}</p>
                </div>
            </div>
    )
}

export default FeaturedItem

