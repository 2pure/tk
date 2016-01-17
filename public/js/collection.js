function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var id = getParameterByName('id');


    $(function () {
            $("#navbar").load("./template.html #navbar-template");
            $("#welcome").load("./template.html #welcome-template");
            var result;
            $.ajax({
                url: 'http://188.166.36.174:3000/api/collections/'+id,
                dataType: 'json',
                success: function (responce) {
                    console.log(responce);
                    collection = responce
                    events=collection.events_list;
                    // $("#test>.img-title").text(result[0].description);
                    //$("#single-test>.theme-img").attr("src",result[0].image_url);
                    var i = 0;
                    $(".play-wrapper").each(function () {
                        $(this).find(".play-title").text(events[i].name);
                        $(this).find(".play-img").attr("src", events[i].event_img_url);
                        $(this).find('#datetimepicker12').datetimepicker({
                            inline: true,
                            format: 'DD/MM/YYYY',
                            enabledDates: events[i].event_dates


                        });
                    })
                }
            });
        }
    );

$(window).scroll(function(){
    var sticky = $('.sticky'),
        scroll = $(window).scrollTop();

    if (scroll >= 0) sticky.addClass('fixed');
    else sticky.removeClass('fixed');
});
$(document).on('click', '.scroll-down-welcome', function () {
    $("html, body").animate({
        scrollTop: $(".main-content").offset().top
    }, 100);

});

/**
 * Created by ASUS on 16/01/2016.
 */
