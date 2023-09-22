/* Firebase configuration */

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD4S8p3luYZavoni3WlL-CPT3Vktdtsx3E",
  authDomain: "projecthydroreport.firebaseapp.com",
  databaseURL: "https://projecthydroreport-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "projecthydroreport",
  storageBucket: "projecthydroreport.appspot.com",
  messagingSenderId: "45585808372",
  appId: "1:45585808372:web:097aecc95d12542fd5d7a1",
  measurementId: "G-PLCBLY233Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/* Firebase Realtime Database */

// Initialize Firebase Realtime Database
const database = getDatabase();

// Function to save problem data
function saveProblem(userId, latitude, longitude, description, problemType, downloadURL) {
  const problemsRef = database.ref('problems');

  try {
    problemsRef.push({
      userId,
      latitude,
      longitude,
      description,
      problemType,
      downloadURL
    });
  } catch (error) {
    console.error('Error saving problem data:', error);
  }
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
  const latitude = 1000.2222;
  const longitude = 1000.2222;
  const imageFile = document.getElementById('image').files[0];

  const storageRef = firebase.storage().ref('images/' + userId + '/' + imageFile.name);
  const uploadTask = storageRef.put(imageFile);

  uploadTask.on('state_changed', function (snapshot) {
    // Handle progress or state changes if needed
  }, function (error) {
    console.error('Image upload error:', error);
  }, function () {
    console.log('Image uploaded successfully');

    // Get the download URL for the image.
    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
      // Save the problem data with the download URL.
      saveProblem(userId, latitude, longitude, description, problemType, downloadURL);
    });
  });
});

/* Other's submissions */
// Reference to the Firebase Realtime Database
const database = getDatabase();

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

// Call the function
