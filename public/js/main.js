/**
 * Created by ASUS on 29/12/2015.
 */
$(document).ready(
    $(function () {
            $("#navbar").load("./template.html #navbar-template")      ;
            $("#welcome").load("./template.html #welcome-template")      ;
            $("#new-themes").load("./template.html #new-themes");
            var result;
            $.ajax({
                url: 'http://188.166.36.174:3000/api/themes',
                dataType: 'json',
                success: function (responce) {
                    console.log(responce);
                    result=responce;
                   // $("#test>.img-title").text(result[0].description);
                    //$("#single-test>.theme-img").attr("src",result[0].image_url);
                    $(".img_container").each(function(){
                        $(this).find(".theme-img").attr("src",result[0].img_url);
                        $(this).find(".img-title").text(result[0].name);
                        $(this).find(".img-description").text(result[0].description);
                    })
                }
            });



        }
    ));


