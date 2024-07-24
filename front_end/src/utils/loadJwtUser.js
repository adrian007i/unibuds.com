// user actions 
import { jwtDecode } from 'jwt-decode';
import setAuthToken from './setAuthToken';  

export const loadAppData = (jwt) => {  

    // check for login token, load user data, logout if expired
    if (jwt) {   
        try { 
            setAuthToken(jwt); 
            localStorage.setItem('jwtToken', jwt);
            return jwtDecode(jwt);

            // fetch chats from the database
            // store.dispatch(getChats()); 
        }
        catch(errors) { 
            console.log(errors);
            // localStorage.removeItem("jwtToken");
        }
    }
    return null
};

export const destoryAppData = () =>{
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
}
 