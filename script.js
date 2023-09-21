/* Firebase configuration */

const firebaseConfig = {
    apiKey: "AIzaSyD4S8p3luYZavoni3WlL-CPT3Vktdtsx3E",
    authDomain: "projecthydroreport.firebaseapp.com",
    projectId: "projecthydroreport",
    storageBucket: "projecthydroreport.appspot.com",
    messagingSenderId: "45585808372",
    appId: "1:45585808372:web:097aecc95d12542fd5d7a1",
    measurementId: "G-PLCBLY233Z"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/* Firebase User Authentication */

// Initialize Firebase Authentication
const auth = firebase.auth();

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

/* Firebase Realtime Database */

// Initialize Firebase Realtime Database
const database = firebase.database();

// Save problem data
function saveProblem(userId, latitude, longitude, description, problemType) {
    const problemsRef = database.ref('problems');
    problemsRef.push({
        userId: userId,
        latitude: latitude,
        longitude: longitude,
        description: description,
        problemType: problemType
    });
}

/* Mapbox Integration */

mapboxgl.accessToken = 'sk.eyJ1Ijoibm90Z3lhbm4iLCJhIjoiY2xtdGZ0b3g0MDR1YjJrcGVpeXFzdnhiNCJ9.3luPvyuAm85G3e3pWftuCw';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [longitude, latitude],
    zoom: 12
});

/* Form Submission and Data Saving */

const problemForm = document.getElementById('problem-form');

problemForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const problemType = document.getElementById('problem-type').value;
    const userId = firebase.auth().currentUser.uid;
    const latitude = /* Get latitude from map click event */;
    const longitude = /* Get longitude from map click event */;
    const imageFile = document.getElementById('image').files[0];

    const storageRef = firebase.storage().ref('images/' + userId + '/' + imageFile.name);
    const uploadTask = storageRef.put(imageFile);

    uploadTask.on('state_changed', function (snapshot) {
        // Handle progress or state changes if needed
    }, function (error) {
        console.error('Image upload error:', error);
    }, function () {
        console.log('Image uploaded successfully');
        
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            saveProblem(userId, latitude, longitude, description, problemType, downloadURL);
            problemForm.reset();
        });
    });
});


/* Other's submissions */
// Reference to the Firebase Realtime Database
const database = firebase.database();

// Function to fetch and display submissions
function displaySubmissions() {
    const submissionList = document.getElementById('submission-list');

    // Reference to the 'problems' node in the database
    const problemsRef = database.ref('problems');

    // Listen for child_added event to fetch new submissions
    problemsRef.on('child_added', (snapshot) => {
        const problem = snapshot.val();
        const submissionItem = document.createElement('div');
        submissionItem.classList.add('submission-item');
        submissionItem.innerHTML = `
            <h3>Problem Type: ${problem.problemType}</h3>
            <p>Description: ${problem.description}</p>
            <!-- Add more details here as needed -->
        `;
        submissionList.appendChild(submissionItem);
    });
}

// Call the function to display submissions when the page loads
displaySubmissions();


