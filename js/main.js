$(function () {
    function cl(p) {
        console.log(p);
    }

    /////////////////////
    /////// ЛОГОТИП /////
    /////////////////////
    $('.header__logo').on('mouseenter', () => {
        $('.header__logohover').addClass('show');
    });
    $('.header__logo').on('mouseleave', () => {
        $('.header__logohover').removeClass('show');
    });

    /////////////////////////////////
    ////////// МЕНЮ HEADER //////////
    /////////////////////////////////
    $('.header__menu-item').on('click', function () {

        if (!$(this).hasClass('header__menu-item-selected')) {
            let indexSelect = $('.header__menu-item').index($(this));

            $('.header__menu-item').each((index, item) => {
                if (index === indexSelect) {
                    $(item).addClass('header__menu-item-selected');
                    $(item).removeClass('header__menu-item-notSelected');
                } else if ($(item).addClass('header__menu-item-selected')) {
                    $(item).removeClass('header__menu-item-selected');
                    $(item).addClass('header__menu-item-notSelected');
                }
            });
        }

        burger.toggleClass('active');
        headerMenu.toggleClass('active');
    });

    /////////////////////////
    /////// БУРГЕР МЕНЮ /////
    /////////////////////////
    let burger = $('.header__burger');
    let headerMenu = $('.header__menu');
    let body = $('body');

    burger.on('click', function () {
        burger.toggleClass('active');
        headerMenu.toggleClass('active');
        body.toggleClass('lock');
    });

    ///////////////////////////////
    ////////// JUMP-TOP ///////////
    ///////////////////////////////
    $('.jump-top').on('click', () => {
        window.scrollTo(0, 0);
        // первоначальная стилизация элементов меню
        $('.header__menu-item').each((index, item) => {
            if (index == 0) {
                $(item).addClass('header__menu-item-selected');
                $(item).removeClass('header__menu-item-notSelected');
            } else {
                $(item).removeClass('header__menu-item-selected');
                $(item).addClass('header__menu-item-notSelected');
            }
        });

    });

    $(window).on('scroll', function () {
        if (pageYOffset > 0) {
            $('.jump-top').css('display', 'block');
        } else {
            $('.jump-top').css('display', 'none');
        }
    });


    /////////////////////////////////
    ///////// СЛАЙДЕР HOME //////////
    /////////////////////////////////
    let items = document.querySelectorAll('.home__slider-item');

    for (let i = 0; i < items.length; i++) {
        items[i].style.zIndex = -(i + 1);
    }

    for (let i = 0; i < items.length; i++) {

        let inext;
        if (i < items.length - 1) {
            inext = i + 1;
        } else {
            inext = 0;
        }

        items[i].addEventListener('transitionend', (event) => {
            if (event.elapsedTime == '6') { // end of anim 1
                items[i].classList.remove('anim1');
                items[i].classList.add('anim2');
                items[inext].classList.add('anim1');
            }
            if (event.propertyName == 'opacity') { // end of anim 2
                items[i].style.zIndex = items[i].style.zIndex - items.length;
                items[i].classList.remove('anim2');
            }
        });
    }

    items[0].classList.add('anim1');

    /////////////////////////////
    /////// ЗАГОЛОВОК HOME //////
    /////////////////////////////
    let iCurr = -1;

    function titleToRight() {
        if (iCurr < $('.home__titlebox-word').length - 1) {
            iCurr++;
            $('.home__titlebox-word').eq(iCurr).animate({
                left: 0
            }, 200, titleToRight);
        }
    }
    titleToRight(-1);

    ///////////////////////////////////////////
    /////////// МЕНЮ ПОРТФОЛИО ////////////////
    ///////////////////////////////////////////
    let iActive = 0; // номер активного элемента меню и номер категории
    let itemInRow = 4; // количество item в ряду
    let menuItems = $('.portfolio__menu-item');
    let portfolioItems = $('.portfolio__items');
    let Items0 = $('.portfolio__item');
    portfolioItems.css('height', `${Math.ceil(Items0.length / 4) * 210}px`);

    menuItems.on('click', function () {
        // сворачивать меню и анимировать значок бургер
        // но, только если в соотв. диапазоне размера экрана
        if (parseInt($('.portfolio').css('width')) < 900) {
            portfolioBurger.toggleClass('active');
            portfolioMenu.toggleClass('active');
        }

        let i = menuItems.index($(this)); // номер НОВОЙ категории
       
        // изменение надписи после ПОРТФОЛИО
        let categoryTextArr = ['', '...уличные зонты', '...складское оборудование', 
        '...оборудование для уличной торговли', '...рендеринг и визуализация', 
        '...параметризация', '...двухмерное проектирование'];
        $('.portfolio__title-text span:last-child').text(categoryTextArr[i]);

        // если кликнули не по активному
        if (i !== iActive) {
            $(this).addClass('active');
            menuItems.eq(iActive).removeClass('active');

            // изменения в наборе item
            let itemsCurr = $(`.portfolio__item.category${iActive}`); // текущий набор
            let itemsNew = $(`.portfolio__item.category${i}`); // новый набор
            // изменение высоты родительского блока
            portfolioItems.animate({
                height: `${Math.ceil(itemsNew.length / itemInRow) * 210}px`
            }, 500);

            Items0.each((index, elem) => {
                let indexInCurr = itemsCurr.index($(elem)); // индекс элемента в текущем наборе
                let indexInNew = itemsNew.index($(elem)); // индекс элемента в новом наборе

                // если есть в текущем и нет в новом - скрыть
                if (indexInCurr > -1 && indexInNew == -1) {
                    $(elem).animate({
                        opacity: '0'
                    }, 500, function () {
                        $(elem).css('display', 'none');
                        $(elem).css('left', '-100%');
                    });
                }

                // если нет в текущем и есть в новом
                // спозиционировать на новое место и показать
                if (indexInCurr == -1 && indexInNew > -1) {
                    let nXNew = indexInNew % itemInRow;
                    let nYNew = Math.trunc(indexInNew / itemInRow);
                    $(elem).css('display', 'block');
                    $(elem).css('left', `calc(${nXNew * (100/itemInRow)}% + ${margin}px`);
                    $(elem).css('top', `${nYNew * 200 + (2 * (nYNew + 1) - 1) * 5}px`);
                    $(elem).css('opacity', '1')
                }

                // если есть в текущем и есть в новом
                // спозиционировать на новое место 
                if (indexInCurr > -1 && indexInNew > -1) {
                    let nXNew = indexInNew % itemInRow;
                    let nYNew = Math.trunc(indexInNew / itemInRow);
                    $(elem).css('left', `calc(${nXNew * (100/itemInRow)}% + ${margin}px`);
                    $(elem).css('top', `${nYNew * 200 + (2 * (nYNew + 1) - 1) * 5}px`);
                }
            });

            iActive = i;
        }
    });

    ///////////////////////////////////
    /////// БУРГЕР МЕНЮ ПОРТФОЛИО /////
    ///////////////////////////////////
    let portfolioBurger = $('.portfolio__burger');
    let portfolioMenu = $('.portfolio__menu');
    let portfolioMenuInner = $('.portfolio__menu-inner');


    portfolioBurger.on('click', function () {
        let portfolioMenuInnerHeight = portfolioMenuInner.css('height');
        let portfolioMenuHeight = portfolioMenu.css('height');
        portfolioBurger.toggleClass('active');
        portfolioMenu.toggleClass('active');
        let height = parseInt(portfolioMenuHeight) ? 0 : portfolioMenuInnerHeight;
        //portfolioMenu.css('height', height);
    });


    ////////////////////////////////////////
    /////////////// МОДАЛЬНОЕ ОКНО /////////
    ////////////////////////////////////////
    // открыть окно
    let id;
    let sliderNew;
    $('.portfolio__item-hover-button').on('click', function () {

        // id выбранного блока 
        id = $(this).parent().parent().attr('id').match(/\d+/g);

        $('.portfolio__modal').append('<div class="" id="modalSliderNew"></div>');
        sliderNew = $('#modalSliderNew');
        // копирование картинок в слайдер
        $(`#pms${id} img`).each((index, elem) => {
            sliderNew.append(`<img src="img/prtf/${id}/${index}.jpg" alt="">`)
        });

        if ($(`#pms${id} img`).length == 1) {
            $(`#modalSliderNew img`).addClass('only');
        }

        // если изображений несколько - создать слайдер
        if ($(`#pms${id} img`).length > 1) {
            // создать слайдер
            sliderNew.SegmentSlider({
                segments: 8, // quantity of segments, default is 8  
                lineDur: 3000, //duration of line-time animation (ms), default is 5000
                segmentDur: 500, //duration of toggle segment animation (ms), default is 2000
                linePosition: 'bottom', // position of line-time: 'bottom' or 'top', default is 'bottom'
                lineHeight: '5px', // height of line-time (px, em, rem, %), default is '5px';
                lineColor: 'red', // color of line-time, default is 'red'
                lineOpacity: 1 // opacity of line-time, default is .5
            });
        }

        body.toggleClass('lock');
        $('.portfolio__modal').animate({
            'left': '0'
        }, 400);
        $('#modalSliderNew').addClass('active');

    });
    //////////////////////////////////
    ///// модальное окно для ABOUT ///
    //////////////////////////////////
    let id_about_img;
    $('.about__achievements-item').on('click', function () {
        $this = $(this);
        id_about_img = $(this).attr('id').match(/\d+/g)[0];
        $('.portfolio__modal').append('<div class="" id="modalSliderNew"></div>');
        sliderNew = $('#modalSliderNew');
        sliderNew.append(`<img class='only' alt="">`)
        sliderNewImg = $('#modalSliderNew img');

        let promise = new Promise(function (resolve, reject) {
            $this.addClass('load');
            sliderNewImg.attr('src', `img/about/${id_about_img}.jpg`);
            sliderNewImg.on('load', function () {
                resolve();
            })
        });

        promise.then(
            function () {
                $this.removeClass('load');
                body.toggleClass('lock');
                $('.portfolio__modal').animate({
                    'left': '0'
                }, 400);
                $('#modalSliderNew').addClass('active');
            }
        )
    });

    // закрыть окно
    $('.portfolio__modal-close').on('click', function () {
        if (sliderNew) {
            sliderNew.removeClass('active');
        }

        $('.portfolio__modal').animate({
            'left': '-100%'
        }, 500, function () {
            if (sliderNew) {
                sliderNew.remove();
            }
            $('.segment-slider-wrapper-outer').remove();
            body.toggleClass('lock');
        });

    });

    ////////////////////////////////////////////////////
    /////////////// АДАПТИВНОСТЬ ///////////////////////
    ////////////////////////////////////////////////////

    function adaptive() {
        ////////////////////////////////////////////////
        ///// АДАПТИВНОСТЬ БЛОКА portfolio__items //////
        ////////////////////////////////////////////////
        // расставляет item в соответствии с шириной экрана
        // ширина блока portfolioItems
        let itemsWidth = parseInt(portfolioItems.css('width'));

        // 1120 <= window.width
        if (itemsWidth + 10 >= 1120) {
            itemInRow = 4;
            margin = 5;
        }

        // 842.5 <= window.width < 1120 
        if (itemsWidth + 10 < 1120 && itemsWidth + 10 >= 842.5) {
            itemInRow = 3;
            margin = 0.5 * (itemsWidth / itemInRow - 267.5);
        }

        // 545 <= window.width < 842.5 
        if (itemsWidth + 10 < 842.5 && itemsWidth + 10 >= 545) {
            itemInRow = 2;
            margin = 0.5 * (itemsWidth / itemInRow - 267.5);
        }

        // 545 <= window.width < 842.5 
        if (itemsWidth + 10 < 842.5 && itemsWidth + 10 >= 545) {
            itemInRow = 2;
            margin = 0.5 * (itemsWidth / itemInRow - 267.5);
        }

        // window.width < 545 
        if (itemsWidth + 10 < 545) {
            itemInRow = 1;
            margin = 0.5 * (itemsWidth / itemInRow - 267.5);
        }

        let itemsCurr = $(`.portfolio__item.category${iActive}`);
        
        portfolioItems.css('height', `${Math.ceil(itemsCurr.length / itemInRow) * 210}px`);
        $('.portfolio__item').css('max-width', `calc(${100/itemInRow}% - ${2*margin}px)`);
        $(`.portfolio__item.category${iActive}`).each((index, elem) => {
            let nX = index % itemInRow; // номер столбца
            let nY = Math.trunc(index / itemInRow); //номер ряда
            $(elem).css('left', `calc(${nX * 100/itemInRow}% + ${margin}px`);
            $(elem).css('top', `${nY * 200 + (2 * (nY + 1) - 1) * 5}px`);
        });

        /////////////////////////////////////////
        //////// АДАПТИВ БЛОКА ABOUT ////////////                   
        /////////////////////////////////////////
        let aboutDescriptionHeight = $('.about__description').innerHeight();
        let headerHeight = $('.header').innerHeight();
        let windowHeight = $(window).height();
        let otherHeight = windowHeight - headerHeight; //высота окна без header

        if (aboutDescriptionHeight > otherHeight) {
            $('.about').addClass('adaptive');
            $('.about__description').addClass('adaptive');
        } else {
            $('.about').removeClass('adaptive');
            $('.about__description').removeClass('adaptive');
        }

        /////////////////////////////////////////
        //////// АДАПТИВ БЛОКА SERVICES /////////                  
        /////////////////////////////////////////

        //let windowHeight = $(window).height();
        if ($(window).innerWidth() >= 900) {
            let servicesTitleHeight = $('.services__title').innerHeight();
            $('.services__item-img').each(function (index, elem) {
                let servicesItemTitleboxHeight = $('.services__item-titlebox').eq(index).innerHeight();
                let servicesItemTextHeight = $('.services__item-text').eq(index).innerHeight();
                let servicesItemImgHeight = (windowHeight - servicesTitleHeight - 30) / 2 - servicesItemTitleboxHeight - servicesItemTextHeight - 20;
                $(elem).css('height', servicesItemImgHeight + 'px');
            });
        }
        if ($(window).innerWidth() < 900) {
            let servicesTitleHeight = $('.services__title').innerHeight();
            $('.services__item-img').each(function (index, elem) {
                let servicesItemTitleboxHeight = $('.services__item-titlebox').eq(index).innerHeight();
                let servicesItemTextHeight = $('.services__item-text').eq(index).innerHeight();
                let servicesItemImgHeight = (windowHeight - servicesTitleHeight - 30) / 2 - servicesItemTitleboxHeight - servicesItemTextHeight - 20;
                $(elem).css('height', 'auto');
            });
        }


    }

    // блок services
    let windowHeight = $(window).height();
    let servicesTitleHeight = $('.services__title').innerHeight();
    $('.services__item-img').each(function (index, elem) {
        let servicesItemTitleboxHeight = $('.services__item-titlebox').eq(index).innerHeight();
        let servicesItemTextHeight = $('.services__item-text').eq(index).innerHeight();
        let servicesItemImgHeight = (windowHeight - servicesTitleHeight - 30) / 2 - servicesItemTitleboxHeight - servicesItemTextHeight - 20;
        $(elem).css('height', servicesItemImgHeight + 'px');
    });

    $('.services__item-img2').css('width', $('.services__item-img2').innerHeight() + 'px');


    ///////////////////////////////////////////////////
    let margin; // первоначальное значение горизотального margin у item

    // начальное позиционирование всего набора
    adaptive();

    // адаптация при резайзе
    $(window).resize(adaptive);


    ///////////////////////////////////////////////////
    //////////// ПЕРВЫЙ БЛОК SERVICES - СЛАЙДЕР////////
    ///////////////////////////////////////////////////
    let servicesItemImg = $('.services__item-img.services__item-img0 img');
    let servicesItemImgCount = 0;
    servicesItemImg.css('opacity', '0');
    servicesItemImg.eq(servicesItemImgCount).css('opacity', '1');
    setInterval(function () {
        let servicesItemImgCountNext = (servicesItemImgCount === 8) ? 0 : servicesItemImgCount + 1;
        servicesItemImg.eq(servicesItemImgCount).css('opacity', '0');
        servicesItemImg.eq(servicesItemImgCountNext).css('opacity', '1');
        servicesItemImgCount = servicesItemImgCountNext;
    }, 1000);

    ///////////////////////////////////////////////////
    //////////// ТРЕТИЙ БЛОК SERVICES /////////////////
    ///////////////////////////////////////////////////
    let xStart;
    let countStep = 0;
    let countStepNext;
    $('.services__item-img2 img').eq(countStep).css('opacity', '1')

    $('.services__item-img2').on('mouseenter', function (e) {
        $('.services__item-img2 img').css('opacity', '0')
        $('.services__item-img2 img').eq(0).css('opacity', '1')
        xStart = e.pageX;
        //cl('test')
    });

    $('.services__item-img2').on('mousemove', function (e) {
        let x = e.pageX; // текущее положение мыши
        let step = $('.services__item-img2').innerHeight() / 36;
        countStepNext = Math.floor((x - xStart) / step);
        //cl(countStep % 35)
        if (countStepNext !== countStep) {
            if (countStepNext >= 0) {
                $('.services__item-img2 img').eq(countStep % 36).css('opacity', '0');
                $('.services__item-img2 img').eq(countStepNext % 36).css('opacity', '1');

            } else {
                $('.services__item-img2 img').eq((35 + countStep) % 36).css('opacity', '0');
                $('.services__item-img2 img').eq((35 + countStepNext) % 36).css('opacity', '1');
            }
            countStep = countStepNext;
        }

    });

    ///////////////////////////////////////////////////////////////
    //////////// ЧЕТВЕРТЫЙ БЛОК SERVICES МОДАЛЬНОЕ ОКНО ///////////
    ///////////////////////////////////////////////////////////////
    $('.services__item-img3').on('click', function () {
        let $this = $(this);
        $this.addClass('load');
        $('.portfolio__modal').append('<div class="" id="modalSliderNew"></div>');
        sliderNew = $('#modalSliderNew');
        // копирование картинок в слайдер
        for (let i = 0; i < 4; i++) {
            sliderNew.append(`<img src="img/services/3/${i}.jpg" alt="">`)
        }
        let promises = [];
        for (let i = 0; i < 4; i++) {
            promises[i] = new Promise(function (resolve, reject) {
                $('#modalSliderNew img').eq(i).attr('src', `img/services/3/${i}.jpg`);
                $('#modalSliderNew img').eq(i).on('load', function () {
                    resolve();
                })
            });
        }
        let promiseAll = Promise.all([promises[0], promises[1], promises[2], promises[3]]);
        promiseAll.then(function (result) {
            $this.removeClass('load')
            sliderNew.SegmentSlider({
                segments: 8, // quantity of segments, default is 8  
                lineDur: 3000, //duration of line-time animation (ms), default is 5000
                segmentDur: 500, //duration of toggle segment animation (ms), default is 2000
                linePosition: 'bottom', // position of line-time: 'bottom' or 'top', default is 'bottom'
                lineHeight: '5px', // height of line-time (px, em, rem, %), default is '5px';
                lineColor: 'red', // color of line-time, default is 'red'
                lineOpacity: 1 // opacity of line-time, default is .5
            });

            body.toggleClass('lock');
            $('.portfolio__modal').animate({
                'left': '0'
            }, 400);
            $('#modalSliderNew').addClass('active');
        });
    });

    ///////////////////////////////////////////
    ////////////// PRICES /////////////////////
    ///////////////////////////////////////////
    // ЛЕВАЯ ПОЛОВИНА
    // первоначальное позиционирование и стилизация
    let activeNumberLeft = 0;
    $('.labels1 .label').eq(activeNumberLeft).addClass('active');
    let ball1 = $('#ball1');
    let left_initial = 5 + $('.switch1 .circle:first').offset().left;
    let top_initial = 5 + $('.switch1 .circle:first').offset().top;
    ball1.offset({
        top: top_initial,
        left: left_initial
    });
    // клик по кругу
    $('.switch1 .circle').on('click', function () {
        let i = $('.switch1 .circle').index($(this));
        $('.labels1 .label').eq(activeNumberLeft).removeClass('active');
        $('.labels1 .label').eq(i).addClass('active');
        ball1.offset({
            top: 5 + $(this).offset().top,
            left: 5 + $(this).offset().left
        });
        // на правой половине сместить на первое
        if (activeNumberRight !== 0) {
            $('.labels2 .label').eq(activeNumberRight).removeClass('active');
            $('.labels2 .label').eq(0).addClass('active');
            ball2.offset({
                top: 5 + $($('.switch2 .circle').eq(0)).offset().top,
                left: 5 + $($('.switch2 .circle').eq(0)).offset().left
            });
            activeNumberRight = 0;
        }
        activeNumberLeft = i;
        Price(activeNumberLeft, activeNumberRight);
    });
    // клик по названию
    $('.prices__items-part-left .labels1 .label').on('click', function () {
        let i = $('.prices__items-part-left .labels1 .label').index($(this));
        //alert(i)
        $('.prices__items-part-left .labels1 .label').eq(activeNumberLeft).removeClass('active');
        $('.prices__items-part-left .labels1 .label').eq(i).addClass('active');
        ball1.offset({
            top: 5 + $('.prices__items-part-left .switch1 .circle').eq(i).offset().top,
            left: 5 + $('.prices__items-part-left .switch1 .circle').eq(i).offset().left
        });
        // на правой половине сместить на первое
        if (activeNumberRight !== 0) {
            $('.labels2 .label').eq(activeNumberRight).removeClass('active');
            $('.labels2 .label').eq(0).addClass('active');
            ball2.offset({
                top: 5 + $($('.switch2 .circle').eq(0)).offset().top,
                left: 5 + $($('.switch2 .circle').eq(0)).offset().left
            });
            activeNumberRight = 0;
        }
        activeNumberLeft = i;
        Price(activeNumberLeft, activeNumberRight);
    });
    // стилизация надписей при наведении на круги
    $('.prices__items-part-left .switch1 .circle').on('mouseenter', function () {
        let i = $('.prices__items-part-left .switch1 .circle').index($(this));
        $('.prices__items-part-left .labels1 .label').eq(i).addClass('hover');
    });

    $('.prices__items-part-left .switch1 .circle').on('mouseleave', function () {
        let i = $('.prices__items-part-left .switch1 .circle').index($(this));
        $('.prices__items-part-left .labels1 .label').eq(i).removeClass('hover');
    });
    ////////////////////////////////////
    ////////// правая половина /////////
    ////////////////////////////////////
    let activeNumberRight = 0;
    $('.labels2 .label').eq(activeNumberRight).addClass('active');
    let ball2 = $('#ball2');
    ball2.offset({
        top: 5 + $('.switch2 .circle:first').offset().top,
        left: 5 + $('.switch2 .circle:first').offset().left
    });

    $('.switch2 .circle').on('click', function () {
        let i = $('.switch2 .circle').index($(this));
        $('.labels2 .label').eq(activeNumberRight).removeClass('active');
        $('.labels2 .label').eq(i).addClass('active');
        ball2.offset({
            top: 5 + $(this).offset().top,
            left: 5 + $(this).offset().left
        });
        activeNumberRight = i;
        Price(activeNumberLeft, activeNumberRight);
    });

    $('.labels2 .label').on('click', function () {
        let i = $('.labels2 .label').index($(this));
        $('.labels2 .label').eq(activeNumberRight).removeClass('active');
        $('.labels2 .label').eq(i).addClass('active');
        ball2.offset({
            top: 5 + $('.switch2 .circle').eq(i).offset().top,
            left: 5 + $('.switch2 .circle').eq(i).offset().left
        });
        activeNumberRight = i;
        Price(activeNumberLeft, activeNumberRight);
    });

    $('.switch2 .circle').on('mouseenter', function () {
        let i = $('.switch2 .circle').index($(this));
        $('.labels2 .label').eq(i).addClass('hover');
    });

    $('.switch2 .circle').on('mouseleave', function () {
        let i = $('.switch2 .circle').index($(this));
        $('.labels2 .label').eq(i).removeClass('hover');
    });

    function Price(i1, i2) {
        let value;
        switch (i1) {
            case 0: {//2D
                switch (i2) {
                    case 0: {
                        value = 600;
                        break;
                    }
                    case 1: {
                        value = 800;
                        break;
                    }
                    case 2: {
                        value = 1000;
                        break;
                    }
                    case 3: {
                        value = 1200;
                        break;
                    }
                }
                break;
            }
            case 1: {//3D
                switch (i2) {
                    case 0: {
                        value = 500;
                        break;
                    }
                    case 1: {
                        value = 650;
                        break;
                    }
                    case 2: {
                        value = 800;
                        break;
                    }
                    case 3: {
                        value = 1000;
                        break;
                    }
                }
                break;
            }
            case 2: {//RENDER
                switch (i2) {
                    case 0: {
                        value = 500;
                        break;
                    }
                    case 1: {
                        value = 600;
                        break;
                    }
                    case 2: {
                        value = 700;
                        break;
                    }
                    case 3: {
                        value = 800;
                        break;
                    }
                }
                break;
            }
            case 3: {
                switch (i2) {
                    case 0: {
                        value = 900;
                        break;
                    }
                    case 1: {
                        value = 1200;
                        break;
                    }
                    case 2: {
                        value = 1500;
                        break;
                    }
                    case 3: {
                        value = 1800;
                        break;
                    }
                }
                break;
            }
            case 4: {
                switch (i2) {
                    case 0: {
                        value = 700;
                        break;
                    }
                    case 1: {
                        value = 900;
                        break;
                    }
                    case 2: {
                        value = 1200;
                        break;
                    }
                    case 3: {
                        value = 1400;
                        break;
                    }
                }
                break;
            }
        }
        $('.final-price-value span:first').text(value);
    }

    Price(activeNumberLeft, activeNumberRight);

});