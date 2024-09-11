"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var parallaxItems = document.querySelectorAll('.parallax-item');
  if (window.innerWidth >= 1160 && parallaxItems) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var elementOffset = entry.target.getBoundingClientRect().top + window.pageYOffset;
          window.addEventListener('scroll', function () {
            var scrollPosition = window.pageYOffset;
            var speed = parseFloat(entry.target.dataset.speed) || 0.2;
            var movement = (scrollPosition - elementOffset) * speed;
            if (entry.target.dataset.direction === 'up') {
              entry.target.style.transform = "translateY(".concat(movement, "px)");
            } else {
              entry.target.style.transform = "translateY(".concat(-movement, "px)");
            }
          });
        }
      });
    });
    parallaxItems.forEach(function (item) {
      return observer.observe(item);
    });
  }
});
"use strict";

function getAccordeon() {
  var faqAccordionTitle = document.querySelectorAll('.faq-accordion__title'),
    faqAccordionContent = document.querySelectorAll('.faq-accordion__content');
  faqAccordionTitle.forEach(function (item, index) {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      var context = item.nextElementSibling; // Контент аккордеона

      // Проверяем, открыт ли аккордеон
      if (context.style.maxHeight) {
        context.style.maxHeight = null; // Закрываем аккордеон
        item.classList.remove('is-open');
      } else {
        // Закрываем все другие аккордеоны
        faqAccordionContent.forEach(function (content, contentIndex) {
          if (content !== context) {
            content.style.maxHeight = null; // Закрываем все остальные
            faqAccordionTitle[contentIndex].classList.remove('is-open');
          }
        });

        // Открываем текущий аккордеон
        context.style.maxHeight = context.scrollHeight + 'px'; // Устанавливаем max-height для контента
        item.classList.add('is-open');
      }
    });
  });
}
getAccordeon();
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  function setUniformHeight(className) {
    var elements = document.querySelectorAll('.' + className);
    var maxHeight = 0;
    elements.forEach(function (element) {
      element.style.height = '';
      maxHeight = Math.max(maxHeight, element.offsetHeight);
    });
    elements.forEach(function (element) {
      element.style.height = maxHeight + 'px';
    });
  }
  window.addEventListener('load', function () {
    setUniformHeight('coaches-card__name');
  });
  window.addEventListener('resize', function () {
    setUniformHeight('coaches-card__name');
  });
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
  window.addEventListener('resize', function () {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
  });
  function adjustFontSize(selector, largeScreenMultiplier, smallScreenMultiplier) {
    var element = document.querySelector(selector);
    if (element) {
      var parentElement = element.parentElement;
      var fontSize;
      if (window.innerWidth > 768) {
        fontSize = parentElement.clientWidth * largeScreenMultiplier;
      } else {
        fontSize = parentElement.clientWidth * smallScreenMultiplier;
      }
      element.style.fontSize = fontSize + 'px';
    }
  }
  function adjustFontSizes() {
    adjustFontSize('.first-screen-main__left h1', 0.314, 0.28);
    adjustFontSize('.first-screen-main__right h2', 0.134, 0.12);
    adjustFontSize('.footer__left h2', 0.314, 0.28);
    adjustFontSize('.footer__right h2', 0.134, 0.12);
  }
  window.addEventListener('load', adjustFontSizes);
  window.addEventListener('resize', adjustFontSizes);

  // Функция для оборачивания текста в <span>
  function wrapTextNodesInSpans(element) {
    if (!element) {
      return; // Если элемента нет, выходим из функции
    }
    element.childNodes.forEach(function (node) {
      if (node.nodeType === 3) {
        // Если это текстовый узел
        var text = node.textContent;
        if (text.length > 0) {
          var wrappedText = text.split('').map(function (_char) {
            if (_char === ' ') {
              return "<span class=\"hidden-char\"> </span>";
            } else if (_char === '\n') {
              return "<span class=\"hidden-char\">\n</span>";
            } else if (_char === "\xAD") {
              return "<span class=\"hidden-char\">&shy;</span>";
            } else {
              return "<span class=\"hidden-char\">".concat(_char, "</span>");
            }
          }).join('');
          var tempElement = document.createElement('span');
          tempElement.innerHTML = wrappedText;
          node.replaceWith(tempElement);
        }
      } else if (node.nodeType === 1) {
        // Если это элемент (например, <span>)
        wrapTextNodesInSpans(node); // Рекурсивно обрабатываем дочерние элементы
      }
    });
  }

  // Выполняем оборачивание текста
  var textElement = document.querySelector('.spell-it-out');
  wrapTextNodesInSpans(textElement);

  // Устанавливаем начальное значение opacity для всех символов
  if (textElement) {
    var chars = textElement.querySelectorAll('span.hidden-char');
    if (window.innerWidth > 575) {
      // На больших экранах скрываем текст и запускаем анимацию
      gsap.set(chars, {
        opacity: 0
      });
      gsap.to(chars, {
        duration: 0.05,
        opacity: 1,
        stagger: 0.05,
        ease: "power1.out",
        scrollTrigger: {
          trigger: textElement,
          start: "top 80%",
          // Анимация начинается, когда элемент достигает 80% от верхней части экрана
          once: true // Анимация запускается только один раз
        }
      });
    }
    ;
  }
  window.addEventListener('scroll', function () {
    var header = document.querySelector('.header');
    var scrollPosition = window.scrollY || window.pageYOffset;
    if (scrollPosition > 0) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
    if (scrollPosition > 300) {
      header.classList.add('fixed-color');
    } else {
      header.classList.remove('fixed-color');
    }
  });
});
window.addEventListener('load', function () {
  // Инициализация AOS
  AOS.init({
    offset: 50,
    duration: 500,
    easing: 'ease',
    once: true,
    disable: function disable() {
      var maxWidth = 768;
      return window.innerWidth < maxWidth;
    }
  });

  // Обновление AOS, если это необходимо
  AOS.refresh();
});
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var selectors = document.querySelectorAll('input[type="tel"]');
  var im = new Inputmask('+1 (999) 999-99-99');
  selectors.forEach(function (selector) {
    var applyMask = function applyMask() {
      if (!selector.inputmask) {
        im.mask(selector);
      }
    };
    selector.addEventListener('focus', applyMask);
    selector.addEventListener('input', applyMask);
  });
  var forms = document.querySelectorAll('.wpcf7-submit');
  var messages = document.querySelectorAll('.wpcf7-response-output');
  if (forms) {
    forms.forEach(function (form) {
      form.addEventListener('click', function () {
        messages.forEach(function (message) {
          if (message.textContent === '') {
            message.classList.add('transparent-background');
            document.querySelector('.modal-form__police').style.opacity = "0";
            message.classList.remove('form-submitted');
            message.dataset.error = 'true';
            setTimeout(function () {
              if (message.dataset.error === 'true') {
                message.textContent = '';
                message.classList.remove('transparent-background');
                document.querySelector('.modal-form__police').style.opacity = "1";
              }
            }, 3000);
          }
        });
      });
      document.addEventListener('wpcf7mailsent', function (response) {
        messages.forEach(function (message) {
          var modalRight = document.querySelector('.modal-form__right');
          if (modalRight) {
            modalRight.classList.remove('position');
            message.classList.add('form-submitted');
            message.classList.remove('transparent-background');
            setTimeout(function () {
              message.classList.remove('form-submitted');
              document.querySelector('.modal-form__police').style.opacity = "1";
            }, 4000);
            message.dataset.error = 'false';
            setTimeout(function () {
              if (message.dataset.error === 'false') {
                message.textContent = '';
              }
            }, 4000);
            setTimeout(function () {
              var closeButton = document.getElementById('popup-close');
              if (closeButton) {
                closeButton.click();
              }
              modalRight.classList.add('position');
            }, 6000);
          }
        });
      });
    });
  }
});
"use strict";

