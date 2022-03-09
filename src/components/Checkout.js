import React from 'react'
import './Checkout.css'
import CartItem from './CartItem';
import {Link,useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

const Checkout = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const userBasket = useSelector(state => state.basket.basket);
    const subTotaling = userBasket.map(el => el.price * el.quantity).reduce((a,b) => a + b, 0).toFixed(2);
    const shippingFee = 5.99;

    return userBasket.length ? (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" alt="" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" />
                <div className="checkout__items">
                    <h2>Your Shopping Basket</h2>
                    <div className="checkout__table">
                        <div className="checkout__heads">
                            <p>Item</p>
                            <p>Price</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>
                        <div className="checkout__underline main"></div>
                        {userBasket.map((el) => {
                            return <CartItem key={el.id} {...el} />
                        })}
                    </div>
                    <div className="checkout__underline main"></div>
                </div>
                <div className="checkout__buttons">
                    <button onClick={() => history.push('/')} className="checkout__shoppingBtn">
                      Continue Shopping
                    </button>
                    <button onClick={() => dispatch({type : 'CLEAR__BASKET'})} className="checkout__clearCartBtn">
                     Clear Shopping Cart
                    </button>
                </div>
                <div className="checkout__totaling">
                    <div className="checkout__totalingNumbers">
                        <div className="checkout__particulars">
                            <h5>Subtotal :</h5>
                            <p>Shipping Fee :</p>
                        </div>
                        <div className="checkout__particulars">
                            <h5>
                                ${subTotaling}
                            </h5>
                            <p>${shippingFee}</p>
                        </div>
                    </div>
                    <div className="checkout__underline"></div>
                    <h2 className="checkout__totalSum">
                            Order Total :
                            <span className="numbers">${(+subTotaling + +shippingFee).toFixed(2)}</span>
                    </h2>
                    <button className="checkout__proceed">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    ) : (
        <div className="checkout__emptyCart">
            <div>
                <h1>Your cart is empty</h1>
                <Link to="/"><button className="checkout__shoppingBtn">Shop Now</button></Link>
            </div>
        </div>
    )
}

export default Checkout


