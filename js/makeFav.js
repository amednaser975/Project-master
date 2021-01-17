
$( "#save" ).click(function() {
  var movieID = decodeURIComponent(window.location.search).substr(1);  // ID Of Movie
  var imgSrc = $('#movieImg').attr('src');
  var t = $('#titleMovie').text();
  var mr= $('#movieRate').text(); 
  //console.log(mr)
  //console.log(t)
  //console.log(imgSrc)
 
  var userDataObj = JSON.parse(getCookie("userData"))
  var obj=
  {
      img:imgSrc,
      title:t,
      rate:mr,
      id:movieID
      
  }
  var len  = userDataObj.favMovs.length;
  var temp = [];
  for(i=0 ; i<len ;i++)
  {
     temp.push(userDataObj.favMovs[i]["title"]);
  }
  if(!temp.includes(t))
  {  
      console.log("Added")
      userDataObj.favMovs.push(obj)
      $("#inc").hide();
  }
  else{

      console.log("already INCLUDED")
      $("#inc").show(); 

  }
  setCookie("userData", JSON.stringify(userDataObj));


});