---
theme: default
title: Why I hate try-catch
info: |
  Presentation for code club about the dangers of using try-catch blocks.
class: text-center
drawings:
  persist: false
transition: fade-out
mdc: true
layout: cover
comark: true
---

# Why I hate try/catch, and why you should hate it too!

George Roe

---
layout: section
---

# Let's rank some languages in terms of how good the error handling is

---
layout: center
---

::div{.flex.gap-8.justify-center}

![](./images/rust-logo.png){.h-26}

![](./images/ts-logo.png){.h-26}

![](./images/java-logo.png){.h-26}

![](./images/python-logo.png){.h-26}

![](./images/go-logo.png){.h-26}

::

---

::tier-list

::

---
layout: center 
---

![](./images/python-logo.png){.h-56}

# Python{.text-center}

---

````md magic-move

```python
try:
  int("not a number")
except Exception:
  print("uh oh!")
```

```python
try:
  int("not a number")
except ValueError:
  print("Value Error!")
except Exception:
  print("uh oh!")
```

```python
try:
  int("not a number")
except ValueError:
  print("Value Error!")
except Exception as e:
  print("uh oh!", e)
```

```python
import traceback

try:
  int("not a number")
except ValueError:
  print("Value Error!")
except Exception as e:
  print("uh oh!", e)

  traceback.print_exc()
```

````

---

## Summary

- No way to know which exceptions can be thrown
- If you want to use a value from a function that can throw exceptions, you then have to write all the code that uses that value inside the try block, which means you have super nested code
- If you have two values from functions that can throw exceptions, you have to nest the try blocks, which is even worse
- The `traceback` module is the weirdest thing I've ever seen, and prints directly to stdout, which is rarely what you want to do in production applications (more likely to want to send the data to a logging system)

---

::tier-list

#f
![](./images/python-logo.png)

::

---
layout: center 
---

![](./images/ts-logo.png){.h-56}

# TypeScript{.text-center}

---

````md magic-move

```ts
try {
  JSON.parse("not valid json")
} except (e) {
  console.log("uh oh!")
}
```

```ts
try {
  JSON.parse("not valid json")
} except (e) { // `e` is typed as `unknown` by default
  console.log("uh oh!")
}
```

```ts
try {
  JSON.parse("not valid json")
} except (e) { // `e` is typed as `unknown` by default
  if (e instanceof SyntaxError) {
    console.error("Syntax Error!", e.message)
  } else if (e instanceof Error) {
    console.error("Error!", e.message)
  } else {
    console.error("Unknown error!", e)
  }
}
```

````

---

## Summary

- No way to know which exceptions can be thrown
- If you want to use a value from a function that can throw exceptions, you then have to write all the code that uses that value inside the try block, which means you have super nested code
- If you have two values from functions that can throw exceptions, you have to nest the try blocks, which is even worse
- Atleast its honest about the fact that it literally has no idea what the type of the exception is

---

::tier-list

#f
![](./images/python-logo.png)

![](./images/ts-logo.png)

::

---
layout: center 
---

![](./images/java-logo.png){.h-56}

# Java{.text-center}

---

````md magic-move

```java
try {
  Integer.parseInt("not a number");
} catch (Exception e) {
  System.out.println("uh oh!");
}
```

```java
try {
  Integer.parseInt("not a number");
} catch (NumberFormatException e) {
  System.out.println("Number Format Exception!");
} catch (Exception e) {
  System.out.println("uh oh!");
}
```

```java
```

```java
void myFunction() throws IOException, SQLException {
  // do stuff that can throw IOException or SQLException
}
```

````

---

## Summary

- Java can actually tell you which exceptions can be thrown
- If you want to use a value from a function that can throw exceptions, you then have to write all the code that uses that value inside the try block, which means you have super nested code
- If you have two values from functions that can throw exceptions, you have to nest the try blocks, which is even worse

---

::tier-list

#c
![](./images/java-logo.png)

#f
![](./images/python-logo.png)

![](./images/ts-logo.png)

::

---
layout: center
---

