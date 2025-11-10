// ================================
// 🌟 Todo App - Improved Version
// ================================

// DOM Elements
const addTodoBtn = document.getElementById("addTodoBtn");
const inputTag = document.getElementById("todoInput");
const todoListUl = document.getElementById("todoList");
const itemsLeftSpan = document.getElementById("itemsLeft");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const filterBtns = document.querySelectorAll(".filter-btn");

// Load Todos from Local Storage
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all"; // all | active | completed

// ================================
// 🧠 Functions
// ================================

// Save to LocalStorage
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Update the items left counter
const updateItemsLeft = () => {
  const count = todos.filter((todo) => !todo.isCompleted).length;
  itemsLeftSpan.textContent = `${count} ${count === 1 ? "item" : "items"} left`;
};

// Render Todos to UI
const renderTodos = () => {
  todoListUl.innerHTML = ""; // Clear previous list

  // Filtered todos based on selected filter
  let filteredTodos = todos.filter((todo) => {
    if (currentFilter === "active") return !todo.isCompleted;
    if (currentFilter === "completed") return todo.isCompleted;
    return true; // "all"
  });

  // Create Todo items
  filteredTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.isCompleted ? "completed" : ""}`;

    li.innerHTML = `
      <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
      <span class="todo-text">${todo.title}</span>
      <button class="delete-btn" title="Delete todo">×</button>
    `;

    // ✅ Checkbox toggle event
    li.querySelector(".todo-checkbox").addEventListener("change", (e) => {
      todos[index].isCompleted = e.target.checked;
      saveTodos();
      renderTodos();
    });

    // 🗑️ Delete todo event
    li.querySelector(".delete-btn").addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    todoListUl.appendChild(li);
  });

  updateItemsLeft();
};

// Add a new todo
const addTodo = () => {
  const todoText = inputTag.value.trim();
  if (todoText === "") return;

  todos.push({ title: todoText, isCompleted: false });
  inputTag.value = "";
  saveTodos();
  renderTodos();
};

// Clear completed todos
const clearCompleted = () => {
  todos = todos.filter((todo) => !todo.isCompleted);
  saveTodos();
  renderTodos();
};

// Set the current filter
const setFilter = (filterType) => {
  currentFilter = filterType;
  filterBtns.forEach((btn) =>
    btn.classList.toggle("active", btn.dataset.filter === filterType)
  );
  renderTodos();
};

// ================================
// ⚡ Event Listeners
// ================================

// Add Todo (button click)
addTodoBtn.addEventListener("click", addTodo);

// Add Todo (Enter key)
inputTag.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

// Clear completed button
clearCompletedBtn.addEventListener("click", clearCompleted);

// Filter buttons
filterBtns.forEach((btn) =>
  btn.addEventListener("click", () => setFilter(btn.dataset.filter))
);

// ================================
// 🚀 Initialize
// ================================
renderTodos();
