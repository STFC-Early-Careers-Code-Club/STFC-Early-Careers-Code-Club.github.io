---
theme: neversink
title: Templates With Jinja2 in Python
author: Kiran Jonathan
hideInToc: true
layout: section
color: sky
---

# Templates With Jinja2 in Python

**STFC Early Careers Code Club 25.03.26**

<br>

Kiran Jonathan (Scientific Computing, DL)
<Email v="kiran.jonathan@stfc.ac.uk" color="orange" />

---
layout: top-title-two-cols
color: sky
columns: is-7
---

:: title ::

# About Me

:: left ::

**Kiran Jonathan (He/Him)**
- Recently finished my grad scheme in SCD 
  - (Although recently = September)
- Working on accelerator/plasma simulations with ISIS Neutron and Muon Source
- Starting a part-time PhD soon with University of Strathclyde

<br>

<v-click>

### **Writes a lot of simulation input files**

</v-click>

:: right ::

<img src="./images/Headshot - Jonathan, Kiran.jpg" />

---
layout: top-title-two-cols
color: sky
columns: is-7
---

:: title ::

# My Problem

:: left ::

**A classic simulator's pain:**

- Writing the same input files, with the same format
  - Over and over and over again
- Some programs require these in a specific order
- Others just have so many variables that if you don't chunk them up, you can't read it
  - My `parameter.ini` files can be >200 lines each

<v-click>

How do I manage parameter sweeps? What if I only want to change the time step?

</v-click>

:: right ::

### Example input.txt
```ini
# Simulation Resolution
time_step = 1e-10
solution_polynomial_order = 3

# Particles
particle1_name = Electron
particle1_mass = 9.11e-31
particle1_charge = -1.6e-19

particle2_name = Proton
particle2_mass = 1.67e-27
particle2_charge = 1.6e-19

# Output
print_frequency = 100
export_currents = True

...

# And many, many more inputs
```

---
layout: top-title-two-cols
color: sky
columns: is-7
---

:: title ::

# My Terrible Solution

:: left ::

### Example input.txt
```ini
# Simulation Resolution
time_step = TIMESTEP
solution_polynomial_order = 3

# Particles
particle1_name = Electron
particle1_mass = 9.11e-31
particle1_charge = -1.6e-19

particle2_name = Proton
particle2_mass = 1.67e-27
particle2_charge = 1.6e-19

# Output
print_frequency = 100
export_currents = True

...

# And many, many more inputs
```



:: right ::


`sed` will save the day! Right?

All I need to do is add some placeholder text to my input file, and replace it with my desired value!

### Crude BASH Script
```sh
for tstep in 1 2 3 4; do
  mkdir tstep_$tstep
  cd tstep_$tstep

  cp ../input.txt .
  sed -i "s/TIMESTEP/$tstep/g" input.txt

  cd ..
done
```

<v-click>

**Nothing could possibly go wrong...**

</v-click>

---
layout: top-title-two-cols
color: sky
columns: is-7
---

:: title ::

# The Problem With My Terrible Solution

:: left ::

I love `sed`, and for one off use cases it's amazing!

But I found myself:
- Constantly remaking dummy templates for the **same input file**
- Creating a mess of bash scripts throughout my directories
- And hitting some sticky situations if I wanted to include/exclude whole blocks
  - Suddenly it wasn't as simple as replacing one variable!

<br>

<v-click>

### **I knew there had to be a better way!**

</v-click>

:: right ::

```ini
# Particles
particle1_name = Electron
particle1_mass = 9.11e-31
particle1_charge = -1.6e-19

particle2_name = Proton
particle2_mass = 1.67e-27
particle2_charge = 1.6e-19

...

# What if I want to include more particles?
# Or exclude the particles I already have?
```

---
layout: quote
author: Jinja2 Docs
color: sky
---

Jinja is a fast, expressive, extensible **templating engine**. Special placeholders in the template allow writing code similar to **Python syntax**. Then the template is passed data to render the final document.

---
layout: top-title-two-cols
color: sky
columns: is-7
---

:: title ::

# Jinja2 Overview

:: left ::

**Jinja2 is an awesome Python library:**
- Allows you to create flexible, simple templates for structured and ordered text
- Follows a clean, Python-inspired syntax
- Easy to populate these templates from unordered/semi-structured inputs:
  - Dictionaries
  - YAML files
  - Dataclasses

<v-click>

**Basically - let your template handle your formatting, and let Python handle your data!**

</v-click>

:: right ::

<img src="./images/jinja-name.svg" style="background-color: white; padding: 1rem;" />

<br>

```sh
# Just a simple Python package!
pip install Jinja2
```

---
layout: top-title-two-cols
color: sky
---

:: title ::

# Some Cool Features

:: left ::

### **Features Within Templates**

- For loops for repeated inputs
  - Nice integration with Python objects
  - Can also access the loop index
- If statements for optional blocks/forked input
- You can define basic variables
  - E.g. a counter you increment in a loop somehow
- Can even perform checks if a variable is none!

:: right ::

### **Wider Integration/Automation**

- Templates can be stored in a Python package and easily loaded without copy/pasting the file
- Templates just take the variable names as input for rendering:
  - `template.render(time_step=1e-10, polynomial_order=2, ...)`
- This means you can easily use unstructured/semi-structured input:
  - `template.render(**some_dictionary)`
  - `template.render(**some_dataclass.as_dict())`

---
layout: top-title-two-cols
color: sky
---

:: title ::

# A Quick Example

:: left ::

### `my_package/templates/input.txt.j2`

```ini
# Simulation Resolution
time_step = {time_step}
solution_polynomial_order = {polynomial_order}

# Particles
{% for particle in particles %} # For loops!
particle{loop.index}_name = {particle.name} 
particle{loop.index}_mass = {particle.mass}
particle{loop.index}_charge = {particle.charge}
{% endfor %}

# Output
print_frequency = 100
{% if export_currents %} # If statements!
export_currents = True
{% endif %}

...

# And many, many more inputs
```
:: right ::

### Python Script:

```python
from jinja2 import Environment, PackageLoader, select_autoescape

env = Environment(
    loader=PackageLoader("my_package"),
    autoescape=select_autoescape()
)

template = env.get_template("input.txt.j2")

templates_vals = {"time_step": 1e-10, "polynomial_order": 2, ...}
# Truncated for brevity, but all variables must be specified!

print(template.render(**template_vals))

```

Simply load the template from your package, render it with your desired values, and you're done!


---
layout: section
color: sky
---

# Demo Time!

<br>

We'll take a look at a simple Jinja2 workflow for automating the creation of an input file

---
layout: top-title
color: cyan
---

:: title ::

# And That's It!

:: content ::

This was a quick one, but I really like Jinja2!

- Very simple to learn API
- Handy features beyond just copy/pasting text (for loops, if statements, none checks, etc...)
- Nicely combines with YAML/dictionaries/dataclasses/any data structure of your choice
- Easily packaged into your own Python package

<br>

<v-click>

### **Basically, it just makes things easier!**

</v-click>

---
layout: section
color: sky
---

# Any Questions?

<br>

Feel free to get in touch after the session:
<Email v="kiran.jonathan@stfc.ac.uk" color="orange" />
