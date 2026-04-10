---
theme: default
title: The Open/Closed Principle
info: Open for extension, closed for modification
class: text-white
colorSchema: dark
fonts:
  sans: Inter
  mono: Fira Code
drawings:
  enabled: false
transition: fade
---

<div class="flex flex-col items-center justify-center h-full">
  <h1 class="text-5xl font-bold !text-white">Open/Closed Principle</h1>
</div>

<!--
Hello everyone. Today I'm going to be talking about the Open/Closed Principle. This is the second in a series of talks about the SOLID Principles.
-->

---

<div class="flex flex-col justify-center h-full">
  <p class="!text-cyan-400 text-4xl font-bold leading-relaxed">"Code should be open for extension but closed for modification."</p>
  <p class="text-xl mt-8 !text-gray-300 leading-relaxed">You should write code so that you can add new functionality <span class="!text-yellow-400">without having to change what's already been written.</span></p>
</div>

<!--
This principle states that code should be open for extension but closed for modification. This means that you should write code so that you can add new functionality without having to change what's already been written.
-->

---

# The Employee Classes

<div class="mt-4">

```python
class Manager:
    def __init__(self, name, department):
        self.name = name
        self.department = department

class Programmer:
    def __init__(self, name, billable_hours, language):
        self.name = name
        self.billable_hours = billable_hours
        self.language = language
```

</div>

<div class="mt-6 space-y-2 !text-gray-400">
  <p>Two classes. Both have a <code>name</code> attribute.</p>
  <p>A <span class="!text-cyan-400">Manager</span> has a <code>department</code>. A <span class="!text-yellow-400">Programmer</span> has <code>billable_hours</code> and a <code>language</code>.</p>
</div>

<!--
Let's look at some code. We have two classes here. A class called Manager and a class called Programmer. They both have the name attribute. They differ in that the Manager class stores the department name, whereas the Programmer class stores billable hours and a programming language.
-->

---

# Two Functions

<div class="mt-4">

```python
def show_employees(employees):
    for employee in employees:
        if isinstance(employee, Manager):
            print(f"{employee.name} leads {employee.department}")
        elif isinstance(employee, Programmer):
            print(f"{employee.name} programs in {employee.language}")

def show_billable_hours(employees):
    total = 0
    for employee in employees:
        if isinstance(employee, Programmer):
            total += employee.billable_hours
    print(f"Total billable hours: {total}")
```

</div>

<div class="mt-4 !text-gray-400">
  <p>Both functions loop through a list of employees and use <code>isinstance</code> checks to decide what to do.</p>
</div>

<!--
Here are two functions. The show employee function loops through the employee list. If the employee is a manager, it prints which department they lead. If they're a programmer, it prints which language they program in. The show billable hours function adds up the billable hours of every Programmer and prints the total.
-->

---

# It Works

<div class="flex flex-col justify-center h-4/5 space-y-6">

```python
employees = [
    Manager("Alex", "Engineering"),
    Programmer("Zak", 40, "Python"),
    Programmer("Tristan", 35, "Java"),
]

show_employees(employees)
show_billable_hours(employees)
```

```text
Alex leads Engineering
Zak programs in Python
Tristan programs in Java
Total billable hours: 75
```

<p class="!text-green-400"><span class="i-ph-check-circle inline-block mr-2 align-middle" /> We get the output we're expecting. Code works. So far, so good.</p>

</div>

<!--
We initialise a list of employees, then call our two functions. We get the output that we're expecting. So far, we're fine. We haven't been paying attention to principles or best practice but our code works, so who cares?
-->

---

# A New Requirement

<div class="flex flex-col justify-center h-4/5 space-y-6">
  <div class="border border-cyan-800 rounded-lg p-6">
    <p class="!text-cyan-400 font-bold text-lg mb-2"><span class="i-ph-megaphone inline-block mr-2 align-middle" /> New requirement</p>
    <p class="!text-gray-300">Add support for <span class="!text-yellow-400 font-bold">Designers</span>. They have billable hours but instead of a programming language, they have a software tool they are proficient in.</p>
  </div>
  <div class="mt-4">

```python
class Designer:
    def __init__(self, name, billable_hours, tool):
        self.name = name
        self.billable_hours = billable_hours
        self.tool = tool
```

  </div>
  <p class="!text-gray-400">This seems like an easy job. Just make a new class.</p>
</div>

<!--
We are later told to add functionality for employees who are designers. These designers have billable hours but instead of a programming language, they have a software tool. This seems easy. We just make a new class called Designer.
-->

---

# Add a Designer

<div class="flex flex-col justify-center h-4/5 space-y-6">

```python
employees = [
    Manager("Alex", "Engineering"),
    Programmer("Zak", 40, "Python"),
    Programmer("Tristan", 35, "Java"),
    Designer("Matthew", 45, "Photoshop"),
]

show_employees(employees)
show_billable_hours(employees)
```

```text
Alex leads Engineering
Zak programs in Python
Tristan programs in Java
Total billable hours: 75
```

<p class="!text-red-400 text-lg"><span class="i-ph-warning inline-block mr-2 align-middle" /> The output hasn't changed. Matthew is invisible.</p>

</div>

<!--
We add an employee called Matthew to our list. He works more than Zak or Tristan and he's proficient in Photoshop. Nice and simple. Let's see what happens when we run our code. Unfortunately, our output hasn't changed. Matthew is missing.
-->

---

# The Problem

<div class="flex flex-col justify-center h-4/5 space-y-6">

