import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

/* Firebase User Authentication */

// Initialize Firebase Authentication
const auth = getAuth(app);

// User Registration
function registerUser(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            // User registered successfully
            console.log('User registered:', user);
        })
        .catch((error) => {
            // Handle registration error
            console.error('Registration error:', error);
        });
}

// User Login
const loginButton = document.getElementById('login-button');
const userName = document.getElementById('user-name');

loginButton.addEventListener('click', () => {
    const user = auth.currentUser;
    
    if (user) {
        userName.textContent = user.displayName || 'Guest';
    } else {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                userName.textContent = user.displayName || 'Guest';
            })
            .catch((error) => {
                console.error('Login error:', error);
            });
    }
});


signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });



  var firebase = require('firebase');
var firebaseui = require('firebaseui');



// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  });

