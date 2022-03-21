console.log("Test");
var tableGenerated = false; //Проверялка
var selectingStart = false;
var selectingFinish = false;

function generate(){
  if (tableGenerated == false)
  {
    var body = document.getElementsByTagName("body")[0];
    var size = document.getElementById("size").value;
    var container = document.createElement("container");
    container.className = "container";
    console.log(size);
    var tbl = document.createElement("table");
    for (var i = 0; i < parseInt(size); i++) 
    {
        var row = document.createElement("tr");
        for (var j = 0; j < parseInt(size); j++) 
        {
          var cell = document.createElement("td");
          row.appendChild(cell);
          var content = document.createElement("div"); //Чтобы текст случайно не выделялся, заменил его на div'ы фиксированного размера
          content.className = "content";
          cell.appendChild(content);
          cell.id = i + " " + j;
          //Теперь координаты задаются как x y
          cell.setAttribute("xcoord", i); //Добавил кастомные атрибуты чтобы можно было выдёргивать координаты х и у отдельно
          cell.setAttribute("ycoord", j);
          cell.className = "pass";
        }
        tbl.appendChild(row);
    }
    container.appendChild(tbl)
    body.appendChild(container);
    tableGenerated = true;
    let cells = document.querySelectorAll("td");
    cells.forEach(function (element)
    {
        element.onclick = function ()
        {
          if (selectingStart)
          {
            element.className = "start pass";
            var button = document.getElementById("selectstart")
            button.style.color = "hsl(140, 100%, 30%)";
            selectingStart = false;
          }
          else if (selectingFinish)
          {
            element.className = "finish pass";
            var button = document.getElementById("selectfinish")
            button.style.color = "hsl(350, 80%, 50%)";
            selectingFinish = false;
          }
          else if (element.classList.contains("pass"))
          {
            element.className = "impass";
          }
          else if (element.classList.contains("impass"))
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

function selectstart()
{
  if (tableGenerated)
  {
    selectingStart = true;
    selectingFinish = false;
    var button = document.getElementById("selectstart")
    button.style.color = "grey";
    var start = document.querySelector(".start");
    if (start != null)
    {
      start.className = "pass";
    }
  }
  else
  {
    alert("Создайте таблицу");
  }
}

function selectfinish()
{
  if (tableGenerated)
  {
    selectingFinish = true;
    selectingStart = false;
    var button = document.getElementById("selectfinish")
    button.style.color = "grey";
    var finish = document.querySelector(".finish");
    if (finish != null)
    {
      finish.className = "pass";
    }
  }
  else
  {
    alert("Создайте таблицу");
  }
}

function generatemaze()
{
  var size = parseInt(document.getElementById("size").value); //todo: как-нибудь запоминать сайз, чтобы при изменении размера в input, всё не ломалось
  var matrix = new Array(size); //Как я прочитал, в js нет двумерных массивов
  var visitedmatrix = new Array(size);
  for (let i = 0; i < size; i++)
  {
    matrix[i] = new Array(size); //Поэтому я делаю массив массивов
    visitedmatrix[i] = new Array(size);
    for (let k = 0; k < size; k++)
    {
      var current = document.getElementById(i + " " + k);
      if (oddPosition(i,k) == false)
      {
        current.className ='impass';
      }
      matrix[i][k] = current;
      visitedmatrix[i][k] = false;
    }
  }
  var x = getRandomIntInclusive(0,size/2-1) * 2 + 1;
  var y = getRandomIntInclusive(0,size/2-1) * 2 + 1;
  dfs(matrix,x,y,size, visitedmatrix);
}

function dfs(matrix, x, y, size, visitedmatrix)
{
  visitedmatrix[x][y] = true; 
  matrix[x][y].className = "pass";
  var directions = ["up","down","right","left"]
  while (directions.length != 0)
  {
    var dir = getRandomIntInclusive(0,directions.length-1);
    switch(directions[dir])
    {
      case "up":
        if (isInside(x,y-2,size) && matrix[x][y-2].className == "pass" && visitedmatrix[x][y-2] == false)
        {
          matrix[x][y-1].className = "pass";
          dfs(matrix, x, y-2, size, visitedmatrix);
        }
        directions.splice(dir, 1);
      break;
      case "down":
        if (isInside(x,y+2,size) && matrix[x][y+2].className == "pass" && visitedmatrix[x][y+2] == false)
        {
          matrix[x][y+1].className = "pass";
          dfs(matrix, x, y+2, size, visitedmatrix);
        }
        directions.splice(dir, 1);
      break;
      case "right":
        if (isInside(x-2,y,size) && matrix[x-2][y].className == "pass" && visitedmatrix[x-2][y] == false)
        {
          matrix[x-1][y].className = "pass";
          dfs(matrix, x-2, y, size,visitedmatrix);
        }
        directions.splice(dir, 1);
      break;
      case "left":
        if (isInside(x+2,y,size) && matrix[x+2][y].className == "pass" && visitedmatrix[x+2][y] == false)
        {
          matrix[x+1][y].className = "pass";
          dfs(matrix, x+2, y, size, visitedmatrix);
        }
        directions.splice(dir, 1);
      break;
    }
  }
}

function isInside(x,y,size)
{
    if (x < size && x>=0 && y<size && y >=0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function getRandomIntInclusive(min, max) { //Функция рандома, ибо Math.random в JS берёт число в промежутке 0-1
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}


function oddPosition(x, y)
{
  if (x % 2 != 0 && y % 2 != 0)
  {
    return true;
  }
  else
  {
    return false;
  }
}