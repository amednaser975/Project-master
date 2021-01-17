$(".ulNav").on("click", "#logoutLi", function (e) {  
        
        
    e.preventDefault();
    var userDataObj = JSON.parse(getCookie("userData"))
    userDataObj.flag = false;
    setCookie("userData", JSON.stringify(userDataObj));
    location.assign("../index.html");
    $(this).css("display", "none");
})
$( document ).ready(function() {


    
    if(location.href.includes("watchList")) {
        $("#watchList").addClass("activePage");
        $("#watchList").css("color", "#4CAF50");
    } else {
        $("#watchList").removeClass("activePage");
        $("#watchList").css("color", "#919191");
    }

    if(hasCookie("userData") && JSON.parse(getCookie("userData")).flag) {
        console.log("Existed")
        var userName = JSON.parse(getCookie("userData")).first_name;
        $("#loginRegisterPart").empty();
        $("#loginRegisterPart").html(`<li><a href="./profile.html" style="text-decoration:none">${userName}...</a></li><li id="imgLi"><img id="imgOfUser" src="./images/default_avatar.jpg" style="width: 30px;height: 30px;border-radius: 50%;position: relative;bottom: 6px;left: 10px;"></li>`);
        $("#logoutLi").css("display", "inline");
        $("#loginBtn").css("display", "none");
    } else {
        console.log("Not Existed");
        $("#loginRegisterPart").html(`<ul style="list-style: none;">
                    <li><a style="font-weight: bolder;" href="login.html" class="colorFont">Login</a></li>
                    <li style="margin-top: 20px;" class="colorFont">&nbsp;|&nbsp; </li>
                    <li><a style="font-weight: bolder;" href="Regestration.html" class="colorFont">Register</a></li>
                    </ul>`);
        $("#logoutLi").css("display", "none");
        $("#loginBtn").css("display", "block");
    }

    var userDataObj = JSON.parse(getCookie("userData"))
    var favs =      userDataObj.favMovs;
    console.log(favs)
    var len = favs.length;
    console.log(len)
    var f = true;
    var co=0;
    while(f)
    {    
        if(len>4)
        {
            len = len-4;
        var row = document.createElement('tr');
        $('#pop').append(row);
        for( i =0;i<4;i++)
        {   

            var col = document.createElement('td');
            col.setAttribute('class', 'movElm');

    
            col.innerHTML = `
            <a href="movieDetails.html?${favs[co].id}">
            <div class="container"><img id="iii" src="${favs[co].img}" alt="">
            <div class="layer" style="text-align: center;"></div>
            <h1 class="starr">
            <span class="fa fa-star" style="color: #6ac045; margin-top: 50px; font-size: 26px;">
            </span>
            <p class="ra">${favs[co].rate}/10</p>
            <input type="button" class="button" value="View Details">
            </h1>
            <a style="text-align: center;" href="movieDetails.html?${favs[co].id}"><h5 class="title" style="margin-top: 3px;">${favs[co].title}</h5></a></div>
            </a>
            
            `
            row.append(col);
            $('#pop').append(row);
            co++;

        }
        }
        if(len<=4)
        {   
            var row = document.createElement('tr');
            $('#pop').append(row);
            for( i =0;i<len;i++)
            {   
    
                var col = document.createElement('td');
                col.setAttribute('class', 'movElm');
    
                col.innerHTML = `
                <a href="movieDetails.html?${favs[co].id}">
                <div class="container"><img id="iii" src="${favs[co].img}" alt="">
                <div class="layer" style="text-align: center;"></div>
                <h1 class="starr">
                <span class="fa fa-star" style="color: #6ac045; margin-top: 50px; font-size: 26px;">
                </span>
                <p class="ra">${favs[co].rate}/10</p>
                <input type="button" class="button" value="View Details">
                </h1>
                <a style="text-align: center;" href="movieDetails.html?${favs[co].id}"><h5 class="title" style="margin-top: 3px;">${favs[co].title}</h5></a></div>
                </a>
                
                `
                row.append(col);
                $('#pop').append(row);
                
                co++;
            }
            f=false;
        }
    }
    $(".layer").hide();
                    
    $(".starr").hide();
    $('a').hover(function(){  
        $(this).children('[class=layer]').fadeIn("fast");
        $(this).children('[class=starr]').fadeIn("fast");
        $(this).children('[id=iii]').css("border-color", "#4CAF50");

    });
    $('a').mouseleave(function(){  
        $(this).children('[class=layer]').fadeOut("fast");
        $(this).children('[class=starr]').fadeOut("fast");
        $(this).children('[id=iii]').css("border-color", "white");

    });





})