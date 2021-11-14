function init (){
    document.getElementById("follow").onclick = followclick;
    document.getElementById("unfollow").onclick = unfollowclick;
}

function followclick(){

    console.log("working");
    let req = new XMLHttpRequest();

    let url = window.location.href;
    let values = url.split("/");
    let Id = values[values.length - 1];

    let newItem = {Id};

    req.open("POST", `http://localhost:3000/followperson/`, true);
    req.setRequestHeader("Content-Type", "application/json");


    req.onreadystatechange = function(){
        if(req.status === 200){
            window.location.href = req.responseURL;
        }
        else if(req.status == 404){
            console.log(this.responseText);
        }
    }
    
    req.send(JSON.stringify(newItem));
}

function unfollowclick(){

    let req = new XMLHttpRequest();

    let url = window.location.href;
    let values = url.split("/");
    let Id = values[values.length - 1];
    
    let newItem = {Id};

    req.open("POST", `http://localhost:3000/unfollowperson/`, true);
    req.setRequestHeader("Content-Type", "application/json");


    req.onreadystatechange = function(){
        if(req.status === 200){
            window.location.href = req.responseURL;
        }
        else if(req.status == 404){
            console.log(this.responseText);
        }
    }
    
    req.send(JSON.stringify(newItem));
}