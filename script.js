const sudoBoxTable = document.getElementById("sudo-box-table");
const inpt = document.querySelector("input");
const iShpaesOpt = document.querySelector(".i-shapes-opt");
const sudoOpt = document.getElementById("sudo-opt");
let currentBox = null;
let sudoBoxHasFocus = false
let shapesHasFocus = false


//draw table on input field value change
inpt.onchange = (e) => {
  if (!isNaN(inpt.value)) {
    sudoBoxTable.innerHTML = "";
    let n = Number(inpt.value);
    let tableRow = "<tr>"
    for (var i = 0; i < n; i++){
      tableRow += "<td></td>";
    }
    tableRow += "</tr>"
    for (var i = 0; i < n; i++){
      sudoBoxTable.innerHTML += tableRow
    }
    sudoOpt.innerHTML = tableRow;
  }
}


//set onclic listener on each cell of the grid
sudoBoxTable.onclick = (e) => {
  let elem = null
  if (e.target.tagName == "TD") {
    elem = e.target;
  } else {
    elem = e.target.parentElement
  }
  var rect = elem.getBoundingClientRect();
  iShpaesOpt.style.display = "grid";
  iShpaesOpt.style.top = (rect.top + 45) + "px";
  iShpaesOpt.style.left = (rect.left) + "px";
  currentBox = elem;
  sudoBoxHasFocus = true
}


//remove input options on focusout
sudoBoxTable.onblur = () => {
  sudoBoxHasFocus = false
  iShpaesOpt.focus();
  if (!sudoBoxHasFocus && !shapesHasFocus) {
    iShpaesOpt.style.display = "none"
    currentBox = null;
  }
}



const shapes = document.querySelectorAll(".shapes");


//set onclick listener on the shapes input
shapes.forEach(item => {
  item.onclick = () => {
    if(item.innerHTML != currentBox.innerHTML)
      currentBox.innerHTML = item.innerHTML;
    else
      currentBox.innerHTML = ""
  }
})

iShpaesOpt.onfocus = () => {
  shapesHasFocus = true;
}

iShpaesOpt.onblur = () => {
  shapesHasFocus = false
  if (!sudoBoxHasFocus && !shapesHasFocus) {
    iShpaesOpt.style.display = "none";
    currentBox = null;
  }
}


const solveBtn = document.getElementById("solveBtn");

//set onclick listener on solve button

solveBtn.onclick = () => {
  let arr = []
  let uniqueSym = []

  sudoOpt.firstElementChild.childNodes.forEach(child => {
    uniqueSym.push(shapeIds[child.innerHTML.trim()])
  })
  for (var i = 0; i < sudoBoxTable.childNodes.length; i++){
    arr.push([])
  }
  sudoBoxTable.childNodes.forEach((item, i) => {
    item.childNodes.forEach(item1 => {
      let temp = shapeIds[item1.innerHTML.trim()]
      arr[i].push(temp)
    })
  })
  count = 0;
  while (true) {
    count++
    for (var i = 0; i < arr.length; i++){
      for (var j = 0; j < arr[i].length; j++) {
        if (arr[i][j] == 0) {
          let column = getColumn(arr, j);
          let row = getRow(arr, i);
          let temp = [...uniqueSym]
          uniqueSym.forEach(item => {
            if (column.includes(item) || row.includes(item)) {
              temp.splice(temp.indexOf(item), 1)
            }
          })
          if (temp.length == 1) {
            arr[i][j] = temp[0]
          }
        }
      }
    }
    if (isSolved(arr)) {
      break;
    }

    if (count > arr.length * arr.length) {
      break;
    }
  }

  let arr1 = sudoBoxTable.childNodes;
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      arr1[i].childNodes[j].innerHTML = Object.keys(shapeIds)[arr[i][j]];
    }
  }
}

function getColumn(arr, column) {
  res = []
  for (var i = 0; i < arr.length; i++){
    res.push(arr[i][column])
  }
  return res;
}

function getRow(arr, row) {
  return arr[row];
}

const shapeIds = {
  '': 0,
  '<i class="ph-star-fill"></i>': 1,
  '<i class="ph-triangle-fill"></i>': 2,
  '<i class="ph-circle-fill"></i>': 3,
  '<i class="ph-plus-fill"></i>': 4,
  '<i class="ph-square-fill"></i>': 5,
  '<i class="ph-heart-fill"></i>': 6,
  '<i class="ph-question-bold"></i>': 7,
};

function isSolved(arr) {
  res = true;
  arr.forEach(i => {
    i.forEach(j => {
      if (j == 0)
        res = false;
    })
  })
  return res;
}



sudoOpt.onclick = (e) => {
  let elem = null;
  if (e.target.tagName == "TD") {
    elem = e.target;
  } else {
    elem = e.target.parentElement;
  }
  var rect = elem.getBoundingClientRect();
  iShpaesOpt.style.display = "grid";
  iShpaesOpt.style.top = rect.top + 45 + "px";
  iShpaesOpt.style.left = rect.left + "px";
  currentBox = elem;
  sudoBoxHasFocus = true;
}