$(document).ready(() => {

    $(window).scroll(() => {
        var x = $(this).scrollTop();
        if (x > 10) {
            $("#about-wrapper").children("#sidebar").css('background-position', '0' + parseInt(-x / 10) + 'px');
        }
        else {
            $("#about-wrapper").children("#sidebar").css('background-position', '0 0px');
        }
        
    });

    $(".button-svg-wrapper").click(() => {
        window.location.href = "profile/research/page_0.html";
    });
    
});