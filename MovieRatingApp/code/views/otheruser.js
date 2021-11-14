function init (){
    document.getElementById("follow").onclick = followclick;
    document.getElementById("unfollow").onclick = unfollowclick;
}

function followclick(){
    let req = new XMLHttpRequest();

    let url = window.location.href;
    let values = url.split("/");
    let username = values[values.length - 1];

    let newItem = {username};

    req.open("POST", `http://localhost:3000/followuser/`, true);
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
    let username = values[values.length - 1];
    
    let newItem = {username};

    req.open("POST", `http://localhost:3000/unfollowuser/`, true);
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