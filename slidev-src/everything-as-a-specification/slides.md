---
theme: apple-basic
title: Everything as a Specification
info: |
  An introduction to the differences between imperative and declarative approaches, showing how describing desired outcomes can replace step-by-step instructions.
drawings:
  persist: false
mdc: true
transition: fade
layout: intro
---

# Everything as a Specification

Declarativeness vs Imperativeness

<div class="absolute bottom-10">
  <span class="font-700">
    George Roe
  </span>
</div>

---
title: Topics
---

# Topics

The further through the talk, the more niche the examples get.

<div class="grid grid-cols-3 justify-between items-center justify-items-center w-full gap-x-4 gap-y-10 mt-10">

<div class="w-fit">
```regex
^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$
```
</div>

<img src="/images/rustacean-flat-happy.svg" class="w-32" />

<img src="/images/vue-logo.svg" class="w-24" />

<img src="/images/docker-compose-logo.png" class="w-24" />

<img src="/images/terraform-logo.webp" class="w-24" />

<img src="/images/nixos-logo.webp" class="w-24" />

</div>

---
title: Regular Expressions
layout: section
---

<div class="w-fit">

```regex
^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$
```

</div>

# Regular Expressions

---

# A Simple Email Validation Input Box

<EmailValidationField />

---

# Turns Out its a Not-So-Simple Email Validation Input Box

<div class="h-[30vh] overflow-scroll pr-4">

<<< @/utils/validateEmailManually.ts ts

</div>

---
layout: statement
---

# The solution is quite simple!

---
layout: statement
---

<h1>
```regex
^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$
```
</h1>

---

# Understanding the Regular Expression

```regex
^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$
```

<v-clicks>

- `^` - Start of the string
- `[A-Za-z0-9._%+-]` - One character that is either an uppercase letter, lowercase letter, digit, dot, underscore, percent sign, plus sign, or hyphen
- `+` - One or more of the previous character class
- `@` - The at symbol
- `[A-Za-z0-9.-]` - One character that is either an uppercase letter, lowercase letter, digit, dot, or hyphen
- `+` - One or more of the previous character class
- `\.` - A literal dot (the backslash is used to escape the dot, which is a special character in regex)
- `[A-Za-z]{2,}` - Two or more characters that are either an uppercase letter or lowercase letter
- `$` - End of the string

</v-clicks>

---

# Ok, *Now* Its A Simple Email Validation Input Box!

<<< @/utils/validateEmailWithRegex.ts ts

<EmailValidationField use-regex />

---
layout: comparison
---

# Imperative vs Declarative

::left::

## Manual Validation

- Easy to understand, its just regular code
- You have complete control of the flow of the program
- You have to to implement the logic yourself

::right::

## Regular Expressions

- Extremely concise
- You are describing the outcome you want, not how to achieve it
- Can be difficult to understand if you are not familiar with the syntax
- You are using a library to do the heavy lifting for you
- Just use stackoverflow to find the regex you need, then copy and paste

---
title: Iterators and Higher-Order Functions
layout: section
---

<img src="/images/rustacean-flat-happy.svg" class="w-32" />

# Iterators and Higher-Order Functions

---

# Understanding the Terminology

<v-clicks>

- **Iterate** - To go through each item in a collection, one at a time.
- **Higher-Order Function** - A function that takes another function as an argument or returns a function as a result.

</v-clicks>

<v-click>

We will now cover the use cases for the many different collection operation functions in Rust:

- `map`
- `filter`
- `any`
- `all`
- `find`

</v-click>

---

# Map

**Context**: We have a list of numbers, and we want to create a new list where each number is doubled.

````md magic-move

```rs
let numbers = vec![1, 2, 3, 4, 5];

let mut doubled = Vec::new();

for number in numbers {
  doubled.push(number * 2);
}
```

```rs
let numbers = vec![1, 2, 3, 4, 5];

let doubled: Vec<_> = numbers
  .iter()
  .map(|number| number * 2)
  .collect();
```

````

---

# Filter

**Context**: We have a listt of numbers, and we want to create a new list that only contains the even numbers.

````md magic-move

```rs
let numbers = vec![1, 2, 3, 4, 5];

let mut even_numbers = Vec::new();

for number in numbers {
  if number % 2 == 0 {
    even_numbers.push(number);
  }
}
```

```rs
let numbers = vec![1, 2, 3, 4, 5];

let even_numbers: Vec<_> = numbers
  .iter()
  .filter(|&number| number % 2 == 0)
  .collect();
```

````

---
layout: comparison
---

# Any and All

::left::

**Context**: We have a list of numbers, and we want to check if any of them are even

````md magic-move

```rs
let numbers = vec![1, 2, 3, 4, 5];

let mut any_even = false;

for number in numbers {
  if number % 2 == 0 {
    any_even = true;
    break;
  }
}
```

```rs
let numbers = vec![1, 2, 3, 4, 5];

let any_even = numbers
  .iter()
  .any(|&number| number % 2 == 0);
```

````

::right::

**Context**: We have a list of numbers, and we want to check if all of them are even

````md magic-move

```rs
let numbers = vec![1, 2, 3, 4, 5];

let mut all_even = true;

for number in numbers {
  if number % 2 != 0 {
    all_even = false;
    break;
  }
}
```

```rs
let numbers = vec![1, 2, 3, 4, 5];

let all_even = numbers
  .iter()
  .all(|&number| number % 2 == 0);
```

````

---

# Find

**Context**: We have a list of numbers, and we want to find the first even number.

````md magic-move

```rs
let numbers = vec![1, 2, 3, 4, 5];

let mut first_even = None;

for number in numbers {
  if number % 2 == 0 {
    first_even = Some(number);
    break;
  }
}
```

```rs
let numbers = vec![1, 2, 3, 4, 5];

let first_even = numbers
  .iter()
  .find(|&&number| number % 2 == 0);
```

````

---

# Imperative vs Declarative

::left::

## Just Writing Code Manually

- Beginner friendly - anyone who knows how to write pseudo-code can understand it
- **Complete control** over the flow of the program (you can be the judge of whether this is a good thing or not)
- Often more efficient (unless you are using a language with zero-cost abstractions 😉)

::right::

## Higher-Order Functions

- DRY - lets you reuse logic by passing **behaviour as parameters**
- Encourages modular code
- More expressive code
- Easier testing - you can test the behaviour you are passing in isolation
- Strategy Pattern - you defined the outcome you want, then you could tell it to use either a serial or parallel implementation

---
title: Vue.js
layout: section
---

<img src="/images/vue-logo.svg" class="w-24" />

# Vue.js

---
layout: statement
---

# Example: A Todo List App

---

```html
<html>
<body>
  <div id="app">
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

---
title: Docker Compose
layout: section
---

<img src="/images/docker-compose-logo.png" class="w-24" />

# Docker Compose

---
title: Terraform
layout: section
---

<img src="/images/terraform-logo.webp" class="w-24" />

# Terraform

---
title: NixOS
layout: section
---

<img src="/images/nixos-logo.webp" class="w-24" />

# NixOS