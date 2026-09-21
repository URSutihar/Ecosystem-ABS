// ═══════════════════════════════════════════════════════════════
//  PROJECT MANAGEMENT DATA — Team + 10 project stages
//  Time axis: Weeks 1–14 of Term 6 (SMA 40.015)
// ═══════════════════════════════════════════════════════════════

var TEAM = [
  { id: 'urs',    name: 'Utkarsh Raj Suthihar', initials: 'UR', color: '#ef4455',
    studentId: '1008039',
    university: 'SUTD - D&E Scholar', course: 'ESD (BOAR + Finance) | AI & DTS minors',
    linkedin: 'https://www.linkedin.com/in/sutihar/', website: 'https://sutihar.com/utkarsh/' },
  { id: 'xinyu',  name: 'Ye Xinyu',             initials: 'YX', color: '#2dd4a0',
    studentId: '1007833',
    university: 'SUTD – QUANTEDGE Foundation', course: 'ESD (Financeial Services)',
    linkedin: 'https://www.linkedin.com/in/xinyu-ye-260903282/', website: '' },
  { id: 'yuqing', name: 'Jiang Yuqing',         initials: 'YQ', color: '#f5a623',
    studentId: '1007904',
    university: 'SUTD', course: 'Engineering Systems and Design',
    linkedin: 'https://linkedin.com/in/yuqing-jiang-b82007267/', website: '' },
  { id: 'jolie',  name: 'Jolie Chua',           initials: 'JC', color: '#60a5fa',
    studentId: '1008463',
    university: 'SUTD', course: 'Engineering Systems and Design',
    linkedin: 'https://www.linkedin.com/in/jolie-chua-lin', website: '' }
];

var INSTRUCTOR = {
  id: 'nuno',
  name: 'Nuno Antunes Ribeiro',
  initials: 'NR',
  color: '#a78bfa',
  university: 'SUTD - ESD',
  course: 'Assistant Professor\nDeputy Director (Aviation Studies Institute, ASI)',
  linkedin: 'https://www.linkedin.com/in/nunoantunesribeiro/',   // add LinkedIn URL here
  website: 'https://nunoantunesribeiro.github.io/'     // add faculty/personal page URL here
};

var TEAM_IMG_PATH = 'images/team/';  // swap to {id}.jpg / nuno.jpg when photos are supplied

var ALL = ['urs','xinyu','yuqing','jolie'];
var NOBODY = [];

