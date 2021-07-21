'use strict';

// VENDOE ===========================================================

// поддержка формата webp в css
/*!
 * modernizr v3.6.0
 * Build https://modernizr.com/download?-webp-dontmin
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in the
 * current UA and makes the results available to you in two ways: as properties on
 * a global `Modernizr` object, and as classes on the `<html>` element. This
 * information allows you to progressively enhance your pages with a granular level
 * of control over the experience.
*/

;(function(window, document, undefined){
  var tests = [];
  

  /**
   *
   * ModernizrProto is the constructor for Modernizr
   *
   * @class
   * @access public
   */

  var ModernizrProto = {
    // The current version, dummy
    _version: '3.6.0',

    // Any settings that don't work as separate modules
    // can go in here as configuration.
    _config: {
      'classPrefix': '',
      'enableClasses': true,
      'enableJSClass': true,
      'usePrefixes': true
    },

    // Queue of tests
    _q: [],

    // Stub these for people who are listening
    on: function(test, cb) {
      // I don't really think people should do this, but we can
      // safe guard it a bit.
      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
      // This is in case people listen to synchronous tests. I would leave it out,
      // but the code to *disallow* sync tests in the real version of this
      // function is actually larger than this.
      var self = this;
      setTimeout(function() {
        cb(self[test]);
      }, 0);
    },

    addTest: function(name, fn, options) {
      tests.push({name: name, fn: fn, options: options});
    },

    addAsyncTest: function(fn) {
      tests.push({name: null, fn: fn});
    }
  };

  

  // Fake some of Object.create so we can force non test results to be non "own" properties.
  var Modernizr = function() {};
  Modernizr.prototype = ModernizrProto;

  // Leak modernizr globally when you `require` it rather than force it here.
  // Overwrite name so constructor name is nicer :D
  Modernizr = new Modernizr();

  

  var classes = [];
  

  /**
   * is returns a boolean if the typeof an obj is exactly type.
   *
   * @access private
   * @function is
   * @param {*} obj - A thing we want to check the type of
   * @param {string} type - A string to compare the typeof against
   * @returns {boolean}
   */

  function is(obj, type) {
    return typeof obj === type;
  }
  ;

  /**
   * Run through all tests and detect their support in the current UA.
   *
   * @access private
   */

  function testRunner() {
    var featureNames;
    var feature;
    var aliasIdx;
    var result;
    var nameIdx;
    var featureName;
    var featureNameSplit;

    for (var featureIdx in tests) {
      if (tests.hasOwnProperty(featureIdx)) {
        featureNames = [];
        feature = tests[featureIdx];
        // run the test, throw the return value into the Modernizr,
        // then based on that boolean, define an appropriate className
        // and push it into an array of classes we'll join later.
        //
        // If there is no name, it's an 'async' test that is run,
        // but not directly added to the object. That should
        // be done with a post-run addTest call.
        if (feature.name) {
          featureNames.push(feature.name.toLowerCase());

          if (feature.options && feature.options.aliases && feature.options.aliases.length) {
            // Add all the aliases into the names list
            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
            }
          }
        }

        // Run the test, or use the raw value if it's not a function
        result = is(feature.fn, 'function') ? feature.fn() : feature.fn;


        // Set each of the names on the Modernizr object
        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
          featureName = featureNames[nameIdx];
          // Support dot properties as sub tests. We don't do checking to make sure
          // that the implied parent tests have been added. You must call them in
          // order (either in the test, or make the parent test a dependency).
          //
          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
          // hashtag famous last words
          featureNameSplit = featureName.split('.');

          if (featureNameSplit.length === 1) {
            Modernizr[featureNameSplit[0]] = result;
          } else {
            // cast to a Boolean, if not one already
            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
            }

            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
          }

          classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
        }
      }
    }
  }
  ;

  /**
   * hasOwnProp is a shim for hasOwnProperty that is needed for Safari 2.0 support
   *
   * @author kangax
   * @access private
   * @function hasOwnProp
   * @param {object} object - The object to check for a property
   * @param {string} property - The property to check for
   * @returns {boolean}
   */

  // hasOwnProperty shim by kangax needed for Safari 2.0 support
  var hasOwnProp;

  (function() {
    var _hasOwnProperty = ({}).hasOwnProperty;
    /* istanbul ignore else */
    /* we have no way of testing IE 5.5 or safari 2,
     * so just assume the else gets hit */
    if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
      hasOwnProp = function(object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function(object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }
  })();

  

  /**
   * docElement is a convenience wrapper to grab the root element of the document
   *
   * @access private
   * @returns {HTMLElement|SVGElement} The root element of the document
   */

  var docElement = document.documentElement;
  

  /**
   * A convenience helper to check if the document we are running in is an SVG document
   *
   * @access private
   * @returns {boolean}
   */

  var isSVG = docElement.nodeName.toLowerCase() === 'svg';
  

  /**
   * setClasses takes an array of class names and adds them to the root element
   *
   * @access private
   * @function setClasses
   * @param {string[]} classes - Array of class names
   */

  // Pass in an and array of class names, e.g.:
  //  ['no-webp', 'borderradius', ...]
  function setClasses(classes) {
    var className = docElement.className;
    var classPrefix = Modernizr._config.classPrefix || '';

    if (isSVG) {
      className = className.baseVal;
    }

    // Change `no-js` to `js` (independently of the `enableClasses` option)
    // Handle classPrefix on this too
    if (Modernizr._config.enableJSClass) {
      var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
      className = className.replace(reJS, '$1' + classPrefix + 'js$2');
    }

    if (Modernizr._config.enableClasses) {
      // Add the new classes
      className += ' ' + classPrefix + classes.join(' ' + classPrefix);
      if (isSVG) {
        docElement.className.baseVal = className;
      } else {
        docElement.className = className;
      }
    }

  }

  ;


   // _l tracks listeners for async tests, as well as tests that execute after the initial run
  ModernizrProto._l = {};

  /**
   * Modernizr.on is a way to listen for the completion of async tests. Being
   * asynchronous, they may not finish before your scripts run. As a result you
   * will get a possibly false negative `undefined` value.
   *
   * @memberof Modernizr
   * @name Modernizr.on
   * @access public
   * @function on
   * @param {string} feature - String name of the feature detect
   * @param {function} cb - Callback function returning a Boolean - true if feature is supported, false if not
   * @example
   *
   * ```js
   * Modernizr.on('flash', function( result ) {
   *   if (result) {
   *    // the browser has flash
   *   } else {
   *     // the browser does not have flash
   *   }
   * });
   * ```
   */

  ModernizrProto.on = function(feature, cb) {
    // Create the list of listeners if it doesn't exist
    if (!this._l[feature]) {
      this._l[feature] = [];
    }

    // Push this test on to the listener list
    this._l[feature].push(cb);

    // If it's already been resolved, trigger it on next tick
    if (Modernizr.hasOwnProperty(feature)) {
      // Next Tick
      setTimeout(function() {
        Modernizr._trigger(feature, Modernizr[feature]);
      }, 0);
    }
  };

  /**
   * _trigger is the private function used to signal test completion and run any
   * callbacks registered through [Modernizr.on](#modernizr-on)
   *
   * @memberof Modernizr
   * @name Modernizr._trigger
   * @access private
   * @function _trigger
   * @param {string} feature - string name of the feature detect
   * @param {function|boolean} [res] - A feature detection function, or the boolean =
   * result of a feature detection function
   */

  ModernizrProto._trigger = function(feature, res) {
    if (!this._l[feature]) {
      return;
    }

    var cbs = this._l[feature];

    // Force async
    setTimeout(function() {
      var i, cb;
      for (i = 0; i < cbs.length; i++) {
        cb = cbs[i];
        cb(res);
      }
    }, 0);

    // Don't trigger these again
    delete this._l[feature];
  };

  /**
   * addTest allows you to define your own feature detects that are not currently
   * included in Modernizr (under the covers it's the exact same code Modernizr
   * uses for its own [feature detections](https://github.com/Modernizr/Modernizr/tree/master/feature-detects)). Just like the offical detects, the result
   * will be added onto the Modernizr object, as well as an appropriate className set on
   * the html element when configured to do so
   *
   * @memberof Modernizr
   * @name Modernizr.addTest
   * @optionName Modernizr.addTest()
   * @optionProp addTest
   * @access public
   * @function addTest
   * @param {string|object} feature - The string name of the feature detect, or an
   * object of feature detect names and test
   * @param {function|boolean} test - Function returning true if feature is supported,
   * false if not. Otherwise a boolean representing the results of a feature detection
   * @example
   *
   * The most common way of creating your own feature detects is by calling
   * `Modernizr.addTest` with a string (preferably just lowercase, without any
   * punctuation), and a function you want executed that will return a boolean result
   *
   * ```js
   * Modernizr.addTest('itsTuesday', function() {
   *  var d = new Date();
   *  return d.getDay() === 2;
   * });
   * ```
   *
   * When the above is run, it will set Modernizr.itstuesday to `true` when it is tuesday,
   * and to `false` every other day of the week. One thing to notice is that the names of
   * feature detect functions are always lowercased when added to the Modernizr object. That
   * means that `Modernizr.itsTuesday` will not exist, but `Modernizr.itstuesday` will.
   *
   *
   *  Since we only look at the returned value from any feature detection function,
   *  you do not need to actually use a function. For simple detections, just passing
   *  in a statement that will return a boolean value works just fine.
   *
   * ```js
   * Modernizr.addTest('hasJquery', 'jQuery' in window);
   * ```
   *
   * Just like before, when the above runs `Modernizr.hasjquery` will be true if
   * jQuery has been included on the page. Not using a function saves a small amount
   * of overhead for the browser, as well as making your code much more readable.
   *
   * Finally, you also have the ability to pass in an object of feature names and
   * their tests. This is handy if you want to add multiple detections in one go.
   * The keys should always be a string, and the value can be either a boolean or
   * function that returns a boolean.
   *
   * ```js
   * var detects = {
   *  'hasjquery': 'jQuery' in window,
   *  'itstuesday': function() {
   *    var d = new Date();
   *    return d.getDay() === 2;
   *  }
   * }
   *
   * Modernizr.addTest(detects);
   * ```
   *
   * There is really no difference between the first methods and this one, it is
   * just a convenience to let you write more readable code.
   */

  function addTest(feature, test) {

    if (typeof feature == 'object') {
      for (var key in feature) {
        if (hasOwnProp(feature, key)) {
          addTest(key, feature[ key ]);
        }
      }
    } else {

      feature = feature.toLowerCase();
      var featureNameSplit = feature.split('.');
      var last = Modernizr[featureNameSplit[0]];

      // Again, we don't check for parent test existence. Get that right, though.
      if (featureNameSplit.length == 2) {
        last = last[featureNameSplit[1]];
      }

      if (typeof last != 'undefined') {
        // we're going to quit if you're trying to overwrite an existing test
        // if we were to allow it, we'd do this:
        //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
        //   docElement.className = docElement.className.replace( re, '' );
        // but, no rly, stuff 'em.
        return Modernizr;
      }

      test = typeof test == 'function' ? test() : test;

      // Set the value (this is the magic, right here).
      if (featureNameSplit.length == 1) {
        Modernizr[featureNameSplit[0]] = test;
      } else {
        // cast to a Boolean, if not one already
        if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
          Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
        }

        Modernizr[featureNameSplit[0]][featureNameSplit[1]] = test;
      }

      // Set a single class (either `feature` or `no-feature`)
      setClasses([(!!test && test != false ? '' : 'no-') + featureNameSplit.join('-')]);

      // Trigger the event
      Modernizr._trigger(feature, test);
    }

    return Modernizr; // allow chaining.
  }

  // After all the tests are run, add self to the Modernizr prototype
  Modernizr._q.push(function() {
    ModernizrProto.addTest = addTest;
  });

  

