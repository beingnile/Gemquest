const openBtn = document.getElementById('open-bucketlist-btn');
const closeBtn = document.getElementById('close-modal-btn');
const modal = document.getElementById('bucketlist-modal');
const form = document.getElementById('bucketlist-form');

// Open the modal when the button is clicked
openBtn.addEventListener('click', function() {
  modal.style.display = "block";
});

// Close the modal when the close button or clicking outside the modal content is clicked
closeBtn.addEventListener('click', function() {
  modal.style.display = "none";
});

window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Handle form submission
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Get form data
  const item = document.getElementById('item').value;
  const location = document.getElementById('location').value;
  const budget = document.getElementById('budget').value; // Assuming numeric budget

  // Process data (e.g., log to console, send to server)
  console.log("Bucket List Item:", item);
  console.log("Location:", location);
  console.log("Estimated Budget:", budget);

  // Option 1: Display a success message within the modal
  const successMessage = document.createElement('p');
  successMessage.classList.add('success-message');
  successMessage.textContent = "Item added to your Bucket List!";
  form.appendChild(successMessage);

  // Option 2: Perform further actions (e.g., send data to server)
  // You can replace this with your specific implementation
  // Here's an example using a simulated fetch request (replace with your backend logic)
  fetch('/add-bucketlist-item', {
    method: 'POST',
    body: JSON.stringify({ item, location, budget }),
  })
  .then(response => response.json())
  .then(data => {
    console.log("Server response:", data);
  })
  .catch(error => {
    console.error("Error adding item:", error);
  });

  // Optionally, clear the form after submission
  form.reset();

  // Close the modal after successful submission (optional)
  modal.style.display = "none";

  // Remove success message after a few seconds (optional)
  setTimeout(() => {
    successMessage.remove();
  }, 3000); // Adjust timeout as needed
});
