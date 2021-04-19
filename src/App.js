import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import NewsLetter from './components/NewsLetter';
import {BrowserRouter , Route, Switch} from 'react-router-dom';
import Checkout from './components/Checkout';
import Copyright from './components/Copyright';
import ProductPage from './components/ProductPage';
import ScrollToTop from './ScrollToTop';
import SearchResults from './components/SearchResults';
import Login from './components/Login';
import Register from './components/Register';
import {useDispatch} from 'react-redux';
import {auth} from './firebase';
import {login, logout} from './features/userSlice';

function App() {
  const [displayName, setDisplayName] = useState('');
  const dispatch = useDispatch();

  const validateEmail = (mail) => { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(mail)){
        if(mail.indexOf("flipkart.com", mail.length - "@flipkart.com".length) !== -1){
            return true;
        } else {
            return false;
        }
    } else {
        return null;
    }
}

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
        if(authUser) {
          dispatch(login({
            displayName : authUser.displayName,
            email : authUser.email
          }))
        } else {
            dispatch(logout())
        }
    })
}, [auth])

  return (
    <BrowserRouter>
      <ScrollToTop>
        <div className="app">
        <Switch>

          <Route exact path="/">
              <Header />
              <Home />
              <NewsLetter />
              <Copyright />
          </Route>

          <Route path="/checkout">
              <Header />
              <Checkout />
              <Copyright />
          </Route>

          <Route exact path="/login">
            <Login validateEmail={validateEmail} />
          </Route>

          <Route exact path="/register">
             <Register validateEmail={validateEmail} displayName={displayName} setDisplayName={setDisplayName} />
          </Route>

          <Route exact path="/:name">
            <Header />
            <ProductPage />
            <Copyright />
          </Route>

          <Route exact path="/search/q=:value">
            <Header />
            <SearchResults />
            <Copyright />
          </Route>

        </Switch>
        </div>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;



