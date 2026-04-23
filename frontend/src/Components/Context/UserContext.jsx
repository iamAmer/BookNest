import React, { createContext, useEffect, useState } from 'react';

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserToken(token);
    }
    setIsLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{
      userToken,
      setUserToken,
      userData,
      setUserData,
      isLoading
    }}>
      {children}
    </UserContext.Provider>
  );
}