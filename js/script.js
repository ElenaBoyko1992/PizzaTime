//настройки gulp======================================
function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
};

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

//функция определения мобильного устройства===================
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
                isMobile.Android()
                || isMobile.BlackBerry()
                || isMobile.iOS()
                || isMobile.Opera()
                || isMobile.Windows()
                );
    }
};

/*Табы меню=================================================*/ 
let tabsItems = document.querySelectorAll('._tabs-item');
let tabsBlocks = document.querySelectorAll('._tabs-block');
let pageMenu = document.querySelector('.page__menu');
if (!isMobile.any()) {
  for (let index = 0; index < tabsItems.length; index++) {
    let tabsItem = tabsItems[index];
    let tabsBlock = tabsBlocks[index];
    tabsItem.addEventListener("click", function () {
      for (let index = 0; index < tabsItems.length; index++) {
        let tabsItemRemove = tabsItems[index];
        let tabsBlockRemove = tabsBlocks[index];
        if (tabsItemRemove.classList.contains('_active')) {
          tabsItemRemove.classList.remove('_active');
          tabsBlockRemove.classList.remove('_active');
        };
      };
      tabsItem.classList.add('_active');
      tabsBlock.classList.add('_active');
    });
  };
} else {
  pageMenu.classList.add('_padding-for-mobile-version');
  for (let index = 0; index < tabsItems.length; index++) {
    let tabsItem = tabsItems[index];
    let tabsBlock = tabsBlocks[index];
    tabsItem.classList.add('_grey-colour'); //если просмотр с моб. устройства, цвет текста табов чуть темнее
    if (tabsItem.classList.contains('_active')) {
      tabsItem.classList.remove('_active');
      tabsBlock.classList.remove('_active');
    };
    tabsItem.addEventListener("click", function () {
      for (let index = 0; index < tabsItems.length; index++) {
        let tabsItemRemove = tabsItems[index];
        let tabsBlockRemove = tabsBlocks[index];
        if (tabsItemRemove.classList.contains('_active')) {
          tabsItemRemove.classList.remove('_active');
          tabsBlockRemove.classList.remove('_active');
          if (tabsItemRemove == tabsItem) {
            return;
          };
        };
      };
      tabsItem.classList.add('_active');
      tabsBlock.classList.add('_active');
    });
  };
}

/*Табы размер-цена=================================================*/ 
let itemMenu = document.querySelectorAll('.item-menu');
for (let index = 0; index < itemMenu.length; index++) {
  let tabsSize = itemMenu[index].querySelectorAll('._tabs-size');
  let tabsPrice = itemMenu[index].querySelectorAll('._tabs-price');
  for (let index = 0; index < tabsSize.length; index++) {
    let tabsItem = tabsSize[index];
    let tabsBlock = tabsPrice[index];
    tabsItem.addEventListener("click", function () {
      for (let index = 0; index < tabsSize.length; index++) {
        let tabsItemRemove = tabsSize[index];
        let tabsBlockRemove = tabsPrice[index];
        if (tabsItemRemove.classList.contains('_active')) {
          tabsItemRemove.classList.remove('_active');
          tabsBlockRemove.classList.remove('_active');
        };
      };
      tabsItem.classList.add('_active');
      tabsBlock.classList.add('_active');
    });
  };
};

//Бургер=============================================
let burgerLines = document.querySelector('.column-right__burger');
let headerBurger = document.querySelector('.header__burger'); 
let burgerItems = document.querySelectorAll('.burger-body__item');
let blockHeader = document.querySelector('.block-header');
burgerLines.addEventListener("click", function (e) {
  burgerLines.classList.toggle('_active');
  headerBurger.classList.toggle('_active');
  blockHeader.classList.toggle('_active');
  for (let index = 0; index < burgerItems.length; index++) { // при нажатии на якорные ссылки происходит закрытие меню (+ переход по ссылке) 
    burgerItems[index].addEventListener("click", function () {
      burgerLines.classList.remove('_active');
      headerBurger.classList.remove('_active');
      blockHeader.classList.remove('_active');
    })
  }
});

