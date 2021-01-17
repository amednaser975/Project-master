
var loadFile = function(event) {
    var image = document.getElementById('avatar');
    var obj = JSON.parse(getCookie('userData'));
    image.src = URL.createObjectURL(event.target.files[0]);
    obj.imgPath = image.src;
    setCookie("userData", JSON.stringify(obj));
    obj = JSON.parse(getCookie('userData'));
    $("#imgOfUser").attr("src", obj.imgPath);
    
};
var RegExpPassword = /^[A-Z][a-z0-9]{3,}$/;
$( document ).ready(function() {
    
    var obj = JSON.parse(getCookie('userData'));
    console.log(obj)
    $("#userName").text(obj.first_name);
    $("#imgOfUser").attr("src", obj.imgPath);
    console.log(obj.imgPath)

    $('.del').click(function()
    {  
        deleteCookie('userData');
        location.assign("../index.html");
    });

    $('#chan').click(function()
    {  
      if($("#txt1").val().match(RegExpPassword))
      {
        if($("#txt1").val()==$("#txt2").val())
        {
            console.log($("#txt2").val())
            var obj = JSON.parse(getCookie('userData'));
            obj.password = $("#txt1").val();
            setCookie("userData", JSON.stringify(obj));
            location.assign("../index.html");

        }
        else
        {  
            console.log("wrooong")
            $("#warn").text("Not Matched")
        }
    }
    else{
        $("#warn").text("Not Valid")

    }
    });



})
