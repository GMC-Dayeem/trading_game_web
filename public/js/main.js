import { redirectToSignIn } from './utilities.js';
import { redirectToRegistration } from './utilities.js';
import { logoutUser } from './utilities.js';
// import { register } from '../../controllers/userController.mjs';


document.addEventListener('DOMContentLoaded', () => {
    const signInButton = document.getElementById('signInButton');
    if (signInButton) {
        signInButton.addEventListener('click', redirectToSignIn);
    } else {
        console.error('Sign In button not found');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const registrationButton = document.getElementById('registrationButton');
    
    if (registrationButton) {
        registrationButton.addEventListener('click', redirectToRegistration);
    } else {
        console.error('Registration button not found');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const logout = document.getElementById('logoutButton');
    if (logout) {
        logout.addEventListener('click', logoutUser);
    } else {
        console.error('Logout error');
    }
});
