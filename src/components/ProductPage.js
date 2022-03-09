import React from 'react'
import CommentSection from './CommentSection';
import Product from './Product'

const ProductPage = () => {

    return (
        <div style={{display : 'flex' , flexDirection : 'column'}}>
            <Product />
            <CommentSection  />
        </div>
    )
}

export default ProductPage;



