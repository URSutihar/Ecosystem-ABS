# Project 16 — Ecosystem ABM: Generalists vs Specialists
### 40.015 Simulation Modeling & Analysis · Singapore University of Technology and Design

**Team:** Utkarsh Raj Suthihar · Ye Xinyu · Jiang Yuqing · Jolie Chua  
**Instructor:** Nuno Antunes Ribeiro

## Overview

This project is an interactive agent-based model of a fictional five-biome ecosystem. It compares two predator strategies:

- **Generalists** can hunt across several prey species and biomes.
- **Specialists** focus on a narrower set of prey and habitats.

The model tests how each strategy performs when ecosystems face environmental shocks. The work combines research, simulation design, a browser-based model, visual analysis, and a promotional video. Its central finding is that diversification makes generalist predators more resilient under uncertainty.

## Start Here

Open **`index.html`** in a modern browser, or visit the deployed site. It is the project home page and lists every section in order.

To move through the project:

1. Select any numbered section from the home page.
2. Use fixed **Prev** and **Next** buttons at page bottom to follow the intended sequence.
3. Open Section 7 to run the live ecosystem simulation.
4. Continue to Section 8 for results, then Section 9 for the embedded promotional video.

An internet connection is required for the YouTube video and external charting libraries.

## Project Sections

| # | Section | What to expect |
|---|---|---|
| 1 | Project Brief | Problem statement, research question, objectives, and scope. |
| 2 | Background Reading Report | Ecological and modelling concepts behind the project. |
| 3 | Project Management | Team roles, milestones, and project timeline. |
| 4 | Data Collection and Manipulation | Model parameters and how they were derived. |
| 5 | Simulation Design | States, agent rules, assumptions, and event flow. |
| 6 | Model Documentation and Programming | Architecture and explanation of the implementation. |
| 7 | UI, Visualization, and Animation | Live interactive ecosystem simulation. |
| 8 | Output Analysis | Simulation findings, Lotka–Volterra dynamics, and Monte Carlo analysis. |
| 9 | Promo Video | Embedded overview video. |

## For Technical Users

This is a static HTML, CSS, and JavaScript project. No build step or backend is required.

- Open `index.html` directly, or serve repository root with a static file server.
- Simulation code lives in `7_User Interface Visualization and Animation/lib/`.
- Model design data and rendering helpers live in the `4_`, `5_`, and `6_` section folders.
- The simulation uses a seeded Mulberry32 pseudorandom number generator, so a run is reproducible when given identical inputs and seed.
- Section 7 loads [D3 v7](https://d3js.org/) and [Plotly 2.27](https://plotly.com/javascript/) from CDNs.
- The video page uses YouTube embed `8UI1SmC0qhY`; each page preloads the YouTube player to reduce delay when Section 9 opens.

The original MP4 remains local in `9_Promo Video/` and is intentionally excluded from GitHub. The deployed experience uses the YouTube embed instead.
