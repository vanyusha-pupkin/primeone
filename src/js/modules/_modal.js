(function () {

  const modalOpenElements = document.querySelectorAll('[data-modal]');
  const body = document.querySelector('body');
  const lockPadding = document.querySelectorAll(".lock-padding");

  let unlock = true;
  const timeout = 400;

  if (modalOpenElements.length > 0) {
    for (let index = 0; index < modalOpenElements.length; index++) {
      const modalOpenElement = modalOpenElements[index];
      modalOpenElement.addEventListener("click", function (evt) {
        evt.preventDefault();
        const modalName = modalOpenElement.dataset.modal;
        const curentModal = document.getElementById(modalName);
        const youtubeId = modalOpenElement.getAttribute('data-youtube-id');
        const video = modalOpenElement.getAttribute('data-video');
        modalOpen(curentModal, youtubeId, video);
      });
    }
  }

//перенести в modalOpen - curentModal.addEventListener
  const modalCloseIcon = document.querySelectorAll('.close-modal');
  if (modalCloseIcon.length > 0) {
    for (let index = 0; index < modalCloseIcon.length; index++) {
      const el = modalCloseIcon[index];
      el.addEventListener('click', function (evt) {
        evt.preventDefault();
        modalClose(el.closest('.modal'));
      });
    }
  }

  function modalOpen(curentModal, youtubeId = '', video = '') {
    if (curentModal && unlock) {
      const modalActive = document.querySelector('.modal.open');
      if (modalActive) {
        modalClose(modalActive, false);
      } else {
        bodyLock();
      }

      if (youtubeId != '' && youtubeId != null) {
        curentModal.querySelector('.modal__youtube').innerHTML = '<iframe src="https://www.youtube.com/embed/' + youtubeId + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
      }

      curentModal.classList.add('open');
      curentModal.addEventListener("click", function (evt) {
        if (!evt.target.closest('.modal__content')) {
          modalClose(evt.target.closest('.modal'));
        }
      });
    }
  }

  function modalClose(modalActive, doUnlock = true) {
    if (unlock) {

      let youtube = modalActive.querySelector('.modal__youtube');
      if (youtube) {
        youtube.innerHTML = '';
      }

      let video = modalActive.querySelector('video');
      if (video) {
        video.pause();
      }

      modalActive.classList.remove('open');
      if (doUnlock) {
        bodyUnLock();
      }
    }
  }

  function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.page__wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('page__body--lock');

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnLock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('page__body--lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  document.addEventListener('keydown', function (evt) {
    if (evt.which === 27) {
      const modalActive = document.querySelector('.modal.open');
      modalClose(modalActive);
    }
  });



  (function () {
    // проверяем поддержку
    if (!Element.prototype.closest) {
      // реализуем
      Element.prototype.closest = function (css) {
        var node = this;
        while (node) {
          if (node.matches(css)) return node;
          else node = node.parentElement;
        }
        return null;
      };
    }
  })();

  (function () {
    // проверяем поддержку
    if (!Element.prototype.matches) {
      // определяем свойство
      Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
  })();

})();


// ОПИСАНИЕ
/*
открытие модального окна
по клику на элемент с атибутом data-modal
для элемента с ID соответвующему значению атрибута data-modal
добавляется класс open
при наличии у элемента атрибута data-youtube-id
добавляет в модальное окно видео ролик из youtube

закрытие модального окна
- при нажетии на элемент с классом .close-modal
- при нажатии на элемент с классом .modal__content
- при нажатии на клавишу ESC
*/

//ПРИМЕР
/*
HTML
<html class="page" lang="en">
  <body class="page__body  page-body">
    <div class="page__wrapper">
      <button data-modal="modal" type="button">Открыть модальное окно</button>
      <button data-modal="modal-youtube" data-youtube-id="0_8tKUqV7cM">Открыть модальное окно с видео из youtube</button>
      <button data-modal="modal-video">Открыть модальное окно c видео</button>
    </div>

    <div id="modal" class="modal">
      <div class="modal__body">
        <div class="modal__content">
          <button class="modal__close close-modal" type="button">Закрыть</button>

        </div>
      </div>
    </div>

    <div id="modal-youtube" class="modal modal--youtube">
      <div class="modal__body">
        <div class="modal__content">
          <button class="modal__close close-modal" type="button">Закрыть</button>
          <div class="modal__youtube"></div>
        </div>  <!-- modal__content -->
      </div>  <!-- modal__body -->
    </div>  <!-- modal-youtube-->

    <div id="modal-video" class="modal modal--video">
      <div class="modal__body">
        <div class="modal__content">
          <button class="modal__close close-modal" type="button">Закрыть</button>
          <div class="modal__video">
            <video src="" controls></video>
          </div>
        </div>  <!-- modal__content -->
      </div>  <!-- modal__body -->
    </div>  <!-- modal-video -->

  </body>
</html>


SCSS
.page__body {
  &--lock {
    overflow: hidden;
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
  visibility: hidden;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.8s ease 0s;
}

.modal.open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  pointer-events: none;
}

.modal__body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 30px 10px;
}

.modal__content {
  position: relative;

  opacity: 0;
  transition: all 0.8s ease 0s;

 .modal--video &,
 .modal--youtube & {
   max-width: 780px;
   width: 100%;
   padding: 0;
   background-color: #000000;
   border-radius: 0;
 }
}

.modal.open .modal__content {
  opacity: 1;
}

.modal__close {}

.close-modal {
  position: absolute;
  top: 16px;
  right: 18px;
  width: 24px;
  height: 24px;
  font-size: 0;
  background-color: transparent;
  &::before,
  &::after{
    content: "";
    position: absolute;
    width: 22px;
    height: 1px;
    background-color: $color-blue;
  }
  &::before {
    top: 12px;
    left: 1px;
    transform: rotate(45deg);
  }
  &::after {
    top: 12px;
    left: 1px;
    transform: rotate(-45deg);
  }
  .modal--video &,
  .modal--youtube & {
    z-index: 2;
    width: 30px;
    height: 30px;
    background-color: $color-white;
    border-radius: 50%;
    &::before {
      top: 14px;
      left: 4px;
    }
    &::after {
      top: 14px;
      left: 4px;
    }
  }
}
*/
