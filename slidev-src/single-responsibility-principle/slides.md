---
theme: default
title: The Single Responsibility Principle
info: A class should only have one responsibility
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
  <h1 class="text-5xl font-bold !text-white">Single Responsibility Principle</h1>
</div>

<!--
Hello everyone. Today I'm going to be talking about the Single Responsibility Principle. This is the first in a series of talks about the SOLID Principles.
-->

---

<div class="flex flex-col justify-center h-full">
  <p class="!text-cyan-400 text-4xl font-bold leading-relaxed">"A class should only have one responsibility."</p>
  <p class="text-xl mt-8 !text-gray-300 leading-relaxed">A <span class="!text-yellow-400">responsibility</span> is a job that a class is in charge of.</p>
</div>

<!--
This principle states that a class should only have one responsibility. A responsibility is a job that a class is in charge of.
-->

---

# The Book Class

<div class="mt-4">

```python
class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn

    def validate_isbn(self):
        return len(self.isbn) == 10 and self.isbn.isdigit()

    def display_on_ui(self):
        print("--- Displaying Book on UI ---")
        print(f"  Title: {self.title.upper()}")
        print(f"  By: {self.author}")
        print("-" * 26)

    def save(self):
        data = {"title": self.title, "author": self.author, "isbn": self.isbn}
        database[self.isbn] = data
```

</div>

<p class="mt-4 !text-gray-400">How many responsibilities does this class have?</p>

<!--
Here's some code. Can anyone tell me how many responsibilities this class has?
-->

---

# Three Responsibilities

<div class="mt-4">

```python {1-5|7-8|10-14|16-19}
class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn

    def validate_isbn(self):               # 1. Validation
        return len(self.isbn) == 10 and self.isbn.isdigit()

    def display_on_ui(self):               # 2. Presentation
        print("--- Displaying Book on UI ---")
        print(f"  Title: {self.title.upper()}")
        print(f"  By: {self.author}")
        print("-" * 26)

    def save(self):                        # 3. Persistence
        data = {"title": self.title, "author": self.author, "isbn": self.isbn}
        database[self.isbn] = data
```

</div>

<div class="mt-4 space-y-2">
  <p><span class="!text-cyan-400 font-bold">1. Validation</span> <span class="!text-gray-400">- validates the ISBN number</span></p>
  <p><span class="!text-yellow-400 font-bold">2. Presentation</span> <span class="!text-gray-400">- displays book details on the UI</span></p>
  <p><span class="!text-green-400 font-bold">3. Persistence</span> <span class="!text-gray-400">- saves the book to a database</span></p>
</div>

<!--
The class has three responsibilities. First, it validates whether the ISBN number of the book is valid. Second, it displays the book's details to a UI. Third, it saves that book to a database. This code violates the Single Responsibility Principle and yet it functions perfectly. If you run it, it will do what it is supposed to do. The problem comes later, when someone else has to modify your code.
-->

---

# A New Requirement

<div class="flex flex-col justify-center h-4/5 space-y-6">
  <div class="border border-cyan-800 rounded-lg p-6">
    <p class="!text-cyan-400 font-bold text-lg mb-2"><span class="i-ph-megaphone inline-block mr-2 align-middle" /> From the UI Team</p>
    <p class="!text-gray-300">"All book titles longer than 20 characters look bad on the interface. Please truncate them."</p>
  </div>
  <p class="!text-gray-400 text-lg">A junior developer is tasked with this change.</p>
  <p class="!text-gray-400">He looks at the <code>display_on_ui</code> method and sees an opportunity...</p>
</div>

<!--
The UI team decides that all book titles that are longer than 20 characters look bad on the user interface. They've tasked a junior developer to make it so that titles are truncated if they are too long.
-->

---

# The DRY Principle

<div class="flex flex-col justify-center h-4/5 space-y-6">
  <p class="!text-yellow-400 text-3xl font-bold">Don't Repeat Yourself</p>
  <div class="space-y-4 !text-gray-400">
    <p>The junior developer reasons that future methods might also display the book title.</p>
    <p>Each one would need the same truncation logic.</p>
    <p>He wants to avoid replicating the same code multiple times.</p>
  </div>
  <div class="border border-yellow-800 rounded-lg p-4 mt-4">
    <p class="!text-yellow-400 font-bold">His idea:</p>
    <p class="!text-gray-300">Truncate the title at the source, in <code>__init__</code>, so every method gets the short version automatically.</p>
  </div>