function resizeCircles() {
  if (document.querySelector('.gallery-first-screen')) {
    // Вычисляем доступное пространство для кругов
    var availableHeight = window.innerHeight - (document.querySelector('h4').getBoundingClientRect().bottom - document.querySelector('h1').getBoundingClientRect().top) - parseInt(window.getComputedStyle(document.querySelector('.gallery-first-screen')).paddingTop) - parseInt(window.getComputedStyle(document.querySelector('h1')).marginBottom) - parseInt(window.getComputedStyle(document.querySelector('h4')).marginBottom) - 30;

    // Рассчитываем ширину на основе соотношения 296:510
    var circleHeight = availableHeight;
    var circleWidth = circleHeight * 296 / 510; // Соотношение 296:510

    // Устанавливаем размеры кругов
    document.querySelectorAll('.gallery-first-screen__circle').forEach(function (circle) {
      circle.style.height = "".concat(circleHeight, "px");
      circle.style.width = "".concat(circleWidth, "px");
    });
  }
}

// Инициализация при загрузке страницы
window.addEventListener('load', resizeCircles);

// Обновление размеров при изменении размеров окна
window.addEventListener('resize', resizeCircles);
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);
  var svgElement = document.querySelector('.wrapper-back__img-back1');
  var parentElement = document.querySelector('.wrapper-back');
  function initAnimation() {
    if (svgElement) {
      if (window.innerWidth >= 768) {
        gsap.to(svgElement, {
          x: function x() {
            return -parentElement.clientWidth - 400;
          },
          y: function y() {
            return parentElement.clientHeight - svgElement.clientHeight;
          },
          // opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: parentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
          }
        });
      }
    }
  }
  initAnimation();
  window.addEventListener('resize', function () {
    ScrollTrigger.getAll().forEach(function (st) {
      return st.kill();
    });
    initAnimation();
  });
});

