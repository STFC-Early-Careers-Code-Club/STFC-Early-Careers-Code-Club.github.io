---
title: Designing and Implementing a Graph-Based Architecture for CodeEntropy
speaker: Harry Swift
date: 25-03-2026
imgUrl: /images/biosim-codeentropy_logo_light.png
description: A look at the design and implementation of a graph-based architecture introduced into the CodeEntropy codebase.
---

CodeEntropy is a scientific code used to compute absolute entropies from molecular dynamics simulations. As the project evolved from an academic prototype into maintained research software, parts of its internal architecture required redesign.

This talk describes the process of designing and implementing a new graph-based architecture for CodeEntropy. It discusses the motivation for introducing a graph model, the design decisions behind the implementation, and the challenges involved in integrating the new architecture into an existing scientific codebase.

In this talk, the following are covered:

- The role of CodeEntropy in analysing molecular dynamics simulations
- The architectural limitations of the previous implementation
- Why a graph-based approach was introduced
- Designing a graph representation suitable for the problem domain
- Implementation considerations when introducing a new architecture into an existing codebase
- Lessons learned from refactoring and evolving scientific software