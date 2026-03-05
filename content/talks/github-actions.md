---
title: GitHub Actions
speaker: Harry Swift
date: 2025-10-15
imgUrl: /images/cicd.jpg
description: An introduction to GitHub Actions, covering the basics of setting up workflows, common use cases, and best practices for automating tasks in your repositories.
---

GitHub Actions is a CI/CD platform built into GitHub that lets you automate workflows such as testing, building, and deploying code. You define workflows using YAML files stored in your repository under `.github/workflows/`.

::steps{level="4"}
#### Prerequisites

- Git installed
- Python installed
- GitHub CLI (`gh`) installed and logged in

#### Create a New Project Directory and Initialize Git

```bash [Terminal]
mkdir python-ci-demo
cd python-ci-demo
git init
```

#### Create Python app and tests

Create the directory structure and files:

```bash [Terminal]
mkdir -p app tests .github/workflows
```

Create `app/main.py` with a simple function:

```python [app/main.py]
def add(x, y):
    return x + y
```

Create `tests/test_main.py` with a test case:

```python [tests/test_main.py]
from app.main import add

def test_add():
    assert add(2, 3) == 5
```

Create `requirements.txt` listing dependencies:

```text [requirements.txt]
pytest
black
```

#### Add the Workflow YAML

Create `.github/workflows/ci.yml` with the following contents:

```yaml [.github/workflows/ci.yml]
name: Python CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: [3.11, 3.12, 3.13]
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v5
        with:
          python-version: ${{ matrix.python-version }}
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
      - name: Run tests
        run: |
          pytest
      - name: Check formatting with Black
        run: |
          black --check .
```

#### Adding Github Actions Workflow

```bash [Terminal]
git add .
git commit -m "Initial commit with Python app and GitHub Actions CI"
gh repo create python-ci-demo --public --source=. --push
```

#### View your Workflow

Open your browser to your new repo, e.g.: `https://github.com/YOUR_USERNAME/python-ci-demo`

Click on thee "Actions" tab and observe the workflow running for each push or pull request.

#### Create CRON Jobs

Create `.github/workflows/cron.yml` with the following contents:

```yaml [.github/workflows/cron.yml]
name: Python CI

on:
  push:
  pull_request:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 09:00 UTC

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: [3.11, 3.12, 3.13]
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v5
        with:
          python-version: ${{ matrix.python-version }}
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
      - name: Run tests
        run: |
          pytest
      - name: Check formatting with Black
        run: |
          black --check .
```

What does `0 9 * * 1` mean?

| Field        | Value | Meaning                              |
|--------------|-------|--------------------------------------|
| Minute       | 0     | At the 0th minute                    |
| Hour         | 9     | At 09:00 (9 AM UTC)                  |
| Day of Month | *     | Every day                            |
| Month        | *     | Every month                          |
| Day of Week  | 1     | Monday (0 = Sunday, 1 = Monday, ...) |

This tells GitHub Actions to run the workflow **every Monday at 9:00 AM UTC**.
::