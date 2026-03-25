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

so things go wrong when processing stuff. values might be missing and you need to handle it. you might do this:

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


every step needs a check. this is four levels of nesting for three functions.

this is horrible and I hate it and you should too.


</div>

<img src="./images/frieren_smug.jpg" class="absolute bottom-14 right-14 h-64 rounded" />

</v-click>

---

# a smarter box: Maybe

what if we put everything in a box that just... handled it?

<v-click>

```python
class Maybe:
    def __init__(self, value):
        self.value = value

    def bind(self, func):
        if self.value is None:
            return Maybe(None)    # empty? skip it
        return func(self.value)   # otherwise, run the function
```

</v-click>

<v-click>

```python
# Same example as before — but now the box handles the None checks
Maybe(42).bind(get_user).bind(get_address).bind(get_postcode)

# If get_user returns Maybe(None), the chain stops.
# No ifs. No crashes. No pyramid of doom.
```

</v-click>

<v-click>

<div style="color: #d4639a">

the box handles everything. we don't have to think about it.

head empty. this is nice.

</div>

</v-click>

---

# more monads! the Result monad

so Maybe has a problem — when something goes wrong it just... goes empty. doesn't tell you *why*. this is annoying. Result fixes this.

<v-click>

two states:
- `Ok(value)` — it worked, here's the answer
- `Err(message)` — it failed, here's why

</v-click>

<v-click>

```python
def bind(self, func):
    if self.is_err:
        return self               # failed? carry the error forward
    return func(self.value)       # otherwise, keep going
```

</v-click>

<v-click>

<div style="color: #d4639a">

same bind, same pattern — but now the error message comes along for the ride. no more silent failures.

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
result = (Result.ok("readings.csv")
    .bind(read_csv)
    .bind(lambda d: parse_floats(d, "temperature"))
    .bind(remove_outliers)
    .bind(mean))
# Ok(23.4) or Err("column 'temperature' contains non-numeric values")
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
            result.extend(func(item))   # apply, then flatten
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

<v-click>

<div class="mt-4" style="color: #9b72cf">

Maybe handles missing values. List handles multiple values. same interface, same idea.

</div>

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

each <code>for</code> is a bind. that's the List monad. you've been using it this whole time.

</div>

</v-click>

---

# the pattern

right, so what do these have in common? three ingredients:

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

a box + wrap + bind. that's a monad.

where a class hides **state**, a monad hides **control flow**.

</div>

<img src="./images/kurisu.jpg" class="absolute bottom-8 right-12 h-36 rounded" />

</v-click>

---

# the three rules

ok we need to get a bit formal for a second. sorry. what makes a box a *monad* and not just a box?

<v-clicks>

1. **left identity:** `Maybe(a).bind(f)` = `f(a)`
   - putting a value in a box and immediately using it should be the same as just using it. the box doesn't get in the way.

2. **right identity:** `m.bind(Maybe)` = `m`
   - if all you do is re-wrap the value, nothing changes. the box doesn't add anything you didn't ask for.

3. **associativity:** `m.bind(f).bind(g)` = `m.bind(lambda x: f(x).bind(g))`
   - it doesn't matter how you group a chain of operations — the result is the same. you can refactor freely.

</v-clicks>

---

# composing monads

what if you have multiple files and each one might fail?

<v-click>

```python
files = ["data1.csv", "data2.csv", "data3.csv"]

def process(filename):
    return (Result.ok(filename)
        .bind(read_csv)
        .bind(lambda d: parse_floats(d, "temperature"))
        .bind(mean))

results = List(files).bind(process)
# [Ok(23.4), Err("file not found: data2.csv"), Ok(19.1)]
```

</v-click>

<v-click>

List handles the iteration. Result handles the errors. each one does its job.

</v-click>

<v-click>

<div class="mt-4" style="color: #d4639a">

you just compose them. they don't step on each other.

</div>

<img src="./images/tea.jpeg" class="absolute bottom-8 right-12 h-28 rounded" />

</v-click>

---

# why the weird name?

<v-clicks>

- monads come from **category theory** — a branch of abstract maths
- Haskell borrowed the concept in the 1990s for handling side effects
- the ideas are genuinely simple. the naming is genuinely terrible. this is a branding problem more than anything
- most people learn monads by using them, then go "oh wait, *that's* what that was?"

</v-clicks>

<v-click>

<div class="mt-8 text-center text-xl" style="color: #d4639a">

i love category theory but u don't need it for a monad.

you just need a box and a chain

</div>

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

<v-click>

<div class="mt-4 text-center" style="color: #d4639a">

classes hide **what's inside**. monads hide **what happens between steps**.

</div>

</v-click>

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

monads compose through **chaining**, not inheritance. you snap boxes together.

```python
Result.ok("data.csv").bind(read_csv).bind(validate).bind(log)
```

no `AsyncLoggedValidatedSafeCSVReaderFactory`.

(rust doesn't even *have* inheritance. it uses monadic types instead)

</v-click>

<v-click>

<div class="mt-4" style="color: #d4639a">

composition over inheritance. the box doesn't need to know about the other boxes.

</div>

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

<v-click>

<div class="text-xl mt-8 opacity-80">

THOUSANDS OF YEARS OF OOP AND NO REAL WORLD USE FOUND FOR `AbstractSingletonProxyFactoryBean`

</div>

</v-click>

<v-click>

<div class="text-xl mt-4 opacity-80">

WANTED YOUR CSV READER TO ALSO LOG? THAT'LL BE FOUR SUBCLASSES. COME TO YOUR SENSES

</div>

</v-click>

</div>

---
layout: two-cols-header
---

# what if you just... didn't have variables?

::left::

so we've been using monads to make Python nicer. but some languages went further.

<v-click>

in Haskell, there's no mutable state. no variables. just functions and values.

so how do you do anything?

</v-click>

<v-clicks>

- need to read a file? **IO monad**
- need to track state? **State monad**
- need randomness? state in a box
- need to print? that's IO. **monad too**

</v-clicks>

<v-click>

<div class="mt-4" style="color: #d4639a">

it's monads all the way down.

**(this is why I thought last week's code club challenge was unfair. imagine doing python without variables)**

</div>

</v-click>

::right::

<v-click at="1">

<div class="flex items-center justify-center h-full">
<img src="./images/teto.jpg" class="w-80 rounded" />
</div>

</v-click>

---

# so about that quote

remember this?

> "A monad is just a monoid in the category of endofunctors"

<v-click>

a **functor** takes a function between values and lifts it to a function between boxes.

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

an **endofunctor** is a functor from a category to itself — our boxes map Python types to Python types.

a **monoid** is something with an identity and an associative operation — that's our three rules.

</v-click>

<v-click>

<div class="mt-4" style="color: #d4639a">

a monad is a monoid in the category of endofunctors. you know what that means now.


</div>

</v-click>

---
layout: center
hideInToc: true
---

# a monad is a box you can put things in

<div class="mt-4 text-lg opacity-50">

and chain operations on, without worrying about the plumbing

</div>

<div class="mt-4 text-sm opacity-40">

i told you it wasn't that bad

</div>

<v-click>

<div class="mt-12 text-center" style="color: #d4639a">

Questions?

</div>

</v-click>
