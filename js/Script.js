var jsObj        
var temp;
var movies = [];
var moviesSortedBySeeds = []
var popu=[];
var genersArr = [];
var time = [];
$( document ).ready(function() {

    
    // Loading Function
    // var loading = $('#loading');
    // loading.fadeOut(5000, function () {

    //     $('body').css('overflow-y', "auto");
    // })

    if(location.href.includes("index") ||
    !(location.href.includes("browse") && location.href.includes("movieDetails")
    && location.href.includes("TrendingTv") && location.href.includes("tvDetails")
    && location.href.includes("TrendingMovie"))) {
        $("#indexPage").addClass("newColor activePage");
    } else {
        $("#indexPage").removeClass("newColor");
    }

    
    if(hasCookie("userData") && JSON.parse(getCookie("userData")).flag) {
        console.log("Existed")
        var userName = JSON.parse(getCookie("userData")).first_name;
        $("#loginRegisterPart").empty();
        
        $("#loginRegisterPart").html(`<li><a href="../watchList.html" style="text-decoration:none">My List</a></li><li><a href="./profile.html" style="text-decoration:none">${userName}...</a></li><li id="imgLi"><img id="imgOfUser" src="./images/default_avatar.jpg" style="width: 30px;height: 30px;border-radius: 50%;position: relative;bottom: 6px;left: 10px;"></li>`);
        // $("#ml").append(`<a href="../watchList.html" style="text-decoration:none">My List</a>`);

        
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

    var xhrSearch = new XMLHttpRequest();
    xhrSearch.open("GET", "https://api.themoviedb.org/3/genre/movie/list?api_key=0f61e6eb5dd60b6a59d7b333deba34a0&language=en-US");
    xhrSearch.send();
    xhrSearch.onreadystatechange = function (e) {
        if(this.readyState == 4 && this.status == 200 ) {
            genersArr = (JSON.parse(this.responseText)).genres;
            }
        }


    function getGenreName(genderId)
    {    
        var ret=[]
        for(j=0;j<genderId.length;j++)
        {
            for(var i = 0 ; i < genersArr.length ; i++)
            {
                if(genersArr[i].id == genderId[j])
                {
                    ret.push(genersArr[i]) 
                }
            }
        }
        return ret;
    }


    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.themoviedb.org/3/trending/movie/week?api_key=0f61e6eb5dd60b6a59d7b333deba34a0&page=1https://yts.mx/api/v2/list_movies.json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4)
            if (xhr.status >= 200 && xhr.status < 300) {

                    jsObj = JSON.parse(xhr.responseText);
                    var prefix = 'https://image.tmdb.org/t/p/w500'
                    var pp =0 ;
                    var lk = 0;
                    for(i=0;i<jsObj['results'].length;i++)
                    {   
                        var relDate = jsObj['results'][i]['release_date'];
                        var relDate = relDate.replaceAll('-','.');
                        var ti = jsObj['results'][i]['title'];
                        var im= prefix+jsObj['results'][i]['poster_path'];
                        popu.push(jsObj['results'][i]["popularity"])
                        var ttime = new Date(relDate).getTime()/1000;
                        time.push(ttime);

                        var rat =jsObj["results"][i]['vote_average']
                        var genIds = jsObj["results"][i]['genre_ids']
                        var dat = jsObj['results'][i]['release_date']
                        var id = jsObj['results'][i]['id'];
                        var overV = jsObj['results'][i]['overview']
                        var lang = jsObj['results'][i]['original_language']
                        dat = dat.substr(0,4)
                        var gens=[];
                        gens= (getGenreName(genIds))
                        var m = new Movie(id,ti,dat,rat,gens,overV,im,lang)
                        movies.push(m);
                        moviesSortedBySeeds.push(m)
                        
                    }

                    for(i=0;i<moviesSortedBySeeds.length-1;i++)
                    {
                        for(j=0;j<moviesSortedBySeeds.length-i-1;j++)
                        {
                            if(popu[j+1]>popu[j])
                            {
                                var temp = moviesSortedBySeeds[j];
                                moviesSortedBySeeds[j] = moviesSortedBySeeds[j+1];
                                moviesSortedBySeeds[j+1] =temp;

                                var temp1 = popu[j];
                                popu[j] = popu[j+1];
                                popu[j+1] = temp1;
                                
                            }
                        }
                    }
                    var len = movies.length;
                    var f = len;
                    var countt = 0;
                    for(j=0;j<5;j++)
                    {   
                        var row = document.createElement('tr');
                        $('#pop').append(row);
                        for( i =0;i<4;i++)
                        {   
                            var temp = moviesSortedBySeeds[countt].title;
                            var genn=''
                            for(k =0;k<moviesSortedBySeeds[countt].genre_ids.length;k++)
                            {  
                                genn = genn + moviesSortedBySeeds[countt].genre_ids[k]['name']+'<br>'
                            }
                            if(temp.length>32)
                            {
                            var temp= temp.substr(0,32);
                            temp = temp +'...';

                            }
                            var col = document.createElement('td');
                            col.setAttribute('class', 'movElm');
                            //col.innerHTML = '<a href=""><div class="container"><img id="iii" src='+moviesSortedBySeeds[countt].getPoster()+' alt=""><div class="layer" style="text-align: center;"></div><h1 class="starr"><span class="fa fa-star" style="color: #6ac045; margin-top: 50px; font-size: 26px;"></span><p class="ra">'+moviesSortedBySeeds[countt].getRating()+'/10'+'</p><p classs="gen">'+genn+'</p><input type="button" class="button" value="View Details"></h1><a style="text-align: center;" href="#"><h5 style="margin-top: 3px;">'+moviesSortedBySeeds[countt].getTitle()+'</h5></a><p>'+moviesSortedBySeeds[countt].getDate()+'</p></div></a>'
                            col.innerHTML = `
                            <a href="movieDetails.html?${moviesSortedBySeeds[countt].id}">
                            <div class="container"><img id="iii" src="${moviesSortedBySeeds[countt].poster_path}" alt="">
                            <div class="layer" style="text-align: center;"></div>
                            <h1 class="starr">
                            <span class="fa fa-star newColor" style="color: #6ac045; margin-top: 50px; font-size: 26px;">
                            </span>
                            <p class="ra">${moviesSortedBySeeds[countt].vote_average}/10</p>
                            <p classs="gen">${genn}</p><input type="button" class="button newBackground" value="View Details">
                            </h1>
                            <a style="text-align: center;" href="movieDetails.html?${moviesSortedBySeeds[countt].id}"><h5 class="title" style="margin-top: 3px;">${temp}</h5></a><p class='datte'>${moviesSortedBySeeds[countt].release_date}</p></div>
                            </a>
                            
                            `
                            row.append(col);
                            $('#pop').append(row);
                            countt++;
                            

                        }
                    }
                    for(i=0;i<movies.length-1;i++)
                    {
                        for(j=0;j<movies.length-i-1;j++)
                        {
                            if(time[j+1]>time[j])
                            {
                                var temp = movies[j];
                                movies[j] = movies[j+1];
                                movies[j+1] =temp;

                                var temp1 = time[j];
                                time[j] = time[j+1];
                                time[j+1] = temp1;

                            }
                        }
                    }
                    countt = 0;
                    for(j=0;j<5;j++)
                    {   
                        
                        var row = document.createElement('tr');
                        $('#late').append(row);
                        for( i =0;i<4;i++)
                        {   

                            var temp = movies[countt].title;
                            var genn=''
                            for(k =0;k<movies[countt].genre_ids.length;k++)
                            {  
                                genn = genn + movies[countt].genre_ids[k]['name']+'<br>'
                            }
                            if(temp.length>32)
                            {
                            var temp= temp.substr(0,32);
                            temp = temp +'...';

                            }
                            var col = document.createElement('td');
                            col.setAttribute('class', 'movElm');                         
                            col.innerHTML = `
                            <a href="movieDetails.html?${movies[countt].id}">
                            <div class="container"><img id="iii" src="${movies[countt].poster_path}" alt="">
                            <div class="layer" style="text-align: center;"></div>
                            <h1 class="starr">
                            <span class="fa fa-star newColor" style="color: #6ac045; margin-top: 50px; font-size: 26px;">
                            </span>
                            <p class="ra">${movies[countt].vote_average}/10</p>
                            <p classs="gen">${genn}</p><input type="button" class="button newBackground" value="View Details">
                            </h1>
                            <a style="text-align: center;" href="movieDetails.html?${movies[countt].id}"><h5 class="title" style="margin-top: 3px;">${temp}</h5></a><p class='datte'>${movies[countt].release_date}</p></div>
                            </a>
                            
                            `

                            row.append(col);
                            $('#late').append(row);
                            countt++;
                        }
                    }
                    $(".layer").hide();
                    
                    $(".starr").hide();
                    $('a').hover(function(){  
                        $(this).children('[class=layer]').fadeIn("fast");
                        $(this).children('[class=starr]').fadeIn("fast");
                        $(this).children('[id=iii]').css("border-color", color);

                    });
                    $('a').mouseleave(function(){  
                        $(this).children('[class=layer]').fadeOut("fast");
                        $(this).children('[class=starr]').fadeOut("fast");
                        $(this).children('[id=iii]').css("border-color", "white");

                    });


                    
            
            
            
            
            
                    }
            else {
                console.log("PAGENOTFOUND");
            }           
        };
        //3) send req data-->POST
        xhr.send("");

        $('a').mouseout(function(){  
            //$(this).children('[class=layer]').fadeOut();
            
        });
        
    $(".ulNav").on("click", "#logoutLi", function (e) {  
        
        
        e.preventDefault();
        var userDataObj = JSON.parse(getCookie("userData"))
        userDataObj.flag = false;
        setCookie("userData", JSON.stringify(userDataObj));
        location.assign("../index.html");
        $(this).css("display", "none");
    })
    
  // Scroll To Top button
    var scrollToTop = $(".back-to-top");
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 1000) {
        if (scrollToTop.is(":hidden")) {
            scrollToTop.css("display", "block");
        }
        } else {
            scrollToTop.css("display", "none");
        }
    });
    
  // Click On scrollToTop To Go Up 
  scrollToTop.click(function(event) {
    event.preventDefault();
    $("html , body").animate(
      {
        scrollTop: 0
      },
      1000
    );
  });

   // Theme Coloring
  
    var colorItem = $('.color-item');
    colorItem.eq(0).css("backgroundColor", "tomato");
    colorItem.eq(1).css("backgroundColor", "#09c");
    colorItem.eq(2).css("backgroundColor", "orange");
    colorItem.eq(3).css("backgroundColor", "teal");
    colorItem.eq(4).css("backgroundColor", "yellow");
    var color = "#4CAF50";
    colorItem.click(function() {

        color = $(this).css("backgroundColor");
        $(".newColor").css("color", color);
        $(".back-to-top").css("backgroundColor", color);
        $(".newBackground").css("backgroundColor", color);
        $(".ulNav li a").hover(function () {

            $(this).css("color", color);

            }, function () {
                
                $(this).css("color", "#919191");
            }
        );
    });


    $("#options svg").click(function () {

        let colorBoxWidth = $(".colors-box").innerWidth();
        if($("#options").css('left') == "0px")
        {
            $("#options").animate({ left:`-${colorBoxWidth}`}, 1000);
        }
        else
        {
            $("#options").animate({ left:`0px`}, 1000);
        }
    })

    $(".img-item").click( function () {

        let imgSrc = $(this).attr('src');
        $('#mainImage').attr("src", imgSrc);
    });

    $('#menu ul li a').on('click', function(event) {

        console.log("Ahmed");
        event.preventDefault();

    });


})
