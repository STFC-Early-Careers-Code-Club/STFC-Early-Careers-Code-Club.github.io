---
title: what the hell is a Monad?
info: |
  Code Club Talk — Willow Sparks

theme: seriph
themeConfig:
  primary: '#d4639a'
  secondary: '#9b72cf'
  background: '#1a1020'

drawings:
  persist: false

class: text-center
transition: fade-out
mdc: true
layout: cover
hideInToc: true

download: true
---

# what the hell is a monad?
a very professional presentation about boxes

Willow Sparks · Code Club · April Fools

---
layout: center
hideInToc: true
---

# "a monad is a monoid in the category of endofunctors"

<v-click>

<div class="mt-8 text-2xl" style="color: #d4639a">

...let me start over.

</div>

</v-click>

---
layout: center
---

# a monad is a box you can put things in.

<v-click>

<div class="mt-8 text-lg opacity-70">

much better

</div>

</v-click>

---

# the problem

so things go wrong when processing stuff and you might do this:

<v-click>

```python
user = get_user(42)           # might return None
if user is not None:
    address = get_address(user)
    if address is not None:
        postcode = get_postcode(address)
        if postcode is not None:
            print(postcode)
```

</v-click>

<v-click>

<div class="mt-4" style="color: #d4639a">


this is four levels of nesting for three functions

where everything needs checking

and aaaaaaa

this is horrible and i hate it and you should too.


</div>

<img src="./images/frieren_smug.jpg" class="absolute bottom-14 right-14 h-64 rounded" />

</v-click>

---

# a smarter box: Maybe

what if we put everything in a box that just handled it?

<v-click>

```python
class Maybe:
    def __init__(self, value):
        self.value = value

    def bind(self, func):
        if self.value is None:
            return Maybe(None)
        return func(self.value)       # func returns a Maybe
```

</v-click>

<v-click>

```python
# get_user etc. now return Maybe(...) or Maybe(None)
Maybe(42).bind(get_user).bind(get_address).bind(get_postcode)
```

</v-click>

<v-click>

<div style="color: #d4639a">

the box handles everything and we don't have to think about it. yay \:3

</div>

</v-click>

---

# more monads! the Result monad

ok so Maybe has a problem: when something goes wrong it just goes empty and doesn't tell you *why*. this is annoying, so Result fixes this.

<v-click>

two states:
- `Ok(value)` — it worked, here's the answer
- `Err(message)` — it failed, here's why

</v-click>

<v-click>

```python
def bind(self, func):
    if self.is_err:
        return self
    return func(self.value)           # func returns a Result
```

</v-click>

<v-click>

<div style="color: #d4639a">

same pattern, but now the error message comes along for the ride. no more silent failures. phew!

</div>

</v-click>

---

# putting it together: a data pipeline

<v-click>

without monads:

```python
data = read_csv("readings.csv")
if data is not None:
    column = parse_floats(data, "temperature")
    if column is not None:
        cleaned = remove_outliers(column)
        if cleaned is not None:
            result = mean(cleaned)
            if result is not None:
                print(f"Mean temperature: {result}")
```

</v-click>

<v-click>

with Result:

```python
result = (Result("readings.csv")
    .bind(read_csv)
    .bind(lambda d: parse_floats(d, "temperature"))
    .bind(remove_outliers)
    .bind(mean))
# Result(23.4) or Err("column 'temperature' contains non-numeric values")
```

<img src="./images/frieren.jpg" class="absolute bottom-4 right-20 h-32 rounded" />

</v-click>

---

# the same trick, different box: lists

ok but what if the box has *multiple things in it*? bind means: apply a function to each one, flatten the results.

<v-click>

```python
class List:
    def __init__(self, values):
        self.values = values

    def bind(self, func):
        result = []
        for item in self.values:
            result.extend(func(item).values)  # apply, then flatten
        return List(result)
```

</v-click>

<v-click>

```python
def expand(x):
    return List([x, x * 10])

List([1, 2, 3]).bind(expand)
# List([1, 10, 2, 20, 3, 30])
```

</v-click>

---
layout: center
---

# *YOU HAVE BEEN USING MONADS THIS ENTIRE TIME*

```python
[(x, y) for x in [1, 2, 3] for y in ['a', 'b']]
# [(1,'a'), (1,'b'), (2,'a'), (2,'b'), (3,'a'), (3,'b')]
```

<v-click>

<div class="mt-8 text-xl">

each <code>for</code> is a bind. that's the List monad!

</div>

</v-click>

---

# the pattern

what do these have in common?

<v-clicks>

1. **A box type** — wraps a value
   - `Maybe(42)`, `[1, 2, 3]`

2. **Wrap** — put a value in the box
   - `Maybe(x)`, `[x]`

3. **Bind** — chain operations: `box.bind(f)` gives you a new box
   - Maybe's bind skips if empty
   - List's bind applies to each element and flattens

</v-clicks>

<v-click>

<div class="mt-4" style="color: #d4639a">

classes hide **state**, while monads hide **control flow**.

</div>

<img src="./images/kurisu.jpg" class="absolute bottom-8 right-12 h-36 rounded" />

</v-click>

---

# the three rules

ok what makes a box a *monad* and not just a box?

<v-clicks>

1. **left identity:** `Maybe(a).bind(f)` = `f(a)`
   - putting a value in a box and immediately using it should be the same as just using it.