</div>

<!--
Now, he could simply add an if statement in display_on_ui. But this junior developer is smart. When he was in university, he learned the DRY principle. He reasons that, if the code is extended in the future, there will likely be other methods that display the book title. These methods would also need truncation logic. So he decides to truncate the title at the source.
-->

---

# The "Fix"

<div class="mt-4">

```python
class Book:
    def __init__(self, title, author, isbn):
        if len(title) > 20:
            self.title = title[:20] + "..."
        else:
            self.title = title
        self.author = author
        self.isbn = isbn
```

</div>

<div class="mt-6 text-lg !text-gray-400">
  <p>He modifies the class member at the source.</p>
  <p class="mt-2">Any method that uses <code>self.title</code> will get the truncated value.</p>
</div>

<!--
So he has an idea. He'll modify the class member at the source. That way, any method that calls on it in the future will have a truncated value. This removes the need to have an if block in every display method.
-->

---

# It Works!

<div class="flex flex-col justify-center h-4/5 space-y-6">

```python
book = Book("The Fellowship of the Ring", "J.R.R. Tolkien", "0618640150")

book.display_on_ui()
```

```text
--- Displaying Book on UI ---
  Title: THE FELLOWSHIP OF THE...
  By: J.R.R. Tolkien
--------------------------
```

<p class="!text-green-400 text-lg"><span class="i-ph-check-circle inline-block mr-2 align-middle" /> Looks correct. The title is truncated on the UI.</p>

</div>

<!--
We create a book with a long title. We display it in the UI. Seems to work perfectly.
-->

---

# Save and Move On

<div class="flex flex-col justify-center h-4/5 space-y-6">

```python
book.save()
```

<p class="!text-gray-400 text-lg">The junior developer saves the book to the database and moves on.</p>
<p class="!text-gray-400">He's done his job. No bugs.</p>

</div>

<!--
We save the book to the database. The junior developer moves on. He's done his job. No bugs.
-->

---

# Later...

<div class="flex flex-col justify-center h-4/5 space-y-6">

```python
retrieved_data = database.get("0618640150")
print(f"\nData used for official library report: {retrieved_data}")
```

```text
{'title': 'The Fellowship of the...', 'author': 'J.R.R. Tolkien', 'isbn': '0618640150'}
```

<div class="border border-red-800 rounded-lg p-4 mt-4">
  <p class="!text-red-400 font-bold"><span class="i-ph-warning inline-block mr-2 align-middle" /> The title has been truncated at the source</p>
  <p class="!text-gray-400 mt-2">Someone else tries to retrieve the full title by ISBN. They only get a truncated version. The data in the database is permanently corrupted.</p>
</div>

</div>

<!--
Later, someone else tries to retrieve the title of a book by using the ISBN. They end up only able to retrieve part of the title. It's been truncated at the source.
-->

---

# What Went Wrong

<div class="flex flex-col justify-center h-4/5 space-y-6">
  <div class="grid grid-cols-3 gap-4 text-center">
    <div class="border border-cyan-800 rounded-lg p-4">
      <p class="!text-cyan-400 font-bold">Responsibility 1</p>
      <p class="!text-gray-400 text-sm mt-2">Validation</p>
    </div>
    <div class="border border-yellow-800 rounded-lg p-4">
      <p class="!text-yellow-400 font-bold">Responsibility 2</p>
      <p class="!text-gray-400 text-sm mt-2">Persistence</p>
    </div>
    <div class="border border-red-800 rounded-lg p-4 ring-2 ring-red-500">
      <p class="!text-red-400 font-bold">Responsibility 3</p>
      <p class="!text-gray-400 text-sm mt-2">Presentation</p>
    </div>
  </div>
  <p class="!text-red-400 text-xl text-center">We needed to change responsibility 3. Doing so created a bug in responsibility 2.</p>
  <div class="border border-gray-700 rounded-lg p-4 mt-2">
    <p class="!text-gray-400 italic">"Well, this is only an issue because the junior developer messed up. He should've thought it through more clearly."</p>
    <p class="!text-gray-300 mt-4">The essence of good practice is <span class="!text-cyan-400 font-bold">prevention</span>. We can't assume that everyone who modifies our code in the future will make the right decisions. We can't even assume that <span class="!text-yellow-400">we</span> will.</p>
  </div>
