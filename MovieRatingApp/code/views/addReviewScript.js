function init (){
    document.getElementById("submitbutton").onclick = submitbuttonclick;
}

function submitbuttonclick(){
    let score = document.getElementById("scoreID").value;
    let shortreview = document.getElementById("shortreview").value;
    let longreview = document.getElementById("longreview").value;
    
    
    let url = window.location.href;
    let values = url.split("/");
    let title = values[values.length - 1];

    if(shortreview.length > 0 && longreview.length > 0){
        
        let newItem = {score, shortreview, longreview};
        let req = new XMLHttpRequest();

        req.open("POST", `http://localhost:3000/addreview/${title}`, true);
        req.setRequestHeader("Content-Type", "application/json");

        req.onreadystatechange = function(){
            if(req.status === 200){
                window.location.href = req.responseURL;
            }
            else if(req.status == 404){
                alert(this.responseText);
            }
        }

        req.send(JSON.stringify(newItem));

    }
}