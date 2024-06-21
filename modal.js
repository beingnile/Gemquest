// modal.js
const openBtn = document.getElementById('open-bucketlist-btn');
const closeBtn = document.getElementById('close-modal-btn');
const modal = document.getElementById('bucketlist-modal');
const form = document.getElementById('bucketlist-form');

openBtn.addEventListener('click', function() {
  modal.style.display = "block";
});

closeBtn.addEventListener('click', function() {
  modal.style.display = "none";
});

window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission behavior

  const item = document.getElementById('item').value;
  const location = document.getElementById('location').value;
  const budget = document.getElementById('budget').value;

  fetch('http://localhost:5000/api/bucketlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item, location, budget }),
  })
  .then(response => response.json())
  .then(data => {
    console.log("Server response:", data);
    const successMessage = document.createElement('p');
    successMessage.classList.add('success-message');
    successMessage.textContent = "Item added to your Bucket List!";
    form.appendChild(successMessage);
    form.reset();
    modal.style.display = "none";
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  })
  .catch(error => {
    console.error("Error adding item:", error);
  });
});