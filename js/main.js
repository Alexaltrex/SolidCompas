$(function() {
    $('.header__logo').on('mouseenter', ()=>{
        $('.header__logohover').addClass('show');
    });
    $('.header__logo').on('mouseleave', ()=>{
        $('.header__logohover').removeClass('show');
    });



})