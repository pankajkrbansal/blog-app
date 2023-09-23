import {createContext, useState} from 'react';

export const UserContext = createContext({});
 
export function UserContextProvider({children}){
    const[usrDetails, setUserDetails] = useState({})
    return(
        <UserContext.Provider value={{usrDetails, setUserDetails}}>
            {children}
        </UserContext.Provider>
    )
}