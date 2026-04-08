---
theme: default
title: The Liskov Substitution Principle
info: Thinking in Types
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
  <h1 class="text-5xl font-bold !text-white">Liskov Substitution Principle</h1>
</div>

<!--
Hello everyone. Today I'll be talking about the Liskov Substitution Principle.
This is the third in a series of talks about the SOLID Principles.
-->

---
class: text-white
---

# Barbara Liskov

<div class="grid grid-cols-2 gap-8 h-4/5">
  <div class="text-lg flex flex-col justify-center">
    <ul class="space-y-2">
      <li>MIT professor</li>
      <li>One of the first women in the US to earn a PhD in Computer Science</li>
      <li>Won Turing Award, 2008</li>
      <li>Designed CLU - iterators, abstract data types, checked exceptions</li>
      <li><span class="!text-cyan-400">1987 keynote:</span> "Data Abstraction and Hierarchy"</li>
      <li><span class="!text-cyan-400">1994 paper</span> with Jeannette Wing: "A Behavioral Notion of Subtyping"</li>
    </ul>
  </div>
  <div class="flex items-center justify-center">
    <img src="/images/barbara-liskov.jpg" class="rounded-lg max-h-full object-contain" />
  </div>
</div>

<!--
First, I want to talk about Barbara Liskov. 

She is an MIT professor and one of the first women in the US to earn a PhD in computer science,  which she received from Stanford in 1986

In the 1970s she lead a team that designed the CLU language, which introduced concepts like iterators, abstract data types, and checked exceptions. These are all fundamental ideas in modern programming.

She introduced the substitution principle in a keynote titled "Data Abstraction and Hierarchy". She later formalized it with Jeannette Wing in a paper called "A Behavioral Notion of Subtyping".

By all accounts, she was a very impressive person.
-->

---

<div class="flex flex-col justify-center h-full space-y-10">
  <p class="!text-cyan-400 text-4xl font-bold leading-relaxed">"You should be able to substitute a subtype for its supertype without breaking any contracts."</p>
  <p class="text-xl !text-gray-300 leading-relaxed">Code that works correctly with a supertype must continue to work correctly with any of its subtypes, <span class="!text-yellow-400">without knowing the difference.</span></p>
</div>

<!--
The principle that came from her work is as follows. You should be able to substitute a subtype for its supertype without breaking any contracts.

Or more precisely, code that works correctly with a supertype must continue to work correctly with any of its subtypes, without having to check what the difference is.

What's importation is substituting behaviour, not just structure. A subtype can have all the right methods but still violate the principle if it behaves unexpectedly.
-->

---

<div class="flex flex-col justify-center h-full">
  <p class="text-2xl !text-gray-300 mb-8">A type defines a set of <span class="!text-cyan-400 font-bold">values</span> and the <span class="!text-yellow-400 font-bold">operations (contracts)</span> permitted on those values.</p>
  <div class="space-y-6 text-lg">
    <p class="!text-gray-400">This set of values and contracts is the <span class="!text-fuchsia-400 font-bold">"shape"</span> of the type.</p>
    <p class="!text-gray-400">Two types with the same <span class="!text-cyan-400">values</span> and <span class="!text-yellow-400">contracts</span> are identical.</p>
  </div>
</div>

<!--
So what is a type? 

A type defines a set of values and the operations permitted on those values. These operations are referred to as contracts. Together, values and contracts form what I'll call the "shape" of the type.

Two types that have the same shapes are essentially the same. The language you are writing in may not treat them as being the same, but conceptually they are identical.
-->

---

<div class="flex flex-col justify-center h-full">

```ts
class User {
  name: string;          // ← value
  email: string;         // ← value
  age: number;           // ← value

  updateEmail(newEmail: string): User {
    // Contract:
    //   - validates email format (precondition)
    //   - updates the field
    //   - returns the updated user (postcondition)
  }
}
```

</div>

<!--
Obviously, Classes are Types. 

The values are the fields.

The contracts are the methods and their behavior. 

The updateEmail method must validate the email format, update the field and return the updated user. 

The contract isn't just "this method exists", it's what the method promises to do. That includes what inputs are accepted, what outputs are produced, what side effects occur and what exceptions can be thrown.

The shape is the combination of those fields and those method contracts.
-->

---

<div class="flex flex-col justify-center h-full">

