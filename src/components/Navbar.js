import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSignedIn, selectUserData, setSignedIn, setUserData } from '../features/userSlice';
import { Avatar } from '@material-ui/core';
import { GoogleLogout } from 'react-google-login';
import '../styling/navbar.css';

const Navbar = () => {
  const [ inputValue, setInputValue ] = useState('tech');
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  const logout = (response) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
    console.log('logout');
  }

  const handleClick = () => {}

  return (
    <div className="navbar">
      <h1 className="navbar__header">BlogMania 💬</h1>
      {isSignedIn && (<div className="blog__search" >
        <input 
          className="search" 
          placeholder="Search for a blog" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" onClick={handleClick} >
          Search
        </button>
      </div>)}

      {isSignedIn ? (<div className="navbar__user__data">
          <Avatar className='user' src={userData?.imageUrl} alt={userData?.name} />
          <h1 className="signedIn">{userData?.givenName}</h1>
          <GoogleLogout 
            clientId="852311612695-39c89a9qr1jmes6sshbft659qut9ngd6.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="logout__button"
              >
                Logout 😦
                
              </button>
            )}
            onLogoutSuccess={logout}
          />
        </div>)
        :(
          <h1 className="notSignedIn">User is not available 😞</h1>
        )}
    </div>
  )
}

export default Navbar
