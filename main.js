let btnAdd = document.querySelector("button");
let taskName = document.querySelector("#content");

let tasks = getTaskFromLocalStorage();

renderTasks(tasks);

function getTaskFromLocalStorage() {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
}

//thêm việc làm
btnAdd.addEventListener("click", function () {
  var error = taskName.parentElement.querySelector(".form-message");
  if (!taskName.value) {
    error.innerText = "vui lòng nhập việc làm!";
    showAddErrorToast();
  } else {
    error.innerText = "";
    let taskId = this.getAttribute("id");

    let tasks = getTaskFromLocalStorage();
    let task = { name: taskName.value };
    if (taskId == 0 || taskId) {
      tasks[taskId] = task;
      this.removeAttribute("id");
    } else {
      tasks.push(task);
    }

    taskName.value = "";

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks(tasks);
    showAddSuccessToast();
  }
});

// sửa việc làm
function editTask(id) {
  let tasks = getTaskFromLocalStorage();

  if (tasks.length > 0) {
    taskName.value = tasks[id].name;
    btnAdd.setAttribute("id", id);
  }
}

// xóa việc làm
function deleteTask(id) {
  let tasks = getTaskFromLocalStorage();
  tasks.splice(id, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks(getTaskFromLocalStorage());
  showDeleteSuccessToast();
}

// hiện việc làm

function renderTasks(tasks = []) {
  let content = "<ul>";

  tasks.forEach((task, index) => {
    content += ` <li>
    <div class="task-name">${task.name}</div>
    <a href="#" onclick="editTask(${index})">Sửa</a>
    <a href="#" onclick="deleteTask(${index})">Xóa</a>
</li>`;
  });

  content += "<ul>";

  document.querySelector("#result").innerHTML = content;
}

// Hiện thông báo xóa thành công

// function showMess() {
//   const main = document.getElementById("toast");
//   const toast = document.createElement("div");

//   toast.classList.add("toast");
//   toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s 2s forwards`;
//   toast.innerHTML = `
//   <div class="toast__icon">
//                 <i class="fa-solid fa-circle-check"></i>
//             </div>

//             <div class="toast__body">
//                 <p>Đã xóa thành công</p>
//             </div>
//             <div class="toast__close">
//                 <i class="fa-solid fa-xmark"></i>
//             </div>`;
//   main.appendChild(toast);
//   setTimeout(function () {
//     main.removeChild(toast);
//   }, 3000);
// }

function toast({ message = "", type = "success", duration = 3000 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");
    const icons = {
      success: "fa-solid fa-circle-check",
      error: "fa-solid fa-triangle-exclamation",
    };
    const icon = icons[type];

    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s 2s forwards`;
    toast.innerHTML = `
        <div class="toast__icon">
        <i class="${icon}"></i>
    </div>

    <div class="toast__body">
        <p>${message}</p>
    </div>
    <div class="toast__close">
        <i class="fa-solid fa-xmark"></i>
    </div>
        `;
    main.appendChild(toast);
    setTimeout(function () {
      main.removeChild(toast);
    }, duration);
  }
}

function showAddSuccessToast() {
  toast({
    message: "bạn đã thêm thành công rồi",
    type: "success",
    duraktion: 3000,
  });
}

function showAddErrorToast() {
  toast({
    message: "công việc trống",
    type: "error",
    duraktion: 3000,
  });
}

function showDeleteSuccessToast() {
  toast({
    message: "bạn đã xóa thành công rồi",
    type: "success",
    duraktion: 3000,
  });
}