```ts
function calculateTax(income: number, region: string): number {
  // Contract:
  //   - Throws for negative income (precondition)
  //   - Returns correct tax as a non-negative number (postcondition)
  //   - Does not modify external state (purity promise)
}
```

</div>

<!--
Functions are also types, The values are the parameters, The contracts are what the function promises to do.
-->

---

<div class="flex flex-col justify-center h-full">

```json
{
  "id": 1,
  "title": "Hello",
  "published": true
}
```

</div>

<!--
Data is also a form of Type, The values are the fields and the contracts are the constraints on those values. 

These might be enforced by a schema, a validation layer, or just by convention.
-->

---

# Extending Correctly

<div class="mt-4">

```ts
class Vehicle {
  startEngine(): void { /* starts the engine */ }
  stop(): void { /* stops the vehicle */ }
}

class ElectricVehicle extends Vehicle {
  // Everything Vehicle promises, still honored
  startEngine(): void { /* starts the electric motor */ }
  stop(): void { /* stops the vehicle */ }

  // Added on top
  getBatteryLevel(): number { /* ... */ }
  chargeBattery(): void { /* ... */ }
}
```

</div>

<div class="mt-6 text-lg">
  <p class="!text-green-400">✓ Any code that works with Vehicle will work fine with ElectricVehicle</p>
  <p class="!text-gray-400 mt-2">The subtype honors all existing contracts and extends with new capabilities.</p>
</div>

<!--
So now that we know what types are, what does it mean to extend one correctly?

Lets look at the class, Vehicle. It has two methods. Startengine and stop. 

After the ElectricVehicle class extends it. It can still start. It can still stop. Then it adds the getBatteryLevel and chargeBattery methods on top. Any code that works with Vehicle also works with ElectricVehicle.

Extending a type means you only add to its shape. You never remove.
-->

---

# Extending Incorrectly

<div class="mt-4">

```ts
class Bird {
  fly(): number { /* returns altitude */ }
  eat(): void { /* eats food */ }
}

class Penguin extends Bird {
  fly(): number {
    throw new UnsupportedOperationException();
  }
  eat(): void { /* eats fish */ }
}
```

</div>

<div class="mt-6 text-lg">
  <p class="!text-red-400">✗ Penguin removed from the type. It can't do what Bird promised.</p>
  <p class="!text-gray-400 mt-2">If your subtype can't do everything the supertype promises, the inheritance is backwards.</p>
  <p class="!text-gray-500 mt-2">Your "subtype" should be the supertype, and the thing with more capabilities should be the subtype.</p>
</div>

<!--
Now lets look at an incorrect example. The Bird class has the fly method which returns altitude. The Penguin class extends Bird but throws an exception when you call fly. It removed from the type instead of adding to it.

If your subtype can't do everything the supertype promises, the inheritance is wrong. Instead of bird having fly(),  it would be better to make a FlyingBird class that extends Bird and puts fly() there.
-->

---

# Broken Abstractions

<div class="flex flex-col justify-center h-4/5 space-y-6">
  <p class="text-xl !text-gray-300">If subtypes can break contracts, you can <span class="!text-red-400">never trust an abstraction</span>.</p>
  <div class="space-y-4 !text-gray-400">
    <p>Reading code that uses a <code>Vehicle</code> type, you have to wonder:</p>
    <p class="!text-red-400 italic text-lg">"But what if this is actually some weird subtype that doesn't start its engine when I call startEngine()?"</p>
    <p>This forces you to read every concrete implementation to understand behavior.</p>
    <p>The abstraction becomes useless.</p>
  </div>
  <div class="border border-red-800 rounded-lg p-4 mt-4">
    <p class="!text-gray-400">The whole point of types is to let you reason <span class="!text-white">locally</span>.</p>
    <p class="!text-red-400">LSP violations force <span class="!text-white">global</span> reasoning.</p>
  </div>
</div>

<!--
So why does this matter? 

If subtypes can break contracts, you can never trust an abstraction. If you see code that calls startEngine on a Vehicle, you should be able to trust that it starts. But if some subtype doesn't actually start its engine, you have to then go and check every implementation.

The whole point of types is to let you reason locally. LSP violations force you to reason globally, which is a lot harder. You will make mistakes.
-->

---

# Invariants Must Be Preserved

<div class="flex flex-col justify-center h-4/5 space-y-6">
  <p class="text-xl !text-gray-300">An invariant is something that is <span class="!text-cyan-400">always true</span> about a type.</p>

