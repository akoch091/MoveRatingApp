function init (){
    document.getElementById("reviewButton").onclick = reviewButtonClick;
}

function reviewButtonClick(){

    let req = new XMLHttpRequest();
    let title = document.getElementById("title").innerHTML;
    console.log(title);
    
    req.open("GET", `http://localhost:3000/review/${title}`, true);
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