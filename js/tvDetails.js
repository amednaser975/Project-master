$(function () {
    
    //  // Loading Function
    //  var loading = $('#loading');
    //  loading.fadeOut(4000, function () {
 
    //      $('body').css('overflow-y', "auto");
    //  })
 
    
    if(location.href.includes("tvDetails")) {
        console.log("tvdeta")
        $("#tvPage").addClass("activePage");
    } else {
        $("#tvPage").removeClass("activePage");
    }

    
    if(hasCookie("userData") && JSON.parse(getCookie("userData")).flag) {
        console.log("Existed")
        var userName = JSON.parse(getCookie("userData")).first_name;
        $("#loginRegisterPart").empty();
        $("#loginRegisterPart").html(`<li><a href="../watchList.html" style="text-decoration:none">My List</a></li><li><a href="./profile.html" style="text-decoration:none">${userName}...</a></li><li id="imgLi"><img id="imgOfUser" src="./images/default_avatar.jpg" style="width: 30px;height: 30px;border-radius: 50%;position: relative;bottom: 6px;left: 10px;"></li>`);
        
        // $("#ml").append(`<a href="../watchList.html" style="text-decoration:none">My List</a>`);

        $("#loginBtn").css("display", "none");
        $("#commentInp").attr("disabled", false);
        $("#commentSubmitBtn").css("cursor", "pointer");
        $("#logoutLi").css("display", "inline");
        $("#toggleLogInOutBtn").text("Logout");
    } else {
        console.log("Not Existed");
        $("#loginRegisterPart").empty();
        $("#loginRegisterPart").html(`<ul style="list-style: none;">
                    <li><a style="font-weight: bolder;" href="login.html" class="colorFont">Login</a></li>
                    <li class="colorFont">&nbsp;|&nbsp; </li>
                    <li><a style="font-weight: bolder;" href="Regestration.html" class="colorFont">Register</a></li>
                    </ul>`);
        $("#loginBtn").css("display", "block");
        $("#commentInp").attr("disabled", true);
        $("#commentSubmitBtn").css("cursor", "not-allowed");
        $("#toggleLogInOutBtn").text("LogIn");
        $("#logoutLi").css("display", "none");
        
    }    

    var TvDetails;
    var genresOfTv = [];
    var tvImg = $("#tvImg");
    var titleTv = $("#titleTv");
    //var release_dateMovie = $("#release_dateMovie");
    var geners = $("#geners");
    var tvLikes = $("#tvLikes");
    var tvAudience = $("#tvAudience");
    var tvRate = $("#tvRate");
    var tvSynopsis = $("#tvSynopsis");
    var tvUploadedDate = $("#tvUploadedDate");
    var imgPrefix = "https://image.tmdb.org/t/p/w500/";
    var tvID = decodeURIComponent(window.location.search).substr(1);  // ID Of tv
    var xhrTvDetails = new XMLHttpRequest();
    xhrTvDetails.open("GET", "https://api.themoviedb.org/3/tv/"+tvID+"?api_key=0f61e6eb5dd60b6a59d7b333deba34a0&language=en-US");
    xhrTvDetails.send();
    xhrTvDetails.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200 ) {
            TvDetails = (JSON.parse(this.responseText)); 
            getGenres(TvDetails.genres);
            displayTvDetails(TvDetails);
        }
    }
    function getGenres(genres) {
        for (var i = 0; i < genres.length; i++) {
            genresOfTv.push(genres[i].name);
        }
    }
    function displayTvDetails(TvDetails) {
        tvImg.attr("src", imgPrefix+TvDetails.poster_path);
        titleTv.text(TvDetails.name);
        //release_dateMovie.text(TvDetails.release_date);
        geners.text(genresOfTv.join("  |  "));
        tvLikes.text(TvDetails.vote_count);
        if(TvDetails.adult == false)
            tvAudience.text("Audience");
        else
            tvAudience.text("+18");
        tvRate.text(TvDetails.vote_average);
        tvSynopsis.text(TvDetails.overview);
        tvUploadedDate.text(TvDetails.release_date)
    }
    // TV Reviews
    var numOfReviews = $("#numOfReviews");
    var reviewContainer = document.getElementById("reviewContainer");
    var tvReviews = [];
    var xhrTvReviews = new XMLHttpRequest();
    xhrTvReviews.open("GET", "https://api.themoviedb.org/3/tv/"+tvID+"/reviews?api_key=0f61e6eb5dd60b6a59d7b333deba34a0&language=en-US&page=1");
    xhrTvReviews.send();
    xhrTvReviews.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200 ) {
            numOfReviews.text((JSON.parse(this.responseText)).total_results);
            tvReviews = (JSON.parse(this.responseText)).results; 
            displayTvReviews(tvReviews);
        }
    }
    function displayTvReviews(reviews) {
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
    var similarTvsContainer = document.getElementById("similarTvsContainer");
    var similarTvs = [];
    var xhrSimilarTvs = new XMLHttpRequest();
    xhrSimilarTvs.open("GET", "https://api.themoviedb.org/3/tv/"+tvID+"/similar?api_key=0f61e6eb5dd60b6a59d7b333deba34a0&language=en-US&page=1");
    xhrSimilarTvs.send();
    xhrSimilarTvs.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200 ) {
            similarTvs = (JSON.parse(this.responseText)).results; 
            displaySimilarReviews(similarTvs);
        }
    }
    function displaySimilarReviews(similar) {
        similarTvsContainer.innerHTML = "";
        similarTvsContainer.innerHTML += `
                            <tr>
                                <td><a href="../tvDetails.html?${similar[0].id}" target="_blank" ><img class="similarTv" src="${imgPrefix+similar[0].poster_path}"></a></td>
                                <td><a href="../tvDetails.html?${similar[1].id}" target="_blank" ><img class="similarTv" src="${imgPrefix+similar[1].poster_path}" id="imgleft"></a></td>
                            </tr>
                            <tr>
                                <td><a href="../tvDetails.html?${similar[2].id}" target="_blank" ><img class="similarTv" src="${imgPrefix+similar[2].poster_path}"></a></td>
                                <td><a href="../tvDetails.html?${similar[3].id}" target="_blank" ><img class="similarTv" src="${imgPrefix+similar[3].poster_path}" id="imgleft"></a></td>
                            </tr>`;
    }

    
    // Tv Comments
    var commentsOfTv;
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
        commentsOfTv = getCookie("comment"+tvID) != undefined? getCookie("comment"+tvID): "";
        commentsOfTv += commentValue + ";";
        setCookie("comment"+tvID, commentsOfTv);
        var userDataObj = JSON.parse(getCookie("userData"))
        userDataObj.numOfComments = parseInt(userDataObj.numOfComments)+ 1;
        setCookie("userData", JSON.stringify(userDataObj));
        commentsContainer.innerHTML = "";
        displayTvComments();
    });
    function displayTvComments() {
        var commentsArr = getCookie("comment"+tvID) != undefined?  getCookie("comment"+tvID).split(";"): "";
        console.log(commentsArr)
        if(commentsArr.length >= 0 && commentsArr.length <= 2) {
            $(".float-child3").css("display", "block");
            $(".float-child3").css("height", "auto");
        } else {
            $(".float-child3").css("display", "block");
            $(".float-child3").css("height", "400px");
        }
        $("#numberOfComments").text(commentsArr.length == 0? commentsArr.length: commentsArr.length-1);
        for (var i = 0; i < commentsArr.length && commentsArr[i] != ""; i++) {
            commentsContainer.innerHTML += `
                    <div class="comment">
                        <img src="images/default_avatar.jpg" class="userImg">
                        <p class="commentTxt">${commentsArr[i]}</p>
                        <div class="divComment">
                            <p class="pMovie"> 0 <i class="fa fa-heart likes"></i></p>
                        </div>
                    </div>`;
        
        }
    }
    displayTvComments();
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