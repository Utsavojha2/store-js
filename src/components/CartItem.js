import React from 'react'
import './Checkout.css'
import DeleteIcon from '@material-ui/icons/Delete';
import { updateBasketQty, removeBasketItems } from '../features/basketSlice';
import {useDispatch} from 'react-redux';

const CartItem = ({name,price,id, quantity}) => {
    const dispatch = useDispatch();

    const handleQuantity = (e) => {
        const decAmt = quantity > 1 ? quantity-1 : 1;
        const newAmt = e.target.className === "plus" ? quantity + 1 : decAmt
        dispatch({type : 'UPDATE__BASKET__QTY', payload : {
            id, quantity : newAmt
        }})
    }
    return (
        <div className="cartItem__container">
            <div className="cartItem">
                <h3>{name}</h3>
                <p className="price">${price}</p>
                <div className="checkout__quantity">
                    <span onClick={handleQuantity} className="minus">-</span>
                    <h5>{quantity}</h5>
                    <span onClick={handleQuantity} className="plus">+</span>
                </div>
                <p className="subtotalPrice">${(price * quantity).toFixed(2)}</p>
            </div>
            <DeleteIcon onClick={() => dispatch({type : 'REMOVE__BASKET__ITEMS', payload : {id}}) }/>
        </div>
    )
}

export default CartItem
