function init (){
    document.getElementById("submit").onclick = submitbuttonclick;
}

function submitbuttonclick(){
    let actor = document.getElementById("actors").value;
    let director = document.getElementById("directors").value;
    let writer = document.getElementById("writers").value;

    let url = window.location.href;
    let values = url.split("/");
    let Id = values[values.length - 1];

    let newItem = {actor, director, writer};
    let req = new XMLHttpRequest();

    req.open("POST", `http://localhost:3000/editmoviepage/${Id}`, true);
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
