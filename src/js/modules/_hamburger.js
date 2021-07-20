
var hamburger = document.querySelector('.header__burger');
var mobileMenu = document.querySelector('.header__mobile-menu');
var pageHeader = document.querySelector('.header');
var pageBody = document.querySelector('.page__body');


if (hamburger) {
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    if (mobileMenu) {
      mobileMenu.classList.toggle('header__mobile-menu--open');
    }

    // if (pageHeader) {
    //   pageHeader.classList.toggle('page-header--active');
    // }

    if (pageBody) {
      pageBody.classList.toggle('page__body--lock');
    }
  });
}

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

