---
title: Docker Compose
layout: section
---

<img src="/images/docker-compose-logo.png" class="w-24" />

# Docker Compose

---

## 

---

## A Simple Script to Run a Multi-Container Application

Spins up a PostGreSQL DB and an API that connects to it.

```bash
#!/bin/bash

docker network create my-app-net

docker run -d --name db --network my-app-net -e POSTGRES_PASSWORD=password postgres:15

sleep 10

docker run -d --name api --network my-app-net -p 8080:8080 my-api-image:latest
```

<v-clicks>

What if the DB takes longer than 10 seconds to start?

</v-clicks>

---

## Docker Compose Specification

We define the outcome we want, and let the tool figure out how to achieve it.

```yaml
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password
    networks:
      - my_app_net
  api:
    image: my-api-image:latest
    ports:
      - "8080:8080"
    networks:
      - my_app_net
    depends_on:
      - db

networks:
  my_app_net:
    driver: bridge
```

---

## Applying the Compose File

To apply the compose file, we use the `docker-compose` command:

```bash
docker-compose up -d

docker-compose down
```

This applies the specification idempotently, meaning we can run it multiple times without causing issues.

---
layout: comparison
---

# Imperative vs Declarative

::left::

## Running Docker Commands

- Prone to mistakes when done manually
- Forced to use hacks to ensure correct order of operations
- Not idempotent, can cause issues if run multiple times
- Only way to see what is running is by using `docker ps`
- Best way you could possibly track the evolution of your deployment is by git tracking a shell script

::right::

## Using a `docker-compose` File

- Clear specification of the desired state of the application
- Handles dependencies and order of operations automatically
- Idempotent, can be applied multiple times without issues
- git track the declarative specification of your deployment with git
