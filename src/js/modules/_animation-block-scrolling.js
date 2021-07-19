(function () {

  //получаем все элементы с классом _anim-items
  const animItems = document.querySelectorAll('._anim-items');

  if (animItems.length > 0) {

    window.addEventListener('scroll', animOnScroll);

    function animOnScroll(argument) {
      for (var i = 0; i < animItems.length; i++) {
        const animItem = animItems[i];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;

        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        //добавляем класс _active элименту с классом _anim-items при появлении 1/4 от его размера
        if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
          animItem.classList.add('_active');
        } else {
          //удалем класс _active если у блока есть класс _anim-again, что бы блок анатомировался  снова при прокрутке вверх
          if (animItem.classList.contains('_anim-again')) {
            animItem.classList.remove('_active');
          }
        }
      }
    }

  	//функция вычисляет на сколько объект ниже верха страницы
  	function offset(el) {
  		const rect = el.getBoundingClientRect(),
  			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  			scrollTop = window.pageXOffset || document.documentElement.scrollTop;
  		return { top: rect.top + scrollTop, left: rect.left + scrollTop}
  	}

  	//запускаем функцию animOnScroll при загрузки страницы с задержкой 0,3 yakсекунды
  	setTimeout(() => {
  		animOnScroll();
  	}, 300);
  }

})();

// ОПИСАНИЕ
/*
Добавляет класс _active для элемента у которого есть класс ._anim-items
при прокрутки страницы и появлении 1/4 от его высоты
для блока который должен анимироваться добавляем класс ._anim-show
и описываем анимации в SCSS
*/

//ПРИМЕР
/*
HTML
  <li class="list__item  item-list  _anim-items">
    <div class="item-list__body  _anim-show  _anim-show--left">
      <picture>
        <source type="image/webp" srcset=".webp">
        <img class="item-list__icon" src="" width="" height="" alt="">
      </picture>
      <h3 class="item-list__title"></h3>
      <p class="item-list__text"></p>
    </div>
  </li>

SCSS
  ._anim-show {
     opacity: 0;
     transition: all 0.8s ease 0s ;

     &--left {
      transform: translate(-120%, 0);
     }

     &--bottom {
      transform: translate( 0, 120%);
     }

      &--right {
      transform: translate( 120%, 0);
     }
  }

  ._anim-show._active,
  ._active ._anim-show {
     transform: translate(0, 0);
     opacity: 1;
  }
*/