```ts
class BankAccount {
  balance: number;
  // Invariant: balance >= 0 (non-overdraft account)

  withdraw(amount: number): void {
    if (this.balance - amount < 0) throw new Error("Insufficient funds");
    this.balance -= amount;
  }
}

class StudentAccount extends BankAccount {
  withdraw(amount: number): void {
    this.balance -= amount; // allows negative balance
  }
}
```

  <p class="!text-red-400 text-lg">Any code that assumes balance is never negative will break.</p>
</div>

<!--
It's not just about method behavior. It's also a problem when Invariants are violated too. An invariant is something that's always true about a type.

The BankAccount class has an invariant. The balance is never negative. 

The StudentAccount class overrides withdraw and allows negative balances. Any code that assumes that balance >= 0 will break.
-->

---

<div class="flex flex-col justify-center h-full">

```ts
function sort(items: Item[], comparator: (a: Item, b: Item) => number) {
  // Contract on comparator:
  //   return negative if a < b
  //   return zero     if a === b
  //   return positive if a > b
}

// Someone passes a broken comparator:
sort(items, (a, b) => {
  if (a.name === b.name) return null;  // violates contract
  return a.name > b.name ? 1 : -1;
});
```

</div>

<!--
LSP violations aren't just about classes. 

Here the sort function takes a comparator with a clear contract: return negative if a < b, zero if equal and positive if a > b. 

If someone passes a function that returns null for equal names, JavaScript coerces null and the sort completes. The list comes out "sorted" but in the wrong order. There's no crash, so you'd have to inspect the results to notice the bug. And if the data set is large enough, this may go unnoticed.
-->

---

# The `instanceof` Smell

<div class="flex flex-col justify-center h-4/5 space-y-6">

```ts
// This defeats the entire purpose of a shared supertype
for (const bird of birds) {
  if (bird instanceof Penguin) {
    bird.swim();
  } else if (bird instanceof Ostrich) {
    bird.run();
  } else {
    bird.fly();
  }
}

// Every new subtype means updating every instanceof chain
// The opposite of extensibility
```

</div>

<!--
A giveaway for LSP violations is the instanceof Smell. If you're checking the concrete type before calling a method, ask yourself why you can't just call the method. Usually it's because some subtype doesn't honor the contract.

Every instanceof check is a place where the abstraction has failed. And every new subtype means going back and updating every instanceof chain.
-->

---

# Cascading Defensive Code

<div class="flex flex-col justify-center h-4/5 space-y-6">
  <div class="space-y-4">
    <div class="flex items-center gap-4">
      <span class="!text-red-400 font-mono text-lg">Layer 1</span>
      <span class="!text-gray-400">→ Subtype violates contract</span>
    </div>
    <div class="flex items-center gap-4">
      <span class="!text-red-400 font-mono text-lg">Layer 2</span>
      <span class="!text-gray-400">→ Immediate caller adds a workaround</span>
    </div>
    <div class="flex items-center gap-4">
      <span class="!text-red-400 font-mono text-lg">Layer 3</span>
      <span class="!text-gray-400">→ Workaround changes return type, next caller adapts</span>
    </div>
    <div class="flex items-center gap-4">
      <span class="!text-red-400 font-mono text-lg">Layer 4</span>
      <span class="!text-gray-400">→ Null checks and type guards spread</span>
    </div>
    <div class="flex items-center gap-4">
      <span class="!text-red-400 font-mono text-lg">Layer 5</span>
      <span class="!text-gray-400">→ Defensive checks 5 layers deep</span>
    </div>
  </div>
  <div class="border border-red-800 rounded-lg p-4 mt-4">
    <p class="!text-gray-400">All because one subtype didn't honor a contract.</p>
    <p class="!text-red-400 mt-2">The codebase becomes brittle. Every change risks breaking a defensive chain.</p>
  </div>
</div>

<!--
Another thing that happens when you don't respect LSP is that workarounds start to cascade. 

One subtype violates a contract. The immediate caller adds a null check. 

That changes the return type, the next caller adapts. 

Before you know it you have defensive checks 5 layers deep. All because one subtype didn't honor a contract.
-->

---

<div class="flex flex-col items-center justify-center h-full">
  <h1 class="text-5xl font-bold !text-white">Thank You</h1>
  <p class="text-xl mt-6 !text-gray-400">Questions?</p>

</div>

<!--
Thank you. Happy to take questions.
-->
