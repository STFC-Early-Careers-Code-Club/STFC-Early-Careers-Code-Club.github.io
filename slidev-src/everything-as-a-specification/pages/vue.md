---
title: Vue.js
layout: section
---

<img src="/images/vue-logo.svg" class="w-24" />

# Vue.js

---

````md magic-move

```html
<html>
<body>
  <div>
    <h1>Todo List</h1>
    <input type="text" id="new-todo" placeholder="Add a new todo">
    <button id="add-todo">Add</button>
    <ul id="todo-list"></ul>
  </div>
</body>
</html>
<script>
  const newTodoInput = document.getElementById('new-todo');
  const addTodoButton = document.getElementById('add-todo');
  const todoList = document.getElementById('todo-list');

  addTodoButton.addEventListener('click', () => {
    const newTodoText = newTodoInput.value;
    if (newTodoText) {
      const newTodoItem = document.createElement('li');
      newTodoItem.textContent = newTodoText;
      todoList.appendChild(newTodoItem);
      newTodoInput.value = '';
    }
  });
</script>
```

```vue
<template>
  <div>
    <h1>Todo List</h1>
    <input type="text" id="new-todo" placeholder="Add a new todo">
    <button id="add-todo">Add</button>
    <ul id="todo-list"></ul>
  </div>
</template>

<script setup lang="ts">
const newTodoInput = document.getElementById('new-todo')
const addTodoButton = document.getElementById('add-todo')
const todoList = document.getElementById('todo-list')

addTodoButton.addEventListener('click', () => {
  const newTodoText = newTodoInput.value
  if (newTodoText) {
    const newTodoItem = document.createElement('li')
    newTodoItem.textContent = newTodoText
    todoList.appendChild(newTodoItem)
    newTodoInput.value = ''
  }
})
</script>
```

```vue
<template>
  <div>
    <h1>Todo List</h1>
    <input v-model="inputText" type="text" placeholder="Add a new todo">
    <button id="add-todo">Add</button>
    <ul id="todo-list"></ul>
  </div>
</template>

<script setup lang="ts">
const inputText = ref('')

const addTodoButton = document.getElementById('add-todo')
const todoList = document.getElementById('todo-list')

addTodoButton.addEventListener('click', () => {
  const newTodoText = inputText.value
  if (newTodoText) {
    const newTodoItem = document.createElement('li')
    newTodoItem.textContent = newTodoText
    todoList.appendChild(newTodoItem)
    inputText.value = ''
  }
})
</script>
```

```vue
<template>
  <div>
    <h1>Todo List</h1>
    <input v-model="inputText" type="text" placeholder="Add a new todo">
    <button @click="addTodo">Add</button>
    <ul id="todo-list"></ul>
  </div>
</template>

<script setup lang="ts">
const inputText = ref('')

const todoList = document.getElementById('todo-list')

function addTodo() {
  const newTodoText = inputText.value
  if (newTodoText) {
    const newTodoItem = document.createElement('li')
    newTodoItem.textContent = newTodoText
    todoList.appendChild(newTodoItem)
    inputText.value = ''
  }
}
</script>
```

```vue
<template>
  <div>
    <h1>Todo List</h1>
    <input v-model="inputText" type="text" placeholder="Add a new todo">
    <button @click="addTodo">Add</button>
    <ul>
      <li v-for="todo in todoList">
        {{ todo }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const inputText = ref('')
const todoList = ref<string[]>([])

function addTodo() {
  if (inputText.value) {
    todoList.value.push(inputText.value)
    inputText.value = ''
  }
}
</script>
```

````
