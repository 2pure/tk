/**
 * Created by ASUS on 29/12/2015.
 */
$(document).ready(
    $(function () {
            $("#navbar").load("./template.html #navbar-template")      ;
            $("#welcome").load("./template.html #welcome-template")      ;
            $("#new-themes").load("./template.html #new-themes");
            $.ajax({
                url: 'http://188.166.36.174:3000/api/themes/1',
                dataType: 'json',
                success: function (responce) {
                    console.log(responce);
                   // $("#test>.img-title").text(result[0].description);
                    //$("#single-test>.theme-img").attr("src",result[0].image_url);
                }
            });


        }
    ));


