let uniq = 0;

function addTask(description, dueTime) {
  const ul = document.getElementById("task_list");
  const li = document.createElement("li");
  // debugger
  li.textContent = description;
  li.id = `item-${++uniq}`

  if (dueTime) {
    const span = document.createElement("span");
    span.classList.add("due");
    span.textContent = `due ${new Date(dueTime).toLocaleString("en-US")}`;
    li.append(span);
  }

  li.append(doneBtn(li.id));
  ul.append(li)
}

function doneBtn(removeId) {
  const button = document.createElement("button");
  button.textContent = "Done";
  button.type = "button";
  button.classList.add("btn", "btn-sm", "btn-outline-danger", "done");
  button.addEventListener('click', () => {
    document.getElementById(removeId).outerHTML = ""
  })
  return button;
}


function getDueTime() {
  const dueDate = document.getElementById("duedate_input").valueAsNumber;
  const dueTime = document.getElementById("duetime_input").valueAsNumber;
  if (dueDate && dueTime) {
    const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
    return dueDate + dueTime + timezoneOffset;
  } else {
    return false;
  }
}

function saveTask() {
  const description = document.getElementById("task_description_input");
  addTask(description.value, getDueTime());
  task_description_input.value = ''
}


// static elements
const add_task = document.getElementById("add_task");
const task_description_input = document.getElementById("task_description_input");

// EventListers
add_task.addEventListener("click", saveTask);

task_description_input.addEventListener("keydown", (event) => {
  if (event.code === 'Enter') saveTask()
});
