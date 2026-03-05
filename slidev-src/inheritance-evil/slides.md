---
theme: default
title: Inheritance is Evil
info: |
  Presentation for code club about the dangers of inheritance
class: text-center
drawings:
  persist: false
transition: fade-out
mdc: true
layout: cover
---

# Inheritance is Evil

George Roe

---
layout: center
---

<Toc minDepth="1" maxDepth="1" />

---
layout: fact
title: What is Inheritance?
---

**Inheritance** is when one class (the **subclass/child class**) gets access to the properties and behaviors of another class (the **superclass/parent class**).

---
layout: fact
title: Whats the problem
---

Inheritance isnt *really* evil, however there is almost always a better option.

The true evil of inheritance is how it is revered in academia and taught as an absolute solution.

---
title: Earclacks
layout: full
---

<div class="flex justify-center items-center gap-2 h-100">
  <iframe
    v-for="code in [
      'RMjY1CnGPt4',
      'HFwdd1njXq4',
      'PPyi7g8L69M'
    ]"
    :key="item"
    :src="`https://www.youtube.com/embed/${code}`"
    title="YouTube Short player"
    frameborder="0"
    class="flex-1 h-full aspect-[9/16] object-cover border-none"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

---
layout: center
---

We don't have time in this talk to implement all good practices:

- No encapsulation
- We wont be implementing anything remotely complex (e.g., no projectiles)
- Only implementing the balls, not the entire simulation
- We will be coupling data and behaviour

---
layout: center
---

```mermaid {scale: 0.48 }
classDiagram
  direction TD

  class Ball {
    +position Vec2 
    +health float
    +rotational_velocity float
    +getHitbox() Hitbox
    +update(Simulation sim, float dt) void
    +onHit(Ball other) void
    +render(Window window) void
  }

  class BladeBall {
    +blade_size float
    +damage float
    +getHitbox()
    +onHit(Ball other) void
    +render(Window window) void
  }
  Ball <|-- BladeBall

  class DaggerBall {
    +onHit(Ball other) void
  }
  BladeBall <|-- DaggerBall

  class SwordBall {
    +onHit(Ball other) void
  }
  BladeBall <|-- SwordBall

  class ScepterBall {
    +lifesteal float
    +update(Simulation sim, float dt) void
    +onHit(Ball other) void
  }
  Ball <|-- ScepterBall

  class HammerBall {
    +lifesteal float
    +update(Simulation sim, float dt) void
    +onHit(Ball other) void
  }
  Ball <|-- HammerBall

  class LanceBall {
    +damage float
    +state LanceState
    +update(Simulation sim, float dt) void
    +onHit(Ball other) void
  }
  Ball <|-- LanceBall 

  class UnarmedBall {
    +damage float
    +speed float
    +update(Simulation sim, float dt) void
    +onHit(Ball other) void
  }
  Ball <|-- UnarmedBall 
```

---
layout: center 
class: text-center list-none
---

# Problems

<v-clicks>

- Every ball class defines its own `onHit()` and `update()` possibly leading to repeated logic.
- Every balls `update()` function will also have to call the super classes `update()` function to ensure for example that they all spin.
- Calling `super.update()` doesnt mean anything! What does it do? Who knows? maybe it does more than just make the ball spin. What if we want a ball that doesnt spin, but does do other behaviours defined in `super.update()`?

</v-clicks>

---
layout: center
class: text-center
title: Enter Composition
---

Composition is the practice of building complex objects or behaviours by combining smaller, reusable components.

---
layout: center
---

