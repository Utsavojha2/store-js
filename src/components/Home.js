import React from 'react'
import './Home.css'
import FeaturedItem from './FeaturedItem';
import items from '../data';

const Home = () => {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__img" src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Fashion/Event/SS21Flip/MFRevisedHeader/MFPC.jpg" alt="" />
                <img src="https://www.cloudways.com/blog/wp-content/uploads/ecommerce-website-checklist-b-.jpg" alt="" className="home__mobileImg" />
                {/* Featured Section */}
                <div className="home__featured">
                    <h2>Featured Products</h2>
                    <span className="border"></span>
                    <div className="home__featuredItems">
                        {items.map(el => {
                            return <FeaturedItem key={el.id} {...el} />
                        })} 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;



