
var hamburger = document.querySelector('.page-header__burger');
var mainNav = document.querySelector('.main-nav');
var pageHeader = document.querySelector('.page-header');
var pageBody = document.querySelector('.page__body');

hamburger.addEventListener('click', function() {
  if (hamburger) {
    hamburger.classList.toggle('active');
  }

  if (mainNav) {
    mainNav.classList.toggle('main-nav--open');
  }

  if (pageHeader) {
    pageHeader.classList.toggle('page-header--active');
  }

  if (pageBody) {
    pageBody.classList.toggle('page__body--lock');
  }
});


// var mainNavLink = document.querySelectorAll('.page-header a');
// mainNavLink.forEach(function(item, i, arr) {
//   item.addEventListener('click', function(evt) {
//     evt.preventDefault();

//     if (mainNav.classList.contains('main-nav--open')) {
//       mainNav.classList.remove('main-nav--open');
//     }

//     if (hamburger.classList.contains('active')) {
//       hamburger.classList.remove('active');
//     }
//   });
// });