/*!
{
  "name": "Webp",
  "async": true,
  "property": "webp",
  "tags": ["image"],
  "builderAliases": ["img_webp"],
  "authors": ["Krister Kari", "@amandeep", "Rich Bradshaw", "Ryan Seddon", "Paul Irish"],
  "notes": [{
    "name": "Webp Info",
    "href": "https://developers.google.com/speed/webp/"
  }, {
    "name": "Chormium blog - Chrome 32 Beta: Animated WebP images and faster Chrome for Android touch input",
    "href": "https://blog.chromium.org/2013/11/chrome-32-beta-animated-webp-images-and.html"
  }, {
    "name": "Webp Lossless Spec",
    "href": "https://developers.google.com/speed/webp/docs/webp_lossless_bitstream_specification"
  }, {
    "name": "Article about WebP support on Android browsers",
    "href": "http://www.wope-framework.com/en/2013/06/24/webp-support-on-android-browsers/"
  }, {
    "name": "Chormium WebP announcement",
    "href": "https://blog.chromium.org/2011/11/lossless-and-transparency-encoding-in.html?m=1"
  }]
}
!*/
/* DOC
Tests for lossy, non-alpha webp support.

Tests for all forms of webp support (lossless, lossy, alpha, and animated)..

  Modernizr.webp              // Basic support (lossy)
  Modernizr.webp.lossless     // Lossless
  Modernizr.webp.alpha        // Alpha (both lossy and lossless)
  Modernizr.webp.animation    // Animated WebP

*/


  Modernizr.addAsyncTest(function() {

    var webpTests = [{
      'uri': 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=',
      'name': 'webp'
    }, {
      'uri': 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==',
      'name': 'webp.alpha'
    }, {
      'uri': 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
      'name': 'webp.animation'
    }, {
      'uri': 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=',
      'name': 'webp.lossless'
    }];

    var webp = webpTests.shift();
    function test(name, uri, cb) {

      var image = new Image();

      function addResult(event) {
        // if the event is from 'onload', check the see if the image's width is
        // 1 pixel (which indiciates support). otherwise, it fails

        var result = event && event.type === 'load' ? image.width == 1 : false;
        var baseTest = name === 'webp';

        // if it is the base test, and the result is false, just set a literal false
        // rather than use the Boolean contrsuctor
        addTest(name, (baseTest && result) ? new Boolean(result) : result);

        if (cb) {
          cb(event);
        }
      }

      image.onerror = addResult;
      image.onload = addResult;

      image.src = uri;
    }

    // test for webp support in general
    test(webp.name, webp.uri, function(e) {
      // if the webp test loaded, test everything else.
      if (e && e.type === 'load') {
        for (var i = 0; i < webpTests.length; i++) {
          test(webpTests[i].name, webpTests[i].uri);
        }
      }
    });

  });



  // Run each test
  testRunner();

  delete ModernizrProto.addTest;
  delete ModernizrProto.addAsyncTest;

  // Run the things that are supposed to run after the tests
  for (var i = 0; i < Modernizr._q.length; i++) {
    Modernizr._q[i]();
  }

  // Leak Modernizr namespace
  window.Modernizr = Modernizr;


