(function () {

  // для webp
  function imgToBbWebp(){
    let imgToBG=document.querySelectorAll(".img-to-bg");
    for (var i = 0; i < imgToBG.length; i++) {

      if(imgToBG[i].querySelector('source')){
        imgToBG[i].style.backgroundImage = 'url('+imgToBG[i].querySelector('source').getAttribute('srcset')+')';
      }
    }
  }

  // для остальных типов изображений
  function imgToBb(){
    let imgToBG=document.querySelectorAll(".img-to-bg");
    for (var i = 0; i < imgToBG.length; i++) {

      if(imgToBG[i].querySelector('img')){
        imgToBG[i].style.backgroundImage = 'url('+imgToBG[i].querySelector('img').getAttribute('src')+')';
      }
    }
  }

  Modernizr.on('webp', function (result) {
    if (result) {
      // если браузер поддерживает webp
      imgToBbWebp();
    }
    else {
      // если браузер не поддерживает webp
      imgToBb()
    }
  });

})();

// ОПИСАНИЕ
/*
у элемента с классом .img-to-bg
первый элемент img преобразуется в background этого элемента
а img скрывается
*/

//ПРИМЕР
/*
HTML
<div class="block">
  <div class="block__bg img-to-bg">
    <picture>
      <source type="image/webp" srcset="img/image-bg.webp">
      <img src="img/image-bg.jpg." alt="">
    </picture>
  </div>
</div>

SCSS
.img-to-bg {
  position: relative;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  img {
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    visibility: hidden;
  }
}

.block {
  position: relative;
}

.block__bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
*/
