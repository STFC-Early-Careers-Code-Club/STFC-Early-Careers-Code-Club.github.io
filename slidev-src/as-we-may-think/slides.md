---
title: As We May Think
info: |
  Code Club Presentation on Agentic AI

theme: seriph
themeConfig:
  primary: '#955438'
  secondary: '#4f5250'
  background: '#201e15'

  
drawings:
  persist: false


class: text-center
transition: fade-out
mdc: true
layout: cover
hideInToc: true
---


# As We May Think

Agentic AI and You

<div class="flex justify-center gap-8 mt-4">
  <figure class="text-center">
    <img src="./images/the_memex_cropped.jpg" class="h-48 rounded" alt="The Memex" />
    <figcaption class="text-sm opacity-60 mt-2">Bush's Memex (1945)</figcaption>
  </figure>
  <figure class="text-center">
    <img src="./images/engelbart.jpg" class="h-48 rounded" alt="Douglas Engelbart" />
    <figcaption class="text-sm opacity-60 mt-2">Engelbart's Demo (1968)</figcaption>
  </figure>
</div>


---
layout: center
hideInToc: true
---

# Prelude: Information Complexity

In 1945, Vannevar Bush wrote *"As We May Think"* — arguing that the explosion of scientific research had outpaced our ability to navigate it. He argued that producing information wasn't the problem, instead *finding and connecting it was.*

<v-click>

<div class="mt-4" style="color: #955438">

**80 years later, the problem has only scaled up.**

</div>

</v-click>

---
layout: center
---

<Toc minDepth="1" maxDepth="1" />

---

# Bottom Line Up-Front

<v-click>

## What this isn't about:

- "AI is a magic tool that will solve cancer, climate change, and all of science"
- I have a bridge to sell to the people who say this
- I still have 200 different major concerns about the implications of the technology for society

</v-click>

<v-click>

## What it *is* about:

- When used *right*, AI agents are a genuinely new way to use computers for science, research, and development
- I haven't written a line of code myself in 2 months, and it's been very surreal
- I want to show you how

</v-click>

---

# What is an Agent?

- Simple answer: "an LLM that can do things"
- Better answer: an LLM in a "harness." The LLM generates commands, the harness executes them
- Its tools are just programs:
    - Bash Commands
    - Text editors
    - Web search (Google, etc.)
    - *Anything you can do on a computer*

<v-click>

```bash
> "List the files in my folder"
[llm-with-bash]$ ls .
MyFolder/ file.txt
```
```bash
> "Thank you!"
[llm-with-bash]$ sudo rm -rf --no-preserve-root /
*computer explodes*
```

</v-click>
<v-click>(Use a smart LLM)</v-click>

---

# Prompt-Chaining (ReACT Loop)

- Why stop after a single tool call?
- Prompt-chaining: feed tool outputs back into the agent as new prompts
- The agent alternates between **reasoning** and **acting**

<v-click>

```bash {lines:true}
> "Write a Python script that models exponential growth"
(agent-reasoning) "I need a correct definition and formula for exponential growth."
(agent-tool:search) "exponential growth definition"
[tool-output] [Results include Wikipedia, BBC Bitesize, etc.]
(agent-reasoning) "I’ll use Wikipedia as a reference."
(agent-tool:http) GET en.wikipedia.org/wiki/Exponential_growth
[tool-output] <article content>
(agent-reasoning) "I now have the formula. I can write the script."
(agent-tool:write) Create exponential_growth.py
[tool-output] File written.
(agent-response) "I’ve created exponential_growth.py. Want me to run or plot it?"
```

</v-click>

<v-click> TL;DR: an agent is an LLM with tools in a loop </v-click>


---
layout: two-cols-header
---

# The 21st Century Computer

::left::

- LLMs have limited "context windows" and cannot recall previous context windows

<v-click>

- However, tool use means an agent can now:
    - Write ideas/plans/learnings to files
    - Read those files later
- This means the agent can:
    - Load "programs" (any file it can read)
    - Execute "programs" (ReACT loop)
    - Save the results (write to a file)

</v-click>

<v-click>
<span style="color: #955438">

## An agent is *a computer for the computer*

</span>

</v-click>

::right::

<v-click at="1">

![Harness](./images/harness.jpeg){.w-md.mx-auto}

</v-click>

---
layout: center
---

# Demo Time

1. Basic agent usage — talking to an agent, tool calls in action
2. Skills — structured prompts and persistent memory
3. Subagent swarms — parallel agents coordinating work
4. Collaboration — shared memory, shared agents

---

# My principles of agentic programming

<v-clicks>

1) The agent is a computer, and I augment my thinking with computers
    - *I should write "programs" to structure the agent's work. "Agile development is a computer program"*

2) If I do not think about what I'm doing, I will become a slop cannon
    - *I should create well-structured plans and understand my code.*

3) Project state should live in source code, not in my memory
    - *Agents should read from plan files, do work, and write reports. If I'm spending too long writing prompts, something is wrong.*

4) I can only focus on one thing at a time
    - *Agents can work in parallel — I should know when to delegate instead of micromanaging.*

5) Bash is all you need

</v-clicks>



---
layout: statement
---

# Don't be a slop cannon


![Shen](./images/shen.png){.max-h-100 .object-contain .mx-auto}

---

# Things to think about

<v-click>

## The obvious ones:
- Security: the tech is cool. It's also commercial remote code execution
    - Data privacy and trust
- Ethics: copyright protections, worker protections, environmental responsibility
    - Please don't use Grok
- Data sovereignty: frontier LLM technology is concentrated between a handful of companies

</v-click>

<v-click>

## The less obvious ones:
- How does collaborative software development evolve?
- How do we manage and review this explosion of code?
- How do we preserve institutional knowledge when AI writes the software?

</v-click>

---
hideInToc: true
---

# Thank you for listening!

## Where to try:

<div class="grid grid-cols-3 gap-8 mt-8">

<div>

### Vendor-locked
- **Antigravity IDE** — Google *(FREE!)*
- **Claude Code** — Anthropic *(Paid, somewhat "industry standard")*
- **Codex** — OpenAI *(Paid)*

</div>

<div>

### Multi-model
- **Amp** *(Paid, free with ads)*
- **Cursor** *(Paid)*

</div>

<div>

### FOSS
- **Opencode** — spiritually Emacs
- **Pi** *(what I use)* — spiritually Vim

<p class="text-xs opacity-50 mt-4">N.B. Requires self-hosted or paid API access to an LLM</p>

</div>

</div>


