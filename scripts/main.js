// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyBBZOUs_9vD6xdBTpkgiNRJ1wRQkjEHrKU',
    authDomain: 'aggholiday-bafb9.firebaseapp.com',
    projectId: 'aggholiday-bafb9',
    storageBucket: 'aggholiday-bafb9.appspot.com',
    messagingSenderId: '518104895758',
    appId: '1:518104895758:web:c650caee27513bbaeb075f'
};

firebase.initializeApp(firebaseConfig);

// Reference to the Firestore database
const db = firebase.firestore();

function checkCode() {
    // Get the document ID from the input field
    const documentId = document.getElementById('code-input').value;

    // Reference to the document
    const docRef = db.collection('People').doc(documentId);

    docRef.get().then((doc) => {
        if (doc.exists) {
            // Document found, display presentCount
            const presentCount = doc.data().presentCount;
            alert(`Present Count: ${presentCount}`);
        } else {
            // Document not found
            alert("Invalid Code");
        }
    }).catch((error) => {
        console.error('Error:', error);
    });
}