/**
 * Created by ASUS on 29/12/2015.
 */
$(window).scroll(function () {
    var sticky = $('.sticky'),
        scroll = $(window).scrollTop();

    if (scroll >= 600) sticky.addClass('fixed');
    else sticky.removeClass('fixed');
});

$(document).on('click', '.scroll-down-welcome', function () {
    $("html, body").animate({
        scrollTop: $("#navbar").offset().top
    }, 100);

});

$(document).ready(
    $(function () {


        $("#navbar").load("./template.html #navbar-template");
        //$("#new-themes").load("./template.html #new-themes"
        $("#welcome").load("./template.html #welcome-template"
            , function () {

                var themes;
                //$.ajax({
                //    url: 'http://kurtr.ru/api/themes',
                //    dataType: 'json',
                //    success: function (responce) {
                //        console.log(responce);
                //        themes = responce.themes;
                //
                //        // $("#test>.img-title").text(result[0].description);
                //        //$("#single-test>.theme-img").attr("src",result[0].image_url);
                //        var i = 0;
                //        $(".theme-collection-img").each(function () {
                //
                //            if (i >= themes.size) {
                //
                //                $(this).hide();
                //            } else {
                //                $(this).attr("href", "./theme.html?" + $.param({id: themes[i].theme_id}));
                //                $(this).find(".theme-img").attr("src", themes[i].img_url);
                //                $(this).find(".img-title").text(themes[i].name);
                //                $(this).find(".img-description").text(themes[i].description);
                //
                //            }
                //            i++;
                //        })
                //    }
                //});
                var collections;
                $.ajax({
                    url: 'http://kurtr.ru/api/newcollections',
                    dataType: 'json',
                    success: function (responce) {
                        console.log(responce);
                        collections = responce.collections;
                        collectionNumber = collections.length;
                        var i = 0;
                        for (i = 0; i < collectionNumber / 4; i++) {
                            $("#collection-row-wrapper").append("<div class=\"row collection-row-block\"></div>");
                        }
                        $(".collection-row-block").each(function () {
                            $(this).load("./template.html .collection-row", function () {
                                i = 0;
                                $(".new-collection-element-wrapper").each(function () {
                                    //$(this).click(function(){
                                    //   window.location.href="./collection.html?"+ $.param({id: collections[i].collection_id});
                                    //});

                                    if (i < collectionNumber) {
                                        var href = "./collection.html?" + $.param({id: collections[i].collection_id});
                                        var events = collections[i].events_list;
                                        var j = 0;
                                        $(this).find(".new-theme-img").attr("href", href);
                                        $(this).find(".theme-img").attr("src", collections[i].img_url);
                                        $(this).find(".img-title").text(collections[i].name);
                                        $(this).find(".img-description").text(collections[i].description);
                                        $(this).find(".list-group-item").each(function () {
                                            if (!!events[j]) {
                                                $(this).attr("href", href);
                                                $(this).text(events[j].name);
                                                if (j == 4) {
                                                    $(this).text("Больше спектаклей");
                                                }
                                            } else {
                                                $(this).hide();
                                            }
                                            j++;

                                        });
                                    } else {
                                        $(this).hide();
                                    }
                                    i++;
                                    console.log(i);

                                })


                            });
                        });

                    }
                });


            }
        );
    }));



