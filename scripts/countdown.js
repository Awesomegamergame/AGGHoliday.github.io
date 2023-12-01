// Set the date and time for the countdown
const countdownDate = new Date('December 25, 2023 10:00:00 GMT-0500').getTime();

// Update the countdown every 1 second
const countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the countdown
    const countdownElement = document.getElementById('countdown');
    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // If the countdown is over, display a message
    if (distance < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = 'Merry Christmas!';
    }
}, 1000);