;

})(window, document);;

//
// @include('vendor/_lightgallery.min.js' );

//
// @include('vendor/_smooth-scroll.js' );

//
// @include('vendor/_swiper.min.js' );


// MODULS ===========================================================

// модальные окна
// @include('modules/_modal.js');

// img-to-bg
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
;

// анимация блоков при скроле
// @include('modules/_animation-block-scrolling.js');

// динамический адаптив
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

// "use strict";

(function () {

  function DynamicAdapt(type) {
  	this.type = type;
  }

  DynamicAdapt.prototype.init = function () {
  	const _this = this;
  	// массив объектов
  	this.оbjects = [];
  	this.daClassname = "_dynamic_adapt_";
  	// массив DOM-элементов
  	this.nodes = document.querySelectorAll("[data-da]");

  	// наполнение оbjects объктами
  	for (let i = 0; i < this.nodes.length; i++) {
  		const node = this.nodes[i];
  		const data = node.dataset.da.trim();
  		const dataArray = data.split(",");
  		const оbject = {};
  		оbject.element = node;
  		оbject.parent = node.parentNode;
  		оbject.destination = document.querySelector(dataArray[0].trim());
  		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
  		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
  		оbject.index = this.indexInParent(оbject.parent, оbject.element);
  		this.оbjects.push(оbject);
  	}

  	this.arraySort(this.оbjects);

  	// массив уникальных медиа-запросов
  	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
  		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
  	}, this);
  	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
  		return Array.prototype.indexOf.call(self, item) === index;
  	});

  	// навешивание слушателя на медиа-запрос
  	// и вызов обработчика при первом запуске
  	for (let i = 0; i < this.mediaQueries.length; i++) {
  		const media = this.mediaQueries[i];
  		const mediaSplit = String.prototype.split.call(media, ',');
  		const matchMedia = window.matchMedia(mediaSplit[0]);
  		const mediaBreakpoint = mediaSplit[1];

  		// массив объектов с подходящим брейкпоинтом
  		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
  			return item.breakpoint === mediaBreakpoint;
  		});
  		matchMedia.addListener(function () {
  			_this.mediaHandler(matchMedia, оbjectsFilter);
  		});
  		this.mediaHandler(matchMedia, оbjectsFilter);
  	}
  };

  DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
  	if (matchMedia.matches) {
  		for (let i = 0; i < оbjects.length; i++) {
  			const оbject = оbjects[i];
  			оbject.index = this.indexInParent(оbject.parent, оbject.element);
  			this.moveTo(оbject.place, оbject.element, оbject.destination);
  		}
  	} else {
  		for (let i = 0; i < оbjects.length; i++) {
  			const оbject = оbjects[i];
  			if (оbject.element.classList.contains(this.daClassname)) {
  				this.moveBack(оbject.parent, оbject.element, оbject.index);
  			}
  		}
  	}
  };

  // Функция перемещения
  DynamicAdapt.prototype.moveTo = function (place, element, destination) {
  	element.classList.add(this.daClassname);
  	if (place === 'last' || place >= destination.children.length) {
  		destination.insertAdjacentElement('beforeend', element);
  		return;
  	}
  	if (place === 'first') {
  		destination.insertAdjacentElement('afterbegin', element);
  		return;
  	}
  	destination.children[place].insertAdjacentElement('beforebegin', element);
  }

  // Функция возврата
  DynamicAdapt.prototype.moveBack = function (parent, element, index) {
  	element.classList.remove(this.daClassname);
  	if (parent.children[index] !== undefined) {
  		parent.children[index].insertAdjacentElement('beforebegin', element);
  	} else {
  		parent.insertAdjacentElement('beforeend', element);
  	}
  }

  // Функция получения индекса внутри родителя
  DynamicAdapt.prototype.indexInParent = function (parent, element) {
  	const array = Array.prototype.slice.call(parent.children);
  	return Array.prototype.indexOf.call(array, element);
  };

  // Функция сортировки массива по breakpoint и place
  // по возрастанию для this.type = min
  // по убыванию для this.type = max
  DynamicAdapt.prototype.arraySort = function (arr) {
  	if (this.type === "min") {
  		Array.prototype.sort.call(arr, function (a, b) {
  			if (a.breakpoint === b.breakpoint) {
  				if (a.place === b.place) {
  					return 0;
  				}

  				if (a.place === "first" || b.place === "last") {
  					return -1;
  				}

  				if (a.place === "last" || b.place === "first") {
  					return 1;
  				}

  				return a.place - b.place;
  			}

  			return a.breakpoint - b.breakpoint;
  		});
  	} else {
  		Array.prototype.sort.call(arr, function (a, b) {
  			if (a.breakpoint === b.breakpoint) {
  				if (a.place === b.place) {
  					return 0;
  				}

  				if (a.place === "first" || b.place === "last") {
  					return 1;
  				}

  				if (a.place === "last" || b.place === "first") {
  					return -1;
  				}

  				return b.place - a.place;
  			}

  			return b.breakpoint - a.breakpoint;
  		});
  		return;
  	}
  };

  const da = new DynamicAdapt("max");
  da.init();


})();


