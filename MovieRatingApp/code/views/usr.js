function init (){
    document.getElementById("people").onclick = browsePeople;
    document.getElementById("movies").onclick = browseMovies;
    document.getElementById("userType").onclick = changeUserType;
    document.getElementById("addMovie").onclick = addMoviePage;
    document.getElementById("addPerson").onclick = addPersonPage;
    document.getElementById("search").onclick = search;
    document.getElementById("logout").onclick = logout;
}

function logout(){
    window.location.href = "http://localhost:3000/";
}

function search(){

    let req = new XMLHttpRequest();
    let param = document.getElementById("searchparam").value;
    
    if(param.length > 0){
        req.open("GET", `http://localhost:3000/search/${param}`, true);
        req.setRequestHeader("Content-Type", "application/json");
        req.onreadystatechange = function(){
            if(req.status === 200){
                window.location.href = req.responseURL;
            }
            else if(req.status == 404){
                console.log("ERROR 404:No such request");
            }
        }
        req.send();
    }

}

function browsePeople(){

    let req = new XMLHttpRequest();
    
    req.open("GET", `http://localhost:3000/requestpeople`, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.onreadystatechange = function(){
        if(req.status === 200){
            window.location.href = req.responseURL;
        }
        else if(req.status == 404){
            console.log("ERROR 404:No such request");
        }
    }
    req.send();
}


function browseMovies(){

    console.log("Loading people page");
    let req = new XMLHttpRequest();
    
    req.open("GET", `http://localhost:3000/requestmovies`, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.onreadystatechange = function(){
        if(req.status === 200){
            window.location.href = req.responseURL;
        }
        else if(req.status == 404){
            console.log("ERROR 404: No such request");
        }
    }
    req.send();
}

function addMoviePage(){

    console.log("Loading people page");
    let req = new XMLHttpRequest();
    
    req.open("GET", `http://localhost:3000/addMoviePage`, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.onreadystatechange = function(){
        if(req.status === 200){
            window.location.href = req.responseURL;
        }
        else if(req.status == 404){
            console.log("ERROR 404: No such request");
        }
    }
    req.send();
}


function addPersonPage(){

    console.log("Loading people page");
    let req = new XMLHttpRequest();
    
    req.open("GET", `http://localhost:3000/addPersonPage`, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.onreadystatechange = function(){
        if(req.status === 200){
            window.location.href = req.responseURL;
        }
        else if(req.status == 404){
            console.log("ERROR 404: No such request");
        }
    }
    req.send();
}


function changeUserType(){

    console.log("Loading people page");
    let req = new XMLHttpRequest();
    
    req.open("POST", `http://localhost:3000/changeUserType`, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.onreadystatechange = function(){
        if(req.status === 200){
            window.location.href = req.responseURL;
        }
        else if(req.status == 404){
            console.log("ERROR 404: No such request");
        }
    }
    req.send();
}