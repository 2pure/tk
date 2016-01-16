$(document).ready(
    $(function () {
            $("#navbar").load("./template.html #navbar-template");
            $("#welcome").load("./template.html #welcome-template");
            var result;
            $.ajax({
                url: 'http://188.166.36.174:3000/api/events',
                dataType: 'json',
                success: function (responce) {
                    console.log(responce);
                    result = responce[4];
                    // $("#test>.img-title").text(result[0].description);
                    //$("#single-test>.theme-img").attr("src",result[0].image_url);
                    var i = 0;
                    $(".play-wrapper").each(function () {
                        $(this).find(".play-title").text(result.title);
                        $(this).find(".play-img").attr("src", result.event_img_url);
                        $(this).find('#datetimepicker12').datetimepicker({
                            inline: true,
                            format: 'DD/MM/YYYY',
                            enabledDates: result.event_dates


                        });
                    })
                }
            });
        }
    ));


/**
 * Created by ASUS on 16/01/2016.
 */