</div>

<!--
We needed to change responsibility 3, presentation. Doing so created a bug in responsibility 2, persistence. You might be thinking that this is only an issue because the junior developer messed up. And that's fair. But the essence of good practice is prevention. We can't assume that everyone who modifies our code will make the right decisions. We can't even assume that we will make the right decisions. We assume that people are prone to mistakes. We write code that prevents mistakes from happening.
-->

---

# The Solution

<div class="grid grid-cols-3 gap-4 mt-4 h-4/5">
  <div class="border border-cyan-800 rounded-lg p-4">
    <p class="!text-cyan-400 font-bold mb-3">Book</p>

```python
class Book:
    def __init__(self, title,
                 author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn

    def validate_isbn(self):
        return (len(self.isbn) == 10
                and self.isbn.isdigit())
```

  </div>
  <div class="border border-yellow-800 rounded-lg p-4">
    <p class="!text-yellow-400 font-bold mb-3">BookPresenter</p>

```python
class BookPresenter:
    @staticmethod
    def display(book):
        title = book.title
        if len(title) > 20:
            title = title[:20] + "..."
        print(f"  Title: "
              f"{title.upper()}")
        print(f"  By: {book.author}")
```

  </div>
  <div class="border border-green-800 rounded-lg p-4">
    <p class="!text-green-400 font-bold mb-3">BookRepository</p>

```python
class BookRepository:
    @staticmethod
    def save(book):
        data = {
            "title": book.title,
            "author": book.author,
            "isbn": book.isbn
        }
        database[book.isbn] = data
```

  </div>
</div>

<!--
This is where the Single Responsibility Principle comes in. We can separate the functionality of the Book class into multiple classes. Each class has taken over one of the three responsibilities of the previous large class. If this was done from the start, the junior developer would have been tasked with modifying the BookPresenter class, which is in charge of displaying the book data. His changes would not have affected the BookRepository class, which is where the database saving logic occurs.
-->

---

<div class="flex flex-col justify-center h-full space-y-6">
  <div class="grid grid-cols-2 gap-8">
    <div>
      <p class="!text-red-400 font-bold text-xl mb-4"><span class="i-ph-x-circle inline-block mr-2 align-middle" /> Before</p>
      <p class="!text-gray-400">One class with three responsibilities.</p>
      <p class="!text-gray-400 mt-2">Changing one responsibility can break another.</p>
      <p class="!text-gray-400 mt-2">Each change requires understanding the entire class.</p>
    </div>
    <div>
      <p class="!text-green-400 font-bold text-xl mb-4"><span class="i-ph-check-circle inline-block mr-2 align-middle" /> After</p>
      <p class="!text-gray-400">Three classes, each with one responsibility.</p>
      <p class="!text-gray-400 mt-2">Changes are isolated. Bugs can't cross boundaries.</p>
      <p class="!text-gray-400 mt-2">Each class is simple to understand and modify.</p>
    </div>
  </div>
  <div class="border border-cyan-800 rounded-lg p-4 mt-4">
    <p class="!text-gray-300">The code is <span class="!text-cyan-400 font-bold">functionally the same</span>, but one is easier to modify.</p>
    <p class="!text-gray-400 mt-2">We assume that people are prone to mistakes. We write code that prevents mistakes from happening.</p>
  </div>
</div>

<!--
The initial code is functionally the same, but one is easier to modify. We assume that people are prone to mistakes. We write code that prevents mistakes from happening.
-->

---

<div class="flex flex-col items-center justify-center h-full">
  <h1 class="text-5xl font-bold !text-white">Thank You</h1>
  <p class="text-xl mt-6 !text-gray-400">Questions?</p>
</div>

<!--
Thank you for listening. Happy to take questions.
-->
