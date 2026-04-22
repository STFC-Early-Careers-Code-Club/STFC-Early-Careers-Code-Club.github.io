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
layout: comparison
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
