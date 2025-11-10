const addTodoBtn = document.getElementById("addTodoBtn");
const inputTag = document.getElementById("todoInput");
let todoListUl = document.getElementById("todoList");
const remaining = document.getElementById("remaining-count");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const filterButtons = document.querySelectorAll(".filter-btn"); // added
let todoText;
let todos = [];
let todosString = localStorage.getItem("todos");

if (todosString) {
    todos = JSON.parse(todosString);
}

let currentFilter = "all"; // added for filter control

const populateTodos = () => {
    let string = "";
    let filteredTodos = [];

    // filter logic added
    if (currentFilter === "active") {
        filteredTodos = todos.filter((todo) => !todo.isCompleted);
    } else if (currentFilter === "completed") {
        filteredTodos = todos.filter((todo) => todo.isCompleted);
    } else {
        filteredTodos = todos;
    }

    for (const todo of filteredTodos) {
        string += `<li id="todo-${todo.id}" class="todo-item ${todo.isCompleted ? "completed" : ""}">
                        <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
                        <span class="todo-text">${todo.title}</span>
                        <button class="delete-btn">×</button>
                   </li>`;
    }

    todoListUl.innerHTML = string;

    // Checkbox logic
    const todoCheckBoxes = document.querySelectorAll(".todo-checkbox");
    todoCheckBoxes.forEach((element) => {
        element.addEventListener("click", (e) => {
            if (e.target.checked) {
                element.parentNode.classList.add("completed");
                todos = todos.map((todo) => {
                    if ("todo-" + todo.id == element.parentNode.id) {
                        return { ...todo, isCompleted: true };
                    } else {
                        return todo;
                    }
                });
            } else {
                element.parentNode.classList.remove("completed");
                todos = todos.map((todo) => {
                    if ("todo-" + todo.id == element.parentNode.id) {
                        return { ...todo, isCompleted: false };
                    } else {
                        return todo;
                    }
                });
            }
            remaining.innerHTML = todos.filter((item) => !item.isCompleted).length;
            localStorage.setItem("todos", JSON.stringify(todos));
        });
    });

    // Clear Completed button
    clearCompletedBtn.addEventListener("click", () => {
        todos = todos.filter((todo) => todo.isCompleted == false);
        localStorage.setItem("todos", JSON.stringify(todos));
        populateTodos();
    });

    // Delete button
    let deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((element) => {
        element.addEventListener("click", (e) => {
            const confirmation = confirm("Are you sure you want to delete this todo?");
            if (confirmation) {
                todos = todos.filter((todo) => {
                    return "todo-" + todo.id !== e.target.parentNode.id;
                });
                localStorage.setItem("todos", JSON.stringify(todos));
                populateTodos();
            }
        });
    });

    remaining.innerHTML = todos.filter((item) => !item.isCompleted).length;
};

// Add new todo
addTodoBtn.addEventListener("click", () => {
    todoText = inputTag.value;
    inputTag.value = "";
    if (todoText.trim().length < 4) {
        alert("You can't add todo that small");
        return;
    }
    let todo = {
        id: Date.now(),
        title: todoText,
        isCompleted: false,
    };
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    populateTodos();
});

// Filter buttons logic (All / Active / Completed)
filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");
        currentFilter = e.target.dataset.filter;
        populateTodos();
    });
});

populateTodos();