// ОПИСАНИЕ
/*
# Динамический адаптив (Dynamic Adapt)
JS функция для комфортной адаптивной верстки. Позволяет "перебрасывать" объекты DOM в зависимости от потребностей.

## Применение.
Для перещаемого объекта пишем HTML атрибут - `data-da` и указываем параметры.
В javaScript создаем объект класса DynamicAdapt с параметором "min" или "max".
Тип срабатывания брейкпоинта. max - Desktop First, min - Mobile First.
Вызываем метод .init()
```js
const da = new DynamicAdapt("max");
da.init();
```
## Параметры

`data-da="куда,когда,какой"`

Название | Значение по-умолчанию | Описание
------------- | ------------- | -------------
`куда (имя класса)` | _\[обязательный\]_ | Класс блока, в который нужно будет "перебросить" текущий объект. Если класс не уникален, объек перебросится в первый элемент с этим классом.
`когда` | 767 | Брейкпоинт при котором перемещать объект.
`какой` | last | Позиция на которую нужно переместить объект внутри родителя `куда`. Кроме цифр можно указать слова `first` (в начало блока) или `last` (в конец блока)
*/

//ПРИМЕР
/*
html
<div data-da=".content__column-garden" class="content__block">Я Коля</div>
<div data-da=".content__column-garden,992" class="content__block">Я Коля</div>
<div data-da=".content__column-garden,992,2" class="content__block">Я Коля</div>
<div data-da=".content__column-garden,992,2" class="content__block">Я Коля</div>
*/
;

// табы
// @include('modules/_tabs.js');

// спойлеры
// @include('modules/_spoilers.js');

// слайдеры

//галерея
// @include('modules/_gallery.js');

//скролл
// @include('modules/_scroll.js');

// работа с элементами формы
// @include('modules/_forms.js');


//открытие закрытие выпадающего меню
//@include('modules/_main-nav.js');

//открытие закрытие выпадающего меню

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

;






