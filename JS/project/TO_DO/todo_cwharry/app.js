const addTodoBtn = document.getElementById("addTodoBtn")
const inputTag = document.getElementById("todoInput")
let todoListUl = document.getElementById("todoList")
const remaining = document.getElementById("remaining-count")
const clearCompletedBtn = document.getElementById("clearCompletedBtn")
let todoText;  // This should be populated when the user clicks on the Button
let todos = [];  //  initialize the array
let todosString = localStorage.getItem("todos")
if (todosString) {
    todos = JSON.parse(todosString);
}
const populateTodos = () => {
    let string = "";

    for (const todo of todos) {
        string += `<li id = "todo-${todo.id}" class="todo-item ${todo.isCompleted ? "completed" : ""}">
                            <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
                             <span class="todo-text">${todo.title}</span>
                            <button class="delete-btn">×</button>
                    </li>`;
    }
    todoListUl.innerHTML = string
    //ADD the checkBox logic to populate todos
    const todoCheckBoxes = document.querySelectorAll(".todo-checkbox")
    todoCheckBoxes.forEach((element) => {
        element.addEventListener("click", (e) => {
            if (e.target.checked) {
                element.parentNode.classList.add("completed")
                console.log(element.parentNode.id)
                // Grab the todo from todos array and update the todos array to set the todos  isCompleted attribute as true
                todos = todos.map(todo => {
                    if ("todo-" + todo.id == element.parentNode.id) {
                        return { ...todo, isCompleted: true }
                    }
                    else {
                        return todo
                    }
                })
                remaining.innerHTML = todos.filter((item) => { return item.isCompleted === true }).length;
                localStorage.setItem("todos", JSON.stringify(todos))
            }
            else {
                element.parentNode.classList.remove("completed")
                // Grab the todo from todos array and update the todos array to set the todos  isCompleted attribute as true
                todos = todos.map(todo => {
                    if ("todo-" + todo.id == element.parentNode.id) {
                        return { ...todo, isCompleted: false }
                    }
                    else {
                        return todo
                    }
                })
                remaining.innerHTML = todos.filter((item) => { return item.isCompleted === true }).length;
                localStorage.setItem("todos", JSON.stringify(todos))
            }
        })
    })

    // Handle the  Clear Completed button
    clearCompletedBtn.addEventListener("click", () => {
        todos = todos.filter((todo) => todo.isCompleted == false)
        populateTodos()
        localStorage.setItem("todos", JSON.stringify(todos))
    })



// Handle the delete  buttons
let deleteBtns = document.querySelectorAll(".delete-btn")
deleteBtns.forEach((element) => {
    element.addEventListener("click", (e) => {
        const confirmation = confirm("Are you sure you want to delete this todo?")
        if (confirmation) {
            todos = todos.filter((todo) => {
                return ("todo-" + todo.id) !== (e.target.parentNode.id)
            })
            localStorage.setItem("todos", JSON.stringify(todos))
            populateTodos()
        }
    })
})

}
addTodoBtn.addEventListener("click", () => {
    todoText = inputTag.value  //  use the same variable name
    inputTag.value = "";   // clear properly (was " " earlier)
    if (todoText.trim().length < 4) {
        alert("You can't add todo that small")
        return
    }
    let todo = {
        id: "todo-" + Date.now(),
        title: todoText,
        isCompleted: false
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
    populateTodos()
})
populateTodos()


// ======== FILTER BUTTONS =========.....home-work part ADD (active,completed button)

const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        // Remove 'active' class from all buttons
        filterButtons.forEach((b) => b.classList.remove("active"));
        // Add 'active' to clicked button
        e.target.classList.add("active");

        const filter = e.target.dataset.filter;
        let filteredTodos = [];

        if (filter === "active") {
            filteredTodos = todos.filter((todo) => !todo.isCompleted);
        } else if (filter === "completed") {
            filteredTodos = todos.filter((todo) => todo.isCompleted);
        } else {
            filteredTodos = todos; // "all"
        }

        renderFilteredTodos(filteredTodos);
    });
});

function renderFilteredTodos(list) {
    let string = "";
    for (const todo of list) {
        string += `
        <li id="${todo.id}" class="todo-item ${todo.isCompleted ? "completed" : ""}">
            <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
            <span class="todo-text">${todo.title}</span>
            <button class="delete-btn">×</button>
        </li>`;
    }
    todoListUl.innerHTML = string;
}

