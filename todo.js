const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDOList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];
let newId = 0;

function deleteToDos(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDOList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  }); // 각각의 toDos에 대한 filterFn 동작을 만족하는 array 반환
  toDos = cleanToDos;
  toDoForm.classList.add("showing");
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");

  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDos);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDOList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
  newId++;
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  if (currentValue !== "") {
    paintToDo(currentValue);
    toDoInput.value = "";
  }
  checkMaxiumList();
}

function loadToDos() {
  const loadToDos = localStorage.getItem(TODOS_LS);
  if (loadToDos !== null) {
    const parsedToDos = JSON.parse(loadToDos);
    parsedToDos.forEach(function (toDo) {
      // function 내부 구현
      paintToDo(toDo.text);
    });
  }
  checkMaxiumList();
}

function checkMaxiumList() {
  if (toDos.length >= 10) {
    toDoForm.classList.remove("showing");
    console.log("working");
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
