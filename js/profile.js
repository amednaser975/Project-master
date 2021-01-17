$(function () {
   
    if(location.href.includes("profile")) {
        $("#userName").addClass("activePage");
    } else {
        $("#userName").removeClass("activePage");
    }
    
    var obj = JSON.parse(getCookie('userData'));
    $("#userName").text(obj.first_name);
    // $("#imgOfUser").attr("src", obj.imgPath);
    
    $("#fullName").text(obj.first_name +" " + obj.last_name);

    $("#joinedDate").text(obj.joinedDate);
    $("#seenDate").text(obj.Last_Seen);
    $("#numOfComments").text(obj.numOfComments);
    $("#save").click(function (e) { 
        location.assign("../userSetting.html");
        
    });
});

