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

let presentCount;

const presentHeader = document.getElementById('present-header');

function checkCode() {
    const documentId = document.getElementById('code-input').value;
    console.log(documentId);

    const docRef = db.collection('People').doc(documentId);

    docRef.get().then((doc) => {
        if (doc.exists) {
            presentCount = doc.data().presentCount;

            if (presentCount == 1)
                document.getElementById('present-navigation').style.display = 'none';

            // Show the presents container when unlocking is successful
            document.getElementById('presents-container').style.display = 'block';
            document.getElementById('main-container').style.display = 'none';

            // Populate the presents list with the number of presents specified by presentCount
            const presentsList = document.getElementById('presents-list');
            presentsList.innerHTML = '';

            for (let i = 1; i <= presentCount; i++) {

                const presentData = doc.data()[`present${i - 1}`];

                if (presentData && Array.isArray(presentData)) {
                    console.log(`Present ${i - 1} Array:`, presentData);

                }

                // Create a new present element
                const presentElement = document.createElement('div');
                presentElement.className = 'christmas-gift';

                // Create an image element
                const presentImage = document.createElement('img');
                presentImage.src = "images/present.png";
                presentImage.alt = `Present ${i}`;
                presentImage.height = 200;
                presentImage.className = 'christmas-gift-image';

                // Attach a click event listener to each present image
                presentImage.addEventListener('click', function () {
                    openPresent(presentElement);
                });

                presentImage.setAttribute('data-url', presentData[1]);

                const presentIframe = document.createElement('iframe');
                presentIframe.style.display = 'none';
                presentIframe.height = 500;
                presentIframe.width = 500;
                presentIframe.src = "";

                // Append the image element to the present element
                presentElement.appendChild(presentImage);
                presentElement.appendChild(presentIframe);

                // Append the present element to the presents list
                presentsList.appendChild(presentElement);

                if (presentData[0] == true) {

                    // Create a reference to the file in Firebase Storage
                    var storageRef = firebase.storage().ref();

                    storageRef.child(presentData[1]).getDownloadURL().then(function (url) {
                        presentIframe.src = url;

                        presentImage.style.opacity = '0';
                        setTimeout(() => {
                            presentIframe.style.display = 'block';
                            presentImage.style.display = 'none';
                        }, 0); // Adjust the duration of the fade-out animation (in milliseconds)
                    })
                    .catch(function () {
                        console.error('Error either isnt christmas or something broke');
                        return;
                        // Handle the error as needed
                    });
                }
            }

            // Initially show the first present
            showPresent(0);
        } else {
            alert("Invalid Code");
        }
    }).catch((error) => {
        console.error('Error:', error);
    });
}

let currentPresentIndex = 0;

function showPresent(index) {
    presentHeader.innerHTML = 'Present ' + (index + 1);
    const presents = document.querySelectorAll('.christmas-gift');
    presents.forEach((present, i) => {
        present.style.display = i === index ? 'block' : 'none';
    });
}

function showPreviousPresent() {
    currentPresentIndex = (currentPresentIndex - 1 + presentCount) % presentCount;
    showPresent(currentPresentIndex);
}

function showNextPresent() {
    currentPresentIndex = (currentPresentIndex + 1) % presentCount;
    showPresent(currentPresentIndex);
}

function openPresent(presentElement) {
    var imageElement = presentElement.querySelector('img');
    var iframeElement = presentElement.querySelector('iframe');

    var fileUrl = imageElement.getAttribute('data-url');

    // Create a reference to the file in Firebase Storage
    var storageRef = firebase.storage().ref();

    storageRef.child(fileUrl).getDownloadURL().then(function (url) {
        iframeElement.src = url;

        // Handle the click event to make the present image fade away
        imageElement.style.opacity = '0';
        setTimeout(() => {
            iframeElement.style.display = 'block';
            imageElement.style.display = 'none';
        }, 400); // Adjust the duration of the fade-out animation (in milliseconds)



        //TODO: Add in the opened present event



    })
        .catch(function () {
            console.error('Error either isnt christmas or something broke');
            return;
            // Handle the error as needed
        });

}