2. **right identity:** `m.bind(Maybe)` = `m`
   - if all you do is re-wrap the value, nothing changes

3. **associativity:** `m.bind(f).bind(g)` = `m.bind(lambda x: f(x).bind(g))`
   - it doesn't matter how you group a chain of operations

</v-clicks>

---

# composing monads

what if you have multiple files and each one might fail?

<v-click>

```python
files = ["data1.csv", "data2.csv", "data3.csv"]

def process(filename):
    return (Result(filename)
        .bind(read_csv)
        .bind(lambda d: parse_floats(d, "temperature"))
        .bind(mean))

results = List(files).map(process)
# List([Ok(23.4), Err("file not found: data2.csv"), Ok(19.1)])
```

<img src="./images/tea.jpeg" class="absolute bottom-8 right-12 h-28 rounded" />

</v-click>

---

# monads vs classes

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

### a class gives you:
- a wrapper for data (`__init__`)
- methods that operate on that data
- encapsulation — hide the internals

```python
class User:
    def __init__(self, name):
        self.name = name
    def greet(self):
        return f"hi, {self.name}"
```

</div>

<div>

### a monad gives you:
- a wrapper for data (`wrap`)
- a chaining operation (`bind`)
- encapsulation — hide the *control flow*

```python
class Maybe:
    def __init__(self, value):
        self.value = value
    def bind(self, func):
        if self.value is None:
            return Maybe(None)
        return func(self.value)
```

</div>

</div>

---

# why not just use classes?

you *can* solve these problems with classes but it gets messy.

<v-click>

```python
class SafeCSVReader(BaseReader):           # inheritance
class ValidatedCSVReader(SafeCSVReader):   # more inheritance
class LoggedValidatedCSVReader(ValidatedCSVReader):  # oh no
class AsyncLoggedValidatedCSVReader(LoggedValidatedCSVReader):  # OH NO
```

</v-click>

<v-click>

monads compose through **chaining**, not inheritance.

```python
Result("data.csv").bind(read_csv).bind(validate).bind(log)
```

no `AsyncLoggedValidatedSafeCSVReaderFactory`.

(rust doesn't even *have* inheritance. it uses monadic types instead)

</v-click>

<v-click at="1">
<img src="./images/concern.jpg" class="absolute top-32 right-8 h-32 rounded" />
</v-click>

---
layout: center
hideInToc: true
---

<div class="text-center">

# STOP DOING INHERITANCE

<div class="text-xl mt-8 opacity-80">

THOUSANDS OF YEARS OF OOP AND NO REAL WORLD USE FOUND FOR `AbstractSingletonProxyFactoryBean`

WANTED YOUR `NonGravitationalParticleMover` TO ALSO LOG? THAT'LL BE FOUR SUBCLASSES PLEASE.

</div>



</div>

---
layout: two-cols-header
---

# what if you didn't have variables?

::left::

we've been using monads to make Python nicer, but we can just be evil if we want >:o

<v-click>

Haskell only has functions and values, it doesn't have any mutable state. No variables!

</v-click>

<v-clicks>

- need to read a file? **IO monad**
- need to track state? **State monad**
- need randomness? **State monad**
- need to print? **IO monad**

</v-clicks>

<v-click>

<div class="mt-4" style="color: #d4639a">

monads all the way down \:o

**(this is why i thought last week's code club challenge was unfair btw imagine doing python without variables)**

</div>

</v-click>

::right::

<v-click at="1">

<div class="flex items-center justify-center h-full">
<img src="./images/teto.jpg" class="w-80 rounded" />
</div>

</v-click>

---

# functors! \:o

remember this?

> "a monad is just a monoid in the category of endofunctors"

<v-click>

a **functor** takes a function between values and turns it into a function between boxes.

<div class="mt-4 flex justify-center">
<div class="text-center">

<div class="flex items-center gap-4 justify-center text-xl">
  <div class="px-4 py-2 rounded" style="background: rgba(155, 114, 207, 0.2)">5</div>
  <div>──<code>double</code>──→</div>
  <div class="px-4 py-2 rounded" style="background: rgba(155, 114, 207, 0.2)">10</div>
</div>

<div class="flex items-center gap-4 justify-center my-4 text-sm opacity-60">
  <div>↓ wrap in list</div>
  <div class="w-24"></div>
  <div>↓ wrap in list</div>
</div>

<div class="flex items-center gap-4 justify-center text-xl">
  <div class="px-4 py-2 rounded" style="background: rgba(212, 99, 154, 0.2)">[5]</div>
  <div>──<code>map(double)</code>──→</div>
  <div class="px-4 py-2 rounded" style="background: rgba(212, 99, 154, 0.2)">[10]</div>
</div>

</div>
</div>

</v-click>

<v-click>

an **endofunctor** is a functor from a category to itself (our boxes map Python types to Python types).

a **monoid** is something with an identity and an associative operation (that's our three rules).

</v-click>

<v-click>

<div class="mt-4" style="color: #d4639a">

a monad is a monoid in the category of endofunctors yayyy \:3


</div>

</v-click>

---
layout: center
hideInToc: true
---

# a monad is a box you can put things in

<v-click>

<div class="mt-12 text-center" style="color: #d4639a">

Questions?

</div>

</v-click>
