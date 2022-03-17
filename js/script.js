console.log("Test");
function generate(){
    var body = document.getElementsByTagName("body")[0];
    var size = document.getElementById("size").value;
    var div = document.createElement("div");
    console.log(size);
    var tbl = document.createElement("table");
    for (var j = 0; j < parseInt(size); j++) 
    {
        var row = document.createElement("tr");
        for (var i = 0; i < parseInt(size); i++) 
        {
          var cell = document.createElement("td");
          row.appendChild(cell);
          var txt = document.createElement("p");
          txt.innerText = "AAA||||";
          cell.appendChild(txt);
        }
        tbl.appendChild(row);
    }
    div.appendChild(tbl)
    body.appendChild(div);
}
  
