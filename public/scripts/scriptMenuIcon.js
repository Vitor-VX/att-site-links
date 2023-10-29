document.querySelector(".menu-icon").addEventListener("click", evt => {
  evt.preventDefault()

  const menuIcon = document.querySelector('.menu-icon');
  const menuPopup = document.querySelector('.menu-popup');
  const body = document.querySelector('body');

  menuIcon.classList.toggle('menu-icon--active');
  menuPopup.classList.toggle('menu-popup--active');
  body.classList.toggle('black-bg');
})