```python
def show_employees(employees):
    for employee in employees:
        if isinstance(employee, Manager):        # Only handles Manager
            print(f"{employee.name} leads {employee.department}")
        elif isinstance(employee, Programmer):   # Only handles Programmer
            print(f"{employee.name} programs in {employee.language}")
        # Designer? Ignored.

def show_billable_hours(employees):
    total = 0
    for employee in employees:
        if isinstance(employee, Programmer):     # Only counts Programmer
            total += employee.billable_hours
    # Designer's hours? Not counted.
```

<div class="border border-red-800 rounded-lg p-4 mt-2">
  <p class="!text-red-400 font-bold">Every new employee type requires modifying existing functions.</p>
  <p class="!text-gray-400 mt-2"><span class="!text-white">Problem 1:</span> It's tedious. Extra work that could be avoided.</p>
  <p class="!text-gray-400 mt-1"><span class="!text-white">Problem 2:</span> It may lead to mistakes. If people have to change your code in multiple places, they will eventually miss one.</p>
</div>

</div>

<!--
Our code is set up so that we have different if statements for Manager or Programmer. If we add Designers, we need to add new if statements everywhere. And if we later add Janitors, we do it all again. This is tedious and error-prone. If people have to change your code in multiple places to make a simple change, they will probably mess up eventually.
-->

---

# The Fix: Polymorphism

<div class="mt-4">

```python
class Manager:
    def __init__(self, name, department):
        self.name = name
        self.department = department
        self.billable_hours = 0

    def describe(self):
        print(f"{self.name} leads {self.department}")

class Programmer:
    def __init__(self, name, billable_hours, language):
        self.name = name
        self.billable_hours = billable_hours
        self.language = language

    def describe(self):
        print(f"{self.name} programs in {self.language}")
```

</div>

<p class="mt-4 !text-gray-400">Each class now has a <code>describe()</code> method and a <code>billable_hours</code> attribute.</p>

<!--
Let's refactor our classes. We add a describe method to each class. This bit of polymorphism makes it so that each class will have a suitable statement for itself. We also add a billable_hours attribute to Manager, initialised to 0.
-->

---

# Open for Extension

<div class="flex flex-col justify-center h-4/5 space-y-6">

```python
def show_employees(employees):
    for employee in employees:
        employee.describe()

def show_billable_hours(employees):
    total = sum(e.billable_hours for e in employees)
    print(f"Total billable hours: {total}")
```

<div class="mt-4 space-y-4">
  <p class="!text-green-400 text-lg"><span class="i-ph-check-circle inline-block mr-2 align-middle" /> No more <code>isinstance</code> checks. No more <code>if/elif</code> chains.</p>
  <p class="!text-gray-300">We are free to implement as many different employee types as we wish.</p>
  <p class="!text-gray-300">We don't have to modify these functions anymore.</p>
</div>

<div class="border border-green-800 rounded-lg p-4 mt-2">
  <p class="!text-green-400 font-bold">If you don't give them the opportunity to modify it, you don't give them the opportunity to break it.</p>
</div>

</div>

<!--
Now, our show employees function no longer needs an if statement. We are free to implement as many different employee types as we wish. We don't have to modify our show employees function anymore. Our code is now open to extension without requiring any form of modification. If you don't give them the opportunity to modify it, you don't give them the opportunity to break it.
-->

---

# Adding a Designer

<div class="flex flex-col justify-center h-4/5 space-y-6">

```python
class Designer:
    def __init__(self, name, billable_hours, tool):
        self.name = name
        self.billable_hours = billable_hours
        self.tool = tool

    def describe(self):
        print(f"{self.name} designs in {self.tool}")
```

```text
Alex leads Engineering
Zak programs in Python
Tristan programs in Java
Matthew designs in Photoshop
Total billable hours: 120
```

<p class="!text-green-400 text-lg"><span class="i-ph-check-circle inline-block mr-2 align-middle" /> No existing code was modified. Matthew is now visible. His hours are counted.</p>

</div>

<!--
Now when we add a Designer class with a describe method, everything just works. No existing code was modified. The designer's hours are counted automatically.
-->

---

<div class="flex flex-col justify-center h-full space-y-6">
  <div class="grid grid-cols-2 gap-8">
    <div>
      <p class="!text-red-400 font-bold text-xl mb-4"><span class="i-ph-x-circle inline-block mr-2 align-middle" /> Before</p>
      <p class="!text-gray-400">Adding a new type requires modifying every function.</p>
      <p class="!text-gray-400 mt-2">Each <code>isinstance</code> chain is a place where someone might forget to add a case.</p>
      <p class="!text-gray-400 mt-2">No error is raised. The bug is silent.</p>
    </div>
    <div>
      <p class="!text-green-400 font-bold text-xl mb-4"><span class="i-ph-check-circle inline-block mr-2 align-middle" /> After</p>
      <p class="!text-gray-400">Adding a new type requires only a new class.</p>
      <p class="!text-gray-400 mt-2">Existing functions work with any type that follows the contract.</p>
      <p class="!text-gray-400 mt-2">The code is open for extension, closed for modification.</p>
    </div>
  </div>
  <div class="border border-cyan-800 rounded-lg p-4 mt-4">
    <p class="!text-gray-300">It's a tiny bit of forethought now to save yourself <span class="!text-cyan-400 font-bold">a lot of time in the future</span>.</p>
  </div>
</div>

<!--
It is important to keep the open/closed principle in mind when you are writing code. It's a tiny bit of forethought now to save yourself a lot of time in the future.
-->

---

<div class="flex flex-col items-center justify-center h-full">
  <h1 class="text-5xl font-bold !text-white">Thank You</h1>
  <p class="text-xl mt-6 !text-gray-400">Questions?</p>
</div>

<!--
Thank you for listening. Happy to take questions.
-->
