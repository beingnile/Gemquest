// script.js

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
  navigation.classList.toggle('active');
});
