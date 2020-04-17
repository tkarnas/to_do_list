//Selectors - selectiramo elemente iz HTML-a te ih stavljamo kao varijable u JS
const upis = document.querySelector(".todo-input");
const plusGumb = document.querySelector(".plus-button");
const listaUL = document.querySelector(".todo-lista");
const filter = document.querySelector(".drop-menu");

//Event Listeners - dodavanje funkcionalnosti prilikom klika
document.addEventListener("DOMContentLoaded", getTodo);
plusGumb.addEventListener("click", dodavanje);
listaUL.addEventListener("click", deleteCheck);
filter.addEventListener("click", dropMenu);

//Functions
function dodavanje(event) {
  //prilikom submitanja forme da nam se ne refresha cijela stranica
  event.preventDefault();
  //napraviti div
  const listaDiv = document.createElement("div");
  listaDiv.classList.add("todo-div");
  //napraviti LI
  const listaLi = document.createElement("li");
  listaLi.innerText = upis.value;
  listaLi.classList.add("todo-li");
  listaDiv.appendChild(listaLi);
  //spremati listu na local storage
  saveToLocal(upis.value);
  //napraviti gumb za precrtavanje zadatka
  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = '<i class="fas fa-check-circle"></i>';
  completeBtn.classList.add("completed");
  listaDiv.appendChild(completeBtn);
  //napraviti gumb za brisanje
  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
  trashBtn.classList.add("trash");
  listaDiv.appendChild(trashBtn);
  //dodati na listu
  listaUL.appendChild(listaDiv);
  //izbrisati početno polje upisa nakon svakog submitanja
  upis.value = "";
}

function deleteCheck(e) {
  const klik = e.target;
  delete todo;
  if (klik.classList[0] === "trash") {
    const todo = klik.parentElement;
    //  animation
    todo.classList.add("animacija");
    removeFromLocal(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // check mark
  if (klik.classList[0] === "completed") {
    const todo = klik.parentElement;
    todo.classList.toggle("done");
  }
}

function dropMenu(e) {
  const todos = listaUL.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "done":
        if (todo.classList.contains("done")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "undone":
        if (!todo.classList.contains("done")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveToLocal(todo) {
  let todos;
  //pregled da li vec postoji koji zadatak spremljen u local storage-u
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodo() {
  let todos;
  //pregled da li vec postoji koji zadatak spremljen u local storage-u
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const listaDiv = document.createElement("div");
    listaDiv.classList.add("todo-div");
    //napraviti LI
    const listaLi = document.createElement("li");
    listaLi.innerText = todo;
    listaLi.classList.add("todo-li");
    listaDiv.appendChild(listaLi);
    //napraviti gumb za precrtavanje zadatka
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fas fa-check-circle"></i>';
    completeBtn.classList.add("completed");
    listaDiv.appendChild(completeBtn);
    //napraviti gumb za brisanje
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add("trash");
    listaDiv.appendChild(trashBtn);
    //dodati na listu
    listaUL.appendChild(listaDiv);
  });
}

function removeFromLocal(todo) {
  let todos;
  //pregled da li vec postoji koji zadatak spremljen u local storage-u
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