// document.addEventListener('DOMContentLoaded', function () {
//   const imageElement = document.getElementById('dynamic-image'); // Элемент изображения
//   const wrappers = document.querySelectorAll('.grade-increase__wrapper'); // Все элементы с текстом
//   const offset = 150; // Общий отступ в пикселях для всех элементов

//   // Функция для смены изображения
//   function changeImage(itemText) {
//     let newImageSrc;

//     if (itemText === 'Olympic Sport') {
//       newImageSrc = 'http://kanata-dev.tw1.ru/wp-content/uploads/2024/08/competitive-006.jpeg';
//     } else if (itemText === '1975') {
//       newImageSrc = 'http://kanata-dev.tw1.ru/wp-content/uploads/2024/08/competitive-006.webp';
//     } else if (itemText === '2003') {
//       newImageSrc = 'http://kanata-dev.tw1.ru/wp-content/uploads/2024/08/competitive-003.webp';
//     } else if (itemText === '2016') {
//       newImageSrc = 'http://kanata-dev.tw1.ru/wp-content/uploads/2024/08/competitive-007.webp';
//     } else if (itemText === '2024') {
//       newImageSrc = 'http://kanata-dev.tw1.ru/wp-content/uploads/2024/08/recreational-01.webp';
//     }

//     // Меняем изображение
//     if (newImageSrc) {
//       imageElement.src = newImageSrc;
//     }
//   }

//   // Функция для проверки смещения элемента
//   function checkOffsetAndChangeImage(targetElement) {
//     const rect = targetElement.getBoundingClientRect();
//     if (rect.top <= (window.innerHeight - offset)) {
//       // Элемент прокручен на 150 пикселей внутрь видимой области
//       const itemElement = targetElement.querySelector('.grade-increase__item');
//       if (itemElement) {
//         const itemText = itemElement.textContent.trim();
//         changeImage(itemText); // Меняем изображение
//       }
//     }
//   }

