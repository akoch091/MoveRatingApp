
function init (){
    document.getElementById("si").onclick = submitSignIN;
    document.getElementById("su").onclick = submitSignUP;
}

function submitSignIN(){

    let username = document.getElementById("uname").value;
    let password = document.getElementById("pword").value;

    if(username.length > 0 && password.length > 0){
        
        let newItem = {username, password};
        let req = new XMLHttpRequest();
        
        req.open("POST", `http://localhost:3000/signin`, true);
        req.setRequestHeader("Content-Type", "application/json");
        req.onreadystatechange = function(){
            if(req.status === 200){
               window.location.href = req.responseURL;
            }
            else if(req.status == 403){
                document.getElementById("lbl").innerHTML = this.responseText;
            }
            else if(req.status == 401){
                document.getElementById("lbl").innerHTML = this.responseText;
            }
        }
        req.send(JSON.stringify(newItem));

    }else{
        alert("You have to enter a username and a password.");
    }
}

//signup
function submitSignUP(){
    console.log("submitting");
    let username = document.getElementById("uname").value;
    let password = document.getElementById("pword").value;

    if(username.length > 0 && password.length > 0){
        //can send itnodem
        let newItem = {username, password};
        let req = new XMLHttpRequest();
        
        req.open("POST", `http://localhost:3000/signup`, true);
        req.setRequestHeader("Content-Type", "application/json");
        req.onreadystatechange = function(){
            if(req.status === 200)
            {
                document.getElementById("lbl").innerHTML = this.responseText;
            }
            else 
            {
                document.getElementById("lbl").innerHTML = this.responseText;
            }
        }
        req.send(JSON.stringify(newItem));

    }else{
        alert("You have to enter a username and a password.");
    }
}