```mermaid { scale: 0.45 }
classDiagram
  direction TD
  
  class Ball {
    +spin_behaviour SpinBehaviour
    +movement_behaviour MovementBehaviour
    +generic_behaviour GenericBehaviour
    +collision_behaviour CollisionBehaviour
    +renderer Renderer

    +position Vec2
    +health float
    +rotation float
  }
  
  class SpinBehaviour {
    <<interface>>
    spin(float dt, float rotation) float
  }
  Ball *-- SpinBehaviour

  class MovementBehaviour {
    <<interface>>
    move(float dt, Vec2 position) Vec2
  }
  Ball *-- MovementBehaviour

  class GenericBehaviour {
    <<interface>>
    update(float dt, Ball ball) void
  }
  Ball *-- GenericBehaviour

  class CollisionBehaviour {
    <<interface>> 
    onHitBall(float dt, Ball ball, Ball other) void
    onHitWall(float dt, Ball ball) void
  }
  Ball *-- CollisionBehaviour

  class Renderer {
    <<interface>>
    render(Window window, Vec2 position, float rotation) void
  }
  Ball *-- Renderer
```

---
layout: center
---

```mermaid { scale: 0.8 }
classDiagram
  direction TD
  
  class SpinBehaviour {
    <<interface>>
    spin(float dt, float rotation) float
  }

  class ConstantSpinBehaviour {
    +rotational_velocity float
    +spin(float dt, float rotation) float
  }
  SpinBehaviour <|.. ConstantSpinBehaviour

  class ChargeUpSpinBehaviour {
    +rotational_velocity float
    +velocity_increase_per_second float
    +spin(float dt, float rotation) float
  }
  SpinBehaviour <|.. ChargeUpSpinBehaviour
```

---
layout: center
---

```mermaid { scale: 0.8 }
classDiagram
  direction TD
  
  class MovementBehaviour {
    <<interface>>
  }

  class GravityMovementBehaviour {
    +gravity_acceleration float
    move(float dt, Vec2 position) Vec2
  }
  MovementBehaviour <|.. GravityMovementBehaviour

  class ChargeMovementBehaviour {
    +speed Vec2
    move(float dt, Vec2 position) Vec2
  }
  MovementBehaviour <|.. ChargeMovementBehaviour
```

---
layout: center
---

```mermaid { scale: 0.8 }
classDiagram
  class GenericBehaviour {
    <<interface>>
    update(float dt, Ball ball) void
  }

  class NoBehaviour {
    update(float dt, Ball ball) 
  }
  GenericBehaviour <|.. NoBehaviour

  class LanceStateSwapBehaviour {
    +timer float
    +charge_time float
    +current_state LanceStateEnum
    update(float dt, Ball ball)
  }
  GenericBehaviour <|.. LanceStateSwapBehaviour
```

---
layout: center
---

```mermaid { scale: 0.8 }
classDiagram
  class CollisionBehaviour {
    <<interface>> 
    onHitBall(float dt, Ball ball, Ball other) void
    onHitWall(float dt, Ball ball) void
  }

  class ConstantDamageCollisionBehaviour {
    +damage float
    onHitBall(float dt, Ball ball, Ball other) void
    onHitWall(float dt, Ball ball) void
  }
  CollisionBehaviour <|.. ConstantDamageCollisionBehaviour 
```

---
layout: center
---

```mermaid { scale: 0.8 }
classDiagram
  direction TD

  class Renderer {
    <<interface>>
    render(Window window, Vec2 position, float rotation) void
  }

  class UnarmedRenderer {
    render(Window window, Vec2 position, float rotation) void
  }
  Renderer <|.. UnarmedRenderer

  class ArmedRenderer {
    +weapon_sprite Sprite
    render(Window window, Vec2 position, float rotation) void
  }
  Renderer <|.. ArmedRenderer
```

---
layout: center
---

```rs
fn unarmed() -> Ball {
  Ball {
    ConstantSpinBehaviour::new(1),
    GravityMovementBehaviour::new(9.81),
    NoBehaviour::new(),
    ConstantDamageCollisionBehaviour::new(10),
    UnarmedRenderer::new(),
  }
}
```

---
layout: center 
class: text-center list-none
---

# What has improved

<v-clicks>

- No implicit behaviour
- Greater flexibility
- Simpler testing
- Lower coupling
- Open/Closed Principle

</v-clicks>

---
layout: center
class: text-center
---

# Thank You!

[Refactoring Guru](https://refactoring.guru/) - [Bevy ECS](https://bevy.org/learn/quick-start/getting-started/ecs/)
