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
