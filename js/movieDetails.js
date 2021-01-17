$(function () {
    
     // Loading Function
    //  var loading = $('#loading');
    //  loading.fadeOut(4000, function () {
 
    //      $('body').css('overflow-y', "auto");
    //  })
    
    if(location.href.includes("movieDetails")) {
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
        $("#loginBtn").css("display", "none");
        $("#commentInp").attr("disabled", false);
        $("#commentSubmitBtn").css("cursor", "pointer");
        $("#logoutLi").css("display", "inline");
    } else {
        console.log("Not Existed");
        $("#loginRegisterPart").html(`<ul style="list-style: none;">
                    <li><a style="font-weight: bolder;" href="login.html" class="colorFont">Login</a></li>
                    <li class="colorFont">&nbsp;|&nbsp; </li>
                    <li><a style="font-weight: bolder;" href="Regestration.html" class="colorFont">Register</a></li>
                    </ul>`);
        $("#loginBtn").css("display", "block");
        $("#commentInp").attr("disabled", true);
        $("#commentSubmitBtn").css("cursor", "not-allowed");
        $("#logoutLi").css("display", "none");
        
    }    

    var MovieDetails;
    var genresOfMovie = [];
    var movieImg = $("#movieImg");
    var titleMovie = $("#titleMovie");
    var release_dateMovie = $("#release_dateMovie");
    var geners = $("#geners");
    var movieLikes = $("#movieLikes");
    var movieAudience = $("#movieAudience");
    var movieRate = $("#movieRate");
    var movieSynopsis = $("#movieSynopsis");
    var movieUploadedDate = $("#movieUploadedDate");
    var movieOverview = $("#movieOverview");

    var imgPrefix = "https://image.tmdb.org/t/p/w500/";
    var movieID = decodeURIComponent(window.location.search).substr(1);  // ID Of Movie
    var xhrMovieDetails = new XMLHttpRequest();
    xhrMovieDetails.open("GET", "https://api.themoviedb.org/3/movie/"+movieID+"?api_key=0f61e6eb5dd60b6a59d7b333deba34a0&language=en-US");
    xhrMovieDetails.send();
    xhrMovieDetails.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200 ) {
            MovieDetails = (JSON.parse(this.responseText)); 
            getGenres(MovieDetails.genres);
            displayMovieDetails(MovieDetails);
        }
    }
    function getGenres(genres) {
        for (var i = 0; i < genres.length; i++) {
            genresOfMovie.push(genres[i].name);
        }
    }
    function displayMovieDetails(movieDetails) {
        movieImg.attr("src", imgPrefix+movieDetails.poster_path);
        titleMovie.text(movieDetails.original_title);
        release_dateMovie.text(movieDetails.release_date);
        geners.text(genresOfMovie.join("  |  "));
        movieLikes.text(movieDetails.vote_count);
        if(movieDetails.adult == false)
            movieAudience.text("Audience");
        else
            movieAudience.text("+18");
        movieRate.text(movieDetails.vote_average);
        movieSynopsis.text(movieDetails.overview);
        movieUploadedDate.text(movieDetails.release_date);
        movieOverview.text(movieDetails.overview)
    }
    // Movie Reviews
    var numOfReviews = $("#numOfReviews");
    var reviewContainer = document.getElementById("reviewContainer");
    var movieReviews = [];
    var xhrMovieReviews = new XMLHttpRequest();
    xhrMovieReviews.open("GET", "https://api.themoviedb.org/3/movie/"+movieID+"/reviews?api_key=0f61e6eb5dd60b6a59d7b333deba34a0&language=en-US&page=1");
    xhrMovieReviews.send();
    xhrMovieReviews.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200 ) {
            numOfReviews.text((JSON.parse(this.responseText)).total_results);
            movieReviews = (JSON.parse(this.responseText)).results; 
            displayMovieReviews(movieReviews);
        }
    }
    function displayMovieReviews(reviews) {
        reviewContainer.innerHTML = "";
        for (var i = 0; i < reviews.length; i++) {
            reviewContainer.innerHTML += `
                <div class="review" style="margin-bottom: 0rem">
                    <p class="commentTxt" style="margin-bottom: 0rem">Reviewed by <spna class="userReview">${reviews[i].author}</spna></p>
                    <i class="fa fa-star" id="likes" style="margin-left: 3%;"></i><span class="reviewNum" style="font-size:22px"> ${reviews[i].author_details.rating != null? reviews[i].author_details.rating: 5}</span>
                    <p class="reviewP">${reviews[i].content.substr(0, 200)}<span id="dots">...</span><span id="more">${reviews[i].content.substr(201)}</span></p>
                    <button onclick="readMore(this)" id="myBtn">Read more</button>
                </div>
                <hr class="hrP">`;
        }       
    }
    // Similar Movies
    var similarMoviesContainer = document.getElementById("similarMoviesContainer");
    var similarMovies = [];
    var xhrSimilarMovies= new XMLHttpRequest();
    xhrSimilarMovies.open("GET", "https://api.themoviedb.org/3/movie/"+movieID+"/similar?api_key=0f61e6eb5dd60b6a59d7b333deba34a0&language=en-US&page=1");
    xhrSimilarMovies.send();
    xhrSimilarMovies.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200 ) {
            similarMovies = (JSON.parse(this.responseText)).results; 
            displaySimilarReviews(similarMovies);
        }
    }
    function displaySimilarReviews(similar) {
        similarMoviesContainer.innerHTML = "";
        similarMoviesContainer.innerHTML += `
                            <tr>
                                <td><a href="../movieDetails.html?${similar[0].id}" target="_blank" ><img class="similarMovie" src="${imgPrefix+similar[0].poster_path}"></a></td>
                                <td><a href="../movieDetails.html?${similar[1].id}" target="_blank" ><img class="similarMovie" src="${imgPrefix+similar[1].poster_path}" id="imgleft"></a></td>
                            </tr>
                            <tr>
                                <td><a href="../movieDetails.html?${similar[2].id}" target="_blank" ><img class="similarMovie" src="${imgPrefix+similar[2].poster_path}"></a></td>
                                <td><a href="../movieDetails.html?${similar[3].id}" target="_blank" ><img class="similarMovie" src="${imgPrefix+similar[3].poster_path}" id="imgleft"></a></td>
                            </tr>`;
    }

    
    // Movie Comments
    var commentsOfMovie;
    var commentSubmitBtn = $("#commentSubmitBtn");
    var commentValue;
    $("#commentInp").on("change", function () {
        commentValue = $(this).val();
        if(commentValue != "" && commentValue != undefined) {
            commentSubmitBtn.attr("disabled", false);
        } else {
            commentSubmitBtn.attr("disabled", true);
        }
    });
    var commentsContainer = document.getElementById("commentsContainer");
    commentSubmitBtn.on("click", function () { 
        commentsOfMovie = getCookie("comment"+movieID) != undefined? getCookie("comment"+movieID): "";
        commentsOfMovie += commentValue + ";";
        setCookie("comment"+movieID, commentsOfMovie);
        var userDataObj = JSON.parse(getCookie("userData"))
        userDataObj.numOfComments = parseInt(userDataObj.numOfComments)+ 1;
        setCookie("userData", JSON.stringify(userDataObj));
        commentsContainer.innerHTML = "";
        displayMovieComments();
    });
    function displayMovieComments() {
        var commentsArr = getCookie("comment"+movieID) != undefined?  getCookie("comment"+movieID).split(";"): "";
        if(commentsArr.length >= 0 && commentsArr.length <= 2) {
            $(".float-child3").css("display", "block");
            $(".float-child3").css("height", "auto");
        } else {
            $(".float-child3").css("display", "block");
            $(".float-child3").css("height", "400px");
        }
        var userName = JSON.parse(getCookie("userData")).first_name;
        console.log(userName)
        $("#numberOfComments").text(commentsArr.length == 0? commentsArr.length: commentsArr.length-1);
        for (var i = 0; i < commentsArr.length && commentsArr[i] != ""; i++) {
            commentsContainer.innerHTML += `
                    <div class="comment">
                        <img src="images/default_avatar.jpg" class="userImg">
                        <p id="userName">${userName}</p>
                        <p id="commentText">${commentsArr[i]}</p>
                    </div>`;
        
        }
    }
    
    displayMovieComments();
});

function readMore(element) {
    var dots = $(element).prev().children("#dots");
    var moreText = $(element).prev().children("#more");
  
    if (dots.css("display") === "none") {
        dots.css("display","inline");
        element.innerHTML = "Read more";
        moreText.css("display","none");
    } else {
        dots.css("display","none");
        element.innerHTML = "Read less";
        moreText.css("display","inline");
    }
  }
  
  $("#logoutLi").on("click", function () {  
        
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
    $( document ).ready(function() {
        var userDataObj = JSON.parse(getCookie("userData"))
        if(userDataObj.flag==1)
        {   
            $('#save').get(0).type = 'button';
    
    
        }
    
    
    })
