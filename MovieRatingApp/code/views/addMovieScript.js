function init (){
    document.getElementById("add").onclick = addMovie;
}

function addMovie(){
    let title = document.getElementById("title").value;
    let date = document.getElementById("date").value;
    let genre = document.getElementById("genre").value;
    let stars = document.getElementById("stars").value;
    let writer = document.getElementById("writer").value;
    let director = document.getElementById("director").value;
    let runtime = document.getElementById("runtime").value;
    let plot = document.getElementById("plot").value;

    if(title.length > 0 && date.length > 0 && genre.length > 0, stars.length > 0, writer.length > 0, director.length > 0, runtime.length > 0, plot.length > 0){
        let item = {title, date, genre, stars, writer, director, runtime, plot};

        let req = new XMLHttpRequest();
        req.open("POST", `http://localhost:3000/addMovieObject`, true);
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