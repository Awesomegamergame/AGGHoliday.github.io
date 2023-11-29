function unwrapPresent() {
  const present = document.getElementById('present');
  present.classList.add('unwrapped');

  // Simulate unwrapping delay (you can replace this with an actual AJAX request to load another HTML file)
  setTimeout(() => {
    // Replace the content with another HTML file
    present.innerHTML = '<iframe src="anotherPage.html" width="100%" height="100%"></iframe>';
  }, 500);
}