//   // Настройка MutationObserver
//   const observer = new MutationObserver((mutationsList) => {
//     mutationsList.forEach((mutation) => {
//       if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
//         const targetElement = mutation.target;
//         if (targetElement.classList.contains('aos-animate')) {
//           // Проверяем смещение элемента при добавлении класса aos-animate
//           checkOffsetAndChangeImage(targetElement);

//           // Добавляем событие прокрутки для более точной проверки смещения
//           window.addEventListener('scroll', function onScroll() {
//             checkOffsetAndChangeImage(targetElement);
//           });
//         }
//       }
//     });
//   });

//   // Наблюдаем за изменением класса для каждого элемента
//   wrappers.forEach((wrapper) => {
//     observer.observe(wrapper, { attributes: true }); // Отслеживаем изменения атрибутов
//   });
// });

//ВКЛЮЧИТЬ!

document.addEventListener('DOMContentLoaded', function () {
  var imageElement = document.getElementById('dynamic-image');
  var wrappers = document.querySelectorAll('.grade-increase__wrapper');
  var offset = 150;
  var dynamicImages = acfData.dynamicImages;
  if (!imageElement || !dynamicImages || dynamicImages.length === 0) {
    return;
  }
  if (dynamicImages[0]['grade-increase_dynamic_images']) {
    imageElement.src = dynamicImages[0]['grade-increase_dynamic_images'];
    imageElement.classList.add('grade-increase__img-1');
  }
  function changeImageByIndex(index) {
    if (dynamicImages[index] && dynamicImages[index]['grade-increase_dynamic_images']) {
      var newImageSrc = dynamicImages[index]['grade-increase_dynamic_images'];
      imageElement.src = newImageSrc;
      imageElement.className = "grade-increase__img-".concat(index + 1);
    }
  }
  function checkOffsetAndChangeImage(targetElement, index) {
    var rect = targetElement.getBoundingClientRect();
    if (rect.top <= window.innerHeight - offset) {
      changeImageByIndex(index);
    }
  }
  var observer = new MutationObserver(function (mutationsList) {
    mutationsList.forEach(function (mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        var targetElement = mutation.target;
        if (targetElement.classList.contains('aos-animate')) {
          var index = Array.from(wrappers).indexOf(targetElement);
          if (index > 0) {
            checkOffsetAndChangeImage(targetElement, index);
          }
          window.addEventListener('scroll', function onScroll() {
            checkOffsetAndChangeImage(targetElement, index);
          });
        }
      }
    });
  });
  if (wrappers.length > 0) {
    wrappers.forEach(function (wrapper, index) {
      observer.observe(wrapper, {
        attributes: true
      });
    });
  }
});
function setEqualHeight() {
  var left = document.querySelector('.modal-form__left');
  var right = document.querySelector('.modal-form__right');
  if (left && right) {
    left.style.height = "".concat(right.offsetHeight, "px");
  }
}

// Устанавливаем высоту при открытии модального окна
document.addEventListener('click', function (event) {
  if (event.target.closest('.open-modal')) {
    setTimeout(setEqualHeight, 10); // Устанавливаем высоту с задержкой после открытия модального окна
  }
});
window.addEventListener('resize', setEqualHeight);
"use strict";

