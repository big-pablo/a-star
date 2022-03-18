console.log("Test");
var tablegenerated = false; //Проверялка
function generate(){
  if (tablegenerated == false)
  {
    var body = document.getElementsByTagName("body")[0];
    var size = document.getElementById("size").value;
    var div = document.createElement("div");
    console.log(size);
    var tbl = document.createElement("table");
    for (var i = 0; i < parseInt(size); i++) 
    {
        var row = document.createElement("tr");
        for (var j = 0; j < parseInt(size); j++) 
        {
          var cell = document.createElement("td");
          row.appendChild(cell);
          var txt = document.createElement("p");
          cell.appendChild(txt);
          txt.innerText = "             "; //Пофиксил, вставив невидимые символы
          //Теперь координаты задаются как x y
          cell.setAttribute("id", i + " " + j);
          cell.setAttribute("xcoord", i); //Добавил кастомные атрибуты чтобы можно было выдёргивать координаты х и у отдельно
          cell.setAttribute("ycoord", j);
          cell.setAttribute("class", "pass");
         // console.log(cell.getAttribute("id"));
        }
        tbl.appendChild(row);
    }
    div.appendChild(tbl)
    body.appendChild(div);
    tablegenerated = true;
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
  else
  {
    alert("Таблица уже создана");  //Добавил проверку на созданность таблицы
  }
}

function generatemaze()
{
  var size = parseInt(document.getElementById("size").value); //todo: как-нибудь запоминать сайз, чтобы при изменении размера в input, всё не ломалось
  for (let i = 0; i < size; i++)
  {
    for (let k = 0; k < size; k++)
    {
      document.getElementById(i + " " + k).className = 'impass';
    }
  }
  var x = getRandomIntInclusive(0,size/2-1) * 2 + 1;
  console.log(x);
  var y = getRandomIntInclusive(0,size/2-1) * 2 + 1;
  console.log(y);
  (document.getElementById(x + " " + y)).className = 'pass';
  let tocheck = new Array();
  if (y-2 >= 0)
  {
    tocheck.push(document.getElementById(x + " " + (y - 2)));
  }
  if (y + 2 < size)
  {
    tocheck.push(document.getElementById(x + " " + (y + 2)));
  }
  if (x - 2 >= 0)
  {
    tocheck.push(document.getElementById((x - 2) + " " + y));
  }
  if (x + 2 < size)
  {
    tocheck.push(document.getElementById((x + 2) + " " + y));
  }
  while (tocheck.length > 0)
  {
    var index = getRandomIntInclusive(0,tocheck.length-1);
    var toclear = tocheck[index];
    tocheck.splice(index,1);
    toclear.className = 'pass';
    var x = toclear.getAttribute("xcoord");
    var y = toclear.getAttribute('ycoord');
    var directions = ['up','down','left','right'];
    while (directions.length > 0)
    {
      var direction = getRandomIntInclusive(0,directions.length-1);
      console.log(directions[direction]);
      switch(directions[direction])
      {
        case 'up':
          if (y-2 >= 0 && document.getElementById(x + " " + (y-2)).className == "pass")
          {
            document.getElementById(x + " " + (y-1)).className = "pass";
            directions.splice(0,directions.length-1);
          }
          break;
        case 'down':
          if (y+2 < size && document.getElementById(x + " " + (y+2)).className == "pass")
          {
            document.getElementById(x + " " + (y+1)).className = "pass";
            directions.splice(0,directions.length-1);
          }
          break;
        case 'left':
          if (x-2>=0 && document.getElementById((x-2) + " " + y).className == "pass")
          {
            document.getElementById((x-1) + " " + y).className = "pass";
            directions.splice(0,directions.length-1);
          }
          break;
        case 'right':
          if (x+2 < size && document.getElementById((x+2) + " " + y).className == "pass") //Пофиксить разбиванием на два ifы
          {
           document.getElementById((x+1) + " " + y).className = "pass";
           directions.splice(0,directions.length-1);
          }
          break;
      }
      directions.splice(direction,1);
    }
    if (y-2 >= 0 && document.getElementById(x + ' ' + (y-2)).className == "impass")
  {
    tocheck.push(document.getElementById(x + " " + (y - 2)));
  }
  if (y + 2 < size && document.getElementById(x + ' ' + (y+2)).className == "impass")
  {
    tocheck.push(document.getElementById(x + " " + (y + 2)));
  }
  if (x - 2 >= 0 && document.getElementById((x-2) + ' ' + y).className == "impass")
  {
    tocheck.push(document.getElementById((x - 2) + " " + y));
  }
  if (x + 2 < size && document.getElementById((x+2) + ' ' + y).className == "impass")
  {
    tocheck.push(document.getElementById((x + 2) + " " + y));
  }
  }
}

function getRandomIntInclusive(min, max) { //Функция рандома, ибо Math.random в JS берёт число в промежутке 0-1
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}