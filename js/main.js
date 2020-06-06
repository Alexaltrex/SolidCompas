$(function () {
    $('.header__logo').on('mouseenter', () => {
        $('.header__logohover').addClass('show');
    });
    $('.header__logo').on('mouseleave', () => {
        $('.header__logohover').removeClass('show');
    });

    
    $('.header__menu-item').on('click', function () {

        if ( !$(this).hasClass('header__menu-item-selected') ) {
            let indexSelect = $('.header__menu-item').index($(this));
            console.log(indexSelect);

            $('.header__menu-item').each((index, item) => {
                    if (index === indexSelect) {
                        $(item).addClass('header__menu-item-selected');
                        $(item).removeClass('header__menu-item-notSelected');
                    } else if ($(item).addClass('header__menu-item-selected') ) {
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


    burger.on('click', function(){
        burger.toggleClass('active');
        headerMenu.toggleClass('active');
        body.toggleClass('lock');
    })



})