if (document.getElementById('map')) {
  // Определяем начальный центр и масштаб карты
  var initialCenter = [45.2848, -75.8690];
  var initialZoom = 15;

  // Проверяем ширину окна и устанавливаем масштаб в зависимости от устройства
  if (window.innerWidth <= 768) {
    // Ширина экрана для мобильных устройств
    initialZoom = 14; // Уменьшаем масштаб для отображения обеих локаций
    initialCenter = [45.285, -75.869]; // Изменяем центр, чтобы обе локации были видны
  }
  var map = L.map('map', {
    attributionControl: false
  }).setView(initialCenter, initialZoom);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 17
  }).addTo(map);
  var icon = L.divIcon({
    html: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"45\" height=\"45\" viewBox=\"0 0 45 45\" fill=\"none\">\n                  <path d=\"M22.5 2.8125C18.3989 2.81715 14.467 4.44839 11.5671 7.34833C8.66713 10.2483 7.0359 14.1801 7.03125 18.2812C7.03125 31.5176 21.0938 41.5143 21.6932 41.9326C21.9296 42.0983 22.2113 42.1871 22.5 42.1871C22.7887 42.1871 23.0704 42.0983 23.3068 41.9326C23.9062 41.5143 37.9688 31.5176 37.9688 18.2812C37.9641 14.1801 36.3329 10.2483 33.4329 7.34833C30.533 4.44839 26.6011 2.81715 22.5 2.8125ZM22.5 12.6562C23.6125 12.6562 24.7001 12.9862 25.6251 13.6042C26.5501 14.2223 27.2711 15.1008 27.6968 16.1287C28.1226 17.1565 28.234 18.2875 28.0169 19.3786C27.7999 20.4698 27.2641 21.4721 26.4775 22.2587C25.6908 23.0454 24.6885 23.5811 23.5974 23.7982C22.5062 24.0152 21.3752 23.9038 20.3474 23.4781C19.3196 23.0523 18.4411 22.3314 17.823 21.4063C17.2049 20.4813 16.875 19.3938 16.875 18.2812C16.875 16.7894 17.4676 15.3587 18.5225 14.3038C19.5774 13.2489 21.0082 12.6562 22.5 12.6562Z\" fill=\"#DE0101\"/>\n              </svg>",
    className: '',
    iconSize: [45, 45],
    iconAnchor: [22.5, 45]
  });

  // Добавляем маркеры на карту
  L.marker([45.284458223393564, -75.87707739230663], {
    icon: icon
  }).addTo(map).bindPopup("63 Bluegrass Dr, Kanata, ON K2M 1G2");
  L.marker([45.28523584551923, -75.86119990287992], {
    icon: icon
  }).addTo(map).bindPopup("355 Michael Cowpland Drive, Kanata, ON K2M");
}
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector("header");
  var headerlist = document.querySelector(".header-list");
  var burgerButton = document.querySelector(".menu-burger");
  var menuLinks = document.querySelectorAll(".header-list__link");
  var target = document.getElementById('location'); // Ищем элемент по ID

  if (burgerButton && headerlist) {
    burgerButton.addEventListener("click", function () {
      burgerButton.classList.toggle("active");
      headerlist.classList.toggle("active");
      document.body.classList.toggle("disable-scroll-menu");
      document.querySelector(".header-menu-logo").classList.toggle("light-mode");
    });
  }

  // Обработка кликов по ссылкам в меню
  menuLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      var href = this.getAttribute("href");

      // Проверяем, что мы на главной странице и ссылка ведет на якорь
      if (window.location.pathname === '/' && href.startsWith("/#")) {
        if (target) {
          // Проверяем, существует ли цель
          // Закрываем меню
          burgerButton.classList.remove("active");
          headerlist.classList.remove("active");
          document.body.classList.remove("disable-scroll-menu");
          document.querySelector(".header-menu-logo").classList.remove("light-mode");

          // Удаляем хеш из адресной строки после скроллинга
          window.history.pushState("", document.title, window.location.pathname);
        }
      }
    });
  });
});
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var body = document.querySelector('body');
  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  document.body.appendChild(overlay);
  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  // Открытие модального окна с делегированием событий
  document.addEventListener('click', function (event) {
    if (event.target.closest('.open-modal')) {
      event.preventDefault();
      var modalTarget = event.target.closest('.open-modal').getAttribute('data-modal-target');
      var modal = document.querySelector(modalTarget);
      var scrollbarWidth = getScrollbarWidth();
      if (modal) {
        document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
        body.classList.add('modal-open');
        overlay.classList.add('active');
        modal.classList.add('active');
      }
    }

    // Закрытие модального окна
    if (event.target.closest('.close') || event.target === overlay) {
      var activeModals = document.querySelectorAll('.modal.active');
      activeModals.forEach(function (modal) {
        modal.classList.remove('active');
      });
      overlay.classList.remove('active');
      body.classList.remove('modal-open');
    }
  });
});
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var element = document.querySelector(".wrapper-border__item");
  if (!element) {
    return; // Если элемент не найден, просто выходим из функции
  }
  var lastScrollY = window.scrollY;
  var initialTop;
  var currentTop;
  var currentSize = {
    width: 0,
    height: 0
  };
  var startOffset = 50; // Смещение для раннего начала анимации

  function updateSizes() {
    if (window.matchMedia("(max-width: 768px)").matches) {
      currentSize = {
        width: 880,
        height: 880
      };
      initialTop = 50; // Начальное значение top для маленьких экранов
    } else if (window.matchMedia("(max-width: 1160px)").matches) {
      currentSize = {
        width: 2000,
        height: 2000
      };
      initialTop = 80; // Начальное значение top для средних экранов
    } else {
      currentSize = {
        width: 2700,
        height: 2700
      };
      initialTop = 100; // Начальное значение top для больших экранов
    }
    currentTop = initialTop; // Устанавливаем currentTop в начальное значение

    element.style.width = "".concat(currentSize.width, "px");
    element.style.height = "".concat(currentSize.height, "px");
    element.style.top = "".concat(currentTop, "px");
  }
  updateSizes();
  function handleScroll() {
    var currentScrollY = window.scrollY;
    var scrollDelta = lastScrollY - currentScrollY; // Вычисляем разницу прокрутки

    // Уменьшаем scrollDelta на startOffset для раннего начала анимации
    if (currentScrollY + startOffset < lastScrollY) {
      scrollDelta += startOffset;
    }

    // Обновляем currentTop пропорционально скроллу, плавное изменение
    currentTop += scrollDelta * 0.1; // Уменьшаем или увеличиваем top на 10% от величины прокрутки

    // Ограничиваем currentTop в пределах от 0 до initialTop
    currentTop = Math.min(initialTop, Math.max(0, currentTop));
    element.style.top = "".concat(currentTop, "px");
    lastScrollY = currentScrollY;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    });
  });
  observer.observe(element);
  window.addEventListener('resize', updateSizes);
});
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('.programs-tabs-nav__item');
  var contents = document.querySelectorAll('.programs-tabs-content__item');

  // Проверяем, существуют ли элементы табов и контента
  if (tabs.length === 0 || contents.length === 0) {
    return; // Если элементов нет, прекращаем выполнение скрипта
  }
  // Функция для переключения вкладок
  function activateTab(tabId) {
    // Убираем активный класс у всех вкладок
    tabs.forEach(function (item) {
      return item.classList.remove('active');
    });

    // Скрываем все содержимое
    contents.forEach(function (content) {
      return content.classList.remove('active');
    });

    // Находим и активируем нужные вкладку и содержимое
    var activeTab = document.querySelector(".programs-tabs-nav__item[data-tab=\"".concat(tabId, "\"]"));
    var contentToShow = document.getElementById(tabId);
    if (activeTab && contentToShow) {
      activeTab.classList.add('active');
      contentToShow.classList.add('active');

      // Прокручиваем активный таб в видимую область
      activeTab.scrollIntoView({
        behavior: 'smooth',
        // плавная прокрутка
        block: 'nearest',
        // прокручиваем к ближайшему краю видимой области
        inline: 'center' // горизонтальная прокрутка к центру экрана
      });
    }
  }

  // Обработка кликов по вкладкам
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var tabId = tab.getAttribute('data-tab');
      activateTab(tabId);
    });
  });

  // Если есть якорь в URL при загрузке страницы
  var currentHash = window.location.hash.substring(1);
  if (currentHash) {
    // Очищаем якорь, чтобы избежать скроллинга
    history.replaceState(null, null, ' '); // убирает якорь из URL
    activateTab(currentHash);
  } else {
    // Активируем первую вкладку по умолчанию, если нет якоря
    var firstTab = tabs[0].getAttribute('data-tab');
    activateTab(firstTab);
  }
});