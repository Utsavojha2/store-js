import React, {useState,useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {selectProduct} from '../features/productSlice';
import items from '../data';
import './SearchResults.css';
import netflix from '../net.png'

const SearchResults = () => {
    const history = useHistory();
    const [searchedResults,setSearchedResults] = useState([])
    const {value} = useParams();

    useEffect(() => {
        const filteredItems = items.filter(el => {
            return el.name.toLowerCase().includes(value.toLowerCase())
        })
        setSearchedResults(filteredItems);
    }, [value])
    
    return (
        <div className="searchResults">
           <section>
            <img src={netflix} alt="" />
            <div>
                <h2>
                    Subscribe to Netflix!
                    <span>Anytime. Anywhere!</span>
                    <span>See what's next.</span>

                </h2>
                <button>Start your free trial</button>
            </div>
           </section> 
            {searchedResults?.length ? (
            <div className="searchResults__foundItems">
                <h2>Search Results For "{value}"</h2>
                <div className="underline"></div>
                <div className={`resultsPage ${searchedResults.length > 1 ? '' : 'resultsPage__width'}`}>
                    {searchedResults.map(el => {
                        return <Results key={el.id} {...el} /> 
                    })}
                </div>
            </div>
            ) : <div className="searchResults__notFound">
                  <h2>No Match Found on "{value}"</h2>
                  <button onClick={() => history.push('/')}>Back To Home</button>
                </div>
            }
        </div>
    )
}

const Results = ({name,link,price,available}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    return (
            <div className="results">
                <img src={link} alt={name} />
                <div className="results__product">
                    <button onClick={() => {
                        dispatch(selectProduct({name,link,price,available}))
                        history.push(`/${name.toLowerCase().split(' ').join('')}`)
                    }} className="results__viewMore">{name}</button>
                    <p>${price}</p>
                </div>
            </div>
    )
}

export default SearchResults
