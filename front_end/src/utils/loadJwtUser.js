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
        }
        catch {}
    }
    return null
};

export const destoryAppData = () =>{
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
}
 