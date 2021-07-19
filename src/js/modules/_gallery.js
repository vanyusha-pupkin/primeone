//=================
//Gallery

(function () {

  let gallery = document.querySelectorAll('._gallery');
  if (gallery) {
     gallery_init();
  }
  function gallery_init() {
     for (let index = 0; index < gallery.length; index++) {
        const el = gallery[index];
        lightGallery(el, {
           counter: false,
           selector: 'a',
           download: false
        });
     }
  }

})();


// ОПИСАНИЕ
/*

должен быть lightgallery.scss
в папке src\img\icons должны быть иконки
close.svg
loading.gif
p-left.svg
p-right.svg
должен быть  lightgallery.min.js

*/

//ПРИМЕР
