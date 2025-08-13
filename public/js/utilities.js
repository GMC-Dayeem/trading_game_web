// the redirectToSignIn function
function redirectToSignIn() {
    window.location.href = './signin.html'; 
}

// function to redirect to the registration page
function redirectToRegistration() {
    window.location.href = 'registration.html'; 
}

function logoutUser(){
    localStorage.removeItem('username');
    window.history.pushState(null, null, "loggedOut.html");
    window.location.href = 'loggedOut.html';
}
// exports the redirectToSignIn and redirectToRegistration functions
export { redirectToSignIn, redirectToRegistration, logoutUser };
