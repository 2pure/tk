function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var id = getParameterByName('id');
var eventNumber;
var counter;
var collection;
var events;
var stalls = 0;
var mezzanine = 0;
var balcony = 0;
var i = 0;
var totalPrice = 0;

$(".place-select-button").click(function () {
    totalPrice = $(".active").find(".price-text").text();
    $(".total-price").text(totalPrice * $('.input-number').val());
});

$(function () {
    $("#navbar").load("./template.html #navbar-template");
    $("#welcome").load("./template.html #welcome-template", function () {
            var result;
            $.ajax({
                url: 'http://kurtr.ru/api/collections/' + id,
                dataType: 'json',
                success: function (responce) {
                    console.log(responce);
                    collection = responce;
                    events = collection.events_list;
                    eventNumber = events.length;
                    counter = eventNumber;
                    console.log("event number " + eventNumber);
                    // $("#test>.img-title").text(result[0].description);
                    //$("#single-test>.theme-img").attr("src",result[0].image_url);
                    $(".welcome-main-title").text(collection.name);
                    $(".welcome-hint").text(collection.description);
                    $(".welcome-img").attr("src", collection.img_url);


                    for (i = 0; i < eventNumber; i++) {
                        $(".main-content").append("<div class=\"play-element\"></div>");
                        stalls = stalls + events[i].event_prices.stalls;
                        mezzanine = mezzanine + events[i].event_prices.mezzanine;
                        balcony = balcony + events[i].event_prices.balcony;
                        $(".stalls").text(stalls);
                        $(".mezzanine").text(mezzanine);
                        $(".balcony").text(balcony);
                        totalPrice = $(".place-select-button.active").find(".price-text").text();
                        $(".total-price").text(totalPrice * $('.input-number').val());
                    }
                    $(".play-element").each(
                        function () {
                            $(this).load("./template.html .play-wrapper", function () {
                                counter--;
                                console.log("counter " + counter);
                                if (counter === 0) {
                                    console.log("workin with cnt " + $('.play-title').length);
                                    var j = 0;

                                    $(".play-wrapper").each(function () {
                                            //console.log(j + " event name is " + events[j].name);
                                            $(this).find(".play-title").text(events[j].name);
                                            $(this).find(".play-img").attr("src", events[j].img_url);
                                            $(this).find(".event-time").text(events[j].name);

                                            if (events[j].name.length != 0) {
                                                $(this).find(".genre").text(events[j].name);
                                            } else {
                                                $(this).hide();
                                            }
                                            if (events[j].name.length != 0) {
                                                $(this).find(".director").text(events[j].name);
                                            } else {
                                                $(this).hide();
                                            }
                                            if (events[j].name.length != 0) {
                                                $(this).find(".artists").text(events[j].name);
                                            } else {
                                                $(this).hide();
                                            }


                                            calendar = $(this).find('#datetimepicker12');
                                            calendar.datetimepicker({
                                                inline: true,
                                                format: 'DD/MM/YYYY',
                                                enabledDates: events[j].event_dates,
                                                locale: 'ru'
                                            });
                                            calendar.on("dp.change", function (e) {
                                                moment.locale('ru');
                                                $(this).find(".event-time").text(e.date.format('dddd, MMMM DD YYYY, h:mm:ss'));
                                            });

                                            j++;
                                        }

                                    )
                                    ;
                                }
                            });
                        }
                    );


                }
            });
        }
    )
    ;

})
;

$(window).scroll(function () {
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