//открытие/закрытие попапа формы заказа + трансляция картинки, названия, цены и размера в попап формы заказа================================
let buttonItemMenuOrder = document.querySelectorAll('.item-menu__order');
let fillFormPopUp = document.querySelector('.fill-form');
let itemMenuName = document.querySelectorAll('.item-menu__name');
let itemMenuImg = document.querySelectorAll('.item-menu__img');
let itemMenuPrices = document.querySelectorAll('.item-menu__prices');
let itemMenuSize = document.querySelectorAll('.item-menu__size');

for (let index = 0; index < buttonItemMenuOrder.length; index++) {
  buttonItemMenuOrder[index].addEventListener("click", function () {
    //открытие попапа
    fillFormPopUp.classList.add('_active');

    //вставка картинки
    let miniCardImg = document.querySelector('.mini-card__img');
    let itemMenuImgInner = itemMenuImg[index].innerHTML;
    miniCardImg.innerHTML = itemMenuImgInner;

    //вставка названия
    let miniCardName = document.querySelector('.mini-card__name');
    let itemMenuNameInner = itemMenuName[index].innerHTML;
    miniCardName.innerHTML = itemMenuNameInner;

    //вставка цены
    let itemMenuPrice = itemMenuPrices[index].querySelectorAll('.item-menu__price');
    let actualPrice;
    for (let i = 0; i < itemMenuPrice.length; i++) {
      if (itemMenuPrice[i].classList.contains('_active')) {
        actualPrice = itemMenuPrice[i]; 
      }
    }
    let miniCardPrice = document.querySelector('.mini-card__price');
    let itemMenuPriceInner = actualPrice.innerHTML;
    miniCardPrice.innerHTML = itemMenuPriceInner;

    //вставка размера
    let itemMenuSizeItem = itemMenuSize[index].querySelectorAll('.item-menu__size-item');
    let actualSize;
    for (let i = 0; i < itemMenuSizeItem.length; i++) {
      if (itemMenuSizeItem[i].classList.contains('_active')) {
        actualSize = itemMenuSizeItem[i];
      }
    }
    let miniCardSize = document.querySelector('.mini-card__size');
    let itemMenuSizeInner = actualSize.innerHTML;
    miniCardSize.innerHTML = itemMenuSizeInner;

    //закрытие попапа
    let fillFormCloseClick = document.querySelector('.fill-form__close-click');
    let fillFormClose = document.querySelector('.fill-form__close');
    fillFormCloseClick.addEventListener("click", function () {
      fillFormPopUp.classList.remove('_active');
    })
    fillFormClose.addEventListener("click", function () {
      fillFormPopUp.classList.remove('_active');
    })
  })
}


//открытие/закрытие попапа "успешно отправлено"===================================================================
let fillFormButton = document.querySelector('.fill-form__information_button');
let orderSent = document.querySelector('.order-sent');
let orderSentCloseClick = document.querySelector('.order-sent__close-click');
let orderSentClose = document.querySelector('.order-sent__close') 
    //открытие попапа
fillFormButton.addEventListener("click", function () {
  fillFormPopUp.classList.remove('_active');
  orderSent.classList.add('_active');
})
   //закрытие попапа
orderSentCloseClick.addEventListener("click", function () {
  orderSent.classList.remove('_active');
})
orderSentClose.addEventListener("click", function () {
  orderSent.classList.remove('_active');
})

//подключение Яндекс карты + стилизация метки на карте =====================================================================
function init() {
  let map = new ymaps.Map('map', {
    center: [55.79488706895801,37.71281149999993], //координаты ищи на "https://yandex.ru/map-constructor/location-tool/"
    zoom: 16
  });

  let placemark = new ymaps.Placemark([55.79488706895801,37.71281149999993], {}, { //создаем метку на карте
    iconLayout: 'default#image', //сообщаем карте, что в качестве метки будем использовать свою картинку
    iconImageHref: '../img/contacts-block/label_map.png',
    iconImageSize: [61, 65],
    iconImageOffset: [-30, -60], // отступ от центра
  });
  map.geoObjects.add(placemark); //добавляем метку на карту
}

ymaps.ready(init); //функция будет вызвана только после загрузки скрипта я.карт

