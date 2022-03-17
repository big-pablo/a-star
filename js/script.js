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
          cell.setAttribute("id", i + " " + j);
          cell.setAttribute("class", "pass");
          console.log(cell.getAttribute("id"));
        }
        tbl.appendChild(row);
    }
    div.appendChild(tbl)
    body.appendChild(div);

    let cells = document.querySelectorAll("td");
    cells.forEach(function (element)
    {
        element.onclick = function () {
          if (element.className === "pass")
          {
            element.className = "impass";
          }
          else if (element.className === "impass")
          {
            element.className = "pass";
          }
        }
    })
}