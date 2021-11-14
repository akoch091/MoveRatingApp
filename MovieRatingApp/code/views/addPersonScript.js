function init (){
    document.getElementById("add").onclick = addPerson;
}

function addPerson(){
    let name = document.getElementById("name").value;
    let bio = document.getElementById("bio").value;

    if(name.length > 0 && bio.length > 0){
        let item = {name, bio,}

        let req = new XMLHttpRequest();
        req.open("POST", `http://localhost:3000/addPersonObject`, true);
        req.setRequestHeader("Content-Type", "application/json");
        req.onreadystatechange = function(){
            if(req.status === 200){
               window.location.href = req.responseURL;
            }
            else if(req.status == 403){
                alert(this.responseText);
            }
            else if(req.status == 401){
                alert(this.responseText);
            }
        }
        req.send(JSON.stringify(item));

    }else{
        alert("Please fill in all the text boxes.");
    }
}