var STAGES = [
  // ── 1 ──────────────────────────────────────────────────────────
  {
    id: 'brief',
    title: 'Project Brief Released',
    type: 'start',
    plannedWeekStart: 1, plannedWeekEnd: 1,
    actualWeekStart:  1, actualWeekEnd:  1,
    contributors: NOBODY,
    summary: 'Course brief and grading rubric distributed via e-Dimensions.',
    details:
      'The SMA 40.015 project brief was released on e-Dimensions, marking the official start of ' +
      'Project 16. The brief outlined the overall scope of the simulation project, deliverable ' +
      'requirements across nine graded folders, and the evaluation criteria used by instructors.',
    ideas: [
      'Nine deliverable categories released with grading rubric',
      'Project proposal guidelines and submission deadline communicated',
      'Final project guidelines and expected deliverables provided'
    ],
    artefacts: []
  },

  // ── 2 ──────────────────────────────────────────────────────────
  {
    id: 'meeting-1',
    title: 'Meeting 1 — Team Formation',
    type: 'meeting',
    plannedWeekStart: 1, plannedWeekEnd: 2,
    actualWeekStart:  2, actualWeekEnd:  2,
    contributors: ALL,
    summary: 'Team of four formed; communication channels established.',
    details:
      'The team met for the first time to formalise their collaboration on ' +
      'Project 16. Responsibilities were discussed informally and a shared communication channel ' +
      'was established. The team reviewed the grading rubric together to align on expectations ' +
      'across all nine deliverable folders.',
    ideas: [
      'Team composition and informal role discussion confirmed',
      'Telegram group created as the primary communication channel',
      'Grading rubric reviewed collectively; nine deliverable folders mapped out',
    ],
    artefacts: []
  },

  // ── 3 ──────────────────────────────────────────────────────────
  {
    id: 'research',
    title: 'Individual Background Research',
    type: 'individual',
    plannedWeekStart: 2, plannedWeekEnd: 4,
    actualWeekStart:  2, actualWeekEnd:  5,
    contributors: ALL,
    summary: 'Each member independently researched candidate simulation topics and gathered supporting literature.',
    details:
      'Following the first meeting, each team member conducted independent research on their ' +
      'assigned candidate topics. This involved reviewing academic literature, assessing the ' +
      'availability of data or theoretical models, and evaluating implementation feasibility ' +
      'within the scope of the course. Research findings were consolidated into a shared document ' +
      'to facilitate structured comparison at the second meeting.',
    ideas: [
      'Supermarket queueing time (M/M/c models)',
      'Healthcare priority queues (hospital triage scheduling)',
      'Airport security scanning throughput',
      'Parcel-sorting logistics',
      'Financial Monte Carlo simulation (option pricing / Value-at-Risk)',
      'Ecosystem ABM — generalists vs specialists (predator–prey dynamics)',
      'Gym and campus queue times',
      'Traffic routing and travel-time optimisation'
    ],
    artefacts: [
      { type: 'image', src: 'images/SMA.png', caption: 'Compiled research findings across the shortlisted candidate topics.' }
    ]
  },

  // ── 4 ──────────────────────────────────────────────────────────
  {
    id: 'meeting-2',
    title: 'Meeting 2 — Decision Matrix',
    type: 'meeting',
    plannedWeekStart: 4, plannedWeekEnd: 5,
    actualWeekStart:  6, actualWeekEnd:  6,
    contributors: ALL,
    summary: 'Scored all eight candidates on a weighted matrix; Ecosystem ABM won with a score of 8.80.',
    details:
      'The team reconvened to evaluate all candidate topics using a structured weighted decision ' +
      'matrix. Four scoring criteria were agreed upon, each assigned a weight reflecting its ' +
      'importance to the project\'s academic and practical objectives. All eight candidates were ' +
      'scored independently by each member and the results averaged. The Ecosystem ABM — ' +
      'modelling generalist versus specialist predator survival — achieved the highest composite ' +
      'score of 8.80, and the team voted unanimously to proceed with this direction.',
    ideas: [
      'Criteria weights: Data Availability 0.30 · Difficulty 0.20 · Uniqueness 0.35 · Interesting / Research angle 0.15',
      'Ecosystem ABM (Generalists vs Specialists) — composite score 8.80 · selected unanimously',
      'Finance Monte Carlo — 8.25 · runner-up',
      'Gym queue — 7.90 · Traffic routing — 7.60',
      'Supermarket — 5.80 · Healthcare priority queue — 4.90',
      'Core thesis formalised: generalists are more resilient to environmental shocks than specialists due to dietary and spatial flexibility'
    ],
    artefacts: [
      { type: 'image', src: 'images/decision.jpeg', caption: 'Decision matrix on the whiteboard — Ecosystem ABM (insect vs bird analogue) scored 8.80 and was selected.' }
    ]
  },

  // ── 5 ──────────────────────────────────────────────────────────
  {
    id: 'proposal',
    title: 'Project Proposal Submission',
    type: 'submission',
    plannedWeekStart: 6, plannedWeekEnd: 6,
    actualWeekStart:  7, actualWeekEnd:  7,
    contributors: ALL,
    summary: 'Proposal drafted collectively, reviewed by all members, and submitted via e-Dimensions.',
    details:
      'The project proposal was written jointly, outlining the problem statement, core hypothesis, ' +
      'and proposed modelling methodology. The team formalised the agent-based simulation approach — ' +
      'a spatial predator–prey model set across five distinct biomes — and defined the key output ' +
      'metrics (predator survival rates under environmental shocks). The document was cross-reviewed ' +
      'by all four members before submission.',
    ideas: [
      'Thesis locked: generalist resilience stems from dietary breadth and free biome movement, not from any direct advantage in hunt efficiency',
      'Agent-Based Modelling chosen as the methodology (vs system dynamics or discrete-event simulation)',
      'Five-biome spatial world proposed: Grassland, Ice Tundra, Desert, Rainforest, Swamp',
      'Headline output metric defined: predator survival probability across Monte Carlo runs',
      'Submission delayed from Week 6 to Week 7 due to extended decision-matrix iteration'
    ],
    artefacts: [
      { type: 'image', src: 'images/proposal.png', caption: 'Project proposal as submitted — outlining thesis, methodology, and planned deliverables.' }
    ]
  },

  // ── 6 ──────────────────────────────────────────────────────────
  {
    id: 'meeting-3',
    title: '1st Iteration — Prototype Simulation',
    type: 'meeting',
    plannedWeekStart: 9, plannedWeekEnd: 9,
    actualWeekStart:  9, actualWeekEnd:  10,
    contributors: ALL,
    summary: 'Built and reviewed a working single-file prototype covering the core agent loop, Monte Carlo tab, and model diagrams.',
    details:
      'At this stage, the team met to build and review the first working prototype of the Ecosystem Simulator. The main focus was to get the core simulation idea running in a simple form so that everyone could test it and discuss what should be improved. During the meeting, we worked on the basic simulation loop, an early Monte Carlo section, and simple model diagrams. This gave the team a shared starting point and helped us see which parts were already working and which still needed more development, especially specialist behaviour, visual presentation, and output detail.' ,
    ideas: [
      'Built the first working prototype in a single file',
      'Tested the main simulation flow as a team',
      'Reviewed the structure of the simulation, Monte Carlo, and model diagram sections',
      'Identified missing features and areas that needed improvement before the final version'
    ],
    artefacts: []
  },

  // ── 7 ──────────────────────────────────────────────────────────
  {
    id: 'engine',
    title: 'Finalised Simulation Engine',
    type: 'individual',
    plannedWeekStart: 10, plannedWeekEnd: 11,
    actualWeekStart:  11, actualWeekEnd:  11,
    contributors: ALL,
    summary: 'Rebuilt the simulation engine with the full five-biome architecture, D3 SVG rendering, and an eight-event tick loop.',
    details:
    'At this stage, the focus shifted to rebuilding the simulation engine into a more complete and structured version. The main goal was to move beyond the early prototype and develop a clearer ecosystem structure that better reflected the project concept. The world was organised into five biomes, each with its own prey species and specialist predator, while generalist predators were allowed to move across all biomes. This stage marked an important transition from proof of concept to a model that was suitable for more consistent testing and analysis.',
    ideas: [
      'The simulation was rebuilt around five distinct biomes',
      'Specialists were made biome-specific, while generalists remained free-moving',
      'The engine structure was improved so that the simulation behaved more consistently',
      'Manual and automatic shock options were added to support scenario testing'
    ],
    artefacts: []
  },

  // ── 8 ──────────────────────────────────────────────────────────
  {
    id: 'features',
    title: 'Feature Additions',
    type: 'individual',
    plannedWeekStart: 11, plannedWeekEnd: 11,
    actualWeekStart:  11, actualWeekEnd:  12,
    contributors: ALL,
    summary: 'Added Monte Carlo analysis, five Plotly charts, species encyclopedia, AI-generated illustrations, and UI polish.',
    details:
      'With the core engine stabilised, attention shifted to adding the features needed for both analysis and presentation. The priority at this point was no longer just to make the simulator run, but also to make it easier to interpret, compare, and explain. New features included Monte Carlo analysis, additional charts, a species encyclopedia, AI-generated species visuals, and interface improvements. These additions helped turn the simulator into a more complete and polished deliverable rather than only a working simulation model.',
    ideas: [
      'Monte Carlo analysis was added for repeated-run comparison',
      'Additional charts were included to show population patterns more clearly',
      'A species encyclopedia was created to support explanation and presentation',
      'Interface and navigation were improved to make the simulator easier to use',
      'Output presentation became clearer and more suitable for the final report and demo'
    ],
    artefacts: []
  },

  // ── 9 ──────────────────────────────────────────────────────────
  {
    id: 'output',
    title: 'Output Analysis',
    type: 'individual',
    plannedWeekStart: 12, plannedWeekEnd: 12,
    actualWeekStart:  12, actualWeekEnd:  12,
    contributors: ALL,
    summary: 'Ran Monte Carlo batches across parameter regimes to validate the generalist resilience thesis.',
    details:
      'To evaluate the model more rigorously, the simulation outputs were then used to test the project thesis directly. The main purpose was to examine whether generalist predators were more resilient than specialists under environmental shocks. Repeated Monte Carlo experiments were carried out across different parameter settings, and survival outcomes were compared. The results showed a clear pattern in which generalists survived more consistently than specialists. This provided direct evidence to support the project’s main conclusion.',
    ideas: [
      'Repeated simulation runs were conducted under different conditions',
      'Predator survival was used as the main comparison measure',
      'Generalists were found to survive more consistently than specialists',
      'Output plots were used as supporting evidence in the final analysis',
      'The final discussion was strengthened through simulation-based results rather than theory alone'
    ],
    artefacts: []
  },

  // ── 10 ─────────────────────────────────────────────────────────
  {
    id: 'final',
    title: 'Final Deliverables & Submission',
    type: 'submission',
    plannedWeekStart: 12, plannedWeekEnd: 12,
    actualWeekStart:  12, actualWeekEnd:  12,
    contributors: ALL,
    summary: 'Final report written, promotional video produced, all nine deliverable folders reviewed and submitted.',
    details:
      'The final phase centred on consolidating and submitting all deliverables. The main concern at this point was to ensure that the report, promotional video, and submission folders were complete, well-organised, and aligned with the grading rubric. The report structure was reviewed, the main conclusions were checked for consistency with the results, and the promotional video was arranged to present the simulator and findings in a clear sequence. This final phase ensured that the project was ready for submission in both content and presentation quality.',
    ideas: [
      'The written report and promotional video were finalised',
      'All deliverables were reviewed collectively before submission',
      'The materials were checked against the grading rubric',
      'The final submission was organised to be complete and presentation-ready'
    ],
    artefacts: [
      { type: 'image', src: 'images/final.png', caption: 'Final deliverables file structure.' }
    ]
  }
];

// Type → colour mapping used by timeline nodes and Gantt bars
// Note: 'start' (formerly 'milestone') and 'submission' colors are swapped from the original.
var TYPE_COLORS = {
  start:       '#ef4455',  // red
  meeting:     '#60a5fa',  // blue
  individual:  '#f5a623',  // amber
  submission:  '#2dd4a0'   // green
};

var TYPE_LABELS = {
  start:       'Start',
  meeting:     'Meeting',
  individual:  'Individual work',
  submission:  'Submission'
};
