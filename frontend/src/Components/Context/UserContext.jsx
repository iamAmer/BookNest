import React, { createContext, useState } from 'react'


export let UserContext = createContext();

export default function UserContextProvider({children}) {
    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null);
    
  return <UserContext.Provider value={{userToken, setUserToken, userData, setUserData}}>
    {children}
  </UserContext.Provider>
}
