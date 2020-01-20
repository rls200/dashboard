import { Cookies } from 'react-cookie';

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    if (!user) {
        return false;
    } else {
        return true
    }
};

const isExpressIn = () => {
    const user = getLoggedInUser();
    const currentTime = Date.now() / 1000;
    if (user.expires_in < currentTime &&  currentTime < user.expires_out) {
        return 'refresh';
    } else if (user.expires_in >= currentTime) {
        return null;
    }
    return 'logout'
};

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
    const cookies = new Cookies();
    const user = cookies.get('user');
    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
};

const setSession = user => {
    let cookies = new Cookies();
    if (user) {
        user.expires_in = user.expires_in + Date.now() / 1000;
        user.expires_out = user.expires_out + Date.now() / 1000;
        cookies.set('user', user, { path: '/' })
    } else {
        cookies.remove('user', { path: '/' })
    }
};

const apiOptions = (requestType, body) => {
    const token = getLoggedInUser().token;
    if (body) {
        return {
            body: body,
            method: requestType,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            }
        }
    } else {
        return {
            method: requestType,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            }
        }
    }
};

const apiOptionsAuth = (body) => {
    return {
        body: JSON.stringify(body),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
};

export { isUserAuthenticated, getLoggedInUser, setSession, apiOptions, apiOptionsAuth, isExpressIn };
