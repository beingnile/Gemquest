// script.js

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
  navigation.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
  // Fetch and display featured gems on page load
  fetchFeaturedGems();

  // Add event listener for form submission
  document.getElementById('bucketlist-form').addEventListener('submit', function(event) {
      event.preventDefault();
      addNewGem();
  });

  // Add event listener for bucketlist link click
  document.getElementById('bucketlistLink').addEventListener('click', function(event) {
      event.preventDefault();
      fetchBucketlistGems();
  });

  // Add event listeners for closing modals
  document.querySelectorAll('.close-btn').forEach(function(element) {
      element.addEventListener('click', function() {
          element.closest('.modal').style.display = 'none';
      });
  });
});

function fetchFeaturedGems() {
  fetch('http://localhost:5000/api/gems') // Update with your actual API endpoint
      .then(response => response.json())
      .then(data => {
          const container = document.getElementById('featured-gems');
          container.innerHTML = ''; // Clear any existing content

          data.forEach(gem => {
              const card = document.createElement('div');
              card.className = 'card';
              card.innerHTML = `
                  <img src="${gem.imageUrl}" alt="${gem.name}">
                  <div class="featured-caption">
                      <h3 class="featured-caption-heading">${gem.name}</h3>
                      <p class="featured-caption-description">${gem.description}</p>
                  </div>
              `;
              container.appendChild(card);
          });
      })
      .catch(error => console.error('Error fetching gems:', error));
}

function addNewGem() {
  const name = document.getElementById('gem-name').value;
  const description = document.getElementById('gem-description').value;

  fetch('http://localhost:5000/api/gems', { // Update with your actual API endpoint
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
      // Optionally, refresh the featured gems list or give user feedback
      fetchFeaturedGems();
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}

function fetchBucketlistGems() {
  fetch('http://localhost:5000/api/bucketlist') // Update with your actual API endpoint
      .then(response => response.json())
      .then(data => {
          const container = document.getElementById('bucketlist-container');
          container.innerHTML = ''; // Clear any existing content

          data.forEach(gem => {
              const item = document.createElement('div');
              item.className = 'bucketlist-item';
              item.innerHTML = `
                  <h3>${gem.name}</h3>
                  <p>${gem.description}</p>
              `;
              container.appendChild(item);
          });

          // Show the modal
          document.getElementById('bucketlistModal').style.display = 'block';
      })
      .catch(error => console.error('Error fetching bucketlist gems:', error));
}
