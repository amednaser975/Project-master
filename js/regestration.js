
var fNameValue, lNameValue, phoneValue, emailValue, passwordValue, confirmValue;
var flagFName, flagLName, flagEmail, flagPass, flagPhone, flagConfirm;
var RegExpName = /^[A-Za-z]{3,}$/;
var RegExpMobile = /^(010|011|012|015)[0-9]{8}$/;
var RegExpEmail = /^[a-z][a-z0-9_\.\-]+@[A-Za-z0-9_\.\-]+(\.com)$/; 
var RegExpPassword = /^[A-Z][a-z0-9]{3,}$/;

$("#fnameInp").on("keyup", function () {
    fNameValue = $(this).val();
    if(fNameValue.match(RegExpName)) {
        $("#fNameReq").css("visibility", "hidden");
        $(this).css("borderColor", "#6AC045");
        flagFName = true;
    } else {
        $(this).css("borderColor", "red");
        $("#fNameReq").css("visibility", "visible");
        flagFName = false;
    }
    if(flagFName && flagLName && flagEmail && flagPhone && flagPass && flagConfirm) 
        $("#submitBtn").css("cursor", "pointer");
});
$("#lnameInp").on("keyup", function () {
    lNameValue = $(this).val();
    if(lNameValue.match(RegExpName)) {
        $(this).css("borderColor", "#6AC045");
        $("#lNameReq").css("visibility", "hidden");
        flagLName = true;
    } else {
        $(this).css("borderColor", "red");
        $("#lNameReq").css("visibility", "visible");
        flagLName = false;
    }
    if(flagFName && flagLName && flagEmail && flagPhone && flagPass && flagConfirm) 
        $("#submitBtn").css("cursor", "pointer");
});
$("#phoneInp").on("keyup", function () {
    phoneValue = $(this).val();
    if(phoneValue.match(RegExpMobile)) {
        $(this).css("borderColor", "#6AC045");
        $("#phoneReq").css("visibility", "hidden");
        flagPhone = true;
    } else {
        $(this).css("borderColor", "red");
        $("#phoneReq").css("visibility", "visible");
        flagPhone = false;
    }
    if(flagFName && flagLName && flagEmail && flagPhone && flagPass && flagConfirm) 
        $("#submitBtn").css("cursor", "pointer");
});
$("#emailInp").on("keyup", function () {
    emailValue = $(this).val();
    if(emailValue.match(RegExpEmail)) {
        $(this).css("borderColor", "#6AC045");
        $("#emailReq").css("visibility", "hidden");
        flagEmail = true;
    } else {
        $(this).css("borderColor", "red");
        $("#emailReq").css("visibility", "visible");
        flagEmail = false;
    }
    if(flagFName && flagLName && flagEmail && flagPhone && flagPass && flagConfirm) 
        $("#submitBtn").css("cursor", "pointer");
});

$("#passwordInp").on("keyup", function () {
    passwordValue = $(this).val();
    if(passwordValue.match(RegExpPassword)) {
        $(this).css("borderColor", "#6AC045");
        $("#passwordReq").css("visibility", "hidden");
        flagPass = true;
    } else {
        $(this).css("borderColor", "red");
        $("#passwordReq").css("visibility", "visible");
        flagPass = false;
    }
    if(flagFName && flagLName && flagEmail && flagPhone && flagPass && flagConfirm) 
        $("#submitBtn").css("cursor", "pointer");
});
$("#confirmInp").on("change", function () {
    confirmValue = $(this).val();
    if(confirmValue.match(RegExpPassword) && confirmValue == passwordValue) {
        $(this).css("borderColor", "#6AC045");
        $("#confirmReq").css("visibility", "hidden");
        flagConfirm = true;
    } else {
        $(this).css("borderColor", "red");
        $("#confirmReq").css("visibility", "visible");
        flagConfirm = false;
    }
    if(flagFName && flagLName && flagEmail && flagPhone && flagPass && flagConfirm) 
        $("#submitBtn").css("cursor", "pointer");
});

var form1 = document.getElementById("form1");
$("#submitBtn").on("click", function() {

    if(flagFName && flagLName && flagEmail && flagPhone && flagPass && flagConfirm) {
        var data = {
            "first_name": $("#fnameInp").val(), 
            "last_name": $("#lnameInp").val(), 
            "phone": $("#phoneInp").val(), 
            "email": $("#emailInp").val(), 
            "password": $("#passwordInp").val(),
            "flag": false,
            "imgPath": "../images/default_avatar.jpg",
            "numOfComments": 0,
            "joinedDate": new Date(),
            "Last_Seen": "",
            "favMovs":[],
        }
        if(hasCookie("userData")) {

            var userDataObj = JSON.parse(getCookie("userData"))
            if( $("#emailInp").val() != userDataObj.email || $("#phoneInp").val()!= userDataObj.phone) {
                
            setCookie("userData", JSON.stringify(data));
            location.assign("../login.html");
            } else {
                if($("#emailInp").val() == userDataObj.email) {
                    alert("This Email is Already Exists");
                    $("#emailInp").focus();
                }
                else if($("#phoneInp").val() == userDataObj.phone) {
                    $("#phoneInp").focus();
                    alert("This Phone is Already Exists");
                }
             }
        } else {

            setCookie("userData", JSON.stringify(data));
            location.assign("../login.html");
        }
    } else {
        $(this).css("cursor", "not-allowed");
    }
})