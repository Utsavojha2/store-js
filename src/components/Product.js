import React, {useState} from 'react'
import './Product.css';
import {Link, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {currentProduct} from '../features/productSlice';
import {fillBasket} from '../features/basketSlice';

const Product = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [number, setNumber] = useState(1);
    const productInfo = useSelector(currentProduct);

    const handleNumber = (e) => {
          setNumber(num => {
              const substractNum = num > 1 ? num-1 : 1;
              const latestNum = e.target.className === 'addition' ? num + 1 : substractNum;
              return latestNum
          })
    }


    if(productInfo){
        const {id,name,link,price,available} = productInfo;
        return (
            <div className="product">
                <Link to="/">
                <button className="product__redirect">Back To Home</button>
                </Link>
                <div className="product__container">
                    <img src={link} alt="" className="product__img" />
                    <div className="product__info">
                      <div className="product__intro">
                        <h1>{name}</h1>
                        <h5>${price}</h5>
                        <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat accusantium sapiente tempora sed dolore esse deserunt eaque excepturi, delectus error accusamus sandae vitae neque dolore, obcaecati incidunt sequi blanditiis est exercitationem molestiae delectus saepe odio eligendi modi porro eaque in libero minus unde sapiente consectetur architecto.Ullam rerum, nemo iste ex, eaque perspiciatis nisi, eum totam velit saepe sed quos similique amet. Ex, voluptate accusamus nesciunt totam vitae esse iste.
                        </p>
                      </div>
                      <div className="product__interval">
                          <p>Available:</p>
                          {!available ? 'Out Of Stock' : 'In Stock'}
                      </div>
                      <div className="product__interval v2">
                          <p>SKU:</p>
                          Recrfxv3EwpvJwvjq
                      </div>
                      <div className="product__interval v3">
                          <p>Brand:</p>
                          Nike
                      </div>
                      <div className="product__underline"></div>
                        <div className="product__numberBtn">
                            <div className="product__number">
                            <button onClick={handleNumber} className="minus">-</button>
                            <h4>{number}</h4>
                                <button onClick={handleNumber} className="addition">+</button>
                            </div>
                            <button onClick={() => {
                                dispatch(fillBasket({name, price, id, quantity : number}))
                                history.push('/checkout')
                            }} className="product__redirect add__cartBtn">Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
    )
 }
 return null;
}

export default Product

 
