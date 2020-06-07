$(function () {
    $('.header__logo').on('mouseenter', () => {
        $('.header__logohover').addClass('show');
    });
    $('.header__logo').on('mouseleave', () => {
        $('.header__logohover').removeClass('show');
    });


    $('.header__menu-item').on('click', function () {

        if (!$(this).hasClass('header__menu-item-selected')) {
            let indexSelect = $('.header__menu-item').index($(this));
            console.log(indexSelect);

            $('.header__menu-item').each((index, item) => {
                    if (index === indexSelect) {
                        $(item).addClass('header__menu-item-selected');
                        $(item).removeClass('header__menu-item-notSelected');
                    } else if ($(item).addClass('header__menu-item-selected')) {
                        $(item).removeClass('header__menu-item-selected');
                        $(item).addClass('header__menu-item-notSelected');
                    }
                }

            );

        }

    });

    let burger = $('.header__burger');
    let headerMenu = $('.header__menu');
    let body = $('body');


    burger.on('click', function () {
        burger.toggleClass('active');
        headerMenu.toggleClass('active');
        body.toggleClass('lock');
    });

    // СЛАЙДЕР
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

    // ЗАГОЛОВОК
    let iCurr = -1;
    function titleToRight() {
        if (iCurr < $('.home__titlebox-word').length - 1) {
            iCurr++;
            console.log(iCurr);
            $('.home__titlebox-word').eq(iCurr).animate({
                left: 0
            }, 200, titleToRight);
        }
    }
    titleToRight(-1);

    





})