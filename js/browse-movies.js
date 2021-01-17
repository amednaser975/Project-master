$(function () {


    
    // setTimeout(function() {
    //     $(".listingSection").css("display", "block");
    // }, 1000)
    // Loading Function
    // var loading = $('#loading');
    // loading.fadeOut(5000, function () {

    //     $('body').css('overflow-y', "auto");
    // })
    // var loading1 = $('#loading1');
    // loading1.fadeOut(5000, function () {

    //     $('body').css('overflow-y', "auto");
    // })

    if(location.href.includes("browse")) {
        console.log("Browse")
        $("#browsePage").addClass("activePage");
    } else {
        $("#browsePage").removeClass("activePage");
    }
    if(location.href.includes("TrendingMovie")) {
        console.log("Browse")
        $("#moviePage").addClass("activePage");
    } else {
        $("#moviePage").removeClass("activePage");
    }
    if(hasCookie("userData") && JSON.parse(getCookie("userData")).flag) {
        console.log("Existed")
        var userName = JSON.parse(getCookie("userData")).first_name;
        $("#loginRegisterPart").empty();
        $("#loginRegisterPart").html(`<li><a href="../watchList.html" style="text-decoration:none">My List</a></li><li><a href="./profile.html" style="text-decoration:none">${userName}...</a></li><li id="imgLi"><img id="imgOfUser" src="./images/default_avatar.jpg" style="width: 30px;height: 30px;border-radius: 50%;position: relative;bottom: 6px;left: 10px;"></li>`);
        // $("#ml").append(`<a href="../watchList.html" style="text-decoration:none">My List</a>`);
        $("#toggleLogInOutBtn").text("Logout");
        $("#logoutLi").css("display", "inline");
    } else {
        console.log("Not Existed");
        $("#loginRegisterPart").html(`<ul style="list-style: none;">
                    <li><a style="font-weight: bolder;" href="login.html" class="colorFont">Login</a></li>
                    <li class="colorFont">&nbsp;|&nbsp; </li>
                    <li><a style="font-weight: bolder;" href="Regestration.html" class="colorFont">Register</a></li>
                    </ul>`);
        $("#toggleLogInOutBtn").text("LogIn");
        $("#logoutLi").css("display", "none");
    }    
    getAllGenres();
    var tableBody = document.getElementById("tableBody");
    var myBtn = $("#pagination ul li input");
    var listOfMovies = [];
    var paginitionBtn9 = $("#paginitionBtn").clone();
    paginitionBtn9.children("input").val("9");
    var paginitionBtn10 = $("#paginitionBtn").clone();
    paginitionBtn10.children("input").val("10");
    var currentPage = 1;
    var totalNumMovies = $("#totalNumMovies");
    var imgPrefix = "https://image.tmdb.org/t/p/w500/";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.themoviedb.org/3/trending/movie/week?api_key=0f61e6eb5dd60b6a59d7b333deba34a0&page="+currentPage);
    xhr.send();
    xhr.onreadystatechange = function (e) {
        if(this.readyState == 4 && this.status == 200 ) {
            fetchMoviesData((JSON.parse(this.responseText)).results);
            totalNumMovies.text((JSON.parse(this.responseText)).total_results)
        }
    }
    function fetchMoviesData(movieList) {
        listOfMovies = [];
        for (var i = 0; i < movieList.length; i++) {
            listOfMovies.push(new Movie(movieList[i].id, movieList[i].title, movieList[i].release_date, 
                movieList[i].vote_average, movieList[i].genre_ids, movieList[i].overview,
                movieList[i].poster_path, movieList[i].original_language))
        }
        displayMovies(listOfMovies);
    }
    function displayMovies(listOfItems) {
        console.log(listOfItems)
        tableBody.innerHTML = "";
        for (var i = 0; i < listOfItems.length; i+=4) {
            
             // tableBody.innerHTML += "<tr><td><div class='movie'><div class='imgPart'><img src='"+listOfItems[i].poster_path!= null?imgPrefix+listOfItems[i].poster_path: './images/notFound.png' +"' alt=''/><div class='shadow'><p><i class='fas fa-star star'></i></p><p>"+listOfItems[i].vote_average+"</p><p>"+listOfItems[i].genre_ids[0] != undefined? getGenreName(listOfItems[i].genre_ids[0]): 'General'+"</p><div style='margin-top:4rem'><a href='../movieDetails.html?"+listOfItems[i].id+"' target='_blank' class='MovieDetails'>View Details</a><input type='hidden' value='"+listOfMovies[i].id+"'></div></div></div><div class='textPart'><p>"+listOfItems[i].title+"</p><p>"+listOfItems[i].release_date+"</p></div></div></td> <td><div class='movie'><div class='imgPart'><img src='"+listOfItems[i+1].poster_path!= null?imgPrefix+listOfItems[i+1].poster_path: './images/notFound.png'+"' alt=''/><div class='shadow'><p><i class='fas fa-star'></i></p><p>"+listOfItems[i+1].vote_average+"</p><p>"+listOfItems[i+1].genre_ids[0] != undefined? getGenreName(listOfItems[i+1].genre_ids[0]): 'General'+"</p><div style='margin-top:4rem'><a href='../movieDetails.html?"+listOfItems[i+1].id+"' target='_blank' class='MovieDetails'>View Details</a><input type='hidden' value='"+listOfMovies[i+1].id+"'></div></div> </div><div class='textPart'><p>"+listOfItems[i+1].title+"</p><p>"+listOfItems[i+1].release_date+"</p></div></div></td><td><div class='movie'><div class='imgPart'><img src='"+listOfItems[i+2].poster_path!= null?imgPrefix+listOfItems[i+2].poster_path: './images/notFound.png'+"' alt=''/><div class='shadow'><p><i class='fas fa-star'></i></p><p>"+listOfItems[i+2].vote_average+"</p> <p>"+listOfItems[i+2].genre_ids[0] != undefined? getGenreName(listOfItems[i+2].genre_ids[0]): 'General'+"</p><div style='margin-top:4rem'><a href='../movieDetails.html?"+listOfItems[i+2].id+"' target='_blank' class='MovieDetails'>View Details</a><input type='hidden' value='"+listOfMovies[i+2].id+"'></div></div></div></td><td><div class='movie'><div class='imgPart'><img src='"+listOfItems[i+3].poster_path!= null?imgPrefix+listOfItems[i+3].poster_path: './images/notFound.png'+"' alt=''/><div class='shadow'><p><i class='fas fa-star'></i></p><p>"+listOfItems[i+3].vote_average+"</p><p>"+listOfItems[i+3].genre_ids[0] != undefined? getGenreName(listOfItems[i+3].genre_ids[0]): 'General'+"</p><div style='margin-top:4rem'><a href='../movieDetails.html?"+listOfItems[i+3].id+"' target='_blank' class='MovieDetails'>View Details</a><input type='hidden' value='"+listOfMovies[i+3].id+"'></div></div></div><div class='textPart'><p>"+listOfItems[i+3].title+"</p><p>"+listOfItems[i+3].release_date+"</p> </div></div> </td></tr>";

            tableBody.innerHTML += `<tr>
                                        <td>
                                            <div class="movie">
                                                <div class="imgPart">
                                                    <img src="${listOfItems[i].poster_path!= null?imgPrefix+listOfItems[i].poster_path: "./images/notFound.png" }" alt=""/>
                                                    <div class="shadow">
                                                        <p><i class="fas fa-star star"></i></p>
                                                        <p>${listOfItems[i].vote_average}</p>
                                                        <p>${listOfItems[i].genre_ids[0] != undefined? getGenreName(listOfItems[i].genre_ids[0]): "General"}</p>
                                                        <div style="margin-top:4rem"><a href="../movieDetails.html?${listOfItems[i].id}" target="_blank" class="MovieDetails">View Details</a><input type="hidden" value="${listOfMovies[i].id}"></div>
                                                    </div>
                                                </div>
                                                <div class="textPart">
                                                    <p>${listOfItems[i].title}</p>
                                                    <p>${listOfItems[i].release_date}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="movie">
                                                <div class="imgPart">
                                                    <img src="${listOfItems[i+1].poster_path!= null?imgPrefix+listOfItems[i+1].poster_path: "./images/notFound.png"}" alt=""/>
                                                    <div class="shadow">
                                                        <p><i class="fas fa-star"></i></p>
                                                        <p>${listOfItems[i+1].vote_average}</p>
                                                        <p>${listOfItems[i+1].genre_ids[0] != undefined? getGenreName(listOfItems[i+1].genre_ids[0]): "General"}</p>
                                                        <div style="margin-top:4rem"><a href="../movieDetails.html?${listOfItems[i+1].id}" target="_blank" class="MovieDetails">View Details</a><input type="hidden" value="${listOfMovies[i+1].id}"></div>
                                                    </div>
                                                </div>
                                                <div class="textPart">
                                                <p>${listOfItems[i+1].title}</p>
                                                <p>${listOfItems[i+1].release_date}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="movie">
                                                <div class="imgPart">
                                                    <img src="${listOfItems[i+2].poster_path!= null?imgPrefix+listOfItems[i+2].poster_path: "./images/notFound.png"}" alt=""/>
                                                    <div class="shadow">
                                                        <p><i class="fas fa-star"></i></p>
                                                        <p>${listOfItems[i+2].vote_average}</p>
                                                        <p>${listOfItems[i+2].genre_ids[0] != undefined? getGenreName(listOfItems[i+2].genre_ids[0]): "General"}</p>
                                                        <div style="margin-top:4rem"><a href="../movieDetails.html?${listOfItems[i+2].id}" target="_blank" class="MovieDetails">View Details</a><input type="hidden" value="${listOfMovies[i+2].id}"></div>
                                                    </div>
                                                </div>
                                                <div class="textPart">
                                                    <p>${listOfItems[i+2].title}</p>
                                                    <p>${listOfItems[i+2].release_date}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                        <div class="movie">
                                            <div class="imgPart">
                                                <img src="${listOfItems[i+3].poster_path!= null?imgPrefix+listOfItems[i+3].poster_path: "./images/notFound.png"}" alt=""/>
                                                <div class="shadow">
                                                        <p><i class="fas fa-star"></i></p>
                                                        <p>${listOfItems[i+3].vote_average}</p>
                                                        <p>${listOfItems[i+3].genre_ids[0] != undefined? getGenreName(listOfItems[i+3].genre_ids[0]): "General"}</p>
                                                        <div style="margin-top:4rem"><a href="../movieDetails.html?${listOfItems[i+3].id}" target="_blank" class="MovieDetails">View Details</a><input type="hidden" value="${listOfMovies[i+3].id}"></div>
                                                    </div>
                                            </div>
                                            <div class="textPart">
                                                <p>${listOfItems[i+3].title}</p>
                                                <p>${listOfItems[i+3].release_date}</p>
                                            </div>
                                        </div>
                                        </td>
                                    </tr>`;
        }
    }
    $("#tableBody").on("mouseenter mouseleave", ".imgPart", function () {
        $(this).parent().toggleClass("active");
        $(this).children(".shadow").fadeToggle(300);
        // $(this).children(".shadow").children("div").slideToggle(300);
    });
    $(".imgPart").hover(function () {
        $(this).parent().addClass("active");
        $(this).children(".shadow").fadeIn(300);
        $(this).css("borderColor", "09c");
        }, function () {
            $(this).parent().removeClass("active");
            $(this).children(".shadow").fadeOut(300);
        }
    );

    myBtn.on("click", function (e) {
        var btnVal = e.target.value;  
        console.log(btnVal);
        if(isFinite(btnVal)) {
            currentPage = parseInt(btnVal);
            $("li").removeClass("active");
            $(this).parent().addClass("active");
            if(currentPage <= 999) {
                $("#nextBtn").removeClass("hidden");
                $("#lastBtn").removeClass("hidden");
            }
            if(currentPage == 7) {
                paginitionBtn9.insertAfter($("input[value=8]").parent());
                paginitionBtn10.insertAfter($("input[value=9]").parent());
                $("input[value="+3+"]").val("...");
            } else if(currentPage < 7) {
                $("input[value='...']:eq(0)").val("3");
            }
            if(parseInt($(this).val()) >= 8) {
                $("li input").each(function() {
                    if(parseInt($(this).val()) >= 4 && parseInt($(this).val()) <= 998) {
                        // var test = parseInt($(this).val()) - parseInt($("li.active input").val());
                        // console.log(test)
                        $(this).val(parseInt($(this).val()) + 1);
                    }
                  });
                  $("li").removeClass("active");
                  $(this).parent().prev().addClass("active");
            } else {
                // $("li input").each(function( index ) {
                //     if(parseInt($(this).val()) >= 4 || parseInt($(this).val()) <= 998) {
                //         $(this).val(parseInt($(this).val())-1);
                //     }
                //   });
                //   $("li").removeClass("active");
                //   $(this).parent().prev().addClass("active");
            }
            if(currentPage == 2) {
                $("#prevBtn").removeClass("hidden");
            }
            else if(currentPage == 1) {
                $("#firstBtn").addClass("hidden");
                $("#prevBtn").addClass("hidden");
            }
            else if(currentPage == 1000) {
                $("#nextBtn").addClass("hidden");
                $("#lastBtn").addClass("hidden");
                $("#firstBtn").removeClass("hidden");
                $("#prevBtn").removeClass("hidden");
            }
            else if(currentPage > 2) {
                $("#prevBtn").removeClass("hidden");
                $("#firstBtn").removeClass("hidden");
            }
            else {
                $("#prevBtn").addClass("hidden");
                $("#firstBtn").addClass("hidden");
            }
        } else {
            if(btnVal == '« First') {
                currentPage = 1;
                $("#firstBtn").addClass("hidden");
                $("#prevBtn").addClass("hidden");
            }
            else if(btnVal == '« Previous') {
                currentPage--;
                if(currentPage < 7) {
                    $("input[value='...']").val("3");
                    $("input[value='3']").css("cursor", "pointer");
                }
                if(currentPage == 1) {
                    $("#prevBtn").addClass("hidden"); 
                    $("#firstBtn").addClass("hidden"); 
                }
            }
            else if(btnVal == 'Last »') {
                currentPage = 1000;
                $("#nextBtn").addClass("hidden");
                $("#lastBtn").addClass("hidden"); 
                $("#prevBtn").removeClass("hidden");
                $("#firstBtn").removeClass("hidden");
            }
            else if(btnVal == 'Next »') {
                currentPage++;
                if(currentPage == 1000) {
                    $("#nextBtn").addClass("hidden");
                    $("#lastBtn").addClass("hidden");   
                } else if(currentPage == 999)
                    $("#lastBtn").addClass("hidden");
                if(currentPage >= 7) {
                    paginitionBtn9.insertAfter($("input[value="+8+"]").parent());
                    paginitionBtn10.insertAfter($("input[value="+9+"]").parent());
                    $("input[value="+3+"]").val("...");
                    $("input[value='...']").css("cursor", "not-allowed");
                }
                $("#prevBtn").removeClass("hidden");
                $("#firstBtn").removeClass("hidden");
            }
            $("li").removeClass("active");
            $("input[value="+currentPage+"]").parent().addClass("active");
        }
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.themoviedb.org/3/trending/movie/week?api_key=0f61e6eb5dd60b6a59d7b333deba34a0&page="+currentPage);
        xhr.send();
        xhr.onreadystatechange = function (e) {
            if(this.readyState == 4 && this.status == 200 ) {
                fetchMoviesData((JSON.parse(this.responseText)).results);
            }
        }
    })
    var queryStr , type , year;
    var searchBtn = $("#searchBtn");
    $("#searchInp").on("change", function () {
        queryStr = $(this).val();
    });

    $("#typeInp").on("change", function () {
        type = $(this).val();
    });

    $("#yearInp").on("change", function () {
        year = $(this).val();
    });

    var searchArr = [];
    searchBtn.on('click', function() {

        var xhrSearch = new XMLHttpRequest();
        if(year != 'all' && type == 'movie')
        {
            xhrSearch.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=0f61e6eb5dd60b6a59d7b333deba34a0&language=en-US&page=1&include_adult=false&year="+year+"&query="+queryStr);
        }
        else if(year == 'all' && type == 'movie')
        {
            xhrSearch.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=0f61e6eb5dd60b6a59d7b333deba34a0&language=en-US&page=1&include_adult=false&query="+queryStr);
        }
        else if(year != 'all' && type == 'tv')
        {
            xhrSearch.open("GET", "https://api.themoviedb.org/3/search/tv?api_key=0f61e6eb5dd60b6a59d7b333deba34a0&language=en-US&page=1&include_adult=false&year="+year+"&query="+queryStr);
        }
        else if(year == 'all' && type == 'tv')
        {
            xhrSearch.open("GET", "https://api.themoviedb.org/3/search/tv?api_key=0f61e6eb5dd60b6a59d7b333deba34a0&language=en-US&page=1&include_adult=false&query="+queryStr);
        }
        xhrSearch.send();
        xhrSearch.onreadystatechange = function (e) {
            if(this.readyState == 4 && this.status == 200 ) {
                searchArr = JSON.parse(this.responseText).results;
                console.log(searchArr);
                displayMovies(searchArr);
            }
        }
    });
    
    var genersArr = [];
    function getAllGenres() {

        var xhrSearch = new XMLHttpRequest();
        xhrSearch.open("GET", "https://api.themoviedb.org/3/genre/movie/list?api_key=0f61e6eb5dd60b6a59d7b333deba34a0&language=en-US");
        xhrSearch.send();
        xhrSearch.onreadystatechange = function (e) {
            if(this.readyState == 4 && this.status == 200 ) {
                genersArr = (JSON.parse(this.responseText)).genres;
            }
        }
    }

    function getGenreName(genderId)
    {
        for(var i = 0 ; i < genersArr.length ; i++)
        {
            if(genersArr[i].id == genderId)
                return genersArr[i].name;
        }
    }
    $("#logoutLi").on("click", function (e) {  
        e.preventDefault();
        var userDataObj = JSON.parse(getCookie("userData"))
        userDataObj.flag = false;
        setCookie("userData", JSON.stringify(userDataObj));
        location.assign("../browse-movies.html");
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
});