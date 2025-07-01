import React, { useState } from 'react';
import UserContext from './UserContext';

const UserState = (props) => {
  const [user, setUser] = useState(null);

  // Get User Details (DEMO VERSION)
  const getUser = async () => {
    console.log("Getting fake user data...");
    // Instantly set a fake user object. No API call needed.
    setUser({
        _id: 'fakeUserId123',
        name: 'Dr. Shorya',
        email: 'shorya@example.com',
        role: 'customer'
    });
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
    // The redirect will be handled by the component
  }

  return (
    <UserContext.Provider value={{ user, getUser, logoutUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;