![](./images/alarm.gif)

# I LIED!{.text-center}

---

## Unchecked Exceptions

An unchecked exception is an exception that inherits from `RuntimeException` and does not need to be declared in a method's `throws` clause.

This means that a method can throw an unchecked exception without the caller being aware of it, which can lead to unexpected behavior and bugs.

---

::tier-list

#f
![](./images/python-logo.png)

![](./images/ts-logo.png)

![](./images/java-logo.png)

::

---
layout: center 
---

![](./images/go-logo.png){.h-56}

# Go{.text-center}

---

````md magic-move

```go
package main

import (
  "errors"
  "fmt"
)

func myFunc(success bool) (string, error) {
  if !success {
    return "", errors.new("uh oh!")
  }

  return "success!", nil
}
```

```go
package main

import (
  "errors"
  "fmt"
)

func myFunc(success bool) (string, error) {
  if !success {
    return "", errors.new("uh oh!")
  }

  return "success!", nil
}

func main() {
  message, err := myFunc(false)
  if err != nil {
    fmt.Println("Error:", err) // Error: uh oh!
  } else {
    fmt.Println("Message:", message)
  }
}
```

```go
package main

import (
  "errors"
  "fmt"
)

func myFunc(success bool) (string, error) {
  if !success {
    return "", errors.new("uh oh!")
  }

  return "success!", nil
}

func main() {
  message, err := myFunc(true)
  if err != nil {
    fmt.Println("Error:", err)
  } else {
    fmt.Println("Message:", message) // Message: success!
  }
}
```

````

---

## Summary

- Go represents errors as values, meaning that functions that can fail return an error value alongside their normal return value therfore representing errors in the type system
- If you want to use a value from a function that can return an error, you must remember to check the error value first
- Most of the time, a successful result and an error are mutually exclusive, however this behaviour is not enforced by the type system
- Not really a proper way to handle different types of errors, you can only check if the error is nil or not, and then handle it accordingly (kind of like TS)
- Errors are just implementations of `error`, so they can really be anything

---

::tier-list

#b
![](./images/go-logo.png)

#f
![](./images/python-logo.png)

![](./images/ts-logo.png)

![](./images/java-logo.png)

::

---
layout: center 
---

![](./images/rust-logo.png){.h-56}

# Rust{.text-center}


---

````md magic-move

```rs
struct Epsilon(f64);

impl Epsilon {
  fn new(value: f64) -> Result<Self, String> {
    if value < 0.0 {
      Err("Epsilon cannot be negative".to_string())
    } else if value > 0.01 {
      Err("Epsilon cannot be greater than 0.01".to_string())
    } else {
      Ok(Self(value))
    }
  }
}
```

```rs
struct Epsilon(f64);

impl Epsilon {
  fn new(value: f64) -> Result<Self, String> {
    if value < 0.0 {
      Err("Epsilon cannot be negative".to_string())
    } else if value > 0.01 {
      Err("Epsilon cannot be greater than 0.01".to_string())
    } else {
      Ok(Self(value))
    }
  }
}

fn main() {
  match Epsilon::new(-0.1) {
    Ok(epsilon) => println!("Epsilon created: {:?}", epsilon),
    Err(err) => println!("Error creating Epsilon: {}", err),
  }
}
```

```rs
struct Epsilon(f64);

impl Epsilon {
  fn new(value: f64) -> Result<Self, String> {
    if value < 0.0 {
      Err("Epsilon cannot be negative".to_string())
    } else if value > 0.01 {
      Err("Epsilon cannot be greater than 0.01".to_string())
    } else {
      Ok(Self(value))
    }
  }
}
```

```rs
struct Epsilon(f64);

enum EpsilonCreationError {
  NegativeValue,
  ValueTooLarge,
}

impl Epsilon {
  fn new(value: f64) -> Result<Self, EpsilonCreationError> {
    if value < 0.0 {
      Err(EpsilonCreationError::NegativeValue)
    } else if value > 0.01 {
      Err(EpsilonCreationError::ValueTooLarge)
    } else {
      Ok(Self(value))
    }
  }
}
```

```rs
use thiserror::Error;

struct Epsilon(f64);

#[derive(Error, Debug)]
enum EpsilonCreationError {
  #[error("Epsilon cannot be negative")]
  NegativeValue,
  #[error("Epsilon cannot be greater than 0.01")]
  ValueTooLarge,
}

impl Epsilon {
  fn new(value: f64) -> Result<Self, EpsilonCreationError> {
    if value < 0.0 {
      Err(EpsilonCreationError::NegativeValue)
    } else if value > 0.01 {
      Err(EpsilonCreationError::ValueTooLarge)
    } else {
      Ok(Self(value))
    }
  }
}
```

````

---

## Summary

- Rust represents errors as values, meaning that functions that can fail return a `Result` type which is an enum that can either be `Ok` or `Err`, therefore representing errors in the type system
- If you want to use a value from a function that can return an error, the compiler forces you to handle the error case
- Most of the time, a successful result and an error are mutually exclusive, and this behaviour is enforced by the type system
- Amazing way to handle different types of errors, you can define your own error types and use the `thiserror` crate to automatically generate error messages for you
- Great ergonomics for working with errors, the `?` operator allows you to easily propagate errors up the call stack without having to write a lot of boilerplate code (e.g., you might not know how to handle an error at the current level, so you can just propagate it up to the caller and let them handle it)

---

::tier-list

#s
![](./images/rust-logo.png)

#b
![](./images/go-logo.png)

#f
![](./images/python-logo.png)

![](./images/ts-logo.png)

![](./images/java-logo.png)

::

---

## Why try/catch is bad (in general)

- It makes it hard to see where the errors are coming from
- It makes code ugly when you need to use multiple values from functions that can throw exceptions
- It implies that error handling is optional
- It confuses the flow of the program (essentially the modern version of `GOTO`)

---
layout: section
---

::div{.flex.gap-10.justify-center.mb-4}

![](./images/ts-logo.png){.h-26}

![](./images/java-logo.png){.h-26}

![](./images/python-logo.png){.h-26}

::

## What do I do if my language was in F tier?

::v-click

[Implement it yourself!]{.text-xl}

::

---

## Methodology

Since Rust does it best, we will try and replicate the same(ish) behaviour in other languages.

A Rust enum is an Algebraic Data Type (ADT), which is a type that can have multiple variants, each with their own associated data.

```rs
enum Result<T, E> {
  Ok(T),
  Err(E)
}
```

The `Result` enum has two variants, `Ok` and `Err`, which represent a successful result and an error, respectively.

Luckily for us, lots of languages have some form of ADT implementation.

---
layout: center 
---

![](./images/python-logo.png){.h-56}

# Python{.text-center}

---

````md magic-move

```python
```

```python
from dataclasses import dataclass
from typing import Generic, TypeVar

T = TypeVar('T')
E = TypeVar('E')

@dataclass(frozen=True)
class Ok(Generic[T]):
  value: T

@dataclass(frozen=True)
class Err(Generic[E]):
  error: E
```

```python
from dataclasses import dataclass
from typing import Generic, TypeVar, Union

T = TypeVar('T')
E = TypeVar('E')

@dataclass(frozen=True)
class Ok(Generic[T]):
  value: T

@dataclass(frozen=True)
class Err(Generic[E]):
  error: E

Result = Union[Ok[T], Err[E]]
```

```python
from dataclasses import dataclass
from typing import Generic, TypeVar, Union, Callable

T = TypeVar('T')
E = TypeVar('E')

@dataclass(frozen=True)
class Ok(Generic[T]):
  value: T

@dataclass(frozen=True)
class Err(Generic[E]):
  error: E

Result = Union[Ok[T], Err[E]]

def attempt(function: Callable[[], T]) -> Result[T, Exception]:
  try:
    return Ok(function())
  except Exception as e:
    return Err(e)
```

