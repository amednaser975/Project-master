function getCookie(cookieName) {
    if(arguments.length == 1) {

        for (let i = 0; i < document.cookie.split(";").length; i++) {
            
            if(cookieName == document.cookie.split(";")[i].split("=")[0].trim())
            return decodeURIComponent(document.cookie.split(";")[i].split("=")[1]);
        }
    } else
        throw new Error("Not Valid Parameters");
}
function setCookie(cookieName, cookieValue, expiryDate) {
    if(arguments.length == 2 || arguments.length == 3) {
        var myDate = new Date(expiryDate);
        document.cookie = `${cookieName}=${encodeURIComponent(cookieValue)};expires=${myDate.toUTCString()}`;
        
    } else
        throw new Error("Not Valid Parameters");    
}

function deleteCookie(cookieName) {
    if(arguments.length == 1) {
        var expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() - 86400000);
        document.cookie =  cookieName+"=;expires="+expiryDate.toUTCString();
    } else
        throw new Error("Not Valid Parameters");  

}

function allCookieList() {
    if(arguments.length == 0) {
        var cookiesNames = [];
        for (let i = 0; i < document.cookie.split(";").length; i++)
            cookiesNames.push(document.cookie.split(";")[i].split("=")[0]);
        return cookiesNames;
    } else
        throw new Error("Not Valid Parameters");

}

function hasCookie(cookieName) {
    if(arguments.length == 1) {
        for (let i = 0; i < document.cookie.split(";").length; i++) {
            
            if(cookieName == (document.cookie.split(";")[i].split("=")[0]).trim())
                return true;
        }
        return false;
    } else 
        throw new Error("Not Valid Parameters");
}