$(document).ready(() => {

    const first_page = 0;
    const last_page = $("#profile-wrapper").data("pages") - 1;
    
    const n_articles = last_page === 0 ?
        document.querySelectorAll('div[id^="article-"]').length :
        $("#profile-wrapper").data("max-articles");

    $("#navigation").children("a").hover(
        () => {
            $(this).children("svg").removeClass("fa-3x").addClass("fa-4x");
        },
        () => {
            $(this).children("svg").removeClass("fa-4x").addClass("fa-3x");
        }
    );

    const page = parseInt($("#profile-wrapper").children(".inner").prop("id").split("-")[1]);

    //for (let i = 0; i < n_articles; i++) {
    //    $("#article-"+i).click( function() {
    //        let item = n_articles * page + i;
    //        window.location.href = "../research/item"+item+".html";
    //    });
    //}
    
    if (page == first_page) {
        if ( $("#navigation").children("#nav-a-right").hasClass("disabled")) {
            $("#navigation").children("#nav-a-right").removeClass("disabled");
        }
        $("#navigation").children("#nav-a-left").addClass("disabled");
        if (first_page == last_page) {
            $("#navigation").children("#nav-a-right").addClass("disabled");
        } else {
            let url_page_post = "page_"+(page+1).toString()+".html";
            $("#navigation").children("#nav-a-right").attr('href',url_page_post);
        }
    } else if (page > first_page && page < last_page) {
        if ( $("#navigation").children("#nav-a-left").hasClass("disabled")) {
            $("#navigation").children("#nav-a-left").removeClass("disabled");
        }
        if ( $("#navigation").children("#nav-a-right").hasClass("disabled")) {
            $("#navigation").children("#nav-a-right").removeClass("disabled");
        }
        let url_page_pre = "page_"+(page-1).toString()+".html";
        let url_page_post = "page_"+(page+1).toString()+".html";
        $("#navigation").children("#nav-a-left").attr('href',url_page_pre);
        $("#navigation").children("#nav-a-right").attr('href',url_page_post);
    } else if (page == last_page) {
        if ( $("#navigation").children("#nav-a-left").hasClass("disabled")) {
            $("#navigation").children("#nav-a-left").removeClass("disabled");
        }
        let url_page_pre = "page_"+(page-1).toString()+".html";
        $("#navigation").children("#nav-a-left").attr('href',url_page_pre);
        $("#navigation").children("#nav-a-right").addClass("disabled");
    }
    
});