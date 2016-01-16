$(document).ready(
    $(function () {
            $("#navbar").load("./template.html #navbar-template");
            $("#welcome").load("./template.html #welcome-template");
            $("#new-themes").load("./template.html #new-themes");

            var result;
            $.ajax({
                url: 'http://188.166.36.174:3000/api/themes/',
                dataType: 'json',
                success: function (responce) {
                    console.log(responce);
                    result=responce;
                    // $("#test>.img-title").text(result[0].description);
                    //$("#single-test>.theme-img").attr("src",result[0].image_url);
                    var i=0;
                    $(".new-theme-img").each(function(){
                        if(i>=result.size){
                            $(this).hide();
                        }else{
                            $(this).find(".theme-img").attr("src",result[i].img_url);
                            $(this).find(".img-title").text(result[i].name);
                            $(this).find(".img-description").text(result[i].description);

                        }
                        i++
                    })
                }
            });
        }


    ));


