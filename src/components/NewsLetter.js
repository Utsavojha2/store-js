import React from 'react'
import './NewsLetter.css';

const NewsLetter = () => {
    return (
        <div className="newsletter">
            <div className="newsletter__info">
                <h3>Join our Newsletter</h3>
                <span className="newsletter__underline"></span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sint unde quaerat ratione soluta veniam provis adipisci cumque eveniet tempore sit amet consectetur adipisicing elit.</p>
                <div className="newsletter__infoInput">
                    <input type="text" placeholder="Enter Email" />
                    <button className="newsletter__btn">Subscribe</button>
                </div>
            </div>
            <img src="https://media.timeout.com/images/105242064/630/472/image.jpg" alt="" loading="lazy"/>
        </div>
    )
}

export default NewsLetter
