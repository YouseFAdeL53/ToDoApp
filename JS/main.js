let textInp = document.querySelector(".inpText");
let subInp = document.querySelector(".inpSub");
let myTasks = document.querySelector(".tasks");
let form = document.querySelector(".form");
let isEdit = false;
let idEdit;

let myArray = [];

// Check LocalStroage
let localToDo = localStorage.getItem("todoList");

if (localToDo != null) {
  myArray = JSON.parse(localToDo);
}

subInp.addEventListener("click", () => {
  // Get Value
  let theValue = textInp.value.trim();
  if (theValue != "") {
    console.log(theValue);
    // Create Obj
    let theObj = {
      title: theValue,
    };
    if (isEdit) {
      myArray[idEdit] = theObj;
    } else {
      myArray.push(theObj);
    }
    // LocalStorage
    localStorage.setItem("todoList", JSON.stringify(myArray));
    createTask();
    textInp.value = "";
  }
});

// CreateTask

const createTask = () => {
  document.querySelectorAll(".task").forEach((task) => task.remove());
  for (let i = 0; i < myArray.length; i++) {
    let markUp = `
      <div class="task">
      <h2>${myArray[i].title}</h2>
      <div class="icons">
        <i onclick="editTask(${i}, '${myArray[i].title}')" class="fa-solid fa-edit"></i>
        <i onclick="deleteTask(${i})" class="fa-solid fa-delete-left"></i>
        </div>
        </div>
      `;
    myTasks.insertAdjacentHTML("afterbegin", markUp);
  }
};

createTask();

const deleteTask = (indx) => {
  let msg = window.confirm("Do You Want To Remove Task");
  if (msg === true) {
    myArray.splice(indx, 1);
    // UpDate LocalStorage
    localStorage.setItem("todoList", JSON.stringify(myArray));
    // Trigger Function
    createTask();
  }
};

// EditTask

const editTask = (indx, title) => {
  idEdit = indx;
  isEdit = true;
  textInp.value = title;
  subInp.value = "UpDate";
};