```python
from dataclasses import dataclass
from typing import Generic, TypeVar, Union, Callable

T = TypeVar('T')
E = TypeVar('E')

@dataclass(frozen=True)
class Ok(Generic[T]):
  value: T

@dataclass(frozen=True)
class Err(Generic[E]):
  error: E

Result = Union[Ok[T], Err[E]]

def attempt(function: Callable[[], T]) -> Result[T, Exception]:
  try:
    return Ok(function())
  except Exception as e:
    return Err(e)

match attempt(lambda: int("not a number")):
  case Ok(value):
    print("Success!", value)
  case Err(error):
    print("Error!", error)
```

````

---
layout: center 
---

![](./images/ts-logo.png){.h-56}

# TypeScript{.text-center}

---

````md magic-move

```ts
```

```ts
interface Ok<T> {
  ok: true
  value: T
}

interface Err<E> {
  ok: false
  error: E
}
```

```ts
interface Ok<T> {
  ok: true
  value: T
}

interface Err<E> {
  ok: false
  error: E
}

type Result<T, E> = Ok<T> | Err<E>
```

```ts
interface Ok<T> {
  ok: true
  value: T
}

interface Err<E> {
  ok: false
  error: E
}

type Result<T, E> = Ok<T> | Err<E>

function attempt<T>(fn: () => T): Result<T, unknown> {
  try {
    return { ok: true, value: fn() }
  } catch (error) {
    return { ok: false, error }
  }
}
```

```ts
interface Ok<T> {
  ok: true
  value: T
}

interface Err<E> {
  ok: false
  error: E
}

type Result<T, E> = Ok<T> | Err<E>

function attempt<T>(fn: () => T): Result<T, unknown> {
  try {
    return { ok: true, value: fn() }
  } catch (error) {
    return { ok: false, error }
  }
}
```

```ts
interface Ok<T> {
  ok: true
  value: T
}

interface Err<E> {
  ok: false
  error: E
}

type Result<T, E> = Ok<T> | Err<E>

function attempt<T>(fn: () => T): Result<T, unknown> {
  try {
    return { ok: true, value: fn() }
  } catch (error) {
    return { ok: false, error }
  }
}

const outcome = attempt(() => JSON.parse("not valid json"))
if (outcome.ok) {
  console.log("Success!", outcome.value)
} else {
  console.error("Error!", outcome.error)
}
```

````

---
layout: center 
---

![](./images/java-logo.png){.h-56}

# Java{.text-center}

---

````md magic-move

```java
public class ResultDemo {

}
```

```java
public class ResultDemo {
  public record Ok<T>(T value) {}
  public record Err<E>(E error) {}
}
```

```java
public class ResultDemo {
  public record Ok<T, E>(T value) implements Result<T, E> {}
  public record Err<E, T>(E error) implements Result<T, E> {}

  public sealed interface Result<T, E> permits Ok, Err {}
}
```

```java
public class ResultDemo {
  public record Ok<T, E>(T value) implements Result<T, E> {}
  public record Err<E, T>(E error) implements Result<T, E> {}

  public sealed interface Result<T, E> permits Ok, Err {}

  public static <T> Result<T, Exception> attempt(Callable<T> callable) {
    try {
      return new Ok<>(callable.call());
    } catch (Exception e) {
      return new Err<>(e);
    }
  }
}
```

```java
public class ResultDemo {
  public record Ok<T, E>(T value) implements Result<T, E> {}
  public record Err<E, T>(E error) implements Result<T, E> {}

  public sealed interface Result<T, E> permits Ok, Err {}

  public static <T> Result<T, Exception> attempt(Callable<T> callable) {
    try {
      return new Ok<>(callable.call());
    } catch (Exception e) {
      return new Err<>(e);
    }
  }

  public static void main(String[] args) {
    Result<Integer, Exception> result = attempt(() -> Integer.parseInt("not a number"));

    switch (result) {
      case Ok<Integer, Exception>(Integer value) -> System.out.println("Success! " + value);
      case Err<Exception, Integer>(Exception error) -> System.err.println("Error! " + error.getMessage());
    }
  }
}
```

````

---
layout: section
---

# Thanks for listening!