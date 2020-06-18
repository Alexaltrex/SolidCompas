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

    let menuItems = $('.portfolio__menu-item');
    let portfolioItems = $('.portfolio__items');

    let Items0 = $('.portfolio__item');

    portfolioItems.css('height', `${Math.ceil(Items0.length / 4) * 210}px`);

    console.log();

    menuItems.on('click', function () {
        // сворачивать меню и анимировать значок бурег
        // но, только если в соотв. диапазоне размера экрана
        if (parseInt($('.portfolio').css('width')) < 900) {
            portfolioBurger.toggleClass('active');
            portfolioMenu.toggleClass('active');
        }

        let i = menuItems.index($(this)); // номер НОВОЙ категории 
        if (i !== iActive) {
            $(this).addClass('active');
            menuItems.eq(iActive).removeClass('active');

            // изменения в наборе item
            let itemsCurr = $(`.portfolio__item.category${iActive}`); // текущий набор
            let itemsNew = $(`.portfolio__item.category${i}`); // новый набор
            // изменение высоты родительского блока
            portfolioItems.animate({
                height: `${Math.ceil(itemsNew.length / 4) * 210}px`
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
                    let nXNew = indexInNew % 4;
                    let nYNew = Math.trunc(indexInNew / 4);

                    $(elem).css('display', 'block');
                    $(elem).css('left', `calc(${nXNew * 25}% + 5px`);
                    $(elem).css('top', `${nYNew * 200 + (2 * (nYNew + 1) - 1) * 5}px`);
                    $(elem).css('opacity', '1')
                }

                // если есть в текущем и есть в новом
                // спозиционировать на новое место 
                if (indexInCurr > -1 && indexInNew > -1) {
                    let nXNew = indexInNew % 4;
                    let nYNew = Math.trunc(indexInNew / 4);
                    $(elem).css('left', `calc(${nXNew * 25}% + 5px`);
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
        console.log(portfolioMenuHeight);
        portfolioBurger.toggleClass('active');
        portfolioMenu.toggleClass('active');
        let height = parseInt(portfolioMenuHeight) ? 0 : portfolioMenuInnerHeight;
        //portfolioMenu.css('height', height);
    });




    ///////////////////////////////
    ////// МОДАЛЬНОЕ ОКНО /////////
    ///////////////////////////////
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
                //segmentPhase: 125, // interval of time (ms) from start inimation of a segment before start animation of next segment 
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
    //////////////////////////////
    ///// модальное окно для ABOUT
    //////////////////////////////
    let id_about_img;
    $('.about__achievements-item').on('click', function () {
        id_about_img = $(this).attr('id').match(/\d+/g)[0];
        //console.log(id_about_img);

        $('.portfolio__modal').append('<div class="" id="modalSliderNew"></div>');
        sliderNew = $('#modalSliderNew');
        sliderNew.append(`<img class='only' src="img/about/${id_about_img}.jpg" alt="">`)

        body.toggleClass('lock');
        $('.portfolio__modal').animate({
            'left': '0'
        }, 400);
        $('#modalSliderNew').addClass('active');
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

        $('.portfolio__item').css('max-width', `calc(${100/itemInRow}% - ${2*margin}px)`);
        $(`.portfolio__item.category${iActive}`).each((index, elem) => {
            let nX = index % itemInRow; // номер столбца
            let nY = Math.trunc(index / itemInRow); //номер ряда

            $(elem).css('left', `calc(${nX * 100/itemInRow}% + ${margin}px`);
            $(elem).css('top', `${nY * 200 + (2 * (nY + 1) - 1) * 5}px`);
        });

        /////////////////////////////////////////
        //////// адаптив блока ABOUT ////////////                   
        /////////////////////////////////////////
        let aboutDescriptionHeight = $('.about__description').innerHeight();
        let headerHeight = $('.header').innerHeight();
        let windowHeight = $(document).height();
        let otherHeight = windowHeight - headerHeight; //высота окна без header

        console.log(`aboutDescriptionHeight = ${aboutDescriptionHeight}`);
        console.log(`headerHeight = ${headerHeight}`);
        console.log(`windowHeight = ${windowHeight}`);
        console.log(``);

        if (aboutDescriptionHeight > otherHeight) {
            $('.about').addClass('adaptive');
            $('.about__description').addClass('adaptive');
        } else {
            $('.about').removeClass('adaptive');
            $('.about__description').removeClass('adaptive');
        }

    }

    let itemInRow; // количество item в ряду
    let margin; // первоначальное значение горизотального margin у item

    // начальное позиционирование всего набора
    adaptive();

    // адаптация при резайзе
    $(window).resize(adaptive);

    let xStart;
    let countStep = 0,
        countStepNext;
    //let x0 = $('.img-wrapper').offset().left;
    $('.img-wrapper img').eq(countStep).css('opacity', '1')

    $('.img-wrapper').on('mouseenter', function (e) {
        xStart = e.pageX;
        cl(xStart);
    });

    $('.img-wrapper').on('mousemove', function (e) {
        let x = e.pageX; // текущее положение мыши
        let step = 600 / 36;
        let countStepNext = Math.floor((x - xStart) / step);
        cl(countStep);

        if (countStepNext > 0 && countStepNext !== countStep) {
            $('.img-wrapper img').eq(countStep).css('opacity', '0');
            $('.img-wrapper img').eq(countStepNext).css('opacity', '1');
            countStep = countStepNext;
        }
        //$('.img-wrapper img').css('opacity', '0');

    });


})