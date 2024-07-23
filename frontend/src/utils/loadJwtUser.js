import store from '../redux/store';

// user actions 
import { jwtDecode } from "jwt-decode";
import setAuthToken from './setAuthToken';
import { setCurrentUser } from '../redux/actions/authActions';
import { getChats } from '../redux/actions/chatsActions';

const loadAppData = () => {

    const jwt = localStorage.getItem("jwtToken");
    // check for login token, load user data, logout if expired
    if (jwt) {  
        try {
            const decoded = jwtDecode(jwt);
            store.dispatch(setCurrentUser(decoded));
            setAuthToken(jwt);
            store.dispatch(getChats()); 
        }
        catch {
            // localStorage.removeItem("jwtToken");
        }
    }
};

export default loadAppData;