$(window).scroll(function () {
    var sticky = $('.sticky'),
        scroll = $(window).scrollTop();

    if (scroll >= 0) sticky.addClass('fixed');
    else sticky.removeClass('fixed');
});


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
            $("#new-themes").load("./template.html #new-themes");

            var collections;
            var theme;
            $.ajax({
                url: 'http://188.166.36.174:3000/api/themes/' + id,
                dataType: 'json',
                success: function (responce) {
                    console.log(responce);
                    theme = responce;
                    collections = theme.collections;
                    // $("#test>.img-title").text(result[0].description);
                    //$("#single-test>.theme-img").attr("src",result[0].image_url);
                    var i = 0;

                    $(".new-collection-element-wrapper").each(function () {
                        var j = 0;
                        var collection = collections[i];
                        var events = collection.events_list;
                        var href = "./collection.html?" + $.param({id: collection.collection_id});
                        $(this).click(function () {
                            window.location.href = href;
                        });
                        if (i >= collections.size) {
                            $(this).hide();
                        } else {
                            $(this).find(".theme-img").attr("src", collection.img_url);
                            $(this).find(".img-title").text(collection.name);
                            $(this).find(".img-description").text(collection.description);

                            $(this).find(".list-group-item").each(function () {
                                if (!!events[j]) {
                                    $(this).attr("href", href);
                                    $(this).text(events[j].name);
                                    if(j==4){
                                        $(this).text("Больше спектаклей");
                                    }
                                }else{
                                    $(this).hide();
                                }
                                j++;

                            });
                        }
                        i++
                    })
                }
            });
        }
    );


