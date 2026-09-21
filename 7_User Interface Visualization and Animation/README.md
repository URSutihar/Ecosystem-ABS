# Ecosystem Simulator — User Guide
### `7_User Interface Visualization and Animation/ecosystem.html`

Open **`ecosystem.html`** directly in a browser. No server or installation required.  
An internet connection is needed only to load D3 and Plotly from CDN.

---

## Layout Overview

The interface is split into three panels:

| Panel | Location | Purpose |
|-------|----------|---------|
| **Left** | Sidebar | Simulation parameters & controls |
| **Centre** | Main area | Live agent grid + event log |
| **Right** | Sidebar | Population graphs + Monte Carlo |

---

## Left Panel — Parameters & Controls

### 1) World Settings

| Control | Range | Default | Effect |
|---------|-------|---------|--------|
| Grid Size | 20–80 | 50 | Width/height of the simulation grid in cells |
| Max Ticks | 100–2000 | 500 | How many time steps before the run ends |
| Sim Speed | 0–500 | 250 | Delay (ms) between ticks — drag left for faster |
| Random Seed | 1–999999 | random | Set a specific seed to replay an identical run |

> Changing **Grid Size** or **Max Ticks** automatically resets the simulation.

---

### 2) Prey (20 Species, 4 per Biome)

| Control | Default | Description |
|---------|---------|-------------|
| Initial Count | 600 | Total prey agents spawned at t = 0 (30 per species) |
| Carrying Cap (K) | 1500 | Logistic ceiling — reproduction slows as population approaches K |
| Repro Rate | 0.10 | Per-tick probability a prey agent reproduces (scaled by density) |
| Mortality | 0.01 | Per-tick probability of background (non-predation) death |

---

### 3) Generalist Predators

Generalists roam the entire grid and can hunt all 20 prey species.

| Control | Default | Description |
|---------|---------|-------------|
| Initial Count | 25 | Generalist agents at t = 0 |
| Hunt Success | 0.35 | Probability a hunt attempt succeeds |
| Energy / Kill | 5 | Energy gained per successful hunt |
| Reproduce % | 0.06 | Per-tick reproduction probability (requires energy > 8) |
| Mortality % | 0.025 | Per-tick background death probability |
| Starve Thresh | 0 | Energy level at which the agent dies of starvation |

---

### 4) Specialist Predators (1 type per biome)

Specialists are confined to their home biome and hunt only a subset of local prey.

| Control | Default | Description |
|---------|---------|-------------|
| Total Count | 25 | Specialist agents spawned across all 5 biomes (5 per biome) |
| Hunt Success | 0.55 | Higher than generalist — locally adapted |
| Energy / Kill | 8 | More energy per kill — niche efficiency |
| # Spp Hunted | 3 | How many of the 4 local prey species this specialist targets |
| Reproduce % | 0.06 | Per-tick reproduction probability (requires energy > 8) |
| Mortality % | 0.015 | Lower background death — stable, familiar niche |
| Starve Thresh | 0 | Energy level at which the agent dies of starvation |

---

### 5) Environmental Shocks

Shocks kill a random fraction of agents in selected biomes.

| Control | Default | Description |
|---------|---------|-------------|
| Shock Severity | 0.20 | Fraction of agents in affected biomes killed per shock event |
| Target Biomes | (checkboxes) | Select which biomes are eligible for shocks (Grassland, Ice Tundra, Desert, Rainforest, Swamp) |
| Auto Shock Prob | 0.01 | Per-tick probability of a random shock triggering automatically |

> Leave all biome checkboxes unchecked to allow shocks to hit any biome at random.  
> Check specific boxes to restrict shocks to those biomes only.

---

### Simulation Controls

| Button | Action |
|--------|--------|
| ▶ **Start** | Begin or resume the simulation |
| ⏸ **Pause** | Freeze the simulation at the current tick |
| ⏭ **Step** | Advance exactly one tick while paused |
| 🔄 **Reset** | Stop and reinitialise with current parameter values |

---

### Species Encyclopedia

A scrollable list of all 25 species (20 prey + 5 specialist predators + 1 generalist) grouped by biome. Click any species name to open its **species card** — showing its lore, stats, and role in the ecosystem. Navigate between species with the **◀ ▶** arrows on the modal.

You can also **click any agent dot on the grid** to open its species card directly.

---

## Centre Panel — Simulation Grid

- Each coloured dot is a live agent: **green** = prey, **amber** = generalist, **red** = specialist.
- The grid is divided into five vertical **biome columns** (Grassland → Swamp, left to right).
- The **Event Log** below the grid streams real-time tick events (shocks, extinctions, immigration).

---

## Right Panel — Graphs & Monte Carlo

### Population Graph
Live line chart showing prey, generalist, and specialist counts over time. Updates every tick.

### Monte Carlo Analysis

Run the simulation hundreds of times automatically with different random seeds to get statistical results.

| Control | Default | Description |
|---------|---------|-------------|
| Runs | 100 | Number of independent simulation runs |
| MC Seed Start | random | First seed used; subsequent runs use seed+1, seed+2, … |

1. Set your parameters in the left panel.
2. Click **Run Monte Carlo** — a progress bar tracks completion.
3. Results appear as a spaghetti plot (one line per run) with **median overlays** in bold.
4. Summary statistics (survival rates, median final populations) are shown below the chart.
5. Click **Cancel** to abort a running batch.

> Monte Carlo runs are fully reproducible: the same **MC Seed Start** with the same parameters always produces identical results.

---

## Tips

- **Reproduce a specific run:** note the *Random Seed* shown in the World Settings and re-enter it after a reset.
- **Watch a single biome:** zoom your browser in on the left portion of the grid to observe Lotka–Volterra oscillation in one biome column.
- **Test resilience:** start a run, let it stabilise, then manually trigger a shock by temporarily increasing Shock Severity and setting Auto Shock Prob to 1.0 for one tick.
- **Speed vs. accuracy:** set Sim Speed to 0 for maximum throughput (useful before running Monte